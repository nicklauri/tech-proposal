const Urls = {
  root: "/",
  home: {
    root: "/home",
    get info() { return `${this.root}/info`}
  },
} as const

export default Urls
