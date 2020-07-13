import styled from 'styled-components'
import Link from 'next/link'
import LazyLoad from 'react-lazyload';




const Signs = (props) => (
  <Wrapper>
    {(props.data.length > 0) &&
      <React.Fragment>
        {props.top ?
          <TitleH1>Prometni znaki</TitleH1>
          :
          <Link href={"/" + props.data[0].category.replace(/ /g,"-").replace(/č/g,"c").replace(/ž/g,"c").replace(/š/g,"c")}>
            <TitleH1>{props.data[0].category.charAt(0).toUpperCase() + props.data[0].category.slice(1)}</TitleH1>
          </Link>
        }
        {(props.subcategories) &&
          <LinkWrapper>
            {props.subcategories.map((subcategory, i)=>{
              if(props.top){
                return(
                  <Link key={i} href={"/" + subcategory.replace(/ /g,"-").replace(/č/g,"c").replace(/ž/g,"c").replace(/š/g,"c")}>
                    <A active={props.subcategory2 === subcategory}>{subcategory}</A>
                  </Link>
                )
              } else {
                return(
                  <Link key={i} href={"/"+props.pathname} as={"/"+props.pathname+ "/" + subcategory.replace(/ /g,"-")}>
                    <A active={props.subcategory2 === subcategory}>{subcategory}</A>
                  </Link>
                )
              }
            })}
          </LinkWrapper>
        }
        <SignsWrapper>
          {props.data.map((product, i)=>{
            var link = product.picture_link;
            link = product.picture_link.replace(" | ", "");
            return(
            <Sign key={i}>
              <LazyLoad offset={450} height={90}>
                <Img alt={product.tag+" - "+product.title} src={link} />
              </LazyLoad>
              <Label>{product.tag}</Label>
              {product.title ?
                <Title>{product.title.charAt(0).toUpperCase() + product.title.slice(1)}</Title>
                :
                <Title />
              }
              <Link href="/produkt/znak" as={`/produkt/znak/${product.tag}`}>
                <Button>Izberi</Button>
              </Link>
            </Sign>
          )})}
        </SignsWrapper>
      </React.Fragment>
    }
  </Wrapper>
)


export const Wrapper = styled.div(props => ({
   marginTop:0,
}));

export const SignsWrapper = styled.div(props => ({
   display:"flex",
   justifyContent:"flex-start",
   alignItems:"center",
   flexWrap:"wrap",
   width:"100%",
   marginTop:20,
}));


export const Sign = styled.div(props => ({
  width:200,
  margin:24,
  height:280,
  display:"flex",
  justifyContent:"flex-start",
  alignItems:"center",
  flexDirection:"column",
  background:"#fff",
}));

export const Img = styled.img(props => ({
  height:90,
  margin:15,
  fontSize:12,
}));

export const Label = styled.div(props => ({
  marginBottom:4,
}));

export const Title = styled.h3(props => ({
  flexGrow:2,
  textAlign:"center",
  width:"calc(100% - 15px)",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "13px",
  lineHeight: "17px"
}));

export const Button = styled.a(props => ({
  width:"calc(100% - 2px)",
  border:"1px solid #4CAF50",
  height:36,
  userSelect:"none",
  fontSize:14,
  color:"#4CAF50",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  cursor:"pointer",
  transition:"0.1s ease-in-out",
  ":hover":{
    background:"#4CAF50",
    color:"#fff",
  }
}));






export const LinkWrapper = styled.div(props => ({
  display:"flex",
  flexDirection:"column",
  marginTop:20,
  marginLeft:24,
}));

export const A = styled.div(props => ({
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


export const Header = styled.div(props => ({
  background:"#fff",
  height:60,
  display:"flex",
  justifyContent:"flex-end",
  borderBottom:"1px solid #E5E5E5",
  alignItems:"center",
}));



export const TitleH1 = styled.h1(props => ({
  margin:0,
  cursor:"pointer",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px",
  paddingTop:60,
  marginLeft:24,
}));








export default (Signs)
