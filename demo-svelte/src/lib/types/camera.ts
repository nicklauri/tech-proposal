import type { ShellTakePictureAsBytes } from "./shell"

export type CameraData = CameraEmpty | CameraTakePicOnly | CameraTakeAndDisplay

export type CameraEmpty = {
  state: "empty",
}

export type CameraTakePicOnly = {
  state: "picOnly",
  path: string,
}

export type CameraTakeAndDisplay = {
  state: "displayable",
} & ShellTakePictureAsBytes
