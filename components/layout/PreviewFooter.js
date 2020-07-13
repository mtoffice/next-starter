import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'

const PreviewFooter = ({ router: { pathname } }) => (
  <Wrapper>
    {/*<Button2>Shrani osnutek</Button2>*/}
    <Link href="/narocilo/kosarica">
      <Button>
        V košarico
      </Button>
    </Link>
  </Wrapper>
)




export const LinkWrapper = styled.div(props => ({
  display:"flex",
}));


export const A = styled.a(props => ({
  display:"flex",
  flexGrow:2,
  flexBasis:"25%",
  alignItems: "center",
  justifyContent:"center",
  textAlign:"center",
  height: 36,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  background:props.active ? "#4CAF50" : "#fff",
  color:props.active ? "#fff" : "#000",
  border:props.active ? "1px solid #4CAF50" : "1px solid #C4C4C4",
}));



export const Wrapper = styled.div(props => ({
   width:"100%",
   height:64,
   position:"absolute",
   bottom:0,
   right:0,
   display:"flex",
   alignItems:"center",
   justifyContent:"flex-end",
   background:"#4CAF50",
}));




export const Button = styled.div(props => ({
  transition: "0.2s ease-in-out",
  overflow:"hidden",
  flexDirection:"column",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  background:"#4CAF50",
  cursor:"pointer",
  textDecoration:"none",
  marginRight:10,
  color:"#fff",
  border:"1px solid #fff",
  width:100,
  height:36,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  ":hover":{
    background:"#fff",
    color:"#4CAF50",
  }
}));


export const Button2 = styled.a(props => ({
  transition: "0.3s ease-in-out",
  overflow:"hidden",
  display:"block",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  marginBottom:48,
  marginRight:20,
  marginTop:48,
  textDecoration:"underline",
  color:"#fff",
}));


export default withRouter(PreviewFooter)
