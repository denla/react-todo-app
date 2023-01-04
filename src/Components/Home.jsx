import React from 'react';
import { Todo } from './Item/Todo';
import { CreateTodoField } from './Item/CreateTodoField';
import { CreateGroupField } from './Item/CreateGroupField';

const data = [
    {
        _id: 'sjsjsj',
        title: 'Finish the essay collaboration',
        isCompleted: true,
        group: 1,
    },
    {
        _id: 'jewwk2',
        title: 'Read next chapter of the book',
        isCompleted: true,
        group: 2,
    },
    {
        _id: 'kdmeowpk2',
        title: 'Finish the essay collaboration',
        isCompleted: false,
        group: 1,
    },
];

const tabs = [
    {
        id: 0,
        title: 'Все задачи',
        category: 1,
    },
    {
        id: 1,
        title: 'Музыка',
        category: 1,
    },
    {
        id: 2,
        title: 'Сериалы',
        category: 1,
    },
    {
        id: 3,
        title: 'Фильмы',
        category: 1,
    },
  ];


export const Home = () => {
    const [todos, setTodos] = React.useState(data);
    const [groups, setGroups] = React.useState(tabs);

    const [activeTab, setActiveTab] = React.useState(0);

    const changeCheckedState = (id) => {
      const copy = [...todos];
      const current = copy.find(item => item._id == id);
      console.log(current);
      current.isCompleted = !current.isCompleted;
      setTodos(copy);
    }

    const removeTodo = (id) => {
        const copy = [...todos];
        const current = copy.filter(item => item._id != id);
        setTodos(current);
    }

    const addTodo = (title) => {
        setTodos([...todos, {_id: Math.round(Math.random()*1000000000), title, isCompleted: false, group: activeTab}]);
    }

    const addGroup = (groupTitle) => {
        setGroups([...groups, {id: Math.round(Math.random()*1000000000), title: groupTitle, category: 1}]);
        console.log(groups);
    }



  return (
    <div className='main' >
        
        <div className='left-menu'>
            {groups.map(tab => <div className={`tab-item ${tab.id == activeTab ? 'tab-active' : ''}`} onClick={() => setActiveTab(tab.id)}><div className="badge badge-purple"></div><p>{tab.title}</p><div class="counter">{todos.filter(items => items.group == tab.id).length != 0 ? todos.filter(items => items.group == tab.id).length : ''}</div></div>)}
            <CreateGroupField addGroup={addGroup} />

        </div>

        <div className='content'>
            <div className='content__centered'>
            <div className='content__title'>
                <h3>{groups.find(tab => tab.id == activeTab).title}</h3>
            </div>
            
            {activeTab == 0 ? todos.map(todo => <Todo key={todo._id} todo={todo} changeCheckedState={changeCheckedState} removeTodo={removeTodo} />) :
            todos.filter(items => items.group == activeTab).length == 0 ? <p>В этом списке ничего нет</p> : todos.filter(items => items.group == activeTab).map(todo => <Todo key={todo._id} todo={todo} changeCheckedState={changeCheckedState} removeTodo={removeTodo} />) 
            }
            {activeTab == 0 ? '' : <CreateTodoField addTodo={addTodo} />}
            </div>
        </div>
    </div>

  )
}
