import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import SignUp from "./SignUp"
import SignIn from "./SignIn"


const SIGN_UP = gql`
  mutation SignUp(
      $username: String!
      $email: String!
      $password: String!
      $password2: String!
    ) {
    signUp(
      username: $username
      email: $email
      password: $password
      password2: $password2
    ){
      token
    }
  }
`;


const TOGGLE_LOGIN = gql`
  mutation ToggleLogin($isLoggedIn: Boolean!) {
    toggleLogin(isLoggedIn: $isLoggedIn) @client
  }
`;

const SIGN_IN = gql`
  mutation SignIn(
      $login: String!
      $password: String!
    ) {
    signIn(
      login: $login
      password: $password
    ){
      token
    }
  }
`;



class SignUpIn extends React.Component {
  state = {
    open:false,
    username:"",
    email:"",
    password:"",
    password2:"",
    signup:true,
    forgot:false,
    success:false,
  }

  componentDidMount(){
    if(!this.props.buttonTriggered){
      this.setState({open:true});
    }
  }


  changeUsername = (e) => {
    this.setState({username:e})
  }
  changeEmail = (e) => {
    this.setState({email:e})
  }
  changePassword = (e) => {
    this.setState({password:e})
  }
  changePassword2 = (e) => {
    this.setState({password2:e})
  }

  switchSignUp = () => {
    this.setState({signup:!this.state.signup})
  }

  switchForgot = () => {
    this.setState({forgot:!this.state.forgot})
  }

  close = () => {
    this.setState({open:false})
  }


  render() {

    return (
      <Mutation mutation={TOGGLE_LOGIN}>
        {(toggleLogin) => {
          return(
          <React.Fragment>
            {this.props.buttonTriggered &&
              <div onClick={()=>{
                  this.setState({open:true})
                }}>
                {this.props.children}
              </div>
            }
            <Wrapper open={this.state.open}>     
              <Layer open={this.state.open}>
                <PopupWrapper open={this.state.open}>
                  {(this.props.tokenExpired && !this.state.success) &&
                    <TokenExpired>
                      Vaša seja je potekla, prosim če se ponovno vpišete
                    </TokenExpired>
                  }
                  {!this.props.tokenExpired &&
                    <CloseButton
                      onClick={()=>{
                        this.setState({open:false})
                        if(!this.props.buttonTriggered){
                          setTimeout(()=>this.props.router.back(), 200);
                        }
                        
                      }}
                    >
                      Zapri
                    </CloseButton>
                  }
                  {this.state.signup ? 
                    !this.state.forgot ? 
                        <Mutation mutation={SIGN_IN}>
                          {(signIn, { data, error, loading, client }) => {
                            var errorMessage = "";
                            if(error){
                              var index = error.message.indexOf(",");
                              if(index !== -1){
                                errorMessage = error.message.substring(0,index)
                              } else {
                                errorMessage = error.message;
                              }
                            }
                            return(
                              <SignIn
                                toggleLogin={toggleLogin}
                                changeEmail={this.changeEmail}
                                changePassword={this.changePassword}
                                {...this.state}
                                errorMessage={errorMessage}
                                loading={loading}
                                signIn={signIn}
                                data={data}
                                client={client}
                                switchSignUp={this.switchSignUp}
                                switchForgot={this.switchForgot}
                                close={this.close}
                              />
                          )}}
                        </Mutation>
                      :
                      <SignUpWrapper>
                        <Input 
                          placeholder="E-poštni naslov" 
                          onChange={(e)=>this.setState({email: e.nativeEvent.target.value})}
                          value={this.state.email}
                          id="username" 
                          type="text"
                        />
                        <Button>
                          Potrdi
                        </Button>
                      </SignUpWrapper>
                    
                    :
                    <Mutation mutation={SIGN_UP}>
                      {(signUp, { data, error, loading, client }) => {
                        console.log(data, error)
                        var errorMessage = "";
                        if(error){
                          var index = error.message.indexOf(",");
                          if(index !== -1){
                            errorMessage = error.message.substring(0,index)
                          } else {
                            errorMessage = error.message;
                          }
                        }
                        if(data){
                          window.localStorage.setItem('token', data.signUp.token);
                          // client.writeData({ data: { isLoggedIn: true } });
                        }
                        return(
                          <SignUp
                            toggleLogin={toggleLogin}
                            changeUsername={this.changeUsername}
                            changeEmail={this.changeEmail}
                            changePassword={this.changePassword}
                            changePassword2={this.changePassword2}
                            {...this.state}
                            errorMessage={errorMessage}
                            loading={loading}
                            signUp={signUp}
                            data={data}
                            client={client}
                            switchSignUp={this.switchSignUp}
                            close={this.close}
                          />
                        )
                      }}
                    </Mutation>
                  }
                  {this.state.forgot && 
                    <SwitchWrapper>
                      <SwitchButton
                        onClick={()=>this.setState({forgot:!this.state.forgot})}
                      >
                        Nazaj na vpis
                      </SwitchButton>
                    </SwitchWrapper>
                  }
                </PopupWrapper>
              </Layer>
            </Wrapper>
          </React.Fragment>
      )}}
      </Mutation>
    )
  }
}



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
  transform: props.open ?  "scale(1)":"scale(0)",
}));

export const SignUpWrapper = styled.div(props => ({
 textAlign:"center",
 display:"flex",
 flexDirection:"column",
 alignItems:"center",
 justifyContent:"center",

}));

export const Input = styled.input(props => ({
  width:370,
  height:48,
  border:0,
  background:"#F1F1F4",
  borderRadius:0,
  paddingLeft:15,
  paddingRight:15,
  marginTop:24,
}));







export const Button = styled.a(props => ({
  display:"flex",
  position:"relative",
  alignItems:"center",
  justifyContent:"center",
  width:396,
  height:36,
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

export const SwitchWrapper = styled.div(props => ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  fontSize: "14px",
  lineHeight: "17px",
  marginTop:64,
}));
export const TokenExpired = styled.div(props => ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  fontSize: "14px",
  lineHeight: "17px",
  marginBottom:30,
}));


export const SwitchButton = styled.div(props => ({
  display:"flex",
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
  marginLeft:5,
}));
export const SwitchButtonWrap = styled.div(props => ({
  display:"flex",
  justifyContent:"flex-end",
  width:400,
}));



export const CloseButton = styled.div(props => ({
  display:"flex",
  transition: "0.3s ease-in-out",
  overflow:"hidden",
  flexDirection:"column",
  position:"absolute",
  top:10,
  right:20,
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  textDecoration:"underline",
  color:"#4CAF50",
  marginLeft:5,
}));






export default withRouter(SignUpIn)