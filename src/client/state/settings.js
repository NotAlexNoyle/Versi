import EventEmitter from 'events';
import appDispatcher from '../dispatcher';

import cons from './cons';

function getSettings() {
  const settings = window.localStorage.getItem('settings');
  if (settings === null) return null;
  return JSON.parse(settings);
}

function setSettings(key, value) {
  let settings = getSettings();
  if (settings === null) settings = {};
  settings[key] = value;
  window.localStorage.setItem('settings', JSON.stringify(settings));
}

class Settings extends EventEmitter {
  constructor() {
    super();

    this.themes = ['', 'silver-theme', 'dark-theme', 'butter-theme', 'nga-theme', 'nga-green-theme', 'troll'];
    this.themeIndex = this.getThemeIndex();
    this.translationIndex = this.getTranslationAPIIndex();
    this.translationLanguage = this.getTranslationLanguage();
    this.translationSelfLanguage = this.getTranslationSelfLanguage();

    this.useSystemTheme = this.getUseSystemTheme();
    this.isMarkdown = this.getIsMarkdown();
    this.hideNavigation = this.getHideNavigation();
    this.isPeopleDrawer = this.getIsPeopleDrawer();
    this.hideMembershipEvents = this.getHideMembershipEvents();
    this.hideNickAvatarEvents = this.getHideNickAvatarEvents();
    this.enableSelfTranslate = this.getEnableSelfTranslate();
    this._showNotifications = this.getShowNotifications();
    this.isNotificationSounds = this.getIsNotificationSounds();
    this.sendReadReceipts = this.getSendReadReceipts();

    this.isTouchScreenDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
  }

  getThemeIndex() {
    if (typeof this.themeIndex === 'number') return this.themeIndex;

    const settings = getSettings();
    if (settings === null) return 0;
    if (typeof settings.themeIndex === 'undefined') return 0;
    // eslint-disable-next-line radix
    return parseInt(settings.themeIndex);
  }

  getTranslationAPIIndex() {
    if (typeof this.translationIndex === 'number') return this.translationIndex;

    const settings = getSettings();
    if (settings === null) return 0;
    if (typeof settings.translationIndex === 'undefined') return 0;
    // eslint-disable-next-line radix
    return parseInt(settings.translationIndex);
  }

  getTranslationLanguage() {
    if (typeof this.translationLanguage === 'string') return this.translationLanguage;

    const settings = getSettings();
    if (settings === null) return 'en';
    if (typeof settings.translationLanguage === 'undefined') return 'en';
    return settings.translationLanguage;
  }

  getTranslationSelfLanguage() {
    if (typeof this.translationSelfLanguage === 'string') return this.translationSelfLanguage;

    const settings = getSettings();
    if (settings === null) return 'en';
    if (typeof settings.translationSelfLanguage === 'undefined') return 'en';
    return settings.translationSelfLanguage;
  }

  getThemeName() {
    return this.themes[this.themeIndex];
  }

  _clearTheme() {
    document.body.classList.remove('system-theme');
    this.themes.forEach((themeName) => {
      if (themeName === '') return;
      document.body.classList.remove(themeName);
    });
  }

  applyTheme() {
    this._clearTheme();
    if (this.useSystemTheme) {
      document.body.classList.add('system-theme');
    } else if (this.themes[this.themeIndex]) {
      document.body.classList.add(this.themes[this.themeIndex]);
    }
  }

  setTheme(themeIndex) {
    this.themeIndex = themeIndex;
    setSettings('themeIndex', this.themeIndex);
    this.applyTheme();
  }

  setTranslationAPI(translationIndex) {
    this.translationIndex = translationIndex;
    setSettings('translationIndex', this.translationIndex);
  }

  setTranslationLanguage(translationLanguage) {
    this.translationLanguage = translationLanguage;
    setSettings('translationLanguage', this.translationLanguage);
  }

  setTranslationSelfLanguage(translationSelfLanguage) {
    this.translationSelfLanguage = translationSelfLanguage;
    setSettings('translationSelfLanguage', this.translationSelfLanguage);
  }

  toggleUseSystemTheme() {
    this.useSystemTheme = !this.useSystemTheme;
    setSettings('useSystemTheme', this.useSystemTheme);
    this.applyTheme();

    this.emit(cons.events.settings.SYSTEM_THEME_TOGGLED, this.useSystemTheme);
  }

  getUseSystemTheme() {
    if (typeof this.useSystemTheme === 'boolean') return this.useSystemTheme;

    const settings = getSettings();
    if (settings === null) return true;
    if (typeof settings.useSystemTheme === 'undefined') return true;
    return settings.useSystemTheme;
  }

  getHideNavigation() {
    if (typeof this.hideNavigation === 'boolean') return this.hideNavigation;

    const settings = getSettings();
    if (settings === null) return false;
    if (typeof settings.hideNavigation === 'undefined') return false;
    return settings.hideNavigation;
  }

  getIsMarkdown() {
    if (typeof this.isMarkdown === 'boolean') return this.isMarkdown;

    const settings = getSettings();
    if (settings === null) return true;
    if (typeof settings.isMarkdown === 'undefined') return true;
    return settings.isMarkdown;
  }

  getHideMembershipEvents() {
    if (typeof this.hideMembershipEvents === 'boolean') return this.hideMembershipEvents;

    const settings = getSettings();
    if (settings === null) return false;
    if (typeof settings.hideMembershipEvents === 'undefined') return false;
    return settings.hideMembershipEvents;
  }

