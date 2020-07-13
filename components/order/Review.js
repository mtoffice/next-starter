import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import CartItem from "./CartItem"
import SignUpIn from '../signUpIn/SignUpIn'

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

const CREATE_ORDER = gql`  
  
  mutation CreateOrder
    (
      $status: String
      $cartItems: [CartItemInput]
      $first_name: String
      $second_name: String
      $phone: String
      $address: String
      $city: String
      $zip_code: String
      $company: String
      $tax_id: String
      $notes: String
      $delivery_method: String
    )
    {
      createOrder
      (
        order: {
          status: $status
          cartItems: $cartItems
          first_name: $first_name
          second_name: $second_name
          phone: $phone
          address: $address
          city: $city
          zip_code: $zip_code
          company: $company
          tax_id: $tax_id
          notes: $notes
          delivery_method: $delivery_method
        }
      )
      {
        id
        status
        cartItems{
          id
          productId
        }
        userId
        email
        first_name
        second_name
        phone
        address
        city
        zip_code
        company
        tax_id
        notes
        delivery_method
        createdAt
      }
    }
`;

const AGREE_TO_PRIVACY_POLICY = gql`
  mutation ToggleAgreeToPrivacyPolicy($agreeToPrivacyPolicy: Boolean) {
    toggleAgreeToPrivacyPolicy(agreeToPrivacyPolicy: $agreeToPrivacyPolicy) @client
  }
`;



class Review extends React.Component {
  state = {
    agree:false,
  }
  render(){

  return(
    <Wrapper>
      <Body>
        <HowManyWrapper>
          <Title>Podatki za dostavo</Title>
        </HowManyWrapper>
        <DeliveryWrapper>
          <FirstWrapper>
            <DeliveryItem>
              {this.props.userData.first_name} {this.props.userData.second_name}
            </DeliveryItem>
            <DeliveryItem>
              {this.props.userData.company}
            </DeliveryItem>
            <DeliveryItem>
              {this.props.userData.address}
            </DeliveryItem>
            <DeliveryItem>
              {this.props.userData.zip_code}, {this.props.userData.city}
            </DeliveryItem>
            <DeliveryItem>
              {this.props.userData.phone}
            </DeliveryItem>
          </FirstWrapper>
          <SecondWrapper>

            <DeliveryItem>
              Dostava: {this.props.userData.delivery_method}
            </DeliveryItem>

            <DeliveryItem>
              Opombe: {this.props.userData.notes}
            </DeliveryItem>
          </SecondWrapper>
        </DeliveryWrapper>
      </Body>
      
      <Body>
        <HowManyWrapper>
          <Title>Košarica</Title>
          <HowMany>Št. produktov: {this.props.cartItems.length}</HowMany>
        </HowManyWrapper>
        <CartWrapper>
          {this.props.cartItems.map((cartItem, i)=>(
            <CartItem review={true} cartItem={cartItem} key={i} />
          ))}
        </CartWrapper>
      </Body>

      <ButtonWrapper>
        <DostavaWrapper
          active={this.state.agree}
        >
          <DostavaImgWrapper onClick={()=>this.setState({agree:!this.state.agree})} active={this.state.agree}>
            <DostavaImg 
              active={this.state.agree} 
              src="../../icons/check.svg"
            />
          </DostavaImgWrapper>
          <DostavaTitle>
            Strinjam se s <A target="_blank" href="https://signaco-frontend.herokuapp.com/pogoji-uporabe">pogoji uporabe</A>
          </DostavaTitle>
        </DostavaWrapper>
        <Mutation mutation={CREATE_ORDER} context={{headers:{token:window.localStorage.getItem("token")}}}>
          {(createOrder, {data, loading, error, client}) => {
            if(error) {
              if(error.message == "GraphQL error: Your session expired. Sign in again."){
                client.writeData({ data: { isLoggedIn: false } })
                return (
                  <SignUpInTrigger tokenExpired={true} />
                );
              } else {
                 return(
                  null
                )
              }
            }
            if(loading){
              return(
                null
              )
            }
            console.log(data)
            if(data !== undefined){
              this.props.router.push("/narocilo/oddaja")
            }
          return(
            <Mutation mutation={AGREE_TO_PRIVACY_POLICY}>
              {(toggleAgreeToPrivacyPolicy) => {
                return(
                  <Button
                     onClick={()=>{
                      if(this.state.agree === true){
                       
                        toggleAgreeToPrivacyPolicy({ 
                          variables: { 
                            agreeToPrivacyPolicy:true
                          }
                        })
                        var object = [...this.props.cartItems]
                        for(var i = 0; i<object.length; i++){
                          delete object[i].__typename
                        }
                        console.log(object)
                        
                        createOrder({
                          variables: {
                            status: "1",
                            cartItems:[...object],
                            first_name: this.props.userData.first_name,
                            second_name: this.props.userData.second_name,
                            phone: this.props.userData.phone,
                            address: this.props.userData.address,
                            city: this.props.userData.city,
                            zip_code: this.props.userData.zip_code,
                            company: this.props.userData.company,
                            tax_id: this.props.userData.tax_id,
                            notes: this.props.userData.notes,
                            delivery_method: this.props.userData.delivery_method,

                          }
                        })

                        var data = {
                          cartItems:[]
                        }
                        window.localStorage.removeItem("cartItems");
                        client.cache.writeQuery({ query: GET_CART_ITEMS, data })
                      } else {
                        alert("Za nadaljevanje se prosim strinjajte s pogoji uporabe")
                      }
                    }}
                  >Oddaj povpraševanje</Button>
              )}}
            </Mutation>
          )}}
        </Mutation>
       </ButtonWrapper>
    </Wrapper>
  )
}}


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


export const DeliveryWrapper = styled.div(props => ({
  display:"flex",
  marginTop:24,
}));
export const FirstWrapper = styled.div(props => ({
  
}));
export const DeliveryItem = styled.div(props => ({
  marginBottom:10,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: 14,
  lineHeight: "17px",
}));
export const SecondWrapper = styled.div(props => ({
  marginLeft:120,
}));

export const ButtonWrapper = styled.div(props => ({
  display:"flex",
  justifyContent:"flex-end",
}));

export const Button = styled.div(props => ({
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
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  marginTop:40,
  marginBottom:40,
  marginLeft:24,
  ":hover":{
    color:"#fff",
    background:"#4CAF50",
  }
}));




export const DostavaWrapper = styled.div(props => ({
  display:"flex",
  userSelect:"none",
  color:"#000",
  justifyContent:"space-between",
  alignItems:"center",
  transition:"0.1s ease-in-out",
}));
export const DostavaTitle = styled.div(props => ({
  color:"#000",
  fontSize: 15,
}));
export const A = styled.a(props => ({
  color:"#000",
}));

export const DostavaImgWrapper = styled.div(props => ({
  border:"2px solid #000",
  cursor:"pointer",
  width:22,
  marginRight:10,
  height:22,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
}));

export const DostavaImg = styled.img(props => ({
  transform:props.active ? "scale(1)":"scale(0)",
  transition:"0.2s ease-in-out",
}));

export default withRouter(Review)