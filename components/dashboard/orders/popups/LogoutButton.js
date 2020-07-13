import React from "react";
import styled from 'styled-components'
import { ApolloConsumer } from 'react-apollo';
import Link from 'next/link'

class LogoutButton extends React.Component {
  state = {
    open:false,
  }

  render(){
    return (
      <React.Fragment>
        
        <DropdownButton
          onClick={()=>this.setState({open:true})}>
          Odjava
        </DropdownButton>
        
        <Wrapper open={this.state.open}>     
          <Layer open={this.state.open}>
          <ApolloConsumer>
            {(client) => (
                
             
            <PopupWrapper open={this.state.open}>
              <Title>Odjava</Title>
              <Text>Ste prepričani, da se želite želite odjaviti?</Text>
              <ButtonWrapper>
                <Button onClick={()=>this.setState({open:false})}>Ne</Button>
                <Link href="/">
                  <Button onClick={() => {
                      client.cache.reset();
                      client.writeData({ data: {
                          isLoggedIn: false,
                          isAdmin: false,
                          isPreview: false,
                          agreeToPrivacyPolicy: false,
                          orders:[],
                      } });
                      localStorage.clear();
                    }}>Da</Button>
                </Link>
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
  color:"#4CAF50",
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



export default LogoutButton
