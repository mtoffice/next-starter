import styled from 'styled-components'


class Counter extends React.Component {
  state = {
   
  }

  render(){
    return(
      <CounterWrapper>
        <CounterMinus onClick={()=>this.props.countMinus()}>
          -
        </CounterMinus>
        <CounterNumber
          onChange={(e) => this.props.changeCount(e)}
          value={this.props.counter}
          id="counter" 
          type="text" 
        >
        </CounterNumber>
        <CounterPlus onClick={()=>this.props.countPlus()}>
          +
        </CounterPlus>
      </CounterWrapper>
    )
  }
}


export const CounterWrapper = styled.div(props => ({
  display:"flex",
  height:22,
  width:86,
  border:"solid 1px #000",
}));
export const CounterMinus = styled.div(props => ({
  width:22,
  height:15,
  cursor:"pointer",
  fontSize:32,
  userSelect:"none",
  fontWeight:400,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  
}));
export const CounterPlus = styled.div(props => ({
  width:22,
  height:22,
  userSelect:"none",
  cursor:"pointer",
  fontSize:24,
  fontWeight:400,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  
}));
export const CounterNumber = styled.input(props => ({
  flexGrow:0,
  width:30,
  height:20,
  border:0,
  fontSize:14,
  borderRadius:0,
  paddingLeft:4,
  paddingRight:4,
  borderRight:"solid 1px #000",
  borderLeft:"solid 1px #000",
}));




export default Counter
