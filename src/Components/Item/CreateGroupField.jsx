import React from 'react'

export const CreateGroupField = ({addGroup}) => {
    const [groupTitle, setGroupTitle] = React.useState('');
    return (
        <div className="addtab-form">
            <input className="addtab-input" placeholder="Type here" onChange={e => setGroupTitle(e.target.value)} value={groupTitle}/>
                <div className="addtab-badges">
                    <div className="badge badge-red badge-active"></div>
                    <div className="badge badge-orange"></div>
                    <div className="badge badge-yellow"></div>
                    <div className="badge badge-green"></div>
                    <div className="badge badge-blue"></div>
                    <div className="badge badge-purple"></div>
                </div>
            <button className="main-btn addtab-btn" onClick={() => {
                addGroup(groupTitle);
                console.log('test')
            }}>Add tab</button>
        </div>
    )
}