import { Box, Center, Container, Flex, Heading, Link, Spinner, Stack, Text } from '@chakra-ui/react';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import Sidebar from '../components/Navbar';
import { PostsDocument, usePostsQuery } from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import NextLink from 'next/link'
import Wrapper from '../components/Wrapper';
import Layout from '../components/Layout';

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
          <Flex justifyContent='center' alignItems='center' minH='100vh'>
          <Spinner />
        </Flex>
        ) : (


          <Stack spacing={40} mt={40}>
					{data?.posts?.map(post => (
						<Flex key={post.id} p={5} shadow='md' borderWidth='1px'>
							<Box flex={1}>
								<NextLink href={`/post/${post.id}`}>
									<Link>
										<Heading fontSize='xl'>{post.title}</Heading>
									</Link>
								</NextLink>
								<Text>posted by User</Text>
								<Flex align='center'>
									<Text mt={4}>{post.text}</Text>
									<Box ml='auto'>
										{/* <PostEditDeleteButtons
											postId={post.id}
											postUserId={post.user.id}
										/> */}
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
