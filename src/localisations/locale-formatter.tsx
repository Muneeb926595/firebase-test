'use strict';

import React from 'react';
import { Text } from 'react-native';
import { DateTimeFormatOptions, HTMLFormatOptions, IFormatted, MessageFormatOptions, NumberFormatOptions, PluralFormatOptions } from './types';
import { LocaleProvider } from './locale-provider';

function _interopDefault(ex: any) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex.default : ex;
}

const reactDefault = _interopDefault(React);
const Intl = _interopDefault(require('react-intl'));
const PropTypes = _interopDefault(require('prop-types'));


const DateDefaultProps = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};


/**
 * Produces a locale-aware component for rendering a date value
 * @param props
 */
export const FormattedDate = function (props: DateTimeFormatOptions) {
  const myProps = { ...props, ...DateDefaultProps };
  return reactDefault.createElement(Intl.FormattedDate, myProps, function (localized: Function) {
    return reactDefault.createElement(Text, { style: myProps.style }, localized);
  });
};

(FormattedDate as IFormatted<DateTimeFormatOptions>).propTypes = {
  value: PropTypes.any.isRequired,
  style: PropTypes.any,

  localeMatcher: PropTypes.string,
  formatMatcher: PropTypes.string,

  timeZone: PropTypes.string,
  hour12: PropTypes.any,

  weekday: PropTypes.string,
  era: PropTypes.string,
  year: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.string,
  hour: PropTypes.string,
  minute: PropTypes.string,
  second: PropTypes.string,
  timeZoneName: PropTypes.string,
};

/**
 * Produces a locale-aware component for rendering an HTML value.
 * @param props
 */
export const FormattedHTMLMessage = function (props: HTMLFormatOptions) {
  return reactDefault.createElement(Intl.FormattedHTMLMessage, props, function (localized: Function) {
    return reactDefault.createElement(Text, { style: props.style }, localized);
  });
};

(FormattedHTMLMessage as IFormatted<HTMLFormatOptions>).propTypes = {
  id: PropTypes.any,
  style: PropTypes.any,
};

/**
 * Produces a locale-aware component for rendering some text
 * @param props
 */
export const FormattedMessage = function (props: MessageFormatOptions) {
  /**
     * setup default message
     */
  const formattedMessageProps = Object.assign({}, props);

  if (!formattedMessageProps.id) {
    formattedMessageProps.id = '?missing?'
  }

  if (!formattedMessageProps.defaultMessage) {
    formattedMessageProps.defaultMessage = LocaleProvider.formatMessage(props.id || '?missing?', props.values);
  }
  return reactDefault.createElement(Intl.FormattedMessage, formattedMessageProps, function () {
    const _len = arguments.length;
    const nodes = Array(_len);
    let _key = 0;
    for (; _key < _len; _key++) {
      // eslint-disable-next-line prefer-rest-params
      nodes[_key] = arguments[_key];
    }

    const newNodes = nodes.map(function (node) {
      if (!React.isValidElement(node)) {
        return reactDefault.createElement(Text, { style: props.style }, node);
      }
      return node;
    });
    return React.createElement.apply(undefined, [Text, { style: props.style }].concat(newNodes) as any);
  });
};

(FormattedMessage as IFormatted<MessageFormatOptions>).propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.any,
  values: PropTypes.any,
};


/**
 * Produces a locale-aware component for rendering a number.
 * @param props
 */
export const FormattedNumber = function (props: NumberFormatOptions) {
  const style = props.style;

  const formatOptions = {
    localeMatcher: props.localeMatcher,
    style: props.formatStyle,
    currency: props.currency,
    currencyDisplay: props.currencyDisplay,
    useGrouping: props.useGrouping,
    minimumIntegerDigits: props.minimumIntegerDigits,
    minimumFractionDigits: props.minimumFractionDigits,
    maximumFractionDigits: props.maximumFractionDigits,
    minimumSignificantDigits: props.minimumSignificantDigits,
    maximumSignificantDigits: props.maximumSignificantDigits,
    value: props.value,
  };

  return reactDefault.createElement(Intl.FormattedNumber, formatOptions, function (localized: Function) {
    return reactDefault.createElement(Text, { style }, localized);
  });
};

(FormattedNumber as IFormatted<NumberFormatOptions>).propTypes = {
  style: PropTypes.any,
  localeMatcher: PropTypes.string,
  formatStyle: PropTypes.string,
  currency: PropTypes.string,
  currencyDisplay: PropTypes.string,
  useGrouping: PropTypes.boolean,
  minimumIntegerDigits: PropTypes.number,
  minimumFractionDigits: PropTypes.number,
  maximumFractionDigits: PropTypes.number,
  minimumSignificantDigits: PropTypes.number,
  maximumSignificantDigits: PropTypes.number,
  value: PropTypes.number,
};

/**
 * Produces a locale-aware component for rendering a string based on a number value.
 * @param props
 */
export const FormattedPlural = function (props: PluralFormatOptions) {
  return reactDefault.createElement(Intl.FormattedPlural, props, function (localized: Function) {
    return reactDefault.createElement(Text, { style: props.style }, localized);
  });
};


(FormattedPlural as IFormatted<PluralFormatOptions>).propTypes = {
  style: PropTypes.string,
  value: PropTypes.any,
  zero: PropTypes.any,
  one: PropTypes.any.isRequired,
  other: PropTypes.any.isRequired,
  two: PropTypes.any,
  few: PropTypes.any,
  many: PropTypes.any,
  children: PropTypes.any,
};

type RelativeFormatOptions = {
  style?: 'best fit' | 'numeric';
  units?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
  value: Date | Number;
  format?: string;
  updateInterval?: number;
  initialNow?: any;
  children?: (formattedDate: string) => any;
};

/**
 * Produces a locale-aware component for rendering a string representative of a date/time relative to the present moment (e.g., '2 days ago')
 * @param props
 */
export const FormattedRelative = function (props: RelativeFormatOptions) {
  return reactDefault.createElement(Intl.FormattedRelative, props, function (localized: Function) {
    return reactDefault.createElement(Text, { style: props.style }, localized);
  });
};

(FormattedRelative as IFormatted<RelativeFormatOptions>).propTypes = {
  style: PropTypes.any,
  units: PropTypes.string,
  value: PropTypes.any,
  format: PropTypes.string,
  updateInterval: PropTypes.number,
  initialNow: PropTypes.any,
  children: PropTypes.any,
};

/**
 * Produces a locale-aware component for rendering a time value.
 * @param props
 */
export const FormattedTime = function (props: DateTimeFormatOptions) {
  return reactDefault.createElement(Intl.FormattedTime, props, function (localized: Function) {
    return reactDefault.createElement(Text, { style: props.style }, localized);
  });
};

(FormattedTime as IFormatted<DateTimeFormatOptions>).propTypes = {
  value: PropTypes.any.isRequired,
  style: PropTypes.any,
  localeMatcher: PropTypes.string,
  formatMatcher: PropTypes.string,
  timeZone: PropTypes.string,
  hour12: PropTypes.any,
  weekday: PropTypes.string,
  era: PropTypes.string,
  year: PropTypes.string,
  month: PropTypes.string,
  day: PropTypes.string,
  hour: PropTypes.string,
  minute: PropTypes.string,
  second: PropTypes.string,
  timeZoneName: PropTypes.string,
};
