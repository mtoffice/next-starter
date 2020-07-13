import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import CartItem from "../../order/CartItem"

const GET_PRODUCT_BY_ID = gql`
  query Product($tag: String!) {
    product(tag: $tag){
      id
      tag
      category
      subcategory
      class
      title
      description
      picture_link
      purpose_of_marking
      additional_requirements
    }
  }
`;


class OrderList extends React.Component {

  state = {
    
  }

  render(){
    var data = this.props.data;
    return(
    <Wrapper>
      <Title>Naročilo</Title>
        {data.map((cartItem, i)=>(
          <Query key={i} variables={{tag:cartItem.productId}} query={GET_PRODUCT_BY_ID}>
          {({ data, loading }) => {
            if(loading) return null
            var product = data.product;
            return(
              <CartItem review={true} cartItem={cartItem} key={i} />
            )
          }}
          </Query>
        )
      )}
    </Wrapper>
    )
  }
}



export const Wrapper = styled.div(props => ({
  marginTop:48,
}));

export const Title = styled.div(props => ({
  borderBottom:"1px solid #C4C4C4",
  paddingBottom:8,
}));

export const Item = styled.div(props => ({
 borderBottom:"1px solid #C4C4C4",
 marginTop:24,
}));
export const Line1 = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:20,
}));
export const ProductWrapper = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  alignItems:"flex-start",
}));
export const Img = styled.img(props => ({
  width:140,
  height:140,
}));
export const ProductDetails = styled.div(props => ({
  marginTop:4,
  marginLeft:24,
}));
export const Label = styled.div(props => ({
  marginBottom:8,
}));
export const Description = styled.div(props => ({
  maxWidth:350,
  marginBottom:24,
}));
export const Count = styled.div(props => ({
  border:"1px solid #000",
  paddingLeft:10,
  paddingRight:10,
  background:"#F3F4F7",
}));
export const CountWrapper = styled.div(props => ({
 
}));
export const Line2 = styled.div(props => ({
  marginBottom:24,
  height:48,
  display:"flex",
  borderLeft:"1px solid #000",
}));
export const AdOn = styled.div(props => ({
  padding:16,
  borderRight:"1px solid #000",
  borderTop:"1px solid #000",
  borderBottom:"1px solid #000",
}));





export default withRouter(OrderList)