import React from 'react'

export const CreateTodoField = ({addTodo}) => {
    const [title, setTitle] = React.useState('');
    return (
        <div class="addtask-form">
             <input placeholder={'Type here a task and press enter'} onChange={e => setTitle(e.target.value)} value={title} onKeyUp={e => {if(e.keyCode == 13) {
             addTodo(title);
             setTitle('');
                }
            }} />
        </div>
    )
}
