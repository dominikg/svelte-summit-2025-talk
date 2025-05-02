<script lang="ts">
  import type { Slide } from '$lib/slide'

  import Text from './common-components/Text.svelte'
  import Title from './common-components/Title.svelte'

  let { h1, h2, text }: Slide = $props()
</script>

<div class="slide">
  {#if h1 || h2}
    <Title {h1} {h2} />
  {/if}
  {#if text}
    <Text {text} />
  {/if}
</div>

<style>
  .slide :global(h1),
  .slide :global(h2) {
    align-self: flex-start;
    justify-self: flex-start;
  }
  .slide {
    --text-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }
</style>
