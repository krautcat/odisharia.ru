import structuredClone from '@ungap/structured-clone'

import { makeRequest } from '$lib/ts/network'
import type { SwitchColorsInterface } from '$lib/types/api/keyboards'

interface StyleApplicatorInterface {
  selector: string
  property: string
  value: string
}

interface IconFill<ParamsType, ObjectType> {
  fill(params: ParamsType | undefined): Promise<ObjectType>
}

export class Icon {
  _svg: Element

  constructor(svgElement: Element) {
    this._svg = svgElement
  }

  clone(): Icon {
    const new_svg: Element = this._svg.cloneNode(true)
    const new_this: Icon = new Icon(new_svg)
    return new_this
  }

  toString() {
    return new XMLSerializer().serializeToString(this._svg.getRootNode())
  }

  toURIString(): string {
    return 'data:image/svg+xml,'.concat(encodeURIComponent(this.toString()))
  }

  toBase64(): string {
    return btoa(this.toString())
  }

  get svg(): Element {
    return this._svg
  }

  async applyStyle(
    rules: StyleApplicatorInterface[] | StyleApplicatorInterface
  ): Promise<Icon> {
    if (!(rules instanceof Array)) {
      rules = [rules]
    }

    let svgCssText: string = this._svg.getElementsByTagName('style')[0].innerHTML
    const svgCssStyleSheet: CSSStyleSheet = await new CSSStyleSheet().replace(svgCssText)
    for (let i = 0; i < svgCssStyleSheet.cssRules.length; i++) {
      const cssRule = svgCssStyleSheet.cssRules[i]
      for (const r: StyleApplicatorInterface of rules) {
        cssRule.selectorText == r.selector && (cssRule.style[r.property] = r.value)
      }
    }

    svgCssText = ''
    for (let i = 0; i < svgCssStyleSheet.cssRules.length; i++) {
      svgCssText = svgCssText.concat(svgCssStyleSheet.cssRules[i].cssText, ' ')
    }
    this._svg.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'style')[0].innerHTML =
      svgCssText
    return this
  }
}

export class IconSwitch
  extends Icon
  implements IconFill<SwitchColorsInterface, IconSwitch>
{
  clone(): IconSwitch {
    const new_svg: Element = this._svg.cloneNode(true)
    const new_this: IconSwitch = new IconSwitch(new_svg)
    return new_this
  }

  async fill(colors: SwitchColorsInterface | undefined): Promise<IconSwitch> {
    if (colors) {
      const new_this: IconSwitch = this.clone()

      if (colors.top) {
        await new_this.applyStyle({
          selector: '.switch-housing-top',
          property: 'fill',
          value: colors.top
        })
      }
      if (colors.bottom) {
        await new_this.applyStyle({
          selector: '.switch-housing-bottom',
          property: 'fill',
          value: colors.bottom
        })
      }
      if (colors.stem) {
        await new_this.applyStyle({
          selector: '.switch-stem',
          property: 'fill',
          value: colors.stem
        })
      }

      return new_this
    }

    return this
  }
}

export class IconsSwitch {
  #_assembly?: IconSwitch
  #_top?: Icon
  #_bottom?: Icon
  #_stem?: Icon

  #_type: string
  #_subtype?: string

  constructor(switch_type: string, switch_subtype: string | undefined = undefined) {
    this.#_type = switch_type
    switch_subtype && (this.#_subtype = switch_subtype)
  }

  toString(): string {
    return this.assembly().toString()
  }

  toURIString(): string {
    return this.assembly().toURIString()
  }

  async #downloadIcon(urlParts: Array<string>): Promise<Element> {
    let urlString = '/icons/keyboards/switches'
    urlString = [urlString, ...urlParts].join('/').concat('.svg')

    let svgXML: XMLDocument | null
    try {
      const req: XMLHttpRequest = await makeRequest('GET', urlString, {
        headers: { 'Content-Type': 'image/svg+xml' }
      })
      svgXML = req.responseXML
    } catch (error: Error) {
      console.log(`Error makeRequest: ${error.status}, ${error.statusText}`)
    }

    return svgXML.getElementsByTagName('svg')[0]
  }

  async assembly(): Promise<IconSwitch> {
    if (!this.#_assembly) {
      const urlParts: Array<string> = [this.#_type]
      this.#_subtype && urlParts.push(this.#_subtype)
      this.#_assembly = new IconSwitch(await this.#downloadIcon(urlParts))
    }

    return this.#_assembly
  }
}

export class IconsSwitches {
  #icons: Map<string, IconsSwitch>

  constructor() {
    this.#icons = new Map()
  }

  getIcons(switch_type: string, switch_subtype: string | undefined = undefined) {
    const keyArray: Array<string> = [switch_type]
    switch_subtype && keyArray.push(switch_subtype)
    let key: string = keyArray.join('-')
    let icon: IconsSwitch | undefined = this.#icons[key]
    if (!icon) {
      console.log(`Cache miss getting ${key} key`)
      icon = this.#icons[key] = new IconsSwitch(switch_type, switch_subtype)
    }
    return icon
  }
}

export class IconsKeyboardsStore {
  switch_icons: IconsSwitches

  constructor() {
    this.switch_icons = new IconsSwitches()
  }
}
