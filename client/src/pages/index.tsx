import { NetworkStatus } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';
import Layout from '../components/Layout';
import PostEditDeleteButtons from '../components/PostEditDeleteButtons';
import Sidebar from '../components/Sidebar';
import UpvoteSection from '../components/UpvoteSection';
import { PostsDocument, useMeQuery, usePostsQuery } from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';

const limit = 3;

const Index = () => {
  const { data, loading, fetchMore, networkStatus } = usePostsQuery({
    variables: { limit },

    // component nao render boi cai Posts query, se rerender khi networkStatus thay doi, tuc la fetchMore
    notifyOnNetworkStatusChange: true,
  });

  const { data: useMeData, loading: _useMeQueryLoading } = useMeQuery();

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
        <SimpleGrid columns={[1, 2, 3]} w="100%">
          <Box>{useMeData?.me ? <Sidebar /> : <></>}</Box>

          <Stack>
            {data?.posts?.paginatedPosts.map((post) => (
              <Flex
                key={post.id}
                flexDir="column"
                p={6}
                // shadow="md"
                boxShadow={'2xl'}
                borderWidth="1px"
              >
                <Flex flexDir="row">
                  <UpvoteSection post={post} />

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
                <Box pt={3} pl={14}>
                  <NextLink href={`/post/${post.id}`}>
                    <Link>
                      <Heading fontSize="xl">
                        {post.title}
                      </Heading>
                    </Link>
                  </NextLink>

                  <Flex align="center">
                    <Text mt={4}>
                      {post.textSnippet.length > 70 ? (
                        <>{post.textSnippet}. . . .</>
                      ) : (
                        <>{post.textSnippet}</>
                      )}
                    </Text>
                    <Box ml="auto">
                      <PostEditDeleteButtons
                        postId={post.id}
                        postUserId={post.user.id}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            ))}
          </Stack>
          <Box></Box>
        </SimpleGrid>
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo({ headers: context.req.headers });

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
