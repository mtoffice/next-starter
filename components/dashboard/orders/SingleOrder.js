import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import OrderList from "./OrderList"

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;





const GET_ORDER = gql`
  query Order($id: ID!) {
    order(id: $id){
      id
      status
      cartItems{
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

class SingleOrder extends React.Component {


  render(){
    return(
    <Wrapper>
      {this.props.id ?
        <Query query={GET_ORDER} variables={{id:parseInt(this.props.id)}} context={{headers:{token:window.localStorage.getItem("token")}}}>
          {({ data, loading, error, client }) => {
           if(loading) return null
            if(error){
              console.log(error)
              return null
            } 
            if(data){

              var order = data.order;
              var date = new Date((parseInt(order.createdAt)));

              var minutes = date.getMinutes();
              var hours = date.getHours();
              var day = date.getUTCDate()
              var month = (date.getUTCMonth() + 1)
              var year = date.getUTCFullYear()

              if(day < 10){
                day = "0"+day;
              }
              if(month < 10){
                month = "0"+month;
              }
              if(minutes < 10){
                minutes = "0"+minutes;
              }

              var time = hours+":"+minutes;
              var newDate = day+"/"+month+"/"+year;

              var status = order.status;
              if(status === "1"){
                status = "novo"
              } else if(status === "2"){
                status = "v pregledu"
              } else if(status === "3"){
                status = "sprejeto"
              } else if(status === "4"){
                status = "pripravljeno"
              }

              return(
                <OrderWrapper>
                  <OrderHeader>
                    <Line1>
                      <Line1Wrap>
                        <TextMargin><b>{order.company}</b></TextMargin>
                        <TextMargin>Št. naročila: <b>{order.id}</b></TextMargin>
                        <TextMargin>Dostava: <b>{order.delivery_method}</b></TextMargin>
                        <Text>Status: <b>{status}</b></Text>
                      </Line1Wrap>
                      <Text>{newDate}{" ob "}{time}</Text>
                    </Line1>
                    {!!order.notes &&
                      <Line2>
                        <Text>{order.notes}</Text>
                      </Line2>
                    }
                    <Line3>
                      <Button onClick={()=>window.open(`mailto:info@signaco.si?subject=Imam vprašanje glede naročila št.: ${order.id}&body=Pozdravljeni,%0D%0A%0D%0AImam vprašanje glede naročila številka: ${order.id}`)}>
                        <ButtonImg alt="mail signaco" src="../../icons/mail.svg" />
                          Pošlji vprašanje
                      </Button>
                    </Line3>
                  </OrderHeader>
                  <OrderList data={order.cartItems} />
                </OrderWrapper>
              )
            } else {
              return(
                <OrderWrapper>
                  <OrderHeader>
                    <Line1>
                      <Line1Wrap>
                        <TextMargin>
                          Izberi naročilo
                        </TextMargin>
                      </Line1Wrap>
                    </Line1>
                  </OrderHeader>
                </OrderWrapper>
              )
            }
          }}
        </Query>
        :       
        <OrderWrapper>
          <OrderHeader>
            <Line1>
              <Line1Wrap>
                <TextMargin>
                  Izberi naročilo
                </TextMargin>
              </Line1Wrap>
            </Line1>
          </OrderHeader>
        </OrderWrapper>
      }
    </Wrapper>
    )
  }
}



export const Wrapper = styled.div(props => ({
  flexGrow:2,
  width:"100%",
  margin:"0 auto",
  maxWidth:1400,
  minWidth:800,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  maxHeight:"calc(100vh - 61px)",
  overflowX:"hidden",
  overflowY:"scroll",
}));

export const OrderWrapper = styled.div(props => ({
  width:"calc(100% - 60px)",
  margin:"0 auto",
}));
export const OrderHeader = styled.div(props => ({
  marginTop:48,
}));
export const Line1Wrap = styled.div(props => ({
  display:"flex",
}));
export const Text = styled.div(props => ({
  
}));
export const TextMargin = styled.div(props => ({
  marginRight:24,
}));
export const Line1 = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  marginBottom:24,
}));
export const Line2 = styled.div(props => ({
  
}));
export const Line3 = styled.div(props => ({
  marginTop:48,
  paddingBottom:48,
  borderBottom:"1px solid #000",
}));


export const Button = styled.div(props => ({
  display:"flex",
  transition: "0.1s ease-in-out",
  overflow:"hidden",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  background:"#fff",
  cursor:"pointer",
  textDecoration:"none",
  color:"#000",
  border:"2px solid #4CAF50",
  width:160,
  height:36,
  justifyContent:"center",
  alignItems:"center",
}));

export const ButtonImg = styled.img(props => ({
  marginRight:10,
}));




export default withRouter(SingleOrder)