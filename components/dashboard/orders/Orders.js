import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import Navigation from "./Navigation";
import AdminOrderData from "../admin/AdminOrderData";
import SingleOrder from "./SingleOrder";
import SignUpInTrigger from "../../signUpIn/SignUpInTrigger"
import { BlockReserveLoading } from 'react-loadingg';


const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
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
      role
    } 
  }
`;


class Orders extends React.Component {
  state = {
    
  }

  render(){
    var id;
    if(this.props.hash){
      id = this.props.hash;
    } else {
      if(process.browser){
        id = window.location.pathname.substring(20);
      }
    }
    return(
      <Query query={IS_LOGGED_IN}>
      {({ data, loading }) => {
        if(loading) return null;
        if(data.isLoggedIn){
          return(
            <Query query={ME} context={{headers:{token:window.localStorage.getItem("token")}}}>
              {({ data, loading, error, client }) => {
                if(loading) return null
                if(error) {
                  if(error.message == "GraphQL error: Your session expired. Sign in again."){
                    client.writeData({ data: { isLoggedIn: false } })
                    return null ;
                  } else {
                    return null
                  }
                }
                let me = data.me

                  return(
                    <Wrapper>
                      <Navigation id={id}/>
                      {me.role === "ADMIN" ?
                          <AdminOrderData id={id}/>
                        :
                          <SingleOrder me={me} id={id} />}

                    </Wrapper>
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



export const Wrapper = styled.div(props => ({
  width:"100%",
  display:"flex",
}));


export const Big = styled.div(props => ({
  position:"relative",
  marginTop:300,
  transform:"scale(2.5)"
}));

export default withRouter(Orders)