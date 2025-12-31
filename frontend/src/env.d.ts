declare module "*.svg" {
  const content: string;
  export default content;
}


declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // deno-lint-ignore no-explicit-any
  const component: DefineComponent<null, null, any>;
  export default component;
}
