import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import Sidebar from '../components/Navbar';
import { PostsDocument, usePostsQuery } from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import NextLink from 'next/link';
import Wrapper from '../components/Wrapper';
import Layout from '../components/Layout';
import PostEditDeleteButtons from '../components/PostEditDeleteButtons';

const Index = () => {
  const { data, loading } = usePostsQuery();
  console.log(
    'saasd',
    data?.posts?.map((post) => {
      {
        post.title;
      }
    })
  );
  return (
    <Layout>
      {loading ? (
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner />
        </Flex>
      ) : (
        <Stack mt={40}>
          {data?.posts?.map((post) => (
            <Flex
              key={post.id}
              flexDir="column"
              p={8}
              shadow="md"
              borderWidth="1px"
              // backgroundColor="#121212"
              // color="#fff"
            >
              <Flex flexDir="row">
                <Flex flex={1}>
                  <Avatar my={2} src="" />
                  <Flex flexDir="column" pl={4}>
                    <Text fontSize="2xl">{post.user.username}</Text>
                    <Text fontSize="sm">@{post.user.username}</Text>
                  </Flex>
                </Flex>
                <Text pt={3} as='i'>{post.createdAt.slice(0, 10)}</Text>
              </Flex>
              <Box pt={3}>
                <NextLink href={`/post/${post.id}`}>
                  <Link>
                    <Heading fontSize="xl" color="greenyellow">
                      {post.title}
                    </Heading>
                  </Link>
                </NextLink>

                <Flex align="center">
                  <Text mt={4}>{post.textSnippet}</Text>
                  <Box ml="auto">
                    <PostEditDeleteButtons
										/>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PostsDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
export default Index;
