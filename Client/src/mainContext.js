import React, { useState } from 'react'

export const MainContext = React.createContext()

const MainProvider = ({ children }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [mainUser, setMainUser] = useState({ready:false})
    const [game,setGame] = useState()


    return (
        <MainContext.Provider value={{ name, room, mainUser,game,setGame, setMainUser, setName, setRoom }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainProvider 