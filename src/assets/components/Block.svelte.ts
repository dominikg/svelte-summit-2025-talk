import { tweened } from 'svelte/motion'
import { fromStore } from 'svelte/store'

import { SeededRandom } from '$lib/random'

const BRIGHT = { saturation: 100, lightness: 60 } as const
const DULL = { saturation: 80, lightness: 25 } as const

interface Props {
  row: number
  column: number
  totalColumns: number
  x: number
  y: number
  getAnimationDirection: () => number
  getDarkMode: () => boolean
  getRandom: () => SeededRandom
}

export class Block {
  // All the tweened stores which drive the animation.
  #tweenedValues = {
    z: tweened(0),
    rotation: tweened(0, { duration: 150 }),
    saturation: tweened(0),
    lightness: tweened(10),
    lightIntensity: tweened(0),
  }

  row = $state(0)
  column = $state(0)
  #totalColumns = $state(0)

  #x: number
  #y: number
  #z = fromStore(this.#tweenedValues.z)
  #rotation = fromStore(this.#tweenedValues.rotation)

  #saturation = fromStore(this.#tweenedValues.saturation)
  #lightness = fromStore(this.#tweenedValues.lightness)
  #colour = $derived(
    'hsl(81,' + [`${this.#saturation.current}%`, `${this.#lightness.current}%`].join(',') + ')',
  )
  #lightIntensity = fromStore(this.#tweenedValues.lightIntensity)

  #getAnimationDirection = () => 1
  #getDarkMode = () => false
  #getRandom = () => new SeededRandom(0)

  // Use the current animation direction to
  // figure out when each cube should rotate.
  #offset = $derived(
    this.#getAnimationDirection() > 0 ? this.#totalColumns - this.column : this.column,
  )
  // And add a bit of (predictable) randomness for the vibes.
  #delay = $derived(this.#getRandom().numberBetween(0, 25) + 15 * this.#offset)

  constructor({
    row,
    column,
    totalColumns,
    x,
    y,
    getAnimationDirection,
    getRandom,
    getDarkMode,
  }: Props) {
    this.row = row
    this.column = column
    this.#totalColumns = totalColumns
    this.#x = x
    this.#y = y
    this.#getRandom = getRandom
    this.#getDarkMode = getDarkMode
    this.#getAnimationDirection = getAnimationDirection
  }

  // Accessors allow Svelte to always get the
  // latest value of our reactive properties.

  get position() {
    return [this.#x, this.#y, this.#z.current] as [number, number, number]
  }

  get rotation() {
    return this.#rotation.current
  }

  get colour() {
    return this.#colour
  }

  get lightIntensity() {
    return this.#lightIntensity.current
  }

  extrude(value: number) {
    this.#tweenedValues.z.set(value, { delay: this.#delay })
  }

  setColour(highlight: boolean) {
    // The random generator is basically a react hook (fml). If you call
    // it a different number of times you're going to going to get different
    // values. This is obvious when you think about it, but it is also annoying.
    const extrudeBy = this.#getRandom().numberBetween(0.03, 0.07)

    if (highlight) {
      this.extrude(extrudeBy)

      const dark = this.#getDarkMode()
      const intensity = dark ? 2 : 5
      const { saturation, lightness } = dark ? DULL : BRIGHT

      this.#tweenedValues.saturation.set(saturation, { delay: this.#delay })
      this.#tweenedValues.lightness.set(lightness, { delay: this.#delay })
      this.#tweenedValues.lightIntensity.set(intensity, { delay: this.#delay })
    } else {
      this.extrude(0)
      this.#tweenedValues.saturation.set(0, { delay: this.#delay })
      this.#tweenedValues.lightness.set(10, { delay: this.#delay })
      this.#tweenedValues.lightIntensity.set(0, { delay: this.#delay })
    }
  }

  rotate() {
    this.#tweenedValues.rotation.update(
      // THREE.js rotates in radians, which resulted in
      // some very funky animations until I figured it out.
      (rotation) => rotation - 1.5708 * this.#getAnimationDirection(),
      { delay: this.#delay },
    )
  }
}
