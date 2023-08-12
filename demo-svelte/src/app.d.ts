// See https://kit.svelte.dev/docs/types#app

import type { SvelteComponent_1 } from "svelte"

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  namespace svelteHTML {
    interface HTMLAttributes<HTMLInputElement> {
      datepicker?: ""
    }
  }
}

export {}
