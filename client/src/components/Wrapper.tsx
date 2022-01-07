import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type WrapperSize = 'regular' | 'small'

interface IWrapperProps {
	children: ReactNode
	size?: WrapperSize
}

const Wrapper = ({ children, size = 'regular' }: IWrapperProps) => {
	return (
		<Box
		mt={48}
			maxW={size === 'regular' ? undefined : '400px'}

			// w='100%'
			// mt={8}
			mx='auto'

		>
			{children}
		</Box>
	)
}

export default Wrapper
