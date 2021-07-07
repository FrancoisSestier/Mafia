import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login'
import { SocketProvider } from './socketContext'
import MainProvider from './mainContext'
import HeaderBar from './Components/HeaderBar'
import './App.css'
import {
  ChakraProvider,
  Heading,
  extendTheme,
  Flex
} from "@chakra-ui/react";
import Lobby from './Components/Lobby'

import { UsersProvider } from './usersContext'
import DefaultPage from './Components/DefaultPage'
import { SessionRouter } from './Components/SessionRouter'
import { mode } from "@chakra-ui/theme-tools"
import {Game} from "./Components/Game"

const theme = extendTheme({
  /*
  styles: {
    global: (props) => ({
      body: {
        color: mode("gray.800", "white")(props)
      },
    }),
  },
  colors: {
    gray: {
      800: "#151719"
    },
    red: {
      200: "#410a08"
    }
  },
  */
  config: {
    
    initialColorMode: "dark"
  }
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <Flex className="App" flexDirection='column'>
              <HeaderBar />
              <Flex className="body" flexGrow="1" justifyContent="center" align="center">
                <BrowserRouter>
                  <SessionRouter />
                  <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/lobby' element={<Lobby />} />
                    <Route path='/game' element={<Game/>} />
                    <Route component={<DefaultPage />} />
                  </Routes>
                </BrowserRouter>
              </Flex>
            </Flex>
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    </ChakraProvider>
  );
}

export default App;
