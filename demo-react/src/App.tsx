// https://playcode.io/react

import { useCallback, useState } from "react"
import { TodoItemMemo } from "./TodoItem"

export interface TodoItemType {
  id: number,
  done: boolean,
  text: string,
}

export default function App() {
  const [todos, setTodos] = useState<TodoItemType[]>([
		{ id: 1, done: true, text: 'wash the car' },
		{ id: 2, done: false, text: 'take the dog for a walk' },
		{ id: 3, done: false, text: 'mow the lawn' }
	])

  const onClickTodoItem = useCallback((toggled: typeof todos[0]) => {
    setTodos(prev => prev.map((todo) => {
			if (todo === toggled) {
				// return a new object
				return {
					id: todo.id,
					text: todo.text,
					done: !todo.done
				};
			}

			// return the same object
			return todo;
		}))
  }, [])


  return (
    <div className='App'>
      {todos.map(todo => 
        <TodoItemMemo key={todo.id} todo={todo} onClick={onClickTodoItem}/>
      )} 
    </div>
  );
}

