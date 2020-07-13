import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { RectGraduallyShowLoading } from 'react-loadingg';



class SignUp extends React.Component {

  render() {
    if(this.props.data){
      window.localStorage.setItem('token', this.props.data.signUp.token);

      return (
        <SignUpWrapper>
          <SuccessWrapper>Račun je bil ustavrjen. </SuccessWrapper>
          <Button onClick={()=>{
            this.props.toggleLogin({ 
              variables: { 
                isLoggedIn: true,
              }
            })
            this.props.close()
            
          }}>Nadaljuj z naročilom</Button>
        </SignUpWrapper>
      )
    }
    return (
      <React.Fragment>
        <SignUpWrapper>
          <Input 
            placeholder="Uporabniško ime" 
            onChange={(e)=>this.props.changeUsername(e.nativeEvent.target.value)}
            value={this.props.username}
            id="username" 
            type="text"
          />
          <TextError active={this.props.errorMessage === "GraphQL error: Validation error: Vaše uporabniško je prekratko oziroma predolgo."}>*Vaše uporabniško je pre kratko oziroma predolgo.</TextError>
          <TextError active={this.props.errorMessage === "GraphQL error: Validation error: Posebni znaki niso dovoljeni."}>*Posebni znaki niso dovoljeni.</TextError>
          <Input 
            placeholder="E-poštni naslov" 
            onChange={(e)=>this.props.changeEmail(e.nativeEvent.target.value)}
            value={this.props.email}
            id="email" 
            type="email"
          />
          <TextError active={this.props.errorMessage === "GraphQL error: Validation error: Validation isEmail on email failed"}>*Prosim če preverite vnešeni e-poštni naslov.</TextError>
          <TextError active={this.props.errorMessage === "GraphQL error: *Račun s tem e-poštnim naslovnom je bil že ustavrjen. Poskusi z vpisem."}>*Račun s tem e-poštnim naslovnom je bil že ustavrjen.</TextError>
          <Input 
            placeholder="Geslo" 
            onChange={(e)=>this.props.changePassword(e.nativeEvent.target.value)}
            value={this.props.password}
            id="password" 
            type="password"
          />
          <TextError active={this.props.errorMessage === "GraphQL error: passwords do not match"}>*Gesli se ne ujemata.</TextError>
          <Input 
            placeholder="Ponovite geslo" 
            onChange={(e)=>this.props.changePassword2(e.nativeEvent.target.value)}
            value={this.props.password2}
            id="password2" 
            type="password"
          />
          {this.props.loading ? 
            <Button loading={true}><RectGraduallyShowLoading color="#fff" size="medium" /></Button>
          :
            <Button onClick={()=>
              {this.props.signUp({ 
                variables: { 
                  username: this.props.username,
                  email: this.props.email,
                  password: this.props.password,
                  password2: this.props.password2
                }
              })
            }}>
              Registracija
            </Button>
          }
        </SignUpWrapper>
        <SwitchWrapper>
          Še že registrirani?
          <SwitchButton
            onClick={()=>this.props.switchSignUp()}
          >
            Vpis
          </SwitchButton>
        </SwitchWrapper>
      </React.Fragment>
    )
  }
}





export const Wrapper = styled.div(props => ({
  width:"100vw",
  height:"100vh",
  position:"fixed",
  zIndex:1,
  top:0,
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
  position:"relative",
  background:"#fff",
  transition:"0.2s ease-in-out",
  transform: props.open ?  "scale(1)":"scale(0)",
}));

export const TextError = styled.div(props => ({
  color:"#FF0000",
  height: props.active ? 20:0,
  marginTop:props.active ? 8:0,
  overflow:"hidden",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "14px"
}));

export const SignUpWrapper = styled.div(props => ({
  display:"flex",
  flexDirection:"column",
  position:"relative",
  width:400,
  margin:"0 auto",
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
export const SuccessWrapper = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "16px",
  paddingTop:10,
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
export const SwitchButton = styled.div(props => ({
  display:"flex",
  transition: "0.3s ease-in-out",
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



export default withRouter(SignUp)