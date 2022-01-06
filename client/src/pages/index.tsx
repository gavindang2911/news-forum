import { Box, Center, Container, Flex } from '@chakra-ui/react';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import Sidebar from '../components/Navbar';
import { PostsDocument, usePostsQuery } from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import Register from './register';

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
    <>
      {/* <Flex> */}

      <Sidebar />

      <Container bg="blue.500" size="150px">
        {loading ? (
          'Loading'
        ) : (
          <ul>
            {data?.posts?.map((post) => (
              <Box height="370px">
                <li>{post.title}</li>
              </Box>
            ))}
          </ul>
        )}
      </Container>

      {/* <Register /> */}
    </>
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
