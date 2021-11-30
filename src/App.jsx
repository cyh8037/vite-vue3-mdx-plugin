import { defineComponent } from 'vue'
import Test from './components/test.mdx'
import { MDXProvider } from './mdx-plugin/context'

export default defineComponent({
  setup() {
    return () => <MDXProvider components={{
      p: (props, { slots }) => <h1 {...props}>{slots.default && slots.default()}</h1>
    }}>
      <Test />
    </MDXProvider>
  }
})