import styled from 'styled-components'
import Link from 'next/link'
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import {withRouter} from 'next/router'
import Scroll from 'react-scroll';




var Element = Scroll.Element;
var scroller = Scroll.scroller;

class BasicMode extends React.Component {

  render(){


    var { barLength, barDiameter, complementary, dimensions, textComplementary, file, text, type, clamp } = this.props;
    var detailsArr = [];
    if(dimensions) detailsArr.push("Dimenzija: "+dimensions)
    if(type) detailsArr.push("Tip folije: "+type)
    if(barLength && barDiameter) detailsArr.push("Drog: "+barLength+", "+barDiameter)
    if(clamp) detailsArr.push("Objemke: "+ clamp)
    if(complementary[0]) {
      var table = "Dopolnilna tabla: "+complementary[0];
      if(textComplementary){
        table = table + ", "+textComplementary
      }
      detailsArr.push(table)
    }
    if(text) detailsArr.push("Vsebina: "+text)

    if(detailsArr.length > 1){
      return(
        <ReviewAndSelectWrapper>
          <Element name="specifikacije" />
          <Title>Končne tehnične specifikacije</Title>
          {detailsArr.map((detail, i)=>(
              <ReviewWrapper last={i === detailsArr.length-1} key={i}>{detail}</ReviewWrapper>
          ))}
          {file && 
            <ReviewWrapper>
              <FileDownload target="_blank" href={file} download>
                <Img alt={file} src="../../../../icons/attachment.svg" />
                {file.replace("https://storage.googleapis.com/signaco/attachments/", "")}
              </FileDownload>
            </ReviewWrapper>
          }
        </ReviewAndSelectWrapper>
      )
    } else {
      return null
    }
  }
}



export const ReviewAndSelectWrapper = styled.div(props => ({

}));

export const ReviewWrapper = styled.div(props => ({
  width:"calc(100% - 40px)",
  background:"#fff",
  minHeight:48,
  display:"flex",
  justifyContent:"flex-start",
  alignItems:"center",
  flexWrap:"wrap",
  padding:"0px 20px",
  borderBottom:"1px solid #F1F1F4",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px"
}));


export const FileDownload = styled.a(props => ({
  background:"#fff",
  display:"block",
  color:"#000",
  textDecoration:"none",
  position:"relative",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
}));
export const Img = styled.img(props => ({
  marginRight:8,
}));

export const Title = styled.h3(props => ({
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "17px",
  marginBottom:20,
  marginTop:32,
}));

export default withRouter(BasicMode)
