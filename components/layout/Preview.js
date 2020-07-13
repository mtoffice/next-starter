import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import PreviewFooter from './PreviewFooter'
import Link from 'next/link'
import CartItem from "../order/CartItem"


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

const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($id: ID) {
    removeCartItem(id: $id) @client
  }
`;




const Preview = () => {

  return(
    <Query query={IS_PREVIEW}>
      {({ data, loading, client }) => {
        if(loading) return "Odpri"
        return(
          <Wrapper open={data.isPreview}>
            <InnerWrapper open={data.isPreview}>
              <InnerInnerWrapper>
                <Header>
                  <Mutation mutation={TOGGLE_PREVIEW}>
                    {(togglePreview) => {
                      return(
                      <Button
                        onClick={()=>togglePreview({ 
                          variables: { 
                            isPreview: !data.isPreview,
                          }
                        })}
                      >
                        Skrij predogled
                      </Button>
                    )}}
                  </Mutation>
                </Header>
                <Query query={GET_CART_ITEMS}>
                  {({ data, loading, client }) => {
                    if(loading) return null
                    return(
                      <Body>
                        <HowManyWrapper>
                          <Title>Seznam</Title>
                          <HowMany>Št. produktov: {data.cartItems.length}</HowMany>
                        </HowManyWrapper>
                        <CartWrapper>
                          {data.cartItems.map((cartItem, i)=>(
                            <CartItem key={i} cartItem={cartItem} />
                          ))}
                        </CartWrapper>
                        <PreviewFooter />
                      </Body>
                    )
                  }}
                </Query>
                
              </InnerInnerWrapper>

            </InnerWrapper>
          </Wrapper>
        )
      }}
    </Query>
  )
}


export const Wrapper = styled.div(props => ({
  height:"100vh",
  minWidth:props.open ? 340 : 0,
  maxWidth:props.open ? 340 : 0,
  overflow:"hidden",
  transition:"0.3s ease-in-out",
}));
export const InnerWrapper = styled.div(props => ({
  width:340,
  overflowX:"auto",
  position:"fixed",
  height:"100vh",
  top:0,
  right:props.open ? 0 : -340,
  transition:"right 0.3s ease-in-out",
}));


export const InnerInnerWrapper = styled.div(props => ({
  minHeight:340,
  background:"#fff",
  height:"100vh",
  position:"relative",

}));



export const Header = styled.div(props => ({
  background:"#fff",
  height:60,
  display:"flex",
  justifyContent:"flex-end",
  borderBottom:"1px solid #E5E5E5",
  alignItems:"center",
}));


export const Button = styled.a(props => ({
  display:"flex",
  flexDirection:"column",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  userSelect:"none",
  lineHeight: "17px",
  cursor:"pointer",
  textDecoration:"underline",
  color:"#4CAF50",
  marginRight:20,
}));


export const Body = styled.div(props => ({
  paddingBottom:64,
  position:"relative",
  minHeight:"calc(100vh - 125px)",
}));

export const HowManyWrapper = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"10px 20px",
  borderBottom:"1px solid #F1F1F4",
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

export const ItemWrapper = styled.div(props => ({
  display:"flex",
}));
export const ItemImg = styled.img(props => ({
  height:82,
}));
export const ItemDescription = styled.div(props => ({
  marginLeft:10,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px"
}));
export const ItemTitle = styled.div(props => ({
  marginBottom:9,
}));

export const ItemSpec = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px"
}));
export const ItemControls = styled.div(props => ({
  display:"flex",
  justifyContent:"flex-end",
  marginTop:-20,
}));


export const ItemButton = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "14px",
  marginLeft:10,
  cursor:"pointer",
  textDecoration: "underline",
  color:"#4CAF50",
}));

export const AddOns = styled.div(props => ({
  marginTop:30,
}));
export const AddOn = styled.div(props => ({
  marginTop:20,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px"
}));


export default Preview