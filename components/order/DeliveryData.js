import { Query } from 'react-apollo';
import gql from "graphql-tag";
import Delivery from "./Delivery"
import { BlockReserveLoading } from 'react-loadingg';
import styled from 'styled-components'


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


class DeliveryData extends React.Component {
  render() {
    return (
      <Query query={IS_LOGGED_IN}>
        {({ data }) => {

          if(data.isLoggedIn){
            return(
              <Query query={ME} context={{headers:{token:window.localStorage.getItem("token")}}}>
                {({ data, loading, error, client }) => {
                  if(loading) return null
                  if(error) return null

                  return(
                    <Delivery data={data.me} />
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



export default (DeliveryData)
