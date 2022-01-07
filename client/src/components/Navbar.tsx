// // import { Box, Flex, Heading } from '@chakra-ui/react'
// // import React from 'react'

// // const Navbar = () => {
// //     return (
// //         <Box bg='tan' p={4}>
// //             <Flex maxW={800} justifyContent='space-between'>
// //                 <Heading>Reddit</Heading>
// //                 <Box>Login/Register/Logout</Box>

// //             </Flex>
// //         </Box>
// //     )
// // }

// // export default Navbar

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
  Button,
  IconButton,
  Container,
  Stack,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { DarkModeSwitch } from './DarkModeSwitch';
import NextLink from 'next/link';
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from '../generated/graphql';
import { HamburgerIcon } from '@chakra-ui/icons';

// import Link from 'next/link'

export default function Sidebar() {
  const toast = useToast();
  const [navSize, changeNavSize] = useState('large');
  const { data, loading: useMeQueryLoading } = useMeQuery();
  const [logout, { loading: useLogoutMutationLoading }] = useLogoutMutation();

  const logoutUser = async () => {
    await logout({
      update(cache, { data }) {
        if (data?.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: null },
          });

          toast({
            title: 'Logout successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      },
    });
  };
  let body;

  if (useMeQueryLoading) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link p={3} borderRadius={8}>
            <Text ml={5}>Log In</Text>
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link p={3} borderRadius={8}>
            <Text ml={5}>Sign Up</Text>
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Button ml={6} onClick={logoutUser} isLoading={useLogoutMutationLoading}>
        Log out
      </Button>
    );
  }
  return (
    <Box
      top="0"
      position="fixed"
      as="nav"
      w="100%"
      css={{ backdropFilter: 'blur(10px)' }}
      // backgroundColor="#020202"
      // color="#fff"
      zIndex={1}
    >
      <Container
        display="flex"
        p={3}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading
            fontSize={['3xl', '3xl', '1xl', '2xl', '3xl']}
            alignSelf="center"
            letterSpacing="tight"
          >
            Dev Talk
          </Heading>
        </Flex>
        <Stack
          display={{ base: 'none', md: 'flex' }}
          direction={{ base: 'column', md: 'row' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={5}
        >
          {body}
        </Stack>
        <DarkModeSwitch />
        <Box flex={1} align="right">
          <Avatar my={2} src="" />

          <Box ml={4} pt={4} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>{body}</MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
