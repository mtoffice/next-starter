import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'
import PostUpvoter from './PostUpvoter'

export const ALL_POSTS_QUERY = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`
export const allPostsQueryVars = {
  skip: 0,
  first: 10,
}

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      variables: allPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: allPosts.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
        })
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading && !loadingMorePosts) return <Wrapper>Loading</Wrapper>

  const { allPosts, _allPostsMeta } = data
  const areMorePosts = allPosts.length < _allPostsMeta.count

  return (
    <Section>
      <List>
        {allPosts.map((post, index) => (
          <Item key={post.id}>
            <Wrapper>
              <Span>{index + 1}. </Span>
              <Link href={post.url}>{post.title}</Link>
              <PostUpvoter id={post.id} votes={post.votes} />
            </Wrapper>
          </Item>
        ))}
      </List>
      {areMorePosts && (
        <Button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </Button>
      )}
    </Section>
  )
}

const Section = styled.section(props => ({
  paddingBottom: "20px",
}))

const Item = styled.li(props => ({
  display: "block",
  marginBottom: "10px",
}))

const Wrapper = styled.div(props => ({
  alignItems: "center",
  display: "flex",
}))

const Link = styled.a(props => ({
  fontSize: "14px",
  marginRight: "10px",
  textDecoration: "none",
  paddingBottom: 0,
  border: 0,
}))

const Span = styled.span(props => ({
  fontSize: "14px",
  marginRight: "5px",
}))

const List = styled.div(props => ({
  margin: 0,
  padding: 0,
}))

const Button = styled.button(props => ({
  ":before": {
    alignSelf: "center",
    borderStyle: "solid",
    borderWidth: "6px 4px 0 4px",
    borderColor: "#ffffff transparent transparent transparent",
    content: '',
    height: 0,
    marginRight: "5px",
    width: 0,
  }
}))
