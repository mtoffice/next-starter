import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import gql from "graphql-tag";
import { Query, Mutation } from 'react-apollo';

const HeaderDropdown = dynamic(
  () => import('./orders/popups/HeaderDropdown'),
  { ssr: false}
)

const GET_IS_SUCCESS_POPUP = gql`
  query SuccessPopup @Client {
    successPopup {
      show
      error
    }
  }
`;


const Header = () => {

  return(
    <Wrapper>
      <Link href="/">
        <LogoWrapper>
          <Logo alt="signaco logo" src="../../../icons/signacoLogo.png" />
        </LogoWrapper>
      </Link>
      <Query query={GET_IS_SUCCESS_POPUP}>
        {({data, loading}) => {
          if (data) {
            if (data.successPopup.show) {
              if (data.successPopup.error) {
                return (
                    <SuccessPopup error={true}>Prišlo je do napake, posodobitev ni uspela!</SuccessPopup>
                )
              } else {
                return (
                    <SuccessPopup error={false}>Posodobitev je uspela!</SuccessPopup>
                )
              }

            }

          }
          return null
        }}
      </Query>
      <HeaderDropdown />
    </Wrapper>
  )
}

const SuccessPopup = styled.div(props => ({
  width: "100%",
  color: "white",
  background: props.error ? "red" : "#4CAF50",
  top:60,
  left:0,
  zIndex:-1,
  height: 50,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  textAlign: "center",
  fontSize: "16px",
  position:"fixed",
}));

export const Wrapper = styled.div(props => ({
  borderBottom:"1px #4CAF50 solid",
  height:60,
  width:"100%",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  position:"relative",
  zIndex:10,
}));

export const InnerWrapper = styled.div(props => ({
  flexGrow:2,
  display:"flex",
}));

export const DropDownWrapper = styled.div(props => ({
  
}));

export const Spacing = styled.div(props => ({
  width:420,
}));



export const Button = styled.a(props => ({
  display:"flex",
  transition: "0.3s ease-in-out",
  flexDirection:"column",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  textDecoration:"underline",
  color:"#4CAF50",
  marginRight:30,
}));


export const LogoWrapper = styled.div(props => ({
  height:60,
  width: 126,
  display:"flex",
  alignItems:"center",
}));
export const Logo = styled.img(props => ({
  height:36,
  marginLeft:24,
  cursor:"pointer",
}));

export default (Header)