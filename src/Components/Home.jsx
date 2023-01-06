import React from 'react';
import { Todo } from './Item/Todo';
import { CreateTodoField } from './Item/CreateTodoField';
import { CreateGroupField } from './Item/CreateGroupField';
import loading from '../assets/UtyaDuck-512px-17.gif';
import nothing from '../assets/UtyaDuck-512px-13.gif';

import {AiOutlineMenu} from 'react-icons/ai'

const data = [
    {
        _id: 1,
        title: 'Finish the essay collaboration',
        isCompleted: true,
        group: 1,
    },
    {
        _id: 2,
        title: 'Read next chapter of the book',
        isCompleted: true,
        group: 2,
    },
    {
        _id: 3,
        title: 'Finish the essay collaboration',
        isCompleted: false,
        group: 1,
    },
    {
        _id: 4,
        title: 'Finish the essay collaboration',
        isCompleted: true,
        group: 1,
    },
    {
        _id: 5,
        title: 'Read next chapter of the book',
        isCompleted: true,
        group: 2,
    },
    {
        _id: 6,
        title: 'Finish the essay collaboration',
        isCompleted: false,
        group: 1,
    },
    {
        _id: 7,
        title: 'Finish the essay collaboration',
        isCompleted: true,
        group: 1,
    },
    {
        _id: 8,
        title: 'Read next chapter of the book',
        isCompleted: true,
        group: 2,
    },
    {
        _id: 9,
        title: 'Finish the essay collaboration',
        isCompleted: false,
        group: 1,
    },
    {
        _id: 10,
        title: 'Finish the essay collaboration',
        isCompleted: true,
        group: 1,
    },
    {
        _id: 11,
        title: 'Read next chapter of the book',
        isCompleted: true,
        group: 2,
    },
    {
        _id: 12,
        title: 'Finish the essay collaboration',
        isCompleted: false,
        group: 1,
    },
];

const tabs = [
    {
        id: 0,
        title: 'Все задачи',
        category: 0,
    },
    {
        id: 1,
        title: 'Музыка',
        category: 1,
    },
    {
        id: 2,
        title: 'Сериалы',
        category: 5,
    },
    {
        id: 3,
        title: 'Фильмы',
        category: 6,
    },
  ];

const badges = [
    {
        id: 0,
        color: 'red',
    },
    {
        id: 1,
        color: 'orange',
    },
    {
        id: 3,
        color: 'yellow',
    },
    {
        id: 4,
        color: 'green',
    },
    {
        id: 5,
        color: 'blue',
    },
    {
        id: 6,
        color: 'purple',
    },
];

export const Home = () => {
    const [todos, setTodos] = React.useState(data);
    const [groups, setGroups] = React.useState(tabs);
    const [activeBadge, setActiveBadge] = React.useState('red');
    const [searchRequest, setSearchRequest] = React.useState('');
    const [theme, setTheme] = React.useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [activeTab, setActiveTab] = React.useState(0);

    const [closeMenu, setCloseMenu] = React.useState(false);


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
        if(title != '') {
            setTodos([...todos, {_id: Math.round(Math.random()*1000000000), title, isCompleted: false, group: activeTab}]);
        }
    }

    const addGroup = (groupTitle) => {
        if(groupTitle != '') {
            setGroups([...groups, {id: Math.round(Math.random()*1000000000), title: groupTitle, category: badges.find(badge => badge.color == activeBadge).id }]);
        }
    }

    const hideMenuMobile = () => {
        if(window.innerWidth < 750) {
            setCloseMenu(true);
        }
    }

  return (
    <div className={`main ${theme && 'dark-mode'}  ${closeMenu && 'closed-mode'}`} >
        
        <div className="left-menu" onClick={hideMenuMobile}>
            {groups.map(tab => <div className={`tab-item ${tab.id == activeTab ? 'tab-active' : ''}`} onClick={() => setActiveTab(tab.id)}><div className={`badge badge-${badges.find(badge => tab.category == badge.id).color }`}></div><p>{tab.title}</p><div className={`${todos.filter(items => items.group == tab.id).length != 0 ? 'counter' : ''}`}>{todos.filter(items => items.group == tab.id).length != 0 ? todos.filter(items => items.group == tab.id).length : ''}</div></div>)}
            <CreateGroupField addGroup={addGroup} setActiveBadge={setActiveBadge} badges={badges} activeBadge={activeBadge} />

            <button className="main-btn" onClick={() => setTheme(!theme)} style={{position: "fixed", bottom: "30px", right: "30px", zIndex: "100"}}>{theme ? 'Светлая тема' : 'Темная тема (BETA)'}</button>
        </div>

        <div className='content'>
            <div className='content__centered'>
                
                <div className='top-menu'>
                    <button className="main-btn btn-secondary" onClick={() => setCloseMenu(!closeMenu)} ><AiOutlineMenu /></button>
                    <input className="search-input" placeholder="Поиск по задачам" onChange={e => {
                        setSearchRequest(e.target.value);
                        console.log(searchRequest);
                    }} />
                </div>

            {searchRequest != 0 && todos.filter(items => items.title.toLowerCase().indexOf(searchRequest.toLowerCase()) > -1) ? 
                <div className='content__title'>
                    <h3>Результаты поиска</h3>
                </div>
            : ''}
            {searchRequest != 0 && todos.filter(items => items.title.toLowerCase().indexOf(searchRequest.toLowerCase()) > -1) ? 
            todos.filter(items => items.title.toLowerCase().indexOf(searchRequest.toLowerCase()) > -1)
            .map(todo => <Todo key={todo._id} todo={todo} changeCheckedState={changeCheckedState} removeTodo={removeTodo} />) : ''}

            <div className='content__title'>
                <h3>{groups.find(tab => tab.id == activeTab).title}</h3>
            </div>
            
            {activeTab == 0 ? todos.map(todo => <Todo key={todo._id} todo={todo} changeCheckedState={changeCheckedState} removeTodo={removeTodo} />) :
            todos.filter(items => items.group == activeTab).length == 0 ? 
                <div className='nothing-alert'>
                    <img src={nothing} width={80} />
                    <p>В этом списке ничего нет</p>
                </div> :
                todos.filter(items => items.group == activeTab).map(todo => <Todo key={todo._id} todo={todo} changeCheckedState={changeCheckedState} removeTodo={removeTodo} />) 
            }
            {activeTab == 0 ? '' : <CreateTodoField addTodo={addTodo} />}
            </div>
        </div>
    </div>

  )
}
