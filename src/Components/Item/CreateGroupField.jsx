import React from 'react'

export const CreateGroupField = ({addGroup, setActiveBadge, activeBadge, badges}) => {
    const [groupTitle, setGroupTitle] = React.useState('');
    const changeBadge = (color) => {
        setActiveBadge(color);
        console.log(activeBadge);
    }
    return (
        <div className="addtab-form">
            <input className="addtab-input" placeholder="Введите название группы" onChange={e => setGroupTitle(e.target.value)} value={groupTitle}/>
                <div className="addtab-badges">
                    {badges.map(badge => <div className={`badge badge-${badge.color} ${badge.color == activeBadge ? 'badge-active' : ''}`} onClick={() => changeBadge(badge.color)}></div>)}
                </div>
            <button className="main-btn addtab-btn" onClick={() => {
                addGroup(groupTitle);
                setGroupTitle('');
            }}>Добавить</button>
        </div>
    )
}