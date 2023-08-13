import { ShellEvent } from "$lib/enums/shell-event"
import { registerShellCallback, unregisterShellCallback } from "$lib/services/shell"
import type { ShellToSvelteCallback } from "$lib/types/shell"
import { writable } from "svelte/store"

function createWatchFileStore() {
  const defaultState = {
    isWatching: false,
    isCurrentFileDeleted: false,
    file: null as string | null,
    content: null as string | null,
  }

  const { subscribe, set, update } = writable({ ...defaultState })

  const updateFileChanged: ShellToSvelteCallback = (data) => {
    update((current) => ({
      ...current,
      isCurrentFileDeleted: false,
      isWatching: true,
      file: data.file,
      content: data.content,
    }))
  }

  const updateFileDeleted: ShellToSvelteCallback = (data) => {
    update((current) => ({
      ...current,
      isCurrentFileDeleted: true,
    }))
  }

  return {
    subscribe,
    reset() {
      set({ ...defaultState })
    },
    async updateState() {
      const isWatching = await Shell.isWatchFileOnAsync()
      update((state) => ({
        ...state,
        isWatching,
      }))
    },
    async startWatching(file: string) {
      registerShellCallback(ShellEvent.FileChanged, updateFileChanged)
      registerShellCallback(ShellEvent.FileDeleted, updateFileDeleted)

      await Shell.startWatchFileAsync(file)
    },
    async stopWatching() {
      await Shell.stopWatchFileAsync()
      unregisterShellCallback(ShellEvent.FileChanged, updateFileChanged)
      unregisterShellCallback(ShellEvent.FileDeleted, updateFileDeleted)

      update((state) => ({ ...state, isWatching: false }))
    },
  }
}

export const watchFile = createWatchFileStore()
