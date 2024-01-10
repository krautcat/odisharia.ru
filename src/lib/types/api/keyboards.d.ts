export interface SwitchColorsInterface {
  top?: string
  bottom?: string
  stem?: string
  spring?: string
}

export interface SwitchSpringInterface {
  name: string
  weight: number
  type: string
  lube?: string
}

export interface SwitchInterface {
  name: string
  type: string

  top?: string
  bottom?: string
  stem?: string
  spring: SwitchSpringInterface

  switch_film?: string | string[]
  lube?: string

  colors?: SwitchColorsInterface
}

export interface StabilizerLubricationInterface {
  housing?: string
  wire?: string
}

export interface StabilizerInterface {
  name?: string

  housing?: string
  stem?: string
  wire?: string
  length?: number

  lube?: StabilizerLubricationInterface
}

export interface BuildInterface {
  switches: SwitchInterface | SwitchInterface[]
  stabilizers?: StabilizerInteface | StabilizerInterface[]
}

export interface KeyboardInterface {
  name: string
  mount: string
  builds: BuildInterface[]
}
