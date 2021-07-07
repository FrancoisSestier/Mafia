import { Box } from "@chakra-ui/layout";

export default function ToastBox({children, ...props}) {
    return (
        <Box {...props} >{children}</Box>
    )
}
