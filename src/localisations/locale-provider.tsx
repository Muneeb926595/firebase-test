/* eslint-disable camelcase */
'use strict';
import { flatten } from 'flat';
import { Constants } from '../globals';
import { ISystemMessages } from './types';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Dictionary } from '../types';

function _interopDefault(ex: any) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex.default : ex;
}

const Intl = _interopDefault(require('react-intl'));

const IntlProvider = Intl.IntlProvider;

export class LocaleProvider extends Component<any> {

  private static readonly error = {
    notInitialized: 'LocaleProvider was not initialized',
  };

  private static locale: string = Constants.DEFAULT_APP_LOCALE;
  private static messages: any = {};
  private static _messageIDs: any = {};

  private static onError: () => void;

  static get IDs(): ISystemMessages {
    return this._messageIDs;
  }

  static async init(preferredLocale: string) {
    const localTranslatinos = LocaleProvider.importLocalTranslations();
    const [ids, texts] = await LocaleProvider.translationsByLocale(preferredLocale, localTranslatinos);
    LocaleProvider.messages = texts;
    LocaleProvider._messageIDs = ids;
  }

  static t(key?: string, values?: any): string {
    if (key) {
      let localized: string = LocaleProvider.messages[key];

      if (values) {
        Object.keys(values).forEach((valueKey, index) => {
          localized = localized.replace(RegExp(`{${valueKey}}`, 'g'), values[valueKey] as string);
        });
      }

      return localized;
    } else {
      return 'key unknown'
    }
  }

  private static async translationsByLocale(
    preferredLocale: string,
    translations: Dictionary<ISystemMessages>,
    fallbackMap?: Dictionary<string>
  ): Promise<[ISystemMessages, ISystemMessages]> {
    const locale = preferredLocale || 'en-US'
    let messagesByLocale = translations[locale];

    if (!messagesByLocale && fallbackMap) {
      // can't find mesages by user's locale on device,
      // try to get by using fallbackc map
      const fallbackLocale = fallbackMap[locale];
      messagesByLocale = translations[fallbackLocale];
    }

    if (!messagesByLocale) {
      // still don't have messages, get messages by default locale ->
      messagesByLocale = translations[Constants.DEFAULT_APP_LOCALE];
    }
    const ids = LocaleProvider.getMessageIds(messagesByLocale);
    const messages: ISystemMessages = flatten(messagesByLocale);
    return [ids as ISystemMessages, messages];
  }

  // move this to const
  private static importLocalTranslations(): Dictionary<ISystemMessages> {
    const enUS = require('./locales/en-US.json');
    const esUS = require('./locales/es-US.json');
    return {
      'en-US': enUS,
      'es-US': esUS
    };
  }

  static getMessageIds(messages: ISystemMessages) {
    const messageIndex = {};

    if (!messages) {
      return {};
    }

    function buildIndex(index: { [index: string]: any }, target: { [index: string]: any }, path?: string) {
      Object.keys(target).forEach((k) => {
        const currentPath = (path ? path + '.' : '') + k;
        if (typeof target[k] === 'string') {
          index[k] = currentPath;
        } else {
          index[k] = {};
          buildIndex(index[k], target[k], currentPath);
        }
      });
    }

    buildIndex(messageIndex, messages);
    return messageIndex;
  }

  static setLocale(locale: string) {
    LocaleProvider.locale = locale.replace('_', '-');
  }

  static setPreferredLocale(preferredLocale: string, fallbackLocale: string) {
    LocaleProvider.locale = preferredLocale.replace('_', '-');
  }

  static formatMessage(id: string, values?: any) {
    let parts: any = [];

    let resourceString: string =
      LocaleProvider.messages && LocaleProvider.messages[id] ? LocaleProvider.messages[id] : id;

    if (values) {
      Object.keys(values).forEach((key) => {
        if (typeof values[key] === 'function') {
          let idx = 0;
          parts = resourceString
            .split(`{${key}}`)
            .map((p) => (p.length ? p : values[key]()))
            .map((p) => <Text key={idx++}>{p}</Text>);
        } else if (typeof values[key] !== 'object') {
          resourceString = resourceString.replace(RegExp(`{${key}}`, 'g'), values[key]);
        }
      });
    }

    return parts.length ? parts : resourceString;
  }

  render() {

    return (
      <IntlProvider
        locale={LocaleProvider.locale}
        key={LocaleProvider.locale}
        textComponent={Text}
        defaultLocale={Constants.DEFAULT_APP_LOCALE}
      >
        {this.props.children}
      </IntlProvider>
    );
  }

}