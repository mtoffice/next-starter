import styled from 'styled-components'
import Scroll from 'react-scroll';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import TextArea from "./TextArea"

var Element = Scroll.Element;
var scroller = Scroll.scroller;


const GET_PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory {
    productsByCategory(category: "dopolnilne table" ){
      tag
      category
      subcategory
      class
      title
      description
      picture_link
      purpose_of_marking
      additional_requirements
    }
  }
`;

class Complementary extends React.Component {
  state = {
    open:false,
    search: ""
  }

  render(){
    return(
      
      <MenuWrapper>
      	<Element name="dopolnilna"/>
        <MenuHeader 
          open={this.state.open} 
          active={this.props.complementary.length > 0}
          onClick={()=>{
            this.setState({open:!this.state.open})
            scroller.scrollTo('dopolnilna', {
              duration: 400,
              delay: 0,
              smooth: true,
              offset: -55, 
            })
          }}
        >
          {this.props.complementary.length > 0 ?
            <HeaderText>
              {"Dopolnilna Tabla: "+ this.props.complementary[0]}
              <HeaderText>
              {this.props.textComplementary &&
                "Vsebina: "+ this.props.textComplementary
              }
              </HeaderText>
            </HeaderText>
            :
            <HeaderText>
              Dopolnilna Tabla
            </HeaderText>
          }
          <HeaderImg alt="menuArrClose" src={this.state.open ? "../../../../icons/menuArrOpen.svg":"../../../../icons/menuArrClose.svg"} />
        </MenuHeader>
        <MenuBodyDopolnila open={this.state.open}>
          <SearchWrapper>
            <SearchImg 
              onClick={
                ()=>document.getElementById("search").focus()
              }
              src="../../icons/search.svg" 
              alt="search"
            />
            <SearchInput 
              id="search"
              placeholder="Išči po kataloški številki" 
              type="text" 
              name="search"
              value={this.state.search}
              onChange={(e) => this.setState({search: e.nativeEvent.target.value})}
            />
          </SearchWrapper>
          <MenuBodyDopolnilaInner open={this.state.open}>
            <Query query={GET_PRODUCTS_BY_CATEGORY}>
              {({ loading, error, data }) => {
                if(loading){return(null)}
                if (error) return `Error! ${error.message}`;

                var data2 = data.productsByCategory;
                if(this.state.search.length > 2 && this.state.search.length < 8){
                  var filter = data2.filter(product => product.tag.match(this.state.search));
                  if(filter.length > 0){
                    data2 = filter
                  }
                }
                return (
                  <React.Fragment>
                    {data2.map((complementary, i)=> {
                      var active = false;
                      for(var j=0; j<data2.length; j++){
                        if(this.props.complementary[j]===complementary.tag){
                          active = true
                        }
                      }
                      return(
                      <DopolnilnaItemWrapper 
                        smaller={!complementary.title} 
                        onClick={()=>{
                          this.props.dopolnilnaClicked(complementary.tag)
                          this.setState({open:false})
                        }} 
                        active={active} 
                        key={i}>
                        <DopolnilnaItemImg alt="menuArrClose" alt={complementary.tag} src={complementary.picture_link} />
                        {complementary.title ?
                          <DopolnilnaItemText>
                            {complementary.tag} - {complementary.title}
                          </DopolnilnaItemText>
                          :
                          <DopolnilnaItemText>
                            {complementary.tag}
                          </DopolnilnaItemText>
                        }
                        <DopolnilnaItemButton 
                          active={active}
                        >
                          Izberi
                        </DopolnilnaItemButton>
                      </DopolnilnaItemWrapper>
                    )})}

                  </React.Fragment>
                );
              }}
            </Query>

            
            
          </MenuBodyDopolnilaInner>
          <TextArea 
            changeText={this.props.changeComplementaryText} 
            text={this.props.textComplementary}
            placeholder="Vsebina dopolnilne table"
          />
        </MenuBodyDopolnila>
        
      </MenuWrapper>
    )
  }
}




export const MenuWrapper = styled.div(props => ({
  marginBottom:24,
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
  border: props.active ? "2px solid #4CAF50":"2px solid #fff"
}));
export const HeaderText = styled.div(props => ({
  
}));
export const HeaderImg = styled.img(props => ({
  userSelect:"none",
}));


export const SelectWrapper = styled.div(props => ({
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginTop:24,
  marginBottom:48,
}));





export const MenuBodyDopolnila = styled.div(props => ({
  overflow:"hidden",
  height:props.open ? 520 : 0,
  transition:"0.2s ease-in-out",
  marginBottom:12,
}));
export const MenuBodyDopolnilaInner = styled.div(props => ({
  overflow:"auto",
  height:props.open ? 400 : 0,
  transition:"0.2s ease-in-out",
  marginBottom:12,
  background:"#fff",
}));
export const DopolnilnaItemWrapper = styled.div(props => ({
  width:"calc(100% - 36px)",
  background:"#fff",
  border:props.active ? "#4CAF50 2px solid" : "#fff 2px solid",
  display:"flex",
  padding:props.smaller ? "0px 16px" : "8px 16px",
  cursor:"pointer",
  justifyContent:"flex-start",
  alignItems:"center",
  background:"#fff",
  transition:"0.1s linear",
}));
export const DopolnilnaItemImg = styled.img(props => ({
  height:60,
  width:60,
}));

export const DopolnilnaItemText = styled.div(props => ({
  flexGrow:2,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  margin:"0px 24px",
}));
export const DopolnilnaItemButton = styled.div(props => ({
  userSelect:"none",
  fontSize:14,
  color:"#4CAF50",
  cursor:"pointer",
  transition:"0.2s ease-in-out",
}));


export const SearchWrapper = styled.div(props => ({
  width:"100%",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  borderBottom:"1px solid #C4C4C4",
  background:"#fff",
}));

export const SearchImg = styled.img(props => ({
  width:24,
  marginLeft:16,
}));

export const SearchInput = styled.input(props => ({
  width:370,
  height:48,
  outline:"none",
  border:0,
  background:"#fff",
  borderRadius:0,
  color:"#000",
  paddingLeft:10,
  paddingRight:15,
}));


export default (Complementary)
