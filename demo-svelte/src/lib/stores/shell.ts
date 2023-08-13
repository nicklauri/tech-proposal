import { writable } from "svelte/store"
import type { ShellToSvelteCallback } from "$lib/types/shell"
import { LocalDeviceService } from "$lib/services/local-device-service"

export type SvelteShellCallbackMap = Map<string, Set<ShellToSvelteCallback>>

export const shellCallbacks = writable<SvelteShellCallbackMap>(new Map())

export const shell = writable(new LocalDeviceService(null))
