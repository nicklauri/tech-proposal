import { memo, useState } from "react"
import { TodoItemType } from "./App"

interface TodoItemProps {
  todo: TodoItemType,
  onClick: (item: TodoItemType) => void,
}

function TodoItem(props: TodoItemProps) {
  console.log(`rendered: id=`, props.todo.id)
  return (<button onClick={() => props.onClick(props.todo)}>
    {props.todo.done ? '👍' : ''}
	  {props.todo.text}
  </button>)
}

export const TodoItemMemo = memo(TodoItem)

