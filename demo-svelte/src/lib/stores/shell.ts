import { writable } from "svelte/store"
import type { ShellToSvelteCallback } from "$lib/types/shell"

export type SvelteShellCallbackMap = Map<string, Set<ShellToSvelteCallback>>

export const shellCallbacks = writable<SvelteShellCallbackMap>(new Map())

export const shell = writable(window.Shell)
