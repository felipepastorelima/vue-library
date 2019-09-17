import Vue from 'vue';
import Element from 'element-ui';
import { getElementUILanguage } from '@/i18n';

Vue.use(Element, { locale: getElementUILanguage() });
