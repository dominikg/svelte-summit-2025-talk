<script lang="ts">
  import type { BackgroundProps } from '$lib/slide'

  import { Canvas } from '@threlte/core'

  import { createDirectionCalculator } from '$lib/direction.svelte'
  import { SeededRandom } from '$lib/random'

  import Blocks from './Blocks.svelte'

  let { currentSlideIndex, code, dark: explicitDark, h1, h2 }: BackgroundProps = $props()

  const NO_OF_BLOCKS = 20
  const BLOCK_SIZE = 0.37

  const getDirection = createDirectionCalculator(() => currentSlideIndex)
  const direction = $derived(getDirection.current)

  let dark = $derived(!!(code || explicitDark))
  let random = $derived(
    // Predictable randomness.
    // Use the slide contents to seed the generator,
    // ensuring that each slide will always get the
    // same sequence of random numbers.
    new SeededRandom([currentSlideIndex, h1 ?? '', h2 ?? '', code ?? ''].join('')),
  )
</script>

<div class="background">
  <div class="canvas">
    <Canvas>
      <Blocks rows={NO_OF_BLOCKS} blockSize={BLOCK_SIZE} {direction} {random} {dark} />
    </Canvas>
  </div>
</div>

<style>
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--background);
    transition: background 0.7s ease-in;
  }

  .canvas {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
</style>
