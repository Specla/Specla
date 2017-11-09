import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import Autoloader from '@specla/autoloader'
import Config from '@specla/config'

/**
 * Load and setup the .env file from the project root
 * @private
 */
function setupDotEnv () {
  if (!fs.existsSync(path.resolve(process.cwd(), '.env'))) {
    return
  }

  dotenv.config()
}

/**
 * Load configfiles from the config path and merge it with the current config
 * @private
 */
function loadConfigFiles (config) {
  if (!config.get('specla.config.path')) {
    return
  }

  if (!fs.existsSync(path.resolve(config.get('specla.config.path')))) {
    return
  }

  const configs = new Autoloader(
    path.resolve(config.get('specla.config.path'))
  )

  for (const key in configs) {
    if (typeof configs[key] === 'object' && configs[key].__esModule) {
      configs[key] = configs[key].default
    }
  }

  return Object.assign({}, configs)
}

export default function configure (...configs) {
  const config = new Config(Object.assign({}, ...configs))
  setupDotEnv()
  config.merge(loadConfigFiles(config))
  return config
}