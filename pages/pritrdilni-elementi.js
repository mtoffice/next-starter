import App from '../components/App'
import { withApollo } from '../lib/apollo'
import Signs from '../components/viewer/signs'
import styled from 'styled-components'

const IndexPage = () => (
  <App pathname={"pritrdilni-elementi"}>
    <Wrapper>
    	pritrdilni elementi
    </Wrapper>
  </App>
)


export const Wrapper = styled.div(props => ({
   width:"calc(100% - 60px)",
   margin:"0 auto",
   maxWidth:1000,
   minWidth:500,
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



export const Title = styled.h1(props => ({
  margin:0,
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px",
  paddingTop:60,
  marginLeft:24,
}));








export default withApollo({ ssr: true })(IndexPage)