  getHideNickAvatarEvents() {
    if (typeof this.hideNickAvatarEvents === 'boolean') return this.hideNickAvatarEvents;

    const settings = getSettings();
    if (settings === null) return true;
    if (typeof settings.hideNickAvatarEvents === 'undefined') return true;
    return settings.hideNickAvatarEvents;
  }

  getEnableSelfTranslate() {
    if (typeof this.enableSelfTranslate === 'boolean') return this.enableSelfTranslate;

    const settings = getSettings();
    if (settings === null) return false;
    if (typeof settings.enableSelfTranslate === 'undefined') return false;
    return settings.enableSelfTranslate;
  }

  getIsPeopleDrawer() {
    if (typeof this.isPeopleDrawer === 'boolean') return this.isPeopleDrawer;

    const settings = getSettings();
    if (settings === null) return true;
    if (typeof settings.isPeopleDrawer === 'undefined') return true;
    return settings.isPeopleDrawer;
  }

  get showNotifications() {
    if (window.Notification?.permission !== 'granted') return false;
    return this._showNotifications;
  }

  getShowNotifications() {
    if (typeof this._showNotifications === 'boolean') return this._showNotifications;

    const settings = getSettings();
    if (settings === null) return true;
    if (typeof settings.showNotifications === 'undefined') return true;
    return settings.showNotifications;
  }

  getIsNotificationSounds() {
    if (typeof this.isNotificationSounds === 'boolean') return this.isNotificationSounds;

    const settings = getSettings();
    if (settings === null) return true;
    if (typeof settings.isNotificationSounds === 'undefined') return true;
    return settings.isNotificationSounds;
  }

  getSendReadReceipts() {
    if (typeof this.sendReadReceipts === 'boolean') return this.sendReadReceipts;

    const settings = getSettings();
    if (settings === null) return true;
    if (typeof settings.sendReadReceipts === 'undefined') return true;
    return settings.sendReadReceipts;
  }

  setter(action) {
    const actions = {
      [cons.actions.settings.TOGGLE_SYSTEM_THEME]: () => {
        this.toggleUseSystemTheme();
      },
      [cons.actions.settings.TOGGLE_MARKDOWN]: () => {
        this.isMarkdown = !this.isMarkdown;
        setSettings('isMarkdown', this.isMarkdown);
        this.emit(cons.events.settings.MARKDOWN_TOGGLED, this.isMarkdown);
      },
      [cons.actions.settings.TOGGLE_PEOPLE_DRAWER]: () => {
        this.isPeopleDrawer = !this.isPeopleDrawer;
        setSettings('isPeopleDrawer', this.isPeopleDrawer);
        this.emit(cons.events.settings.PEOPLE_DRAWER_TOGGLED, this.isPeopleDrawer);
      },
      [cons.actions.settings.TOGGLE_MEMBERSHIP_EVENT]: () => {
        this.hideMembershipEvents = !this.hideMembershipEvents;
        setSettings('hideMembershipEvents', this.hideMembershipEvents);
        this.emit(cons.events.settings.MEMBERSHIP_EVENTS_TOGGLED, this.hideMembershipEvents);
      },
      [cons.actions.settings.TOGGLE_HIDE_NAVIGATION]: () => {
        this.hideNavigation = !this.hideNavigation;
        setSettings('hideNavigation', this.hideNavigation);
        this.emit(cons.events.settings.HIDE_NAVIGATION_TOGGLED, this.hideNavigation);
      },
      [cons.actions.settings.TOGGLE_NICKAVATAR_EVENT]: () => {
        this.hideNickAvatarEvents = !this.hideNickAvatarEvents;
        setSettings('hideNickAvatarEvents', this.hideNickAvatarEvents);
        this.emit(cons.events.settings.NICKAVATAR_EVENTS_TOGGLED, this.hideNickAvatarEvents);
      },
      [cons.actions.settings.TOGGLE_SELF_TRANSLATE]: () => {
        this.enableSelfTranslate = !this.enableSelfTranslate;
        setSettings('enableSelfTranslate', this.enableSelfTranslate);
        this.emit(cons.events.settings.SELF_TRANSLATE_TOGGLED, this.enableSelfTranslate);
      },
      [cons.actions.settings.TOGGLE_NOTIFICATIONS]: async () => {
        if (window.Notification?.permission !== 'granted') {
          this._showNotifications = false;
        } else {
          this._showNotifications = !this._showNotifications;
        }
        setSettings('showNotifications', this._showNotifications);
        this.emit(cons.events.settings.NOTIFICATIONS_TOGGLED, this._showNotifications);
      },
      [cons.actions.settings.TOGGLE_NOTIFICATION_SOUNDS]: () => {
        this.isNotificationSounds = !this.isNotificationSounds;
        setSettings('isNotificationSounds', this.isNotificationSounds);
        this.emit(cons.events.settings.NOTIFICATION_SOUNDS_TOGGLED, this.isNotificationSounds);
      },
      [cons.actions.settings.TOGGLE_READ_RECEIPTS]: () => {
        this.sendReadReceipts = !this.sendReadReceipts;
        setSettings('sendReadReceipts', this.sendReadReceipts);
        this.emit(cons.events.settings.READ_RECEIPTS_TOGGLED, this.sendReadReceipts);
      },
    };

    actions[action.type]?.();
  }
}

const settings = new Settings();
appDispatcher.register(settings.setter.bind(settings));

export default settings;
