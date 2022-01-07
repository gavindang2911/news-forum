import { ReactNode } from 'react'
import Sidebar from './Navbar'
import Wrapper from './Wrapper'

interface ILayoutProps {
	children: ReactNode
	wrapperSize?: string
}

const Layout = ({ children, wrapperSize }: ILayoutProps) => {
	return (
		<>
			<Sidebar />
			<Wrapper size={wrapperSize}>{children}</Wrapper>
		</>
	)
}

export default Layout