import React from 'react'
import {Todo} from './Todo'

const todos = [
    {
        title: 'Finish the essay collaboration',
        isCompleted: false,
    },
    {
        title: 'Read next chapter of the book',
        isCompleted: false,
    },
    {
        title: 'Finish the essay collaboration',
        isCompleted: false,
    },
]

export const Home = () => {
  return (
    <div>Home</div>
    {todos.map(todo => <div>{todo.title}</div>)}
  )
}
