import fs from 'fs'
import R from 'ramda'

const DEFAULT_FILE = ".authoritah.json";

function _read(configFile) {
  try {
    let raw = fs.readFileSync(configFile);
    return JSON.parse(raw);
  } catch(e) {
    //console.warn(`File ${configFile} not found.`);
    return {};
  }
}

function _finalize(config, configFile) {
  const encoded = JSON.stringify(config, null, 2);

  fs.writeFileSync(configFile, encoded);
  return config;
}

export default function configManager(path = DEFAULT_FILE) {
  let config = _read(path);

  const set = (key, value) => {
    config[key] = value;

    _finalize(config, path);
    return value;
  };

  return {
    config,
    set,
    get(key, defaultValue = undefined) {
      return R.defaultTo(defaultValue, config[key]);
    },

    gets(...keymap) {
      return R.pick(keymap, config);
    },

    orGet(key, primaryValue) {
      return R.defaultTo(config[key], primaryValue);
    },

    getsd(defaultMap) {
      return R.mergeWith(R.defaultTo, defaultMap, R.pick(R.keys(defaultMap), config));
    },

    print() {
      for(let key in config){
        console.log(`${key}=${config[key]}`);
      }
    },

    sets(obj) {
      config = R.merge(config, obj);
      return _finalize(config, path);
    },

    getset(key, defaultValue) {
      let value = config[key];
      if(R.isNil(value)) { value = set(key, defaultValue); }

      return value;
    },

    remove(...keys) {
      keys.forEach(key => {
        delete config[key];
      });

      return _finalize(config, path);
    }
  }
}
