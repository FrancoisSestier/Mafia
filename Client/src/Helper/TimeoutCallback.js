import errorHandler from "./ErrorHandler";
import { Box } from "@chakra-ui/layout";


export function defaultTimeoutCallback(onSuccess,toast,timeout = 1000) {
  return timeoutCallback(onSuccess,
      ()=>toast({
          position: "top",
          title: "error",
          description: `server timeout`,
          status: "error",
          duration: 5000,
          isClosable: true,
          /*render: () => (
            <Box color="white" p={3} bg="red.900">
                error
                server timeout
            </Box>
        )*/
      }),timeout);
  }

export function timeoutCallback(onSuccess, onTimeout, timeout = 1000)  {
    let called = false;
  
    const timer = setTimeout(() => {
      if (called) return;
      called = true;
      onTimeout();
    }, timeout);
  
    return (...args) => {
      if (called) return;
      called = true;
      clearTimeout(timer);
      onSuccess.apply(this, args);
    }
  }
