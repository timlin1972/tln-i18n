const i18next = require('i18next');

const MODULE_NAME = 'i18n';

const DEF_LOGGER = null;
const DEF_LNG = 'en';
const DEF_DEBUG = false;
const DEF_RESOURCES = null;

const DEF_CONFIGS = {
  logger: DEF_LOGGER,
  lng: DEF_LNG,
  debug: DEF_DEBUG,
  resources: DEF_RESOURCES,
}

class I18n {
  constructor(configs=DEF_CONFIGS) {
    this.logger = configs.logger || DEF_LOGGER;
    this.lng = configs.lng || DEF_LNG;
    this.debug = configs.debug || DEF_DEBUG;
    this.resources = configs.resources || DEF_RESOURCES;

    this.log('info', 'Initialized');
  }

  start = () => new Promise((resolve) => {
    const configs = {
      lng: this.lng,
      debug: this.debug,
      resources: this.resources,
      fallbackLng: DEF_LNG,
    };

    i18next.init(configs)
      .then(() => resolve(null));
  });

  t = (...args) => i18next.t(...args);

  log = (level=DEF_LEVEL, msg) => 
    this.logger ? 
      this.logger.log(MODULE_NAME, level, msg) :
      console.log(`${level}: [${MODULE_NAME}] ${msg}`);

  toString = () => `[${MODULE_NAME}]\n\
    \tlogger: ${this.logger ? 'yes' : 'no'}\n\
    \tlng: ${this.lng}\n\
    \tdebug: ${this.debug}\n\
    \tresources: ${this.resources ? 'yes' : 'no'}\n\
    `;
}

module.exports = I18n;

