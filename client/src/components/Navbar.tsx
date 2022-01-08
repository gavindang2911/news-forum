import { gql, Reference } from '@apollo/client';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from '../generated/graphql';
import { DarkModeSwitch } from './DarkModeSwitch';

const Navbar = () => {
  const toast = useToast();
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

          cache.modify({
            fields: {
              posts(existing) {
                existing.paginatedPosts.forEach((post: Reference) => {
                  cache.writeFragment({
                    id: post.__ref, // `Post:17`
                    fragment: gql`
                      fragment VoteType on Post {
                        voteType
                      }
                    `,
                    data: {
                      voteType: 0,
                    },
                  });
                });

                return existing;
              },
            },
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
          <Link p={3}>
            <Text ml={5}>Log In</Text>
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link p={3}>
            <Text ml={5}>Sign Up</Text>
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <NextLink href="/create-post">
          <Link p={3}>
            <Text ml={5}>Create Post</Text>
          </Link>
        </NextLink>
        <Link p={3} onClick={logoutUser} isLoading={useLogoutMutationLoading}>
          <Text ml={5}>Logout</Text>
        </Link>
      </Flex>
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
          <NextLink href="/">
            <Link style={{ textDecoration: 'none' }}>
              <Heading
                fontSize={['3xl', '3xl', '1xl', '2xl', '3xl']}
                alignSelf="center"
                letterSpacing="tight"
              >
                Dev Talk
              </Heading>
            </Link>
          </NextLink>
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
};

export default Navbar;
