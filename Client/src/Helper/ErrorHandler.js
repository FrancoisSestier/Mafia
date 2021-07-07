import { useToast } from "@chakra-ui/react"

export default function toastError(error,toast) {
        console.log(error)
        return toast({
            position: "top",
            title: "Error",
            description: error,
            status: "error",
            duration: 5000,
            isClosable: true,
        })
}