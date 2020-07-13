import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import SignUpIn from './SignUpIn'
import Link from 'next/link'



const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;
const ME = gql`
  query Me {
    me {
      id
    } 
  }
`;



const SignUpInTrigger = (props) => {

  return(
    <Query query={ME} context={{headers:{token:window.localStorage.getItem("token")}}}>
      {({ data, loading, error, client }) => {
        if(loading) return null
        if(error) {
          if(error.message == "GraphQL error: Your session expired. Sign in again."){
            client.writeData({ data: { isLoggedIn: false } })
            return (
              <SignUpIn tokenExpired={true} buttonTriggered={false} />
            );
          } else {
             return(
              <SignUpIn tokenExpired={false} buttonTriggered={false} />
            )
          }
        }
        return(
          <Query query={IS_LOGGED_IN}>
            {({ data, loading }) => {
              if(loading) return null;
              if(!data.isLoggedIn){
                return(
                  <SignUpIn tokenExpired={false} buttonTriggered={false} />
                )
              } else {
                return(
                  null
                )
              }
            }}
          </Query>
        )
      }}
    </Query>
    
  )
}


export const Button = styled.div(props => ({
  display:"flex",
  width:props.open ? 0 : 70,
  transition: "0.3s ease-in-out",
  overflow:"hidden",
  flexDirection:"column",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  textDecoration:"underline",
  color:"#4CAF50",
  marginRight:props.open ? 0 : 10,
}));


export default withRouter(SignUpInTrigger)