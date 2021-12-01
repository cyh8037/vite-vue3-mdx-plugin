import { defineComponent } from 'vue'
import Test from './components/test.mdx'
import { MDXProvider } from './mdx-plugin/context'

export default defineComponent({
  setup() {
    return () => <MDXProvider components={{
      h1: (props, { slots }) => <li {...props}>{slots.default && slots.default()}</li>
    }}>
      <Test />
    </MDXProvider>
  }
})