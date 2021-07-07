import React, { useContext, useEffect, useState } from "react"
import { MainContext } from "../mainContext"
import { SocketContext } from "../socketContext"
import { UsersContext } from "../usersContext"
import { Flex, List, ListItem, Text, toast, useToast } from '@chakra-ui/react'
import { defaultTimeoutCallback } from './../Helper/TimeoutCallback'
import toastError from "../Helper/ErrorHandler"
import { useNavigate } from "react-router"
import { Box, Heading } from "@chakra-ui/layout"
import { IconButton, Button, ButtonGroup, Spacer, Divider } from "@chakra-ui/react"
import {
    VStack, StackDivider, HStack, Tag
} from "@chakra-ui/react"
import { Table, Tbody, Td, Tr } from "@chakra-ui/react"
import { ArrowBackIcon, TimeIcon, CheckIcon,NotAllowedIcon,ArrowForwardIcon } from '@chakra-ui/icons'
import { RiArrowLeftLine } from "react-icons/ri"
import {    MicrophoneStreamer } from "./MicrophoneStreamer"
import { VscCircleFilled } from "react-icons/vsc"


export default function Lobby() {
    const { mainUser, name, room} = useContext(MainContext)
    const socket = useContext(SocketContext)
    const { users, setUsers } = useContext(UsersContext)
    const navigate = useNavigate();
    const toast = useToast();
    function init(error) {
        if (error) {
            return toastError(error)
        }

    };

    useEffect(() => {
        //socket.emit("getStatus", { name, room }, defaultTimeoutCallback(init, toast));
    })

    const onLeave = () => {
        socket.emit("leave-lobby")
        navigate("/")

    }

    const onReady = () => 
    {
        socket.emit("toogle-ready")

    }

    const onStart = () => 
    {
        socket.emit("start-game")
    }

    return (
        <Flex justifyContent="center" align="center" minWidth="33%" minHeight="33%" className='lobby' flexDirection='column'>


            <VStack className="other" align="center" justify="center" flexDirection="column" height="100%" spacing="1rem">
                <Heading margin="2px" as="h1" size="4xl" textAlign='center' mb='8' fontFamily='DM Sans' fontWeight='600'>{room}</Heading>



                <Table size="sm">
                    <Tbody>
                        {users.map(user => (
                            <Tr>
                                <Td>
                                    <Text>{user.username}</Text>
                                </Td>
                                <Td>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="red"
                                        aria-label="Send email"
                                        icon={<NotAllowedIcon />}
                                        isRound ="true"
                                    />
                                </Td>
                                <Td>
                                    {user.ready?<CheckIcon color="green.500" />:<TimeIcon color="gray.500" />}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <ButtonGroup align="center" spacing="20" >
                    <IconButton colorScheme='red' onClick={onLeave} isRound ="true" icon={<ArrowBackIcon />}/> 
                    <IconButton variant={!mainUser.ready ? 'solid' : 'outline'} isRound = "true" colorScheme={'green'} icon={<CheckIcon />} onClick={onReady}/>
                    <IconButton isDisabled={users.some(user => !user.ready)} colorScheme='green' onClick={onStart} isRound ="true" icon={<ArrowForwardIcon />}/>
                </ButtonGroup>
            </VStack>
            <MicrophoneStreamer/>                
        </Flex>
    )
}