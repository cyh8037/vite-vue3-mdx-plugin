import {
  defineComponent,
  PropType,
  VNodeTypes,
  computed,
  provide,
  inject,
} from 'vue'

export type CompnentsType = Record<string, VNodeTypes>

export const contextKey = 'MDX_CONTEXT_KEY'

export const MDXProvider = defineComponent({
  name: 'MDXProvider',
  props: {
    components: {
      required: true,
      type: Object as PropType<CompnentsType>,
    },
  },
  setup(props, { slots }) {
    const componentsRef = computed(() => props.components)
    provide(contextKey, componentsRef)

    return () => slots.default && slots.default()
  },
})

const defaultComponentsRef = computed(() => ({}))
export const useMDXComponents = (getComponents: () => CompnentsType) => {
  const contextComponents = inject(contextKey, defaultComponentsRef)
  const mergeComponentsRef = computed(() => ({
    ...contextComponents.value,
    ...getComponents(),
  }))

  return mergeComponentsRef
}
