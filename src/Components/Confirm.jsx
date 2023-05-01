import React from 'react'

export const Confirm = ({setModalActive, groupRemove}) => {
  return (
    <div>
        <h3>Вы уверены, что хотите удалить этот список?</h3>
        <div className='modal_bottom-bar'>
            <button className='main-btn' onClick={() => groupRemove()}>Да</button>
            <button className='main-btn btn-secondary' onClick={() => setModalActive(false)}>Нет</button>
        </div>
    </div>
  )
}
