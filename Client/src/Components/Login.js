import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../mainContext'
import { SocketContext } from '../socketContext'
import { Flex, Heading, IconButton, Input } from "@chakra-ui/react"
import { RiArrowRightLine } from "react-icons/ri"
import { useToast, Box } from "@chakra-ui/react"
import { UsersContext } from '../usersContext'
import { defaultTimeoutCallback } from '../Helper/TimeoutCallback'
import toastError from '../Helper/ErrorHandler'
import ToastBox from './ToastBox'

export const Login = () => {
    console.log("Login");
    const socket = useContext(SocketContext)
    const { name, setName, room, setRoom } = useContext(MainContext)
    const navigate = useNavigate()
    const toast = useToast()
    const { setUsers } = useContext(UsersContext)

    function welcomToast() {
        return toast({
            color: "white",
            position: "top",
            title: `Hey There ${name}`,
            description: `Welcome to Lobby : ${room}`,
            status: "success",
            duration: 5000,
            isClosable: true,
            /*render: () => (
                <ToastBox color="white" p={3} bg="green.800">
                    Hey There {name} 
                    <br />
                    Welcome to Lobby : {room}
                </ToastBox>
            )*/
        })
    }

    function goToLobby() {
        navigate("/lobby")
    }

    function clickAction(error) {
        if (error) {
            console.log(error)
            return toastError(error, toast)
        }
        navigate("/lobby")
        return welcomToast();
    }

    //Emits the login event and if successful redirects to chat and saves user data
    function handleClick() {
        socket.emit('login', { name, room }, defaultTimeoutCallback(clickAction, toast));
    }

    return (

        <Flex className='login' flexDirection='column' mb='8'>
            <Heading as="h1" size="4xl" textAlign='center' mb='8' fontFamily='DM Sans' fontWeight='600' letterSpacing='-2px'>Mafia</Heading>
            <Flex className="form" gap='1rem' flexDirection={{ base: "column", md: "row" }}>
                <Input focusBorderColor='red.400' size='md' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} type="text" placeholder='User Name' value={name} onChange={e => setName(e.target.value)} />
                <Input focusBorderColor='red.400' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} type="text" placeholder='Room Name' value={room} onChange={e => setRoom(e.target.value)} />
                <IconButton colorScheme='red' isRound='true' icon={<RiArrowRightLine />} onClick={handleClick}></IconButton>
            </Flex>
        </Flex>
    )
}

