import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface IWrapperProps {
    children: ReactNode
}

const Wrapper = (props: IWrapperProps) => {
    return (
        <Box maxWidth='400px' w='100%' mt={8} mx='auto'>
            {props.children}
        </Box>
    )
}

export default Wrapper
