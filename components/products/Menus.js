import React from "react";
import styled from 'styled-components'
import AdvanceMode from './AdvanceMode'
import BasicMode from './BasicMode'
import ClassMode from './ClassMode'






class Menus extends React.Component {
	state = {
		advance:true,
    cestaPostavitve:"",
    osvetlitevOkolice:"",
    mestoPostavitve:"",
    dovoljenaHitrost:"",
    
    id:-1,
    productId:"",
    complementary: [],
    barLength:"",
    barDiameter:"",
    barMaterial:"",
    number:1,
    dimensions:"",
    type:"",
    addOns:[],
    updated:false,
    text:"",
    textComplementary:"",
    clamp:"60mm",
    files: [],
    accepted: [],
    file: ""
	}



  static getDerivedStateFromProps(props, state){
    if(props.fromCart && props.data[0] && (state.updated === false || state.productId !== props.data[0].productId)){
      return({
        id: props.data[0].id,
        productId:props.data[0].productId,
        complementary:[...props.data[0].complementary],
        addOns:[...props.data[0].addOns],
        barLength:props.data[0].barLength,
        barDiameter:props.data[0].barDiameter,
        barMaterial:props.data[0].barMaterial,
        number:props.data[0].number,
        dimensions:props.data[0].dimensions,
        type:props.data[0].type,
        file: props.data[0].file,
        text: props.data[0].text,
        clamp: props.data[0].clamp,
        textComplementary: props.data[0].textComplementary,
        updated:true,
      })
    } else {
      return({})
    }
  }



  resetState = () => {
    this.setState({
      cestaPostavitve:"",
      osvetlitevOkolice:"",
      mestoPostavitve:"",
      dovoljenaHitrost:"",
      complementary:[],
      barLength:"",
      barDiameter:"",
      barMaterial:"",
      number:1,
      dimensions:"",
      type:"",
      clamp:"60mm",
      file: "",
      textComplementary:"",
      text:"",
      addOns:[],
      files: [],
      accepted: [],
    })
  }


  setType = () => {
    if(this.state.mestoPostavitve !== "" && this.state.osvetlitevOkolice !== "" && this.state.mestoPostavitve !== ""){
      if(this.state.mestoPostavitve === "Na desni strani vozišča/cestišča"){
        if(this.state.osvetlitevOkolice === "Normalno/naravno osvetljena okolica"){
          if(this.state.cestaPostavitve === "Avtocesta, hitra cesta"){
            this.setState({
              type:"RA2",
            })
          } else if(this.state.cestaPostavitve === "Cesta zunaj naselja"){
            this.setState({
              type:"RA1",
            })
          } else {
            this.setState({
              type:"RA1",
            })
          }
        } else {
          if(this.state.cestaPostavitve === "Avtocesta, hitra cesta"){
            this.setState({
              type:"RA2",
            })
          } else if(this.state.cestaPostavitve === "Cesta zunaj naselja"){
            this.setState({
              type:"RA2",
            })
          } else {
            this.setState({
              type:"RA2",
            })
          }
        }
      } else {
        if(this.state.osvetlitevOkolice === "Normalno/naravno osvetljena okolica"){
          if(this.state.cestaPostavitve === "Avtocesta, hitra cesta"){
            this.setState({
              type:"RA2",
            })
          } else if(this.state.cestaPostavitve === "Cesta zunaj naselja"){
            this.setState({
              type:"RA2",
            })
          } else {
            this.setState({
              type:"RA2",
            })
          }
        } else {
          if(this.state.cestaPostavitve === "Avtocesta, hitra cesta"){
            this.setState({
              type:"RA3",
            })
          } else if(this.state.cestaPostavitve === "Cesta zunaj naselja"){
            this.setState({
              type:"RA2",
            })
          } else {
            this.setState({
              type:"RA3",
            })
          }
        }
      }
    }
  }


  deleteFiles = () => {
      this.setState({files: [], file:""})
  }

  acceptedFiles = (accepted) => {
    this.setState({accepted: [...accepted], files: [...accepted]})
    if(accepted[0]){
      this.setState({file: "https://storage.googleapis.com/signaco/attachments/"+accepted[0].path})
    }
  }

 
  setDimensions = () => {
    if(this.state.dovoljenaHitrost === "Nad 90 km/h"){
      this.setState({dimensions:"1200 mm"})
    } else if(this.state.dovoljenaHitrost === "Med vključno 50 km/h in 90 km/h"){
      this.setState({dimensions:"900 mm"})
    } else if(this.state.dovoljenaHitrost === "50 km/h in manj"){
      this.setState({dimensions:"600 mm"})
    } else {
      this.setState({dimensions:"450 mm"})
    }
  }


  dopolnilnaClicked = (e) => {
    console.log(e)
    var index = this.state.complementary.indexOf(e);
    if(index === -1){
      // this.setState({complementary:[...this.state.complementary, e]})
      this.setState({complementary:[e]})
    } else {
      var newArr = [...this.state.complementary];
      newArr.splice(index,1);
      this.setState({complementary:  [...newArr]})
    }
  }

