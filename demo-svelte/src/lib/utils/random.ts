import type { UserInfo } from "$lib/stores/table"
import { faker } from "@faker-js/faker"
import { format } from "date-fns"

export const randomFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)]

export function createRandomUser(): UserInfo {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email().toLowerCase(),
    avatar: faker.image.avatar(),
    birthdate: format(faker.date.birthdate(), "dd.MM.yyyy"),
  }
}

export const createRandomUserList = (amount: number): UserInfo[] =>
  faker.helpers.multiple(createRandomUser, {
    count: amount,
  })
