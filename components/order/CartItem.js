import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import Link from 'next/link'
import Counter from '../products/Counter'


const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($id: ID) {
    removeCartItem(id: $id) @client
  }
`;


const GET_PRODUCT_BY_ID = gql`
  query Product($tag: String!) {
    product(tag: $tag){
      id
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


class CartItem extends React.Component {
  state = {
    counter:this.props.cartItem.number,
  }


  changeNumber = () => {
    this.props.addCartItem({ 
      variables: {
        cartItem: {
          id: this.props.cartItem.id,
          productId: this.props.cartItem.productId,
          number: this.state.counter,
          type: this.props.cartItem.type,
          dimensions: this.props.cartItem.dimensions,
          barLength: this.props.cartItem.barLength,
          barDiameter: this.props.cartItem.barDiameter,
          barMaterial: this.props.cartItem.barMaterial,
          complementary: this.props.cartItem.complementary,
          addOns: this.props.cartItem.addOns,
          textComplementary: this.props.cartItem.textComplementary,
          clamp: this.props.cartItem.clamp,
          text: this.props.cartItem.text,
          file: this.props.cartItem.file,
        }
      }
    })
  }


  countPlus = () => {
    this.setState({counter:parseInt(this.state.counter)+1},
    ()=> this.changeNumber())
  }
  countMinus = () => {
    if(parseInt(this.state.counter)>1){
      this.setState({counter:parseInt(this.state.counter)-1},
      ()=> this.changeNumber())
    }
  }
  changeCount = (e) => {
    if(e){
      if(!isNaN(parseInt(e.nativeEvent.target.value))){
        this.setState({counter: parseInt(e.nativeEvent.target.value)},
        ()=> this.changeNumber())
      } else {
        this.setState({counter: 0},
        ()=> this.changeNumber())
      }
    } else {
      this.setState({counter: 0},
        ()=> this.changeNumber())
    }
  }

  render(){


    var { barLength, barDiameter, complementary, dimensions, textComplementary, file, text, type, clamp } = this.props.cartItem;
    var detailsArr = [];
    if(dimensions) detailsArr.push("Dimenzija: "+dimensions)
    if(type) detailsArr.push("Tip folije: "+type)
    if(text){
      var newText = text
      if(text.length > 20){
        newText = newText.substring(0, 20)+"..."
      } 
      detailsArr.push("Vsebina: "+newText)
    } 
    if(barLength && barDiameter) detailsArr.push("Drog: "+barLength+", "+barDiameter)
    if(clamp) detailsArr.push("Objemke: "+ clamp)
    if(complementary[0]) {
      var table = "Dopolnilna tabla: "+complementary[0];
      if(textComplementary){
        table = table + ", "+textComplementary
      }
      detailsArr.push(table)
    }


    return(
      <Query variables={{tag:this.props.cartItem.productId+""}} query={GET_PRODUCT_BY_ID}>
        {({ data, loading, client }) => {
          if(loading) return null
          if(!data.product){
            return(
              null
            )
          }
          return(
          <CartItemWrapper cart={this.props.cartPage || this.props.review}>
            <ItemWrapper>
              <ItemImg cart={this.props.cartPage || this.props.review} src={data.product.picture_link.replace(" | ", "")} />
              {!this.props.cartPage && !this.props.review ?
                <ItemDescription>
                  <ItemTitle>{data.product.tag} - {data.product.title}</ItemTitle> 
                  <ItemSpec>{this.props.cartItem.dimensions}, {this.props.cartItem.type}</ItemSpec>
                  <ItemSpec>Količina: <b>{this.props.cartItem.number}</b></ItemSpec>
                </ItemDescription>
                :
                <ItemDescription cart={this.props.cartPage || this.props.review}>
                  <ItemSpec>{data.product.tag}</ItemSpec> 
                  <ItemSpec2>{data.product.title}</ItemSpec2>
                  <Details>
                    {detailsArr.map((detail, i)=>(
                        <DetailItem last={i === detailsArr.length-1} key={i}>{detail}</DetailItem>
                    ))}
                    {file && 
                      <FileDownload target="_blank" href={file} download>
                        <Img alt={file} src="../../icons/attachment.svg" />
                        {file.replace("https://storage.googleapis.com/signaco/attachments/", "")}
                      </FileDownload>
                    }
                  </Details>
                </ItemDescription>
              }
            </ItemWrapper>
            <ItemControls cartPage={this.props.cartPage}>
              {this.props.cartPage &&
                <CounterWrapper>
                  <Counter 
                    changeCount={this.changeCount}
                    countMinus={this.countMinus}
                    countPlus={this.countPlus}
                    counter={this.state.counter}
                  />
                </CounterWrapper>
              }
              {this.props.review &&
                <CountWrapper>
                  <Count>{this.props.cartItem.number}</Count>
                </CountWrapper>
              }
              {!this.props.review &&
                <React.Fragment>
                  <Link href={"/produkt/uredi/"} as={`/produkt/uredi/${this.props.cartItem.productId}/stevilka/${this.props.cartItem.id}`}>
                    <ItemButton>
                      Uredi
                    </ItemButton>
                  </Link>
                  <Mutation mutation={REMOVE_CART_ITEM}>
                    {(removeCartItem) => {
                      return(
                      <ItemButton onClick={()=>removeCartItem({ 
                          variables: { 
                            id: this.props.cartItem.id,
                          }
                        })}>
                        Odstrani
                      </ItemButton>
                    )}}
                  </Mutation>
                </React.Fragment>
              }
            </ItemControls>
            {!this.props.cartPage && !this.props.review &&
              <AddOns>
                {barLength && barDiameter &&
                  <AddOn>
                    {"Drog: "+barLength+", "+barDiameter}
                  </AddOn>
                }
                {clamp && 
                  <AddOn>
                    Objemke: {clamp}
                  </AddOn>
                }
                {this.props.cartItem.complementary.map((item, j)=>(
                  <AddOn key={j}>
                    Dopolnilna tabla: {item}
                    {textComplementary &&
                      ", "+textComplementary
                    }
                  </AddOn>
                ))}
                {this.props.cartItem.addOns.map((addOn, j)=>(
                  <AddOn key={j}>
                    Ostalo: {addOn}
                  </AddOn>
                ))}
                {text && 
                  <AddOn>
                    Vsebina: {text}
                  </AddOn>
                }
                {file && 
                  <FileDownload2 target="_blank" href={file} download>
                    <Img alt={file} src="../../../../icons/attachment.svg" />
                    {file.replace("https://storage.googleapis.com/signaco/attachments/", "")}
                  </FileDownload2>
                }
              </AddOns>
            }
          </CartItemWrapper>
        )
      }}
    </Query>
    )
  }
}

export const CounterWrapper = styled.div(props => ({
  marginRight:50,
  marginLeft:50,
}));
export const CartItemWrapper = styled.div(props => ({
  borderBottom:"1px solid #F1F1F4",
  padding:props.cart ? "24px 0px" : 20,
  display:props.cart ? "flex" : "block",
  justifyContent:"space-between",
  alignItems:"center",
}));
export const ItemWrapper = styled.div(props => ({
  display:"flex",
}));
export const ItemImg = styled.img(props => ({
  height: props.cart ? 120 : 82,
  width:props.cart ? 120 : 82,
}));



export const FileDownload = styled.a(props => ({
  background:"#fff",
  display:"block",
  height:36,
  paddingLeft:12,
  paddingRight:12,
  color:"#000",
  textDecoration:"none",
  marginRight:-12,
  position:"relative",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
}));
export const FileDownload2 = styled.a(props => ({
  display:"block",
  color:"#000",
  fontSize:14,
  textDecoration:"none",
  position:"relative",
  display:"flex",
  marginTop:12,
  alignItems:"center",
}));
export const Img = styled.img(props => ({
  marginRight:8,
}));



export const Details = styled.div(props => ({
  display:"flex",
  justifyContent:"flex-start",
  alignItems:"center",
  flexWrap:"wrap",
  marginTop:20,
  background: "#F1F1F4",
  padding:"0px 12px",
}));
export const DetailItem = styled.div(props => ({
  height:12,
  display:"flex",
  justifyContent:"center",
  padding:"6px 12px",
  marginTop:6,
  marginBottom:6,
  borderRight:props.last ? "none" : "1px solid #000",
  background: "#F1F1F4",
  alignItems:"center",
}));


export const ItemDescription = styled.div(props => ({
  paddingLeft:props.cart ? 24 : 10,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px"
}));
export const ItemTitle = styled.div(props => ({
  marginBottom:9,
  minHeight:34,
}));

export const ItemSpec = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px"
}));
export const ItemSpec2 = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  marginTop:8,
  height:40,
  maxWidth:600,
  marginBottom:8,
}));
export const ItemControls = styled.div(props => ({
  display:"flex",
  justifyContent:"flex-end",
  marginTop:props.cartPage ? 0 : -20,
  alignItems:"center",
}));


export const ItemButton = styled.div(props => ({
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "14px",
  marginLeft:10,
  cursor:"pointer",
  textDecoration: "underline",
  color:"#4CAF50",
}));

export const AddOns = styled.div(props => ({
  paddingTop: 10,
}));
export const AddOn = styled.div(props => ({
  marginTop:10,
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px"
}));

export const Count = styled.div(props => ({
  border:"1px solid #000",
  paddingLeft:10,
  paddingRight:10,
  background:"#F3F4F7",
}));
export const CountWrapper = styled.div(props => ({
 marginTop:-20,
}));

export default (CartItem)