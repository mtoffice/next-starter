import styled from 'styled-components'
import Scroll from 'react-scroll';


var Element = Scroll.Element;
var scroller = Scroll.scroller;


class Dropdown extends React.Component {
  state = {
    open:false,
    selected: false,
  }

  render(){
    return(
        <MenuWrapper width={this.props.width ? this.props.width : null}>
          <Element name={this.props.scrollID}/>
          <MenuHeader 
            active={this.props.value}
            open={this.state.open}
            border={this.props.border ? this.props.border : null}
            onClick={()=>{
              this.setState({open:!this.state.open})
              scroller.scrollTo(this.props.scrollID, {
                duration: 200,
                delay: 0,
                smooth: true,
                offset: -45, 
              })
            }}
          >
            <HeaderText >
              {this.props.title}
              {this.props.value &&
                ": "+this.props.value
              }
            </HeaderText>
            <HeaderImg alt="menuArrClose" src={this.state.open ? "../../../../icons/menuArrOpen.svg":"../../../../icons/menuArrClose.svg"} />
          </MenuHeader>
          <MenuBody open={this.state.open} height={this.props.values.length*48} border={this.props.border ? this.props.border : null}>
            {this.props.values.map((value, i)=>(
              <MenuItem 
                key={i} 
                active={this.props.value === value} 
                onClick={()=>{
                  if(this.props.value !== value){
                    this.props.change(value)
                  } else {
                    this.props.change("")
                  }
                  this.setState({open:false})
                }}
              >
                <ItemText>
                  {value}
                </ItemText>
                <ItemButton>
                  Izberi
                </ItemButton>
              </MenuItem>
            ))}
          </MenuBody>
        </MenuWrapper>
    )
  }
}


export const MenuWrapper = styled.div(props => ({
  marginBottom:24,
  width: props.width ? props.width : null
}));
export const MenuHeader = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  height:48,
  alignItems:"center",
  background:props.open ? "#4CAF50" : "#fff",
  paddingLeft:20,
  paddingRight:20,
  fontSize:14,
  cursor:"pointer",
  color:props.open ? "#fff" : "#000",
  transition:"0.2s ease-in-out",
  border: props.border && !props.open ? "1px solid black" : props.active ? "2px solid #4CAF50":"2px solid #fff"

}));
export const HeaderText = styled.div(props => ({
  
}));
export const HeaderImg = styled.img(props => ({
  userSelect:"none",
}));
export const MenuItem = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  height:48,
  alignItems:"center",
  background:props.active ? "#F3F4F7" : "#fff",
  paddingLeft:20,
  paddingRight:20,
  fontSize:14,
  cursor:"pointer",
  transition:"0.1s ease-in-out",
}));
export const ItemText = styled.div(props => ({
  
}));
export const ItemButton = styled.div(props => ({
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
  color:"#4CAF50",
}));
export const MenuBody = styled.div(props => ({
  overflow:"auto",
  maxHeight:360,
  height:props.open ? props.height : 0,
  transition:"0.2s ease-in-out",
  border: props.border && props.open ? "1px solid black" : "none"
}));



export default Dropdown
