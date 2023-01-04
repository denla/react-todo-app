import React from 'react'
import {AiOutlineDelete} from 'react-icons/ai'

import { Checkbox } from './Checkbox';

export const Todo = ({todo, changeCheckedState, removeTodo}) => {
  return (
    <div className={`todo_item ${todo.isCompleted ? 'completed_task' : ''}`} >
      <Checkbox isCompleted={todo.isCompleted} changeChecked={changeCheckedState} id={todo._id} />{todo.title}<button onClick={() => removeTodo(todo._id)} style={{marginLeft: "auto"}}><AiOutlineDelete /></button></div>
  )
}
