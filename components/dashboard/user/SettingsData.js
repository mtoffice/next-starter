import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { BlockReserveLoading } from 'react-loadingg';
import {SignUpWrapper, TextError} from "../../signUpIn/SignUp";
import Settings from "./Settings";

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
        }
    }
`;

const UPDATE = gql`
    mutation UpdateUser(
        $username: String
        $email: String
        $password: String
        $password2: String
        $first_name: String
        $second_name: String
        $phone: String
        $address: String
        $city: String
        $zip_code: String
        $company: String
        $tax_id: String

    ) {
        updateUser(
            username: $username
            email: $email
            password: $password
            password2: $password2
            first_name: $first_name
            second_name: $second_name
            phone: $phone
            address: $address
            city: $city
            zip_code: $zip_code
            company: $company
            tax_id: $tax_id
        )
        {
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
        }
    }
`;



class SettingsData extends React.Component {


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
                                    if(error){
                                        return null
                                    }
                                    let data2 = data;
                                    if(data2) {
                                        return (

                                            <Mutation mutation={UPDATE} context={{headers: {token: window.localStorage.getItem("token")}}}>
                                                {(updateUser, { data, error, client}) => {
                                                    let errorMessage = "";
                                                    if(error){
                                                        console.log(error);
                                                        client.writeData({data: {successPopup: {__typename: "successPopup", show: true, error: true} }})
                                                        setTimeout(() => {
                                                            client.writeData({data: {successPopup: {__typename: "successPopup", show: false}}})
                                                        }, 3000);

                                                        let index = error.message.indexOf(",");
                                                        if(index !== -1){
                                                            console.log(error.message.substring(0,index));
                                                            errorMessage = error.message.substring(0,index)
                                                        } else {
                                                            errorMessage = error.message
                                                        }
                                                    }

                                                    if(data) {
                                                        client.writeData({data: {successPopup: {__typename: "successPopup", show: true, error: false} }})
                                                        setTimeout(() => {
                                                            client.writeData({data: {successPopup: {__typename: "successPopup", show: false}}})
                                                        }, 3500);
                                                    }

                                                    return(
                                                        <Settings
                                                            data={data2.me}
                                                            errorMessage={errorMessage}
                                                            updateUser={updateUser}
                                                            updateLogin={(data) => {
                                                                updateUser(data);
                                                            }}
                                                        />
                                                    )
                                                }}
                                            </Mutation>
                                        )
                                    }
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


export default withRouter(SettingsData)