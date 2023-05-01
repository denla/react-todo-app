import React from 'react';
import { Todo } from './Item/Todo';
import { CreateTodoField } from './Item/CreateTodoField';
import { CreateGroupField } from './Item/CreateGroupField';
import loading from '../assets/UtyaDuck-512px-17.gif';
import nothing from '../assets/UtyaDuck-512px-13.gif';

import { Modal } from './Modal';
import { Settings } from './Settings';

import {AiOutlineMenu, AiOutlineSetting} from 'react-icons/ai'
import {AiOutlineDelete} from 'react-icons/ai'
import { Confirm } from './Confirm';

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
        title: 'Drink tea',
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
        title: 'Do homework',
        isCompleted: false,
        group: 1,
    },
    {
        _id: 10,
        title: 'Drink tea',
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

    const [modalActive, setModalActive] = React.useState(false);
    const [modalContent, setModalContent] = React.useState('');

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

    const openModal = (content) => {
        setModalActive(true);
        setModalContent(content);
    }

    const groupRemove = () => {

            const id = groups.find(tab => tab.id == activeTab).id;
            const todos_prev = [...todos];
            const todos_upd = todos_prev.filter(items => items.group != id);
            setTodos(todos_upd);

            const copy = [...groups];
            const current = copy.filter(group => group.id != id);
            setGroups(current);
            setActiveTab(0);
            setModalActive(false);
    }

  return (
    <div className={`main ${theme && 'dark-mode'}  ${closeMenu && 'closed-mode'}`} >
        <Modal content={modalContent} isActive={modalActive} setModalActive={setModalActive} />
        <div className="left-menu">
            {groups.map(tab => <div className={`tab-item ${tab.id == activeTab ? 'tab-active' : ''}`} onClick={() => {setActiveTab(tab.id); hideMenuMobile()}}><div className={`badge badge-${badges.find(badge => tab.category == badge.id).color }`}></div><p>{tab.title}</p><div className={`${todos.filter(items => items.group == tab.id).length != 0 ? 'counter' : ''}`}>{todos.filter(items => items.group == tab.id).length != 0 ? todos.filter(items => items.group == tab.id).length : ''}</div></div>)}
            <CreateGroupField addGroup={addGroup} setActiveBadge={setActiveBadge} badges={badges} activeBadge={activeBadge} />
            <button className='main-btn btn-secondary btn-square' onClick={() => openModal(<Settings theme={theme} setTheme={setTheme} />)}><AiOutlineSetting /></button>
        </div>

        <div className='content'>
            <div className='content__centered'>
                
                <div className='top-menu'>
                    <button className="main-btn btn-secondary btn-square" onClick={() => setCloseMenu(!closeMenu)} ><AiOutlineMenu /></button>
                    <input className="search-input" placeholder="Поиск по задачам" onChange={e => {
                        setSearchRequest(e.target.value);
                    }} value={searchRequest} />
                </div>
            {searchRequest.length !== 0 ? todos.filter(items => items.title.toLowerCase().indexOf(searchRequest.toLowerCase()) > -1).length !== 0 ? 
                <div className='content__title'>
                    <h3>Результаты поиска</h3>
                </div>
            : <div className='nothing-alert ihherit' >
                <img src={nothing} width={80} />
                <p>По запросу "{searchRequest}" ничего не найдено</p>
                <button className='main-btn btn-secondary' onClick={() => setSearchRequest('')}>ОК</button>
            </div>
            : ''
                }

            {searchRequest.length > 0 && todos.filter(items => items.title.toLowerCase().indexOf(searchRequest.toLowerCase()) > -1) ? 
            todos.filter(items => items.title.toLowerCase().indexOf(searchRequest.toLowerCase()) > -1)
            .map(todo => <Todo key={todo._id} todo={todo} changeCheckedState={changeCheckedState} removeTodo={removeTodo} />) : ''}

            <div className='content__title'>
                <h3>{groups.find(tab => tab.id == activeTab).title}</h3>
                {activeTab !== 0 && <button className="main-btn btn-secondary btn-square" onClick={ () =>       openModal(<Confirm setModalActive={setModalActive} groupRemove={groupRemove} />)} ><AiOutlineDelete /></button>}
            </div>
            
            {activeTab == 0 ? todos.map(todo => <Todo key={todo._id} todo={todo} changeCheckedState={changeCheckedState} removeTodo={removeTodo} />) :
            todos.filter(items => items.group == activeTab).length == 0 ? 
                <div className='nothing-alert'>
                    <img src={nothing} width={80} />
                    <p>В этом списке ничего нет</p>
                    <button className='main-btn btn-secondary' onClick={() => setActiveTab(0)}>Ко всем задачам</button>
                </div> :
                todos.filter(items => items.group == activeTab).map(todo => <Todo key={todo._id} todo={todo} changeCheckedState={changeCheckedState} removeTodo={removeTodo} />) 
            }
            {activeTab == 0 ? '' : <CreateTodoField addTodo={addTodo} />}
            </div>
        </div>
    </div>

  )
}
