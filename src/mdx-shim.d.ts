declare module '@mdx-js/mdx' {
  type CreateCompiler = (...args: any) => any

  export const createCompiler: CreateCompiler
}
