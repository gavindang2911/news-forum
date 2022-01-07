import { ReactNode } from 'react'
import Sidebar from './Navbar'
import Wrapper from './Wrapper'

interface ILayoutProps {
	children: ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
	return (
		<>
			<Sidebar />
			<Wrapper>{children}</Wrapper>
		</>
	)
}

export default Layout