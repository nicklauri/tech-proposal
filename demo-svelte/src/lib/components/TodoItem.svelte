<svelte:options immutable={true} />

<script lang="ts">
	import { afterUpdate } from 'svelte'
	import flash from '$lib/utils/flash'
  import type { TodoItemType } from '$lib/types/todo'

	export let todo: TodoItemType

	let button: HTMLButtonElement

	afterUpdate(() => {
		flash(button)
	})
</script>

<!-- the text will flash red whenever the `todo` object changes -->
<button bind:this={button} type="button" on:click>
	{todo.done ? '👍' : ''}
	{todo.text}
</button>

<style>
	button {
		/* all: unset; */
		display: block;
		cursor: pointer;
		line-height: 1.5;
    outline: 1px solid hsl(0 0% 90%);
    padding: 3px 5px;
    font-family: Inter;
    font-size: inherit;
	}
</style>
