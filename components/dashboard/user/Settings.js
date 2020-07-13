import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'

class Settings extends React.Component {
    state = {
        firstName: "",
        secondName: "",
        company: "",
        taxId: "",
        address: "",
        zipCode: "",
        city: "",
        phone: "",
        email: "",
        password: "",
        repeatPassword: "",
        updated:false,
    }

    static getDerivedStateFromProps(props, state){
        if(props.data && (state.updated === false)) {
            return({
                firstName: props.data.first_name ? props.data.first_name : "",
                secondName: props.data.second_name ? props.data.second_name : "",
                company: props.data.company ? props.data.company : "",
                taxId: props.data.tax_id ? props.data.tax_id : "",
                address: props.data.address ? props.data.address : "",
                zipCode: props.data.zip_code ? props.data.zip_code : "",
                city: props.data.city ? props.data.city : "",
                phone: props.data.phone ? props.data.phone : "",
                username: props.data.username ? props.data.username : "",
                email: props.data.email ? props.data.email : "",
                password: props.data.password ? props.data.password : "",
                password2: props.data.repeatPassword ? props.data.repeatPassword : "",
                updated: true
            })
        } else {
            return null
        }
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

            <Wrapper>
                <Container>
                    <Title>Račun</Title>
                    <Subtitle>Osnovni podatki</Subtitle>
                    <Input layout={split.left} placeholder="Ime" type="text"
                           name="firstName"
                           value={this.state.firstName}
                            onChange={(e) => this.setState({firstName: e.nativeEvent.target.value})}/>
                    <Input layout={split.right} placeholder="Priimek" type="text"
                           name="secondName"
                           value={this.state.secondName}
                           onChange={(e) => this.setState({secondName: e.nativeEvent.target.value})}/>
                    <Input placeholder="Podjetje / naročnik" type="text"
                           name="companyName"
                           value={this.state.company}
                           onChange={(e) => this.setState({company: e.nativeEvent.target.value})}/>
                    <Input placeholder="Davčna številka" type="text" name="taxId"
                           value={this.state.taxId}
                           onChange={(e) => this.setState({taxId: e.nativeEvent.target.value})}/>
                    <Input placeholder="Naslov" type="text" name="address"
                           value={this.state.address}
                           onChange={(e) => this.setState({address: e.nativeEvent.target.value})}/>
                    <Input placeholder="Poštna številka" layout={split.left} type="text"
                           name="zipCode"
                           value={this.state.zipCode}
                           onChange={(e) => this.setState({zipCode: e.nativeEvent.target.value})}/>
                    <Input placeholder="Kraj" layout={split.right} type="text"
                           name="city" value={this.state.city}
                           onChange={(e) => this.setState({city: e.nativeEvent.target.value})}/>
                    <Input placeholder="Telefon" type="text" name="phoneNumber"
                           value={this.state.phone}
                           onChange={(e) => this.setState({phone: e.nativeEvent.target.value})}/>
                    <SubmitButton onClick={() => {
                        this.props.updateUser({
                            variables: {
                                first_name: this.state.firstName,
                                second_name: this.state.secondName,
                                company: this.state.company,
                                tax_id: this.state.taxId,
                                address: this.state.address,
                                zip_code: this.state.zipCode,
                                city: this.state.city,
                                phone: this.state.phone
                            }
                        });
                    }}>Shrani</SubmitButton>
                    <Subtitle>Uporabniško ime, e-pošta in geslo</Subtitle>

                    <Input placeholder="Uporabniško ime" type="text" name="userName"
                           value={this.state.username}
                           onChange={(e) => this.setState({username: e.nativeEvent.target.value})}/>
                    <TextError active={this.props.errorMessage === "GraphQL error: Validation error: Vaše uporabniško je prekratko oziroma predolgo."}>*Vaše uporabniško je pre kratko oziroma predolgo.</TextError>
                    <TextError active={this.props.errorMessage === "GraphQL error: Validation error: Posebni znaki niso dovoljeni."}>*Posebni znaki niso dovoljeni.</TextError>

                    <Input placeholder="E naslov" type="text" name="email"
                           value={this.state.email}
                           onChange={(e) => this.setState({email: e.nativeEvent.target.value})}/>
                    <TextError active={this.props.errorMessage === "GraphQL error: Validation error: Validation isEmail on email failed"}>*Prosim če preverite vnešeni e-poštni naslov.</TextError>
                    <TextError active={this.props.errorMessage === "GraphQL error: *Račun s tem e-poštnim naslovnom je bil že ustavrjen. Poskusi z vpisem."}>*Račun s tem e-poštnim naslovnom je bil že ustavrjen.</TextError>

                    <Input placeholder="Novo geslo" type="password" name="password"
                           onChange={(e) => this.setState({password: e.nativeEvent.target.value})}/>
                    <TextError active={this.props.errorMessage === "GraphQL error: passwords do not match"}>*Gesli se ne ujemata.</TextError>

                    <Input placeholder="Ponovite geslo" type="password"
                           name="repeatPassword"
                           onChange={(e) => this.setState({repeatPassword: e.nativeEvent.target.value})}/>
                    <SubmitButton onClick={() => {
                        this.props.updateLogin({
                            variables: {
                                username: this.state.username,
                                email: this.state.email,
                                password: this.state.password,
                                password2: this.state.repeatPassword
                            }
                        });
                    }}>Shrani</SubmitButton>
                </Container>
            </Wrapper>
        )
    }
}

const TextError = styled.div(props => ({
    color:"#FF0000",
    height: props.active ? 20:0,
    marginTop:props.active ? 8:0,
    overflow: props.active ? "visible": "hidden",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px"
}));

const SubmitButton = styled.button(props => ({
    width: "100%",
    height: "36px",
    marginTop: "24px",
    background: "white",
    color:"#4CAF50",
    cursor: "pointer",
    border: "1px solid #4CAF50",
    marginBottom:40,
    transition:"0.2s ease-in-out",
    outline: "none",
    ":hover":{
      background: "#4CAF50",
      color:"#fff",
    }
}));

const Input = styled.input`
    width: ${props => props.layout.width};
    height: 48px;
    margin-top: 24px;
    background: #F1F1F4;
    border: none;
    outline: none;
    font-size: 14px;
    padding: 0 15px 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: ${props => props.layout.display};
    float: ${props => props.layout.float};
`;

Input.defaultProps = {
    layout: {
        width: "100%",
        display: "initial",
        float: "left"
    }
}

const split = {
    left: {
        width: "188px",
        display: "inline",
        float: "left"
    },
    right: {
        width: "188px",
        display: "inline",
        float: "right"
    }
}

export const Wrapper = styled.div(props => ({
    width:"100%",
    display:"flex",
    maxHeight:"calc(100vh - 61px)",
    overflowX:"hidden",
    overflowY:"scroll",
}));

export const Container = styled.div(props => ({
    margin: "auto",
    width: "400px",
    marginBottom:40,
}));

export const Title = styled.h1(props => ({
  marginTop:64,
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px"
}));

export const Subtitle = styled.h2(props => ({
    marginTop: "48px",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "17px"
}));


export const Big = styled.div(props => ({
    position:"relative",
    marginTop:300,
    transform:"scale(2.5)"
}));

export default withRouter(Settings)