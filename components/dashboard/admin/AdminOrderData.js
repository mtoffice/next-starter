import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import AdminOrder from "./AdminOrder";

const GET_ORDER = gql`
    query Order($id: ID!) {
        order(id: $id){
            id
            status
            userId
            first_name
            second_name
            address
            zip_code
            company
            city
            phone
            tax_id
            delivery_method
            notes
        }
    }
`;

const GET_VERSIONS = gql`
    query Versions ($orderId: ID!) {
        versions (orderId: $orderId) {
            id
            version
            orderId
        }
    }
`;

export const DropdownContext = React.createContext();

class Order extends React.Component {


    render(){
        return(
            <Wrapper>
                {this.props.id ?
                    <Query query={GET_ORDER} variables={{id:parseInt(this.props.id)}} context={{headers:{token:window.localStorage.getItem("token")}}}>
                        {({ data, loading, error, client }) => {
                            if(loading) return null
                            if(error){
                                return null
                            }
                            if(data){

                                var order = data.order;

                                let orderDisplayData = {};

                                var date = new Date((parseInt(order.date)*1000));

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

                                orderDisplayData.time = hours+":"+minutes;
                                orderDisplayData.newDate = day+"/"+month+"/"+year;

                                 return(
                                     <Query query={GET_VERSIONS} variables={{orderId: order.id}}>
                                         {({data, error, loading, client}) => {


                                             if (data) {
                                                 let versions = data.versions;
                                                 let version = versions[versions.length - 1];

                                                 return (
                                                     <AdminOrder version={version} versions={versions} order={order} displayData={orderDisplayData}/>
                                                 )
                                             }
                                             return null

                                         }}
                                     </Query>

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


const Wrapper = styled.div(props => ({
    flexGrow:2,
    width:"100%",
    margin:"0 auto",
    maxWidth:1050,
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

export const TextMargin = styled.div(props => ({
    marginRight:24,
}));
export const Line1 = styled.div(props => ({
    display:"flex",
    justifyContent:"space-between",
    marginBottom:24,
}));




export default withRouter(Order)