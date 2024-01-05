class _Constants {
  /**
   * Durations in millisecs
   */
  readonly duration = {
    extraShort: 250,
    short: 500,
    medium: 1000,
    long: 2000,
    extraLong: 6000,
  };

  readonly REGEX_EMAIL =
    /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z0-9\-]{2,})+\s*$/;
  readonly REGEX_FULL_NAME = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  readonly REGEX_AGE = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;

  readonly DATE_MONTH_YEAR_FORMATE_DASHED = 'DD-MM-YYYY';
  readonly DATE_MONTH_YEAR_FORMATE_SLASHED = 'DD/MM/YYYY';

  readonly MAXIMUM_OTP_CODE_LENGTH = 6;

  readonly commaSeparator = ',';

  readonly DEBOUNCE_DELAY = 400;
  readonly DISPOSE_DELAY = 700;
  readonly MAX_TIME_ALLOW_TO_RESEND_OTP = 120; //in sconds

  readonly POP_UP_DURATION = 3000;
  readonly POP_UP_DIRECTION = 'bottom';
  readonly POP_UP_GESTTURE_CONFIG_DIRECTION = 'y';

  readonly DEFAULT_APP_LOCALE = 'en-US';

  readonly MAXIMUM_ALLOWED_INVESTMENT_PER_YEAR = '150';

  readonly DEFAULT_APP_LOCALAUDIO_PLAYER_IMAGE =
    'https://images.unsplash.com/photo-1536811145290-bc394643e51e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG90JTIwZ2lybCUyMGRhbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60';
}

export const Constants = new _Constants();
