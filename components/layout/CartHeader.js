import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import LoginProfil from './LoginProfil'
import Link from 'next/link'


const CartHeader = () => {

  return(
    <Wrapper>
      <Link href="/">
        <LogoWrapper>
          <Logo alt="signaco logo" src="../../../icons/signacoLogo.png" />
        </LogoWrapper>
      </Link>
      <LoginProfil />
    </Wrapper>
  )
}

export const LogoWrapper = styled.div(props => ({
  height:60,
  display:"flex",
  alignItems:"center",
  borderBottom:"#F1F1F4 solid 1px",
}));
export const Logo = styled.img(props => ({
  height:36,
  marginLeft:24,
  cursor:"pointer",
}));


export const Wrapper = styled.div(props => ({
  borderBottom:"1px #E5E5E5 solid",
  height:60,
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  paddingRight:20,
  background:"#fff",
}));




export default (CartHeader)