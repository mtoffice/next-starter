import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { ALL_POSTS_QUERY, allPostsQueryVars } from './PostList'

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $url: String!) {
    createPost(title: $title, url: $url) {
      id
      title
      votes
      url
      createdAt
    }
  }
`

export default function Submit() {
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    const url = formData.get('url')
    form.reset()

    createPost({
      variables: { title, url },
      update: (proxy, { data: { createPost } }) => {
        const data = proxy.readQuery({
          query: ALL_POSTS_QUERY,
          variables: allPostsQueryVars,
        })
        // Update the cache with the new post at the top of the
        proxy.writeQuery({
          query: ALL_POSTS_QUERY,
          data: {
            ...data,
            allPosts: [createPost, ...data.allPosts],
          },
          variables: allPostsQueryVars,
        })
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <Input placeholder="title" name="title" type="text" required />
      <Input placeholder="url" name="url" type="url" required />
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </Form>
  )
}

const Form = styled.form(props => ({
  borderBottom: "1px solid #ececec",
  paddingBottom: "20px",
  marginBottom: "20px",
}))

const Title = styled.h1(props => ({
  fontSize: "20px",
}))

const Input = styled.input(props => ({
  display: "block",
  marginBottom: "10px",
}))
