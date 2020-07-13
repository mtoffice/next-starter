import styled from 'styled-components'
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import {withRouter} from 'next/router'



const ADD_CART_ITEM = gql`
  mutation AddCartItem($cartItem: CartItem) {
    addCartItem(cartItem: $cartItem) @client
  }
`;

const TOGGLE_PREVIEW = gql`
  mutation TogglePreview($isPreview: Boolean!) {
    togglePreview(isPreview: $isPreview) @client
  }
`;




class Submit extends React.Component {

  render(){
    return(
      <Mutation mutation={TOGGLE_PREVIEW}>
        {(togglePreview) => (
          <Mutation mutation={ADD_CART_ITEM}>
            {(addCartItem, { loading, error }) => {
              return(
                <Button onClick={()=> {
                  if(this.props.counter !== 0){
                    addCartItem({ 
                      variables: {
                        cartItem: {
                          id: this.props.id !== -1 ? this.props.id : null,
                          productId: this.props.product.tag,
                          number: this.props.number,
                          type: this.props.type,
                          dimensions: this.props.dimensions,
                          barLength: this.props.barLength,
                          barDiameter: this.props.barDiameter,
                          barMaterial: this.props.barMaterial,
                          complementary: this.props.complementary ? [...this.props.complementary] : [],
                          addOns: this.props.addOns ? [...this.props.addOns] : [],
                          file: this.props.file,
                          text: this.props.text,
                          textComplementary: this.props.textComplementary,
                          clamp: this.props.clamp,
                        }
                      }
                    })
                    togglePreview({ 
                      variables: { 
                        isPreview: true,
                      }
                    })
                    if(this.props.fromCart){
                      this.props.router.back();
                    } else {
                      setTimeout(()=>this.props.router.push("/"), 400);
                    }
                  } else {
                    alert("dopolni")
                  }
                }}
                >
                  {this.props.fromCart ? "Shrani" : "Dodaj na seznam"}
                </Button>
            )}}
          </Mutation>
        )}
      </Mutation>
    )
  }
}


export const Button = styled.a(props => ({
  display:"flex",
  transition: "0.3s ease-in-out",
  overflow:"hidden",
  flexDirection:"column",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  background:"#fff",
  cursor:"pointer",
  textDecoration:"none",
  color:"#4CAF50",
  border:"2px solid #4CAF50",
  width:140,
  height:36,
  justifyContent:"center",
  alignItems:"center",
}));



export default withRouter(Submit)
