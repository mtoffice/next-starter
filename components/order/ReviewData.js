import React from "react";
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import Review from "./Review"
import { BlockReserveLoading } from 'react-loadingg';
import styled from 'styled-components'


const GET_CART_ITEMS = gql`
  query CartItems {
    cartItems @client{
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


const GET_DELIVERY_INFO = gql`
  query DeliveryInfo {
    deliveryInfo @client {
      first_name
      second_name
      company
      tax_id
      address
      city
      zip_code
      phone
      notes
      delivery_method
      
    }
  }
`;

const ME = gql`
  query Me {
    me {
      id
      username
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
    } 
  }
`;

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;



class ReviewData extends React.Component {

  render(){
    return(
      <Query query={IS_LOGGED_IN}>
        {({ data, loading }) => {
          if(loading) return null;
          if(data.isLoggedIn){
            return(
              <Query query={GET_DELIVERY_INFO}>
                {({ data, loading,error, client }) => {
                  if(loading) return null
                  if(error) {
                    console.log(error)
                    return null
                  }
                  const userData = data.deliveryInfo;
                  return(
                    <Query query={GET_CART_ITEMS}>
                      {({ data, loading, client }) => {
                        if(loading) return null
                        console.log(data);
                        var cartItems = data.cartItems;
                        return(
                          <Review
                            userData={userData}
                            cartItems={cartItems}
                          />
                        )
                      }}
                    </Query>
                  )
                }}
              </Query>
            )
          } else {
            return(
              <Big>
                <BlockReserveLoading color="#4CAF50" size="large" />
              </Big>
            )
          }
        }}
      </Query>
    )
  }
}

export const Big = styled.div(props => ({
  position:"relative",
  marginTop:300,
  transform:"scale(2.5)"
}));


export default ReviewData