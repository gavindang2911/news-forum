import { NetworkStatus } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import PostEditDeleteButtons from '../components/PostEditDeleteButtons';
import { PostsDocument, usePostsQuery } from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';

const limit = 3;

const Index = () => {
  const { data, loading, fetchMore, networkStatus } = usePostsQuery({
    variables: { limit },

    // component nao render boi cai Posts query, se rerender khi networkStatus thay doi, tuc la fetchMore
    notifyOnNetworkStatusChange: true,
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const loadMorePosts = () =>
    fetchMore({ variables: { cursor: data?.posts?.cursor } });
  return (
    <Layout>
      {loading && !loadingMorePosts ? (
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner />
        </Flex>
      ) : (
        <Stack mt={40}>
          {data?.posts?.paginatedPosts.map((post) => (
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
                <Text pt={3} as="i">
                  {post.createdAt.slice(0, 10)}
                </Text>
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
                    <PostEditDeleteButtons />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data?.posts?.hasMore && (
        <Flex>
          <Button
            m="auto"
            my={8}
            isLoading={loadingMorePosts}
            onClick={loadMorePosts}
          >
            {loadingMorePosts ? 'Loading' : 'Show more'}
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PostsDocument,
    variables: {
      limit,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
export default Index;
