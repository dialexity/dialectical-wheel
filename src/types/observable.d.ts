declare module '@observablehq/runtime' {
  export class Runtime {
    constructor(builtins?: any, global?: (name: any) => any);
    module(notebook: any, observer?: (name: string) => any): any;
    dispose(): void;
  }

  export class Inspector {
    constructor(element: HTMLElement);
    fulfilled(value: any): void;
    rejected(error: Error): void;
    pending(): void;
  }
}

declare module '@dialexity/dialectical-wheel' {
  const defineModule: {
    default: any;
    __esModule: boolean;
  };
  export default defineModule;
} 

declare module '@observablehq/inputs' {
  export function toggle(config?: any): HTMLElement;
}