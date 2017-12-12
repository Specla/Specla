import GeneratorCommand from '../GeneratorCommand'
import Build from './build/Build'
import { config } from '../../'

export default class CreateCommand extends GeneratorCommand {
  static signature = 'create:command'
  static description = 'Create a new command'

  constructor (name) {
    super()
    this.copyTemplate(
      `${config.get('specla.command.path')}/TemplateCommand.js`,
      `${config.get('specla.command.path')}/${name}.js`
    )
    new Build(`${config.get('specla.command.path')}/${name}.js`)
  }
}
