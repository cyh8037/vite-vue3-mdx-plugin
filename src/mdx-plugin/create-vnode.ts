/**
 * @see https://github.com/mdx-js/mdx/blob/v2.0.0-next.9/packages/react/src/create-element.js
 */
import {
  defineComponent,
  createVNode,
  VNodeTypes,
  VNode,
  PropType,
  Fragment,
} from 'vue'
import { CompnentsType, useMDXComponents } from './context'

const TYPE_PROP_NAME = 'mdxType'
const DEFAULTS: any = {
  inlineCode: 'code',
  wrapper: defineComponent({
    name: 'defaultComponent',
    setup(props, { slots }) {
      return () => {
        return createVNode(Fragment, {}, slots.default && slots.default())
      }
    },
  }),
}

const CreateMDXComponent = defineComponent({
  name: 'CreateMDXComponent',
  props: {
    components: {
      type: Object as PropType<CompnentsType>,
      default: () => { },
    },
    originalType: String as PropType<VNodeTypes>,
    mdxType: {
      type: String,
      required: true
    },
    parentName: String,
  },
  setup(props, { slots }) {
    const componentsRef = useMDXComponents(() => props.components)

    return () => {
      const { originalType, mdxType, parentName, ...etc } = props
      const components = componentsRef.value
      console.log(mdxType, components)
      const Component =
        components[`${parentName}.${mdxType}`] ||
        components[mdxType] ||
        DEFAULTS[mdxType] ||
        originalType

      console.log('!!!!', Component)

      return createVNode(
        Component,
        { ...etc },
        slots.default && slots.default()
      )
    }
  },
})

export default function mdx(
  type: VNodeTypes,
  props: any,
  children: unknown,
  patchFlag?: number,
  dynamicProps?: string[] | null,
  isBlockNode?: boolean
): VNode {
  let component = type
  let newProps = props

  const mdxType = props && props.mdxType
  if (typeof type === 'string' || mdxType) {
    component = CreateMDXComponent
    newProps = {}
    for (let key in props) {
      /* istanbul ignore else - folks putting stuff in `prototype`. */
      if (Object.hasOwnProperty.call(props, key)) {
        newProps[key] = props[key]
      }
    }

    console.log('!!', props)

    newProps.originalType = type
    newProps[TYPE_PROP_NAME] = typeof type === 'string' ? type : mdxType
  }
  return createVNode(
    component,
    newProps,
    children,
    patchFlag,
    dynamicProps,
    isBlockNode
  )
}
