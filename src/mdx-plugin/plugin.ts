import { Plugin } from 'vite'
import { createCompiler } from '@mdx-js/mdx'
import { createFilter, FilterPattern } from '@rollup/pluginutils'

interface Options {
  includes?: FilterPattern
  excludes?: FilterPattern
}

/**@see https://github.com/mdx-js/mdx/blob/v2.0.0-next.9/packages/mdx/index.js */
const renderer = `
import { mdx } from 'vue3-mdx'`

const pragma = `/* @jsxRuntime classic */
/* @jsx mdx */`

export default function MdxPlugin(options: Options = {}): Plugin {
  return {
    name: 'mdx-plugin',
    transform(code, id) {
      const { includes = /\.mdx/, excludes } = options

      const filter = createFilter(includes, excludes)
      if (filter(id)) {
        const compiler = createCompiler()
        const res = compiler.processSync(code)
        return {
          code: `${renderer}${pragma}${res.contents}`,
        }
      }
    },
  }
}
