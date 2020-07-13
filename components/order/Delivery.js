import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import SignUpIn from '../signUpIn/SignUpIn'
import Link from 'next/link'


const CHANGE_DELIVERY = gql`
  mutation ChangeDelivery($delivery: String) {
    changeDelivery(delivery: $delivery) @client
  }
`;

const CHANGE_DELIVERY_INFO = gql`
  mutation ChangeDeliveryInfo($deliveryInfo: DeliveryInfo) {
    changeDeliveryInfo(deliveryInfo: $deliveryInfo) @client 
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
      $username: String
      $email: String
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
    ) {
    updateUser(
      username: $username
      email: $email
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
    ) {
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




class Delivery extends React.Component {
  state = {
    firstName: "",
    secondName: "",
    company: "",
    taxId: "",
    address: "",
    zipCode: "",
    city: "",
    phone: "",
    notes:"",
    deliveryMethod:"",
    updated:false,
  }


  static getDerivedStateFromProps(props, state){
    if(props.data && (state.updated === false)){
      return({
        firstName: props.data.first_name ? props.data.first_name : "",
        secondName: props.data.second_name ? props.data.second_name : "",
        company: props.data.company ? props.data.company : "",
        taxId: props.data.tax_id ? props.data.tax_id : "",
        address: props.data.address ? props.data.address : "",
        zipCode: props.data.zip_code ? props.data.zip_code : "",
        city: props.data.city ? props.data.city : "",
        phone: props.data.phone ? props.data.phone : "",
        notes: props.data.notes ? props.data.notes : "",
        deliveryMethod: props.data.delivery_method ? props.data.delivery_method : "",
        updated:true,
      })
    } else {
      return null
    }
  }

  render(){
  return(
    <Wrapper>
      <Body>
        <HowManyWrapper>
          <Title>Dostava</Title>
        </HowManyWrapper>
        <CartWrapper>
          <BorderLine>
            <InputWrapper>
              <Input 
                placeholder="Ime" 
                onChange={(e)=>this.setState({firstName: e.nativeEvent.target.value})}
                value={this.state.firstName}
                id="firstName" 
                type="text"
              />
              <Input 
                placeholder="Priimek" 
                onChange={(e)=>this.setState({secondName: e.nativeEvent.target.value})}
                value={this.state.secondName}
                id="secondName" 
                type="text"
              />
            </InputWrapper>
            <Input 
              placeholder="Podjetje / naročnik" 
              onChange={(e)=>this.setState({company: e.nativeEvent.target.value})}
              value={this.state.company}
              id="company" 
              type="text"
            />
            <Input 
              placeholder="Davčna številka" 
              onChange={(e)=>this.setState({taxId: e.nativeEvent.target.value})}
              value={this.state.taxId}
              id="taxId" 
              type="text"
            />
            <Input 
              placeholder="Naslov" 
              onChange={(e)=>this.setState({address: e.nativeEvent.target.value})}
              value={this.state.address}
              id="address" 
              type="text"
            />
            <InputWrapper>
              <Input 
                placeholder="Poštna številka" 
                onChange={(e)=>this.setState({zipCode: e.nativeEvent.target.value})}
                value={this.state.zipCode}
                id="zipCode" 
                type="text"
              />
              <Input 
                placeholder="Pošta" 
                onChange={(e)=>this.setState({city: e.nativeEvent.target.value})}
                value={this.state.city}
                id="city" 
                type="text"
              />
            </InputWrapper>
            <Input 
              placeholder="Telefon" 
              onChange={(e)=>this.setState({phone: e.nativeEvent.target.value})}
              value={this.state.phone}
              id="phone" 
              type="text"
            />
          </BorderLine>
          
          <DostavaWrapper
            active={this.state.deliveryMethod === "Standardna dostava"}
            onClick={()=>this.setState({deliveryMethod: "Standardna dostava"})}
          >
            <DostavaTitle>
              Standardna dostava
            </DostavaTitle>
            <DostavaImgWrapper active={this.state.deliveryMethod === "Standardna dostava"}>
              <DostavaImg 
                active={this.state.deliveryMethod === "Standardna dostava"} 
                src="../../icons/check.svg"
              />
            </DostavaImgWrapper>
          </DostavaWrapper>

          <DostavaWrapper
            active={this.state.deliveryMethod === "Osebni prevzem"}
            onClick={()=>this.setState({deliveryMethod: "Osebni prevzem"})}
          >
            <DostavaTitle>
              Osebni prevzem
            </DostavaTitle>
            <DostavaImgWrapper active={this.state.deliveryMethod === "Osebni prevzem"}>
              <DostavaImg 
                active={this.state.deliveryMethod === "Osebni prevzem"} 
                src="../../icons/check.svg"
              />
            </DostavaImgWrapper>
          </DostavaWrapper>


          <TextAreaWrapper>
            <TextArea 
              placeholder="Opombe" 
              onChange={(e)=>this.setState({notes: e.nativeEvent.target.value})}
              value={this.state.notes}
              id="notes" 
              type="text"
            />
          </TextAreaWrapper>
        </CartWrapper>
      </Body>
      <Mutation mutation={CHANGE_DELIVERY_INFO} >
        {(changeDeliveryInfo, {data, error, client}) => {
          if(error) {
            if(error.message === "GraphQL error: Your session expired. Sign in again."){
              client.writeData({ data: { isLoggedIn: false } })
              return (
                <SignUpIn tokenExpired={true} buttonTriggered={false} />
              );
            } else {
               return null
            }
          }
          console.log(data);
          return(
            <Button
               onClick={()=>{
                if(this.state.zipCode !== "" &&
                  this.state.city !== "" &&
                  this.state.address !== ""){
                  changeDeliveryInfo({
                    variables: {
                      deliveryInfo: {
                        first_name: this.state.firstName,
                        second_name: this.state.secondName,
                        phone: this.state.phone,
                        address: this.state.address,
                        city: this.state.city,
                        zip_code: this.state.zipCode,
                        company: this.state.company,
                        tax_id: this.state.taxId,
                        notes: this.state.notes,
                        delivery_method: this.state.deliveryMethod,
                      }
                    }
                  })
                  this.props.router.push("/narocilo/pregled")
                  
                } else {
                  alert("dopolni")
                }
              }}
            >Potrdi in nadaljuj</Button>
        )}}
      </Mutation>
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
export const BorderLine = styled.div(props => ({
  borderBottom:"1px solid #F1F1F4",
  paddingBottom:10,
  marginRight:-15,
  marginLeft:-15,
}));



export const Title = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "14px",
  lineHeight: "17px"
}));


export const CartWrapper = styled.div(props => ({
  
}));

export const DostavaWrapper = styled.div(props => ({
  background:"#F1F1F4",
  marginTop:24,
  height:48,
  cursor:"pointer",
  padding:48,
  border:props.active ? "#4CAF50 2px solid" : "#F1F1F4 2px solid",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  transition:"0.1s ease-in-out",
  ":hover":{
    background:"#E5E5E5",
  },
}));
export const DostavaTitle = styled.div(props => ({
  color:"#000",
  fontSize: 15,
}));

export const DostavaImgWrapper = styled.div(props => ({
  border:"2px solid #000",
  width:22,
  height:22,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
}));

export const DostavaImg = styled.img(props => ({
  transform:props.active ? "scale(1)":"scale(0)",
  transition:"0.2s ease-in-out",
}));


export const Input = styled.input(props => ({
  width:"calc(100% - 60px)",
  height:48,
  border:0,
  margin:15,
  background:"#F1F1F4",
  borderRadius:0,
  paddingLeft:15,
  fontSize:15,
  paddingRight:15,
}));

export const InputWrapper = styled.div(props => ({
  display:"flex",
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

export const TextArea = styled.textarea(props => ({
  width:"calc(100% - 30px)",
  maxWidth:"calc(100% - 30px)",
  minWidth:"calc(100% - 30px)",
  minHeight:140,
  maxHeight:350,
  height:140,
  border:0,
  marginTop:30,
  background:"#F1F1F4",
  borderRadius:0,
  fontSize:15,
  padding:15,
}));

export const TextAreaWrapper = styled.div(props => ({
 
}));



export default withRouter(Delivery)