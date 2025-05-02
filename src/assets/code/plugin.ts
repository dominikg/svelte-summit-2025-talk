import type { Plugin } from 'vite'

export function myPlugin(): Plugin {
  return {
    name: 'my-plugin',
    config(config) {
      /*modify the config*/
    },
    resolveId(id) {
      /*resolve files*/
    },
    transform(src, id) {
      /*transform them*/
    },
  }
}
