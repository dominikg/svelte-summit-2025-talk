export default {
  async configEnvironment(name, config, opts) {
    if (name === 'some-environment' || config.consumer === 'client') {
      config.resolve ??= {}
      config.resolve.conditions ??= []
      config.resolve.conditions.push('my-condition')
    }
  },
}
