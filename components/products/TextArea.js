import styled from 'styled-components'
import Scroll from 'react-scroll';


var Element = Scroll.Element;
var scroller = Scroll.scroller;


class TextArea extends React.Component {
  state = {
    open:false,
    selected: false,
  }

  render(){
    return(
      <TextWrapper>
        <Text
          active={this.props.text !== ""}
          placeholder={this.props.placeholder} 
          onChange={(e)=>this.props.changeText(e.nativeEvent.target.value)}
          value={this.props.text}
          id="text" 
          type="text"
        />
      </TextWrapper>
    )
  }
}

export const TextWrapper = styled.div(props => ({
  
}));

export const Text = styled.textarea(props => ({
  minWidth:"calc(100% - 44px)",
  minHeight:28,
  maxHeight:200,
  outlineColor: "#4CAF50",
  height:28,
  maxWidth:"calc(100% - 44px)",
  border:0,
  padding:"12px 20px",
  borderRadius:0,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  color:"#000",
  border:props.active ? "#4CAF50 2px solid" : "#fff 2px solid",
}));




export default TextArea
