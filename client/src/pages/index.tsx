import { Container } from '@chakra-ui/react'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import Register from './register'


const Index = () => (
  <Container>

    <DarkModeSwitch />
    <Register />
  </Container>
)

export default Index
