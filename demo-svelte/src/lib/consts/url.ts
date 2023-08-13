import type { Route } from "$lib/types/routing"

const Urls = {
  home: {
    name: "Home",
    path: "/",
  } satisfies Route as Route,
  virtualScroll: {
    name: "Virtual scroll",
    path: "/virtual-scroll",
  } satisfies Route as Route,
  // lazyLoading: {
  //   name: "With lazy loading",
  //   path: "/lazy-loading",
  // },
  camera: {
    name: "Camera",
    path: "/camera",
    requireShell: true,
  } satisfies Route as Route,
  shellInfo: {
    name: "Shell info",
    path: "/shell-info",
    requireShell: true,
  } satisfies Route as Route,
  watchFile: {
    name: "Watch file",
    path: "/watch-file",
    requireShell: true,
  } satisfies Route as Route,
}

export default Urls
