import React, { useEffect } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

const SocketProvider = ({ children }) => {
    const ENDPOINT = 'localhost:5000';
    const socket = io(ENDPOINT, { autoConnect: false, transports: ['websocket', 'polling', 'flashsocket'] })



    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }