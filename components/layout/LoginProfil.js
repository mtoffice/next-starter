import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import SignUpIn from '../../components/signUpIn/SignUpIn'
import Link from 'next/link'
import dynamic from "next/dynamic";
import { withApollo } from '../../lib/apollo'


const HeaderDropdown = dynamic(
    () => import('../dashboard/orders/popups/HeaderDropdown'),
    { ssr: false }
)


const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

const ME = gql`
  query Me {
    me{
      id
    }
  }
`;



const LoginProfil = () => {

  return(
    <Query query={IS_LOGGED_IN}>
      {({ data, loading, client }) => {

        if(loading) return "Prijava"
        if(data.isLoggedIn){
          return(
            <Query query={ME} context={{headers:{token:window.localStorage.getItem("token")}}}>
              {({ data, loading, error }) => {
                var me = data;
                if(loading) return <Button>Prijava</Button>;
                if(error) {
                  if(error.message == "GraphQL error: Your session expired. Sign in again."){
                    client.writeData({ data: { isLoggedIn: false } })
                    return (
                      <React.Fragment>
                        <SignUpIn tokenExpired={true} buttonTriggered={false} />
                        <Button>
                          Prijava
                        </Button>
                      </React.Fragment>
                    );
                  }
                }
                return(
                  <HeaderDropdown />
                )
              }}
            </Query>
          )
        } else {
          return(
            <SignUpIn buttonTriggered={true}>
              <Button>
                Prijava
              </Button>
            </SignUpIn>
          )
        }
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


export default withApollo()(withRouter(LoginProfil))