  changeDimension = (e) => {
    this.setState({dimensions:e})
  }
  changeType = (e) => {
    this.setState({type:e})
  }
  changeBarLength = (e) => {
    this.setState({barLength:e})
  }
  changeBarDiameter = (e) => {
    this.setState({barDiameter:e})
  }
  changeBarMaterial = (e) => {
    this.setState({barMaterial:e})
  }
  changeText = (e) => {
    this.setState({text:e})
  }
  changeComplementaryText = (e) => {
    this.setState({textComplementary:e})
  }
  changeClamp = (e) => {
    this.setState({clamp:e})
  }




  changeCestaPostavitve = (e) => {
    this.setState({cestaPostavitve:e},
    ()=>this.setType())
  }
  changeOsvetlitevOkolice = (e) => {
    this.setState({osvetlitevOkolice:e},
    ()=>this.setType())
  }
  changeMestoPostavitve = (e) => {
    this.setState({mestoPostavitve:e},
    ()=>this.setType())
  }
  changeDovoljenaHitrost = (e) => {
    this.setState({dovoljenaHitrost:e},
    ()=>this.setDimensions())
  }

  
  countPlus = () => {
    this.setState({number:parseInt(this.state.number)+1})
  }
  countMinus = () => {
    if(parseInt(this.state.number)>1){
      this.setState({number:parseInt(this.state.number)-1})
    }
  }
  changeCount = (e) => {
    if(!isNaN(parseInt(e.nativeEvent.target.value))){
      this.setState({number: parseInt(e.nativeEvent.target.value)})
    } else {
      this.setState({number: 0})
    }
  }

	render(){
    var productClass = 1;
    if(this.props.product.class) productClass = this.props.product.class;
    console.log(productClass)
		return(
		  <Wrapper>
		    <Button onClick={()=>this.resetState()}>
		     	Začni znova
		    </Button>
		    <Subtitle>{this.props.product.category} / {this.props.product.subcategory}</Subtitle>
        {this.props.product.title &&
		      <Title>{this.props.product.title.charAt(0).toUpperCase() + this.props.product.title.slice(1)}</Title>
        }
		    <Label>Oznaka: {this.props.product.tag}</Label>

		    <ModeWrapper>
		    	Parametri znaka
		    	<ModeButtonWrapper>
		    		<ModeText onClick={()=>this.setState({advance:false})}>
		    			Napredni
		    		</ModeText>
		    		<ModeButton onClick={()=>this.setState({advance:!this.state.advance})}>
		    			<ModeBullet open={this.state.advance} />
		    		</ModeButton>
		    		<ModeText onClick={()=>this.setState({advance:true})}>
		    			Enostavni
		    		</ModeText>
		    	</ModeButtonWrapper>
		    </ModeWrapper>
        {(productClass==1 || productClass==2 || productClass==5) ?
  		    this.state.advance ?
  		    	<BasicMode
              {...this.state}
              changeDimension={this.changeDimension}
              changeType={this.changeType}
            />
  		    	:
  					<AdvanceMode 
              {...this.state} 
              changeCestaPostavitve={this.changeCestaPostavitve}
              changeOsvetlitevOkolice={this.changeOsvetlitevOkolice}
              changeMestoPostavitve={this.changeMestoPostavitve}
              changeDovoljenaHitrost={this.changeDovoljenaHitrost}
            />
  		    :
          null
        }
        <ClassMode 
          {...this.state} 
          changeClamp={this.changeClamp}
          changeComplementaryText={this.changeComplementaryText}
          deleteFiles={this.deleteFiles}
          acceptedFiles={this.acceptedFiles}
          changeText={this.changeText}
          product={this.props.product}
          productClass={productClass}
          dopolnilnaClicked={this.dopolnilnaClicked}
          changeBarLength={this.changeBarLength}
          changeBarDiameter={this.changeBarDiameter}
          changeBarMaterial={this.changeBarMaterial}
          changeCount={this.changeCount}
          countPlus={this.countPlus}
          countMinus={this.countMinus}
          fromCart={this.props.fromCart}
        />
		  </Wrapper>
		)
	}
}


export const Wrapper = styled.div(props => ({
   marginTop:60,
   width:400,
}));



export const Subtitle = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "14px",
  marginBottom:8,
}));
export const Title = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px",
  marginBottom:8,
}));
export const Label = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "14px"
}));


export const ModeWrapper = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginTop:30,
  marginBottom:60,
}));

export const ModeButtonWrapper = styled.div(props => ({
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
}));

export const ModeText = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  cursor:"pointer",
  userSelect:"none",
}));

export const ModeButton = styled.div(props => ({
  background:"#4CAF50",
  width: "50px", 
  height: "24px",
  position:"relative",
  marginLeft:16,
  marginRight:16,
  cursor:"pointer",
}));

export const ModeBullet = styled.div(props => ({
  width: 22,
	height: 22,
	top:1,
	left:props.open ? 27 : 1,
	transition:"0.1s ease-in-out",
	position:"absolute",
	background:"#fff",
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
  marginBottom:48,
  textDecoration:"underline",
  color:"#4CAF50",
}));










export default Menus
