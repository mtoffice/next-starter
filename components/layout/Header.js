import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import dynamic from 'next/dynamic'

const LoginProfil = dynamic(
  () => import('./LoginProfil'),
  { ssr: false,
  loading: () => <Button>Prijava</Button> }
)



const IS_PREVIEW = gql`
  query isPreview {
    isPreview @client
  }
`;


const TOGGLE_PREVIEW = gql`
  mutation TogglePreview($isPreview: Boolean!) {
    togglePreview(isPreview: $isPreview) @client
  }
`;





const Header = () => {

  return(
    <Wrapper>
      <LoginProfil />
      <Query query={IS_PREVIEW}>
        {({ data, loading, client }) => {
          if(loading) return "Odpri"
          return(
            <Mutation mutation={TOGGLE_PREVIEW}>
              {(togglePreview) => {
                return(
                <Button
                  open={data.isPreview}
                  onClick={()=>togglePreview({ 
                    variables: { 
                      isPreview: !data.isPreview,
                    }
                  })}
                >
                  Predogled
                </Button>
              )}}
            </Mutation>
        )}}
      </Query>
    </Wrapper>
  )
}



export const Wrapper = styled.div(props => ({
  borderBottom:"1px #fff solid",
  height:60,
  display:"flex",
  justifyContent:"flex-end",
  alignItems:"center",
  paddingRight:20,
}));


export const Button = styled.div(props => ({
  display:"flex",
  width:props.open ? 0 : 70,
  transition: "0.3s ease-in-out",
  overflow:"hidden",
  flexDirection:"column",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  textDecoration:"underline",
  color:"#4CAF50",
  marginRight:props.open ? 0 : 10,
}));


export default Header