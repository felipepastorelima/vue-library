import authAxios from '@/shared/axios/auth-axios';
import AuthService from '@/modules/auth/auth-service';

export class SettingsService {
  static async fetchAndApply() {
    let settings = null;
    try {
      settings = await this.find();
    } catch (error) {
      AuthService.signout();
      throw error;
    }
    this.applyTheme(settings.theme);
  }

  static async find() {
    const response = await authAxios.get(`/settings`);
    return response.data;
  }

  static async save(settings) {
    const body = {
      settings,
    };

    const response = await authAxios.put(`/settings`, body);
    return response.data;
  }

  static applyTheme(color) {
    const oldLink = document.getElementById('theme-link');

    const link = document.createElement('link');
    link.setAttribute('id', 'theme-link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute(
      'href',
      `${process.env.BASE_URL}theme/${color}.css`,
    );

    if (oldLink) {
      document
        .getElementsByTagName('head')
        .item(0)
        .replaceChild(oldLink, link);
    } else {
      document
        .getElementsByTagName('head')
        .item(0)
        .appendChild(link);
    }
  }
}
