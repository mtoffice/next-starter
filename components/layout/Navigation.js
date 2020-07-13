import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'

const Navigation = (props) => {
  var active = props.pathname;
  return(
    <header>
      <Wrapper>
        <InnerWrapper>
          <InnerInnerWrapper>
            <Link href="/">
              <LogoWrapper>
                <Logo alt="signaco logo" src="https://signaco.herokuapp.com/icons/signacoLogo.png" />
              </LogoWrapper>
            </Link>
            <Title>Prometni znaki</Title>
            <LinkWrapper>
              <Link href={`/znaki-za-nevarnost`}>
                <A active={active === "znaki-za-nevarnost"}>Znaki za nevarnost</A>
              </Link>
              <Link href="/znaki-za-izrecne-odredbe">
                <A active={active === "znaki-za-izrecne-odredbe"}>
                  Znaki za izrecne odredbe
                </A>
              </Link>
              <Link href="/znaki-za-obvestila">
                <A active={active === "znaki-za-obvestila"}>Znaki za obvestila</A>
              </Link>

              <Link href="/dopolnilne-table">
                <A active={active === "dopolnilne-table"}>Dopolnilne table</A>
              </Link>

              <Link href="/znaki-za-oznacevanje-roba-vozisca-in-preprecevanje-voznje">
                <A active={active === "znaki-za-oznacevanje-roba-vozisca-in-preprecevanje-voznje"}>Znaki za označevanje roba vozišča in preprečevanje vožnje</A>
              </Link>

              <Link href="/znaki-za-oznacevanje-del-in-ovir-v-cestnem-prometu">
                <A active={active === "znaki-za-oznacevanje-del-in-ovir-v-cestnem-prometu"}>Znaki za označevanje del in ovir v cestnem prometu</A>
              </Link>

              <Link href="/znaki-turisticne-in-druge-obvestilne-signalizacije">
                <A active={active === "znaki-turisticne-in-druge-obvestilne-signalizacije"}>Znaki turistične in druge obvestilne signalizacije</A>
              </Link>

              <Link href="/oprema-za-vodenje-prometa">
                <A active={active === "oprema-za-vodenje-prometa"}>Oprema za vodenje prometa</A>
              </Link>

              <Link href="/pritrdilni-elementi">
                <A active={active === "pritrdilni-elementi"}>Pritrdilni elementi</A>
              </Link>

              <Link href="/konstrukcije">
                <A active={active === "konstrukcije"}>Konstrukcije</A>
              </Link>
            </LinkWrapper>
          </InnerInnerWrapper>
          <InnerInnerWrapper2>
            <Link href="/pogoji-uporabe">
              <Policy active={active === "pogoji-uporabe"}>Pogoji uporabe</Policy>
            </Link>
          </InnerInnerWrapper2>
        </InnerWrapper>
      </Wrapper>
    </header>
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




export const Title = styled.h1(props => ({
  margin:0,
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px",
  paddingTop:60,
  marginLeft:24,
  marginRight:24,
}));

export const LinkWrapper = styled.div(props => ({
  display:"flex",
  flexDirection:"column",
  marginTop:20,
  marginLeft:24,
  marginRight:24,
}));


export const A = styled.a(props => ({
  display:"flex",
  flexDirection:"column",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  marginTop:20,
  textDecoration:props.active ? "underline" : "none",
  color:props.active ? "#4CAF50" : "#000",
}));



export const Wrapper = styled.div(props => ({
   width:264,
   height:"100vh",
   minHeight:550,
}));
export const InnerWrapper = styled.div(props => ({
   width:260,
   overflowX:"auto",
   position:"fixed",
   borderLeft:"solid 4px #4CAF50",
   height:"100vh",
}));

export const InnerInnerWrapper = styled.div(props => ({
  minHeight:500,
  background:"#fff",
  height:"calc(100vh - 40px)",
}));

export const InnerInnerWrapper2 = styled.div(props => ({
  minHeight:40,
}));
export const Policy = styled.a(props => ({
  display:"flex",
  flexDirection:"column",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  marginLeft:20,
  textDecoration:props.active ? "underline" : "none",
  color:props.active ? "#4CAF50" : "#000",
}));






export default withRouter(Navigation)
