import {Dictionary} from '../types';

export type LocaleMessage = {
  locale: string;
  messages: object;
};

export type DateTimeFormatOptions = {
  value: Date | number;
  style: any;
  localeMatcher: 'best fit' | 'lookup';
  formatMatcher: 'basic' | 'best fit';

  timeZone: string;
  hour12: boolean;

  weekday: 'narrow' | 'short' | 'long';
  era: 'narrow' | 'short' | 'long';
  year: 'numeric' | '2-digit';
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day: 'numeric' | '2-digit';
  hour: 'numeric' | '2-digit';
  minute: 'numeric' | '2-digit';
  second: 'numeric' | '2-digit';
  timeZoneName: 'short' | 'long';
};

export interface IFormatted<T> {
  (props: T): any;
  propTypes: T;
}

export type HTMLFormatOptions = {
  id: string;
  style?: any;
};

export type MessageFormatOptions = {
  id: string;
  style?: any;
  values?: any;
  defaultMessage?: string;
};

export type NumberFormatOptions = {
  style?: any;
  value?: number;
  localeMatcher: 'best fit' | 'lookup';
  formatStyle: 'decimal' | 'currency' | 'percent';
  currency: string;
  currencyDisplay: 'symbol' | 'code' | 'name';
  useGrouping: boolean;
  minimumIntegerDigits: number;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
  minimumSignificantDigits: number;
  maximumSignificantDigits: number;
};

export type PluralFormatOptions = {
  style?: 'cardinal' | 'ordinal';
  value: any;
  other: any;
  zero?: any;
  one?: any;
  two?: any;
  few?: any;
  many?: any;
  children?: (formattedPlural: any) => any;
};

type configMap = Dictionary<string>;

export type localeConfig = {
  systemMessages: any;
  defaultLanguageLocale?: configMap;
  localeFallbackMap?: configMap;
};

export interface IMessageGroup {}

export interface IErrorMessages extends IMessageGroup {
  readonly nothingFound: string;
  readonly ageIsInvalid: string;
  readonly addressIsInvalid: string;
  readonly titleIsRequired: string;
  readonly contentIsRequired: string;
  readonly genderIsInvalid: string;
}

export interface IInstructionMessages extends IMessageGroup {
  readonly underProgress: string;
}

export interface ILabelTexts extends IMessageGroup {
  readonly WelcomeCarouselDescription1: string;
  readonly WelcomeCarouselDescription2: string;
  readonly WelcomeCarouselDescription3: string;
  readonly WelcomeCarouselDescription4: string;
  readonly WelcomeCarouselDescription5: string;
  readonly loginHere: string;
  readonly signinToYourAccount: string;
  readonly signin: string;
  readonly signinWithGoogle: string;
  readonly firebaseTest: string;
  readonly language: string;
  readonly enterYourAge: string;
  readonly edit: string;
  readonly editProfile: string;
  readonly profile: string;
  readonly english: string;
  readonly spain: string;
  readonly home: string;
  readonly blogs: string;
  readonly settings: string;
  readonly submit: string;
  readonly enterYourAddress: string;
  readonly logout: string;
  readonly deleteAccount: string;
  readonly genderWithSterek: string;
  readonly welcomeMessage: string;
  readonly notWelcomedHere: string;
}

export interface IGeneralMessages extends IMessageGroup {
  readonly skip: string;
  readonly next: string;
}

export interface IApiErrorMessages extends IMessageGroup {
  readonly authTokenExpired: string;
}

export interface ISystemMessages {
  readonly apiError: IApiErrorMessages;
  readonly error: IErrorMessages;
  readonly general: IGeneralMessages;
  readonly instruction: IInstructionMessages;
  readonly label: ILabelTexts;
}
