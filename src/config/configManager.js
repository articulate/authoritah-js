import fs from 'fs'
import { defaultTo, pick, partial, map, keys, mergeWith, isNil } from 'ramda'

const DEFAULT_FILE = ".authoritah.json";

function _read(configFile) {
  try {
    let raw = fs.readFileSync(configFile);
    return JSON.parse(raw);
  } catch(e) {
    console.warn(`File ${configFile} not found.`);
    return {};
  }
}

function _finalize(config, configFile) {
  const encoded = JSON.stringify(config, null, 2);

  fs.writeFileSync(configFile, encoded);
  return config;
}

function get(config, key, defaultValue = undefined) {
  return defaultTo(defaultValue, config[key]);
}

function gets(config, ...keymap) {
  return pick(keymap, config);
}

function orGet(config, key, primaryValue) {
  return defaultTo(config[key], primaryValue);
}

function getsd(config, defaultMap) {
  return mergeWith(defaultTo, defaultMap, pick(keys(defaultMap), config));
}

function print(config) {
  for(let key in config){
    console.log(`${key}=${config[key]}`);
  }
}

export default function configManager(path = DEFAULT_FILE) {
  let config = _read(path);

  function set(key, value) {
    config[key] = value;

    _finalize(config, path);
    return value;
  }

  function getset(key, defaultValue) {
    let value = config[key];
    if(isNil(value)) { value = set(key, defaultValue); }

    return value;
  }

  function remove(...keys) {
    keys.forEach(key => {
      delete config[key];
    });

    return _finalize(config, path);
  }


  return {
    config,
    set,
    remove,
    getset,
    get: partial(get, [config]),
    gets: partial(gets, [config]),
    getsd: partial(getsd, [config]),
    orGet: partial(orGet, [config]),
    print: partial(print, [config]),
  }
}
