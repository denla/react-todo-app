import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export const Modal = ({content, isActive, setModalActive}) => {
  return (
    <div className={`overlay ${isActive ? 'opened_modal' : ''}`}>
        <div className='modal' ><button className="main-btn btn-secondary btn-square" onClick={() => setModalActive(false)} style={{position: "absolute",
        right: "20px",
        top: "20px",
        width: "38px"}}><AiOutlineClose /></button>
            {content}</div>
    </div>
  )
}
