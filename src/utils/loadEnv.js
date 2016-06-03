import configManager from '../config/configManager'
import say from './say'

export default function loadEnv(options) {
  return Promise.resolve({ config: configManager(), options, say: say(options) });
}
