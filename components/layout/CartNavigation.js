import { withRouter } from 'next/router'
import styled from 'styled-components'

const CartNavigation = ({ router }) => (
  <header>
    <Wrapper>
      
      {router.pathname !== "/narocilo/oddaja" ?
        <Button onClick={()=>router.back()}>
          {router.pathname === "/narocilo/kosarica" ?
           "Nazaj na urejanje/izbiranje"
           :
           "Nazaj na prejšnji korak"
          }
        </Button>
        :
        <Placeholder />
      }
      
      <LinkWrapper>
        
          <A active={router.pathname === "/narocilo/kosarica"}>1. Košarica</A>
        
          <A active={router.pathname === "/narocilo/dostava"}>
            2. Dostava
          </A>
        
          <A active={router.pathname === "/narocilo/pregled"}>3. Pregled</A>
        
          <A active={router.pathname === "/narocilo/oddaja"}>4. Oddaja</A>
  

      </LinkWrapper>

    </Wrapper>
  </header>
)


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

  background:props.active ? "#4CAF50" : "#fff",
  color:props.active ? "#fff" : "#000",
  border:props.active ? "1px solid #4CAF50" : "1px solid #C4C4C4",
}));



export const Wrapper = styled.div(props => ({
   width:"100%",
   margin:"0 auto",
   maxWidth:1250,
}));




export const Button = styled.a(props => ({
  transition: "0.3s ease-in-out",
  overflow:"hidden",
  width:200,
  display:"block",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  marginBottom:48,
  marginTop:48,
  textDecoration:"underline",
  color:"#4CAF50",
}));

export const Placeholder = styled.div(props => ({
  marginBottom:48,
  marginTop:48,
}));







export default withRouter(CartNavigation)
