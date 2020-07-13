import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import CartItem from "./CartItem"
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


const ADD_CART_ITEM = gql`
  mutation AddCartItem($cartItem: CartItem) {
    addCartItem(cartItem: $cartItem) @client
  }
`;



const Cart = () => {

  return(
    <Wrapper>
      <Query query={GET_CART_ITEMS}>
        {({ data, loading, client }) => {
          if(loading) return null
          var data2 = data;
          return(
            <Body>
              <HowManyWrapper>
                <Title>Seznam</Title>
                <HowMany>Št. produktov: {data.cartItems.length}</HowMany>
              </HowManyWrapper>
              <CartWrapper>
                <Mutation mutation={ADD_CART_ITEM}>
                  {(addCartItem, { data, loading, error }) => {
                    console.log(data);
                    return(
                      data2.cartItems.map((cartItem, i)=>(
                        <CartItem addCartItem={addCartItem} key={i} cartItem={cartItem} cartPage={true} />
                      ))
                    )}
                  }
                </Mutation>
              </CartWrapper>
              {(data2.cartItems.length > 0) ?
                <Link href="/narocilo/dostava">
                  <Button>Potrdi in nadaljuj</Button>
                </Link>
                :
                <Link href="/">
                  <Button>Nazaj</Button>
                </Link>
              }
            </Body>
          )
        }}
      </Query>
    </Wrapper>
  )
}


export const Wrapper = styled.div(props => ({
  width:"100%",
}));




export const Body = styled.div(props => ({
  
}));

export const HowManyWrapper = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  borderBottom:"1px solid #F1F1F4",
  marginTop:44,
  paddingBottom:10,
}));

export const Title = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "14px",
  lineHeight: "17px"
}));

export const HowMany = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px"
}));

export const CartWrapper = styled.div(props => ({
  
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
  width:140,
  height:36,
  justifyContent:"center",
  alignItems:"center",
  float:"right",
  marginTop:40,
  marginBottom:40,
  ":hover":{
    color:"#fff",
    background:"#4CAF50",
  }
}));



export default Cart