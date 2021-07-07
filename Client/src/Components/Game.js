import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../mainContext'
import { SocketContext } from '../socketContext'
import { Flex, Heading, Box, Input } from "@chakra-ui/react"
import { UsersContext } from '../usersContext'


export const Game = () => {
    const socket = useContext(SocketContext)
    const { game } = useContext(MainContext)
    const navigate = useNavigate()
    const { setUsers } = useContext(UsersContext)

    useEffect(() => {
    }, [])

    return (

        <Flex className='game' height="100%" grow={1} flexDirection='column' mb='8'>
            <Heading as="h1" size="4xl" textAlign='center' mb='8' fontFamily='DM Sans' fontWeight='600' letterSpacing='-2px'>Mafia</Heading>
            <Flex className="form" gap='5rem' height="85%" flexDirection="row">
                <Box marginLeft = "10" marginRight = "2" height="100%" width="60%" grow={1} bg="red.800">t</Box>
                <Box marginRight = "10" height="100%" width="30%" grow={1} bg="yellow.800">t</Box>
            </Flex>
        </Flex>
    )
}

