import configManager from '../config/configManager'

export default function loadConfig(options) {
  return Promise.resolve({ config: configManager(), options });
}
