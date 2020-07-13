import React from "react";
import {withRouter} from 'next/router'
import styled from 'styled-components'
import {Query} from 'react-apollo';
import gql from "graphql-tag";
import Link from 'next/link'
import AdminOrder from "../admin/AdminOrder";
import SingleOrder from "./SingleOrder";


const GET_USER = gql`
  query User ($id: ID!) {
    user (id: $id) {
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
      role
    }
  }
`;

const GET_ORDERS = gql`
    query OrdersByUser {
      ordersByUser {
        id
        status
        cartItems{
          productId
        }
        userId
        first_name
        second_name
        address
        company
        phone
        zip_code
        tax_id
        notes
        city
        delivery_method
        createdAt
      }
    }
`;


class Navigation extends React.Component {
  state = {
    search: "",
    sort: "Uredi po datumu",
    open: false,
  }

  toggle = () => {
    this.setState({open:!this.state.open})
  }

  sortOrders = (orders) => {
    if(this.state.sort === "Uredi po datumu"){

    } else if(this.state.sort === "Uredi po statusu"){
      return orders.sort(function (a, b) {
        return a.status - b.status;
      });
    }
    if(this.state.search !== ""){
      // if(filter.length > 0){
      return orders.filter(order => order.id.match(this.state.search))
      // }
    }

    return orders
  }

  render(){
    return(
    <Wrapper>
      <SortWrapper>
        <DropdownWrapper open={this.state.open}>
          <Dropdown>
            <DropdownButton onClick={()=>this.setState({open:false,sort:"Uredi po statusu"})}>
              Uredi po statusu
            </DropdownButton>
            <DropdownButton onClick={()=>this.setState({open:false,sort:"Uredi po datumu"})}>
              Uredi po datumu
            </DropdownButton>
            <DropdownButton onClick={()=>this.setState({open:false,sort:"Uredi po abecedi"})}>
              Uredi po abecedi
            </DropdownButton>
            <DropdownButton onClick={()=>this.setState({open:false,sort:"Uredi po priponki"})}>
              Uredi po priponki
            </DropdownButton>
          </Dropdown>
        </DropdownWrapper>
        <SortButton onClick={this.toggle}>
          {this.state.sort}
          <SortButtonImg
            open={this.state.open} 
            alt="puščica" 
            src="../../icons/sortArr.svg" />
        </SortButton>
        <SortImg 
          onClick={this.toggle}
          src="../../icons/sort.svg" 
          alt="search"
        />
      </SortWrapper>
      <SearchWrapper>
        <SearchImg 
          onClick={
            ()=>document.getElementById("search").focus()
          }
          src="../../icons/search.svg" 
          alt="search"
        />
        <SearchInput 
          id="search"
          placeholder="Išči po številki naročila" 
          type="text" 
          name="search"
          value={this.state.email}
          onChange={(e) => this.setState({search: e.nativeEvent.target.value})}
        />
      </SearchWrapper>

        <Query query={GET_ORDERS} context={{headers:{token:window.localStorage.getItem("token")}}}>
          {({data, loading, error, client}) => {
            if(loading) return null
            if(error){
              console.log(error)
              return null
            }
            const orders = data.ordersByUser;
            return (
                <OrdersWrapper>
                {
                  orders.length === 0 ?
                      <React.Fragment>
                        <Order active={false}>
                          <OrderFirst>
                            Do sedaj niste oddali še nobenega naročila. Ko poste oddali prvo naročilo boste tukaj videli vaš seznam naročil.
                            <Link href={"/"}>
                              <Button>Prični z naročanjem</Button>
                            </Link>
                          </OrderFirst>
                        </Order>
                      </React.Fragment>
                      :
                      <React.Fragment>
                        {this.sortOrders([...orders]).map((order, i)=>{
                          let date = new Date((parseInt(order.createdAt)));

                          const now = new Date();
                          now.setHours(0);
                          now.setMinutes(0);
                          now.setSeconds(0, 0);


                          let minutes = date.getMinutes();
                          let hours = date.getHours();
                          let day = date.getUTCDate()
                          let month = (date.getUTCMonth() + 1)
                          let year = date.getUTCFullYear()

                          if(day < 10){
                            day = "0"+day;
                          }
                          if(month < 10){
                            month = "0"+month;
                          }
                          if(minutes < 10){
                            minutes = "0"+minutes;
                          }

                          let time = hours+":"+minutes;
                          let newDate = day+"/"+month+"/"+year;

                          if (date.getTime() > now.getTime()){
                            newDate = "Danes"
                          } else if(date.getTime() > (now.getTime() - 86400000)){
                            newDate = "Včeraj"
                          }
                          let status = order.status;
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
                            <Link key={i} href={"/uporabnik/narocila/"} as={`/uporabnik/narocila/${order.id}`}>
                              <Order active={order.id === this.props.id}>
                                <OrderFirst>
                                  <Text>
                                    <Bold>{order.company}</Bold>
                                  </Text>
                                  <Text>
                                    Št. naročila:{" "}
                                    <Bold>{order.id}</Bold>
                                  </Text>
                                </OrderFirst>
                                <OrderSecond>
                                  <Text>
                                    {newDate}
                                  </Text>
                                  <Text>
                                    Status:{" "}
                                    <State>{status.charAt(0).toUpperCase() + status.slice(1)}</State>
                                  </Text>
                                </OrderSecond>
                              </Order>
                            </Link>
                          )})}
                      </React.Fragment>
                }
                </OrdersWrapper>

            )
          }}
        </Query>


    </Wrapper>
    )
  }
}



