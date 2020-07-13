import React from "react";
import styled from 'styled-components'
import { ApolloConsumer } from 'react-apollo';
import Link from 'next/link'
import {Mutation} from "@apollo/react-components";
import gql from "graphql-tag";

const DELETE_ORDER = gql`
    mutation DeleteOrder(
        $id: ID!
    ) {
        deleteOrder (
            id: $id
        )
    }
`;

class DeleteOrder extends React.Component {
    state = {
        open:false,
    }

    render(){
        return (
            <React.Fragment>

                <DropdownButton
                    onClick={()=>this.setState({open:true})}>
                    Izbriši naročilo
                </DropdownButton>

                <Wrapper open={this.state.open}>
                    <Layer open={this.state.open}>
                        <ApolloConsumer>
                            {(client) => (
                                <PopupWrapper open={this.state.open}>
                                    <Title>Izbriši naročilo</Title>
                                    <Text>Ste prepričani, da se želite izbrisati naročilo?</Text>
                                    <ButtonWrapper>
                                        <Button onClick={()=>this.setState({open:false})}>Ne</Button>
                                        <Mutation mutation={DELETE_ORDER} context={{headers:{token:window.localStorage.getItem("token")}}}>
                                            {(deleteOrder, {data, loading, error, client}) => {
                                                if (error) {
                                                    console.log(error);
                                                }
                                                return (
                                                    <Button onClick={() => {
                                                        deleteOrder({
                                                            variables: {
                                                                id: this.props.id
                                                            }
                                                        })
                                                    }}>Da</Button>
                                                )
                                            }}
                                        </Mutation>
                                    </ButtonWrapper>
                                </PopupWrapper>
                            )}
                        </ApolloConsumer>
                    </Layer>
                </Wrapper>


            </React.Fragment>
        );
    }
}



export const DropdownButton = styled.div(props => ({
    height:48,
    display:"flex",
    cursor:"pointer",
    justifyContent:"flex-start",
    alignItems:"center",
    userSelect:"none",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    color:"#000",
}));


export const Wrapper = styled.div(props => ({
    width:"100vw",
    height:"100vh",
    position:"fixed",
    top:0,
    zIndex:1,
    left:0,
    visibility:props.open ? "visible" : "hidden",
}));
export const Layer = styled.div(props => ({
    width:"100%",
    height:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    transition:"0.2s ease-in-out",
    background: props.open ?  "rgba(0, 0, 0, 0.5)":"rgba(0, 0, 0, 0)",
}));
export const PopupWrapper = styled.div(props => ({
    width:560,
    padding:24,
    zIndex:5,
    position:"relative",
    background:"#fff",
    transition:"0.2s ease-in-out",
    textAlign:"center",
    transform: props.open ?  "scale(1)":"scale(0)",
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
    color:"#000",
    background:"#fff",
    cursor:"pointer",
    textDecoration:"none",
    border:"2px solid #4CAF50",
    width:160,
    height:36,
    justifyContent:"center",
    alignItems:"center",
    marginRight:12,
    marginLeft:12,
}));

export const Title = styled.div(props => ({
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "17px",
    marginBottom:24,
    marginTop:24,
}));

export const Text = styled.div(props => ({
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    marginBottom:64,
}));
export const ButtonWrapper = styled.div(props => ({
    display:"flex",
    justifyContent:"center",
    marginBottom:24,
}));



export default DeleteOrder
