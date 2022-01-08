import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';


interface IWrapperProps {
	children: ReactNode
	size?: string
}

const Wrapper = ({ children, size = 'regular' }: IWrapperProps) => {
	let inputFieldSize;
	if (size === 'regular') {
		inputFieldSize = undefined
	} else if (size === 'big') {
		inputFieldSize = '800px'
	} else {
		inputFieldSize = '400px'
	}
	return (
		<Box
		mt={48}
			maxW={inputFieldSize}

			// w='100%'
			// mt={8}
			mx='auto'

		>
			{children}
		</Box>
	)
}

export default Wrapper
