// TODO: log methods
export const shellLog = (...msg: any[]) => {
  console.log(`%cSHELL%c`, `border: 2px solid cyan; padding: 2px 3px;border-radius:4px;`, `all:unset`, ...msg)
}
