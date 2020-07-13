import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import Link from 'next/link'


const GET_CART_ITEMS = gql`
  query CartItems {
    cartItems @client{
      id
      productId
      number
      type
      dimensions
      barLength
      barDiameter
      barMaterial
      complementary
      file
      text
      textComplementary
      clamp
      addOns
    } 
  }
`;





const Success = () => {

  return(
    <Wrapper>
      <Query query={GET_CART_ITEMS}>
        {({ data, loading, client }) => {
          if(loading) return null
          console.log(data);
          return(
            <React.Fragment>
              <Header>
                <Title>Uspešno ste oddali povpraševanje</Title>
              </Header>
              <SuccessWrapper>
                <Paragraph>
                  Hvala za vaše naročilo v Signacovem spletnem naročevalniku. Po e-pošti boste prejeli potrditev naročila, v kolikor katerega od izdelkov nimamo na zalogi, vas bomo o tem nemudoma obvestili. 
                </Paragraph>
                <Paragraph>
                  Št. naročila: <b>15951</b>
                </Paragraph>
                <Paragraph>
                  V kolikor ste registrirani kot uporabnik lahko status naročila spremljate preko <Link href="/uporabnik/narocila"><U>uporabniških strani.</U></Link>
                </Paragraph>
              </SuccessWrapper>
              <ButtonWrapper>
                <Link href="/uporabnik/narocila">
                  <Button>uporabniške strani</Button>
                </Link>
              </ButtonWrapper>
              <Header>
                <Title>Dokumenti</Title>
              </Header>
            </React.Fragment>
          )
        }}
      </Query>
      
    </Wrapper>
  )
}


export const Wrapper = styled.div(props => ({
  width:"100%",
}));





export const SuccessWrapper = styled.div(props => ({
  maxWidth:800,
}));
export const Paragraph = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "23px",
  marginBottom:24,
}));
export const U = styled.u(props => ({
  cursor:"pointer",
}));




export const Header = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  borderBottom:"1px solid #F1F1F4",
  marginTop:44,
  paddingBottom:10,
  marginBottom:24,
}));

export const Title = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "14px",
  lineHeight: "17px"
}));



export const ButtonWrapper = styled.div(props => ({
  display:"flex",
  justifyContent:"flex-end",
}));

export const Button = styled.div(props => ({
  display:"flex",
  transition: "0.1s ease-in-out",
  overflow:"hidden",
  flexDirection:"column",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  background:"#fff",
  cursor:"pointer",
  textDecoration:"none",
  color:"#4CAF50",
  border:"2px solid #4CAF50",
  width:160,
  height:36,
  justifyContent:"center",
  alignItems:"center",
  marginTop:40,
  ":hover":{
    color:"#fff",
    background:"#4CAF50",
  }
}));



export default Success