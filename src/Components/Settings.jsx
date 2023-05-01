import React from 'react'

export const Settings = ({theme, setTheme}) => {
  return (
    <>
    <div>Settings</div>
    <button className="main-btn btn-secondary" onClick={() => setTheme(!theme)} >{theme ? 'Светлая тема' : 'Темная тема (BETA)'}</button>
    </>
  )
}
