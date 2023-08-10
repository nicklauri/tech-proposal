<script lang="ts">
	import TodoItem from '$lib/components/TodoItem.svelte';
  import type { TodoItemType } from '$lib/types/todo';

	let todos: TodoItemType[] = [
		{ id: 1, done: true, text: 'wash the car' },
		{ id: 2, done: false, text: 'take the dog for a walk' },
		{ id: 3, done: false, text: 'mow the lawn' }
	];

	function toggle(toggled: TodoItemType) {
    todos = todos.map((todo) => {
      if (todo === toggled) {
        // return a new object
				return {
          id: todo.id,
					text: todo.text,
					done: !todo.done
				}
			}
      
			// return the same object
			return todo
		})
	}
</script>

<h2>Todos</h2>
<div class="todo-list">
  {#each todos as todo}
    <TodoItem {todo} on:click={() => toggle(todo)} />
  {/each}
</div>

<style>
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 200px;
  }
</style>

