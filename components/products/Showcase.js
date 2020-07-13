import styled from 'styled-components'
import {withRouter} from 'next/router'

const Showcase = (props) => (
  // var link = props.product.picture_link.replace(" | ", "");
  <Wrapper>
    <Stickey2>
      <Stickey>
        <Button onClick={()=>props.router.back()}>
          Nazaj na seznam
        </Button>
        <ImgMain alt={props.product.title} src={props.product.picture_link.replace(" | ", "")} />
        {/*<OtherImgs>
          <Img alt={props.product.title} src={props.product.picture_link.replace(" | ", "")} />
          <Img alt={props.product.title} src={props.product.picture_link.replace(" | ", "")} />
        </OtherImgs>*/}
      </Stickey>
    </Stickey2>
  </Wrapper>
)


export const Wrapper = styled.div(props => ({
   marginTop:60,
   marginRight:30,
}));

export const Stickey = styled.div(props => ({
  position: "-webkit-sticky",
  top: 20,
}));

export const Stickey2 = styled.div(props => ({
  position:"sticky",
  top: 20,
}));


export const ImgMain = styled.img(props => ({
  height:200,
  width:200,
  padding:22,
  margin:12,
  background:"#fff",
}));
export const OtherImgs = styled.div(props => ({
  display:"flex",
}));
export const Img = styled.img(props => ({
  height:110,
  margin:12,
  background:"#fff",
}));

export const Label = styled.div(props => ({
  marginBottom:10,
}));

export const Title = styled.div(props => ({
  flexGrow:2,
}));

export const Button = styled.div(props => ({
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
  marginLeft:12,
  marginBottom:48,
  textDecoration:"underline",
  color:"#4CAF50",
}));




export default withRouter(Showcase)
