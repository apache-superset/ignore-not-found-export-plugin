const fs = require('fs')
const path = require('path')

const WHITELIST_INTERFACES = [
  'BuildQueryFunction',
  'ChartClientConfig',
  'ChartMetadataConfig',
  'ChartPluginConfig',
  'ChartPropsConfig',
  'ColorSchemeConfig',
  'FormData',
  'PresetConfig',
  'QueryContext',
  'RegistryConfig',
  'RegistryWithDefaultKeyConfig',
  'SequentialSchemeConfig',
  'SupersetClientInterface',
  'TransformPropsFunction',
  'TranslatorConfig',
]

const PATTERN = new RegExp(`export.+'(${WHITELIST_INTERFACES.join('|')})'.+was not found`, 'i')

module.exports = class IgnoreSupersetExportNotFoundWebpackPlugin {
  constructor(isDebugMode) {
    this.isDebugMode = isDebugMode || false
  }

  apply(compiler) {
    const doneHook = (stats) => {
      const lines = []
      // eslint-disable-next-line no-param-reassign
      stats.compilation.warnings = stats.compilation.warnings
        .filter((warn) => {
          if (warn.message) {
            lines.push(JSON.stringify(warn.message))
            return !PATTERN.test(warn.message)
          }
          return true
        })
      if (this.isDebugMode) {
        fs.writeFileSync(path.join(__dirname, 'messages.log'), lines.join('\n'))
      }
    }

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreSupersetExportNotFoundWebpackPlugin', doneHook)
    } else {
      compiler.plugin('done', doneHook)
    }
  }
}
