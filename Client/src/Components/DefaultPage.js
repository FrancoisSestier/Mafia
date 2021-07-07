  
import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Redirect, useNavigate } from 'react-router-dom'
export default function DefaultPage() {
    const history = useNavigate()
    const redirect = () => history.push('/')
    return (
        <div>
                console.log("Login");
            <IconButton mr={2} isRound='true' bg='green.300' color='white' icon={<BiArrowBack />} onClick={redirect} /> You're lost. Go home.
        </div>
    )
}