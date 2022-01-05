// import { Box, Flex, Heading } from '@chakra-ui/react'
// import React from 'react'

// const Navbar = () => {
//     return (
//         <Box bg='tan' p={4}>
//             <Flex maxW={800} justifyContent='space-between'>
//                 <Heading>Reddit</Heading>
//                 <Box>Login/Register/Logout</Box>

//             </Flex>
//         </Box>
//     )
// }

// export default Navbar

import React, { useState } from 'react';
import {
  Flex,
  Text,
  Divider,
  Avatar,
  Heading,
  Menu,
  Link,
  MenuButton,
  Icon,
  MenuList,
  Box,
} from '@chakra-ui/react';
import { DarkModeSwitch } from './DarkModeSwitch';
import NextLink from 'next/link';

// import Link from 'next/link'

export default function Sidebar() {
  const [navSize, changeNavSize] = useState('large');
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 5px 20px 0 rgba(0, 0, 0, 0.5)"
      borderRadius={navSize == 'small' ? '15px' : '30px'}
      w={navSize == 'small' ? '75px' : '200px'}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <DarkModeSwitch />

        {/* <NavItem navSize={navSize} title="Dashboard" description="This is the description for the dashboard." /> */}
        <Flex
          mt={30}
          flexDir="column"
          w="100%"
          alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        >
          <NextLink href="/">
            <Link p={3} borderRadius={8}>
              <Text ml={5} display={navSize == 'small' ? 'none' : 'flex'}>
                New Feed
              </Text>
            </Link>
          </NextLink>
          <NextLink href="/login">
            <Link p={3} borderRadius={8}>
              <Text ml={5} display={navSize == 'small' ? 'none' : 'flex'}>
                Login
              </Text>
            </Link>
          </NextLink>
          <NextLink href="/register">
            <Link p={3} borderRadius={8}>
              <Text ml={5} display={navSize == 'small' ? 'none' : 'flex'}>
                Register
              </Text>
            </Link>
          </NextLink>
        </Flex>
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize == 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Heading as="h3" size="sm">
              Sylwia Weller
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