export const Wrapper = styled.div(props => ({
  width:400,
  minWidth:400,
  borderRight:"1px solid #F1F1F4",
}));

export const OrdersWrapper = styled.div(props => ({
  maxHeight:"calc(100vh - 157px)",
  minHeight:"calc(100vh - 157px)",
  overflowX:"hidden",
  overflowY:"scroll",
}));
export const Order = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  display:"flex",
  justifyContent:"space-between",
  padding:24,
  height:58,
  background:props.active ? "#F3F4F7" : "#fff",
  borderTop:"1px solid #F1F1F4",
  cursor:"pointer",
}));
export const OrderFirst = styled.div(props => ({
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between",
}));
export const OrderSecond = styled.div(props => ({
  display:"flex",
  flexDirection:"column",
  justifyContent:"space-between",
  alignItems:"flex-end"
}));
export const Text = styled.div(props => ({

}));
export const State = styled.span(props => ({
  fontWeight:600,
  color:"#4CAF50",
}));
export const Bold = styled.span(props => ({
  fontWeight:600,
}));


export const Button = styled.a(props => ({
  display:"flex",
  position:"relative",
  alignItems:"center",
  justifyContent:"center",
  width:"100%",
  minHeight:40,
  transition: "0.1s ease-in-out",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  marginTop:24,
  marginBottom:24,
  color:"#000",
  background: props.loading ? "#4CAF50":  "#fff",
  border:"1px solid #4CAF50",
  ":hover":{
    color:"#fff",
    background:"#4CAF50",
  }
}));


export const SearchWrapper = styled.div(props => ({
  width:"100%",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  borderBottom:"1px solid #C4C4C4",
  borderTop:"1px solid #C4C4C4",
}));

export const SearchImg = styled.img(props => ({
  width:24,
  marginLeft:16,
}));

export const SearchInput = styled.input(props => ({
  width:370,
  height:48,
  outline:"none",
  border:0,
  background:"#fff",
  borderRadius:0,
  color:"#000",
  paddingLeft:10,
  paddingRight:15,
}));





export const SortWrapper = styled.div(props => ({
  position:"relative",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  background:"#4CAF50",
  color:"#fff",
  padding:"10px 15px",
}));
export const SortButton = styled.div(props => ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "14px",
  cursor:"pointer",
}));
export const SortButtonImg = styled.img(props => ({
  width:24,
  marginLeft:10,
  transform:props.open ? "rotate(180deg)" : "rotate(0deg)",
  transition:"0.2s ease-in-out",
}));
export const SortImg = styled.img(props => ({
  width:16,
  cursor:"pointer",
}));



export const DropdownWrapper = styled.div(props => ({
  height:props.open ? 192 : 0,
  opacity:props.open ? 1 : 0,
  transition:props.open ? "opacity 0.3s ease-in-out, height 0.1s ease-in-out" : "opacity 0.3s ease-in-out, height 0.1s ease-in-out 0.2s",
  overflow:"hidden",
  position:"absolute",
  top:44,
  left:10,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  boxShadow: "0px 2px 12px rgba(21, 23, 54, 0.15)",
}));

export const Dropdown = styled.div(props => ({
  height:"100%",
  width:200,
  background:"#fff",
  overflow:"hidden",
}));

export const DropdownButton = styled.div(props => ({
  height:48,
  paddingLeft:20,
  display:"flex",
  cursor:"pointer",
  justifyContent:"flex-start",
  alignItems:"center",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  color:"#4CAF50",
  ":hover":{
    background:"#F1F1F4",
  }
}));



export default withRouter(Navigation)