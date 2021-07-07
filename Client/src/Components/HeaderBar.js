import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    useColorMode,
    useBreakpointValue
  } from '@chakra-ui/react';
import { VscColorMode } from "react-icons/vsc";
export default function HeaderBar() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box w="100%" p={4}>
        <Flex
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            
            direction={'row'}
            spacing={6}>
            <IconButton
              onClick={toggleColorMode}
              isRound = 'true'
              icon={
                <VscColorMode/>
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
        </Flex>
  
      </Box>
       // <IconButton  size ='md' isRound='true' onClick={toggleColorMode} icon={<VscColorMode />} ></IconButton>
    )
}