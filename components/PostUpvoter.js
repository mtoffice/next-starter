import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

const UPDATE_POST_MUTATION = gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      __typename
      id
      votes
    }
  }
`

export default function PostUpvoter({ votes, id }) {
  const [updatePost] = useMutation(UPDATE_POST_MUTATION)

  const upvotePost = () => {
    updatePost({
      variables: {
        id,
        votes: votes + 1,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updatePost: {
          __typename: 'Post',
          id,
          votes: votes + 1,
        },
      },
    })
  }

  return (
    <Button onClick={() => upvotePost()}>
      {votes}
    </Button>
  )
}

const Button = styled.button(props => ({
  backgroundColor: "transparent",
  border: "1px solid #e4e4e4",
  color: "#000",
  ":active": {
    backgroundColor: "transparent",
  },
  ":before"; {
    alignSelf: "center",
    borderColor: "transparent transparent #000000 transparent",
    borderStyle: "solid",
    borderWidth: "0 4px 6px 4px",
    content: '',
    height: 0,
    marginRight: "5px",
    width: 0,
  }
}))
