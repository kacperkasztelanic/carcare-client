const config = {
  VERSION: '1.2.3'
};

export default config;

export const SERVER_API_URL = process.env.SERVER_API_URL;

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error'
};

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT_ALWAYS = '0,0.00';

export const APP_COMPACT_DETAILS_LENGTH = 50;

export const APP_COLOR_GREEN = '#28A745';
export const APP_COLOR_BLUE = '#007BFF';
export const APP_COLOR_CYAN = '#17A2B8';
export const APP_COLOR_YELLOW = '#FFC107';
export const APP_COLOR_RED = '#DC3545';
