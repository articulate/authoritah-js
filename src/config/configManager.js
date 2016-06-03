import fs from 'fs'

const DEFAULT_FILE = ".authoritah.json";

function _read(configFile) {
  try {
    let raw = fs.readFileSync(configFile);
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`File ${configFile} not found.`);
    return {};
  }
}

function _finalize(data, configFile) {
  const encoded = JSON.stringify(data, null, 2);

  fs.writeFileSync(configFile, encoded);
  return data;
}

export default function configManager(path=DEFAULT_FILE) {
  let config = _read(path);

  return {
    config,

    set(key, value) {
      config[key] = value;

      return _finalize(config, path);
    },

    get(key, defaultValue=undefined) {
      return config[key] || defaultValue;
    },

    remove(...keys) {
      keys.forEach(key => {
        delete config[key];
      });

      return _finalize(config, path);
    },

    print() {
      for(let key in config) {
        console.log(`${key}=${config[key]}`);
      };
    }
  }
}
