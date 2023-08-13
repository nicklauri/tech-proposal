import { createRandomUserList } from "$lib/utils/random"
import { writable } from "svelte/store"

export type UserInfo = {
  userId: string
  username: string
  email: string
  avatar: string
  birthdate: string
}

type Cols = Exclude<keyof UserInfo, "userId">

export const UserColumns: { [k in Cols]: { name: k; title: string; width: string } } = {
  // userId: {
  //   name: "userId",
  //   title: "User ID",
  // },
  avatar: {
    name: "avatar",
    title: "Avatar",
    width: "100px",
  },
  username: {
    name: "username",
    title: "Username",
    width: "300px",
  },
  email: {
    name: "email",
    title: "Email",
    width: "300px",
  },
  birthdate: {
    name: "birthdate",
    title: "Birthdate",
    width: "100px",
  },
}

const createVirtualScrollListStore = () => {
  const { subscribe, set, update } = writable<UserInfo[]>([])

  return {
    subscribe,
    loadMore(amount: number) {
      update((list) => list.concat(createRandomUserList(amount)))
    },
  }
}

export const virtualScrollList = createVirtualScrollListStore()
