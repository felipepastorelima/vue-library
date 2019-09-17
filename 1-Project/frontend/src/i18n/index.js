import _get from 'lodash/get';
import moment from 'moment';
import 'moment/locale/pt-br';
import { setLocale as setYupLocale } from 'yup';
import ptBR from '@/i18n/pt-BR';
import en from '@/i18n/en';
import elementUIEn from 'element-ui/lib/locale/lang/en';
import elementUIPtBR from 'element-ui/lib/locale/lang/pt-br';

let currentLanguageCode = null;

const languages = {
  en: {
    id: 'en',
    label: 'en',
    flag: '/images/flags/24/United-States.png',
    dictionary: en,
    elementUI: elementUIEn,
  },
  'pt-BR': {
    id: 'pt-BR',
    label: 'pt-BR',
    flag: '/images/flags/24/Brazil.png',
    dictionary: ptBR,
    elementUI: elementUIPtBR,
  },
};

function init() {
  currentLanguageCode =
    localStorage.getItem('language') || 'en';
  setLanguageCode(currentLanguageCode);
}

function getLanguage() {
  return languages[getLanguageCode()];
}

function format(message, args) {
  if (!message) {
    return null;
  }

  try {
    return message.replace(/{(\d+)}/g, function(
      match,
      number,
    ) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
  } catch (error) {
    console.error(message, error);
    throw error;
  }
}

export function getLanguages() {
  return Object.keys(languages).map((language) => {
    return languages[language];
  });
}

export function getElementUILanguage() {
  return getLanguage().elementUI;
}

export function getLanguageCode() {
  if (!currentLanguageCode) {
    init();
  }

  return currentLanguageCode;
}

export function setLanguageCode(arg) {
  if (!languages[arg]) {
    throw new Error(`Invalid language ${arg}.`);
  }

  moment.locale(arg);
  localStorage.setItem('language', arg);

  if (getLanguage().dictionary.validation) {
    setYupLocale(getLanguage().dictionary.validation);
  }
}

export function i18nExists(key) {
  const message = _get(getLanguage().dictionary, key);
  return !!message;
}

export function i18n(key, ...args) {
  const message = _get(getLanguage().dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
}
