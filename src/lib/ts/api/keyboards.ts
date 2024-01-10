import type {
  KeyboardInterface,
  BuildInterface,
  StabilizerInterface,
  StabilizerLubricationInterface,
  SwitchInterface,
  SwitchColorsInterface,
  SwitchSpringInterface
} from '$lib/types/api/keyboards'

export class SwitchColors implements SwitchColorsInterface {
  top?: string
  bottom?: string
  stem?: string
  spring?: string

  constructor(colors: SwitchColorsInterface) {
    'top' in colors && (this.top = colors.top)
    'bottom' in colors && (this.bottom = colors.bottom)
    'stem' in colors && (this.stem = colors.stem)
    'spring' in colors && (this.spring = colors.spring)
  }
}

class SwitchSpring implements SwitchSpringInterface {
  name: string
  weight: number
  type: string
  lube?: string

  constructor(spring: SwitchSpringInterface) {
    this.name = spring.name
    this.weight = spring.weight
    this.type = spring.type
    'lube' in spring && (this.lube = spring.lube)
  }

  get info(): string {
    let info: string = this.name.charAt(0).toUpperCase().concat(this.name.slice(1))

    info = info.concat(' (', this.weight.toString(), ' g')

    this.type != 'regular' && (info = info.concat(', ', this.type))
    this.lube && (info = info.concat(', lubed with ', this.lube))

    info = info.concat(')')

    return info
  }
}

export class Switch implements SwitchInterface {
  name: string
  type: string

  top?: string
  bottom?: string
  stem?: string
  spring: SwitchSpring

  switch_film?: string | string[]
  lube?: string

  colors?: SwitchColorsInterface

  constructor(switch_: SwitchInterface) {
    this.name = switch_.name
    this.type = switch_.type

    'top' in switch_ && (this.top = switch_.top)
    'bottom' in switch_ && (this.bottom = switch_.bottom)
    'stem' in switch_ && (this.stem = switch_.stem)

    this.spring = new SwitchSpring(switch_.spring)

    'switch_film' in switch_ && (this.switch_film = switch_.switch_film)
    'lube' in switch_ && (this.lube = switch_.lube)

    'colors' in switch_ && (this.colors = new SwitchColors(switch_.colors))
  }

  get info_with_lube(): string {
    let info: string = this.name
    this.lube && (info = info.concat(' lubed with ', this.lube))
    return info
  }

  get full_name(): string {
    let full_name: string = this.name.split(' ').join('_')

    this.top && (full_name = full_name.concat('_', this.top.split(' ').join('_')))
    this.bottom && (full_name = full_name.concat('_', this.bottom.split(' ').join('_')))
    this.stem && (full_name = full_name.concat('_', this.stem.split(' ').join('_')))

    return full_name
  }
}

class StabilizerLubrication implements StabilizerLubricationInterface {
  housing?: string
  wire?: string

  constructor(lube: StabilizerLubricationInterface) {
    'housing' in lube && (this.housing = lube.housing)
    'wire' in lube && (this.wire = lube.wire)
  }
}

class Stabilizer implements StabilizerInterface {
  name?: string

  housing?: string
  stem?: string
  wire?: string
  length?: number

  lube?: StabilizerLubricationInterface

  constructor(stabilizer: StabilizerInterface) {
    'name' in stabilizer && (this.name = stabilizer.name)

    'housing' in stabilizer && (this.housing = stabilizer.housing)
    'stem' in stabilizer && (this.stem = stabilizer.stem)
    'wire' in stabilizer && (this.wire = stabilizer.wire)
    'length' in stabilizer && (this.length = stabilizer.length)

    'lube' in stabilizer && (this.lube = new StabilizerLubrication(stabilizer.lube))
  }
}

class Build implements BuildInterface {
  switches: SwitchInterface | SwitchInterface[]
  stabilizers?: StabilizerInterface | StabilizerInterface[]

  constructor(build: BuildInterface) {
    this.switches =
      build.switches instanceof Array
        ? build.switches.map((switch_: SwitchInterface) => {
            return new Switch(switch_)
          })
        : new Switch(build.switches)
    if ('stabilizers' in build) {
      this.stabilizers =
        build.stabilizers instanceof Array
          ? build.stabilizers.map((stabilizer: StabilizerInterface) => {
              return new Stabilizer(stabilizer)
            })
          : new Stabilizer(build.stabilizers)
    }
  }
}

export class Keyboard implements KeyboardInterface {
  name: string
  mount: string
  builds: BuildInterface[]

  constructor(keyboard: KeyboardInterface) {
    this.name = keyboard.name
    this.mount = keyboard.mount
    this.builds = keyboard.builds.map((build: BuildInterface) => {
      return new Build(build)
    })
  }

  toString(): string {
    return JSON.stringify(this, null, '\t')
  }
}

export interface ApiResponseInterface {
  total: number
  per_page: number
  data: KeyboardInterface[]

  toString(): string
}

export interface ErrorResponseInterface {
  error: string

  toString(): string
}

export class ApiResponse implements ApiResponseInterface {
  total: number
  per_page: number
  data: KeyboardInterface[]

  constructor(response: ApiResponseInterface) {
    this.total = response.total
    this.per_page = response.per_page
    this.data = response.data.map((value: KeyboardInterface) => {
      return new Keyboard(value)
    })
  }

  get items_on_page(): number {
    return this.data.length
  }

  get items(): Keyboard[] {
    return this.data
  }

  toString(): string {
    return JSON.stringify(this, undefined, '\t')
  }
}

export class ErrorResponse implements ErrorResponseInterface {
  error: string

  constructor(error_message: string) {
    this.error = error_message
  }

  toString(): string {
    return this.error
  }
}

export async function loadKeyboards(page: number): Promise<ApiResponse | ErrorResponse> {
  const errorResponse = new ErrorResponse('Load data from external API error')

  let apiResponse: Response
  try {
    apiResponse = await fetch(
      `http://127.0.0.1:4000/keyboards`.concat(page ? `?page=${page}` : '')
    )
  } catch (error: any) {
    console.error(`Error: API returned error`)
    return errorResponse
  }

  let apiResponseObject: ApiResponse | ErrorResponse = errorResponse
  try {
    apiResponseObject = new ApiResponse(await apiResponse.json())
  } catch (error: any) {
    console.error(`Error while awaiting JSON object from API: ${error.message}`)
  }

  return apiResponseObject
}
