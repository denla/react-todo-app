import React, {useState} from 'react'
import { BsCheck2 } from 'react-icons/bs';


export const Checkbox = ({isCompleted, changeChecked, id}) => {
  return (
    <div className={`checkbox ${isCompleted ? 'checkbox_active' : ''}`} onClick={() => changeChecked(id)}>
        {isCompleted && (<BsCheck2 size={16} />)}
    </div>
  )
}
