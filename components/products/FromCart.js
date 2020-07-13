import App from '../../components/App'
import Showcase from '../../components/products/Showcase'
import Menus from '../../components/products/Menus'
import styled from 'styled-components'
import Link from 'next/link'
import { Query } from 'react-apollo';
import gql from "graphql-tag";



class FromCart extends React.Component {

  render() {
    self = this
    var cartItems = [];
    if(window.localStorage.cartItems){
      cartItems = JSON.parse(window.localStorage.cartItems)
    }

    var data = [...cartItems]
    data = data.filter(function( obj ) {
      return obj.id == self.props.cartId;
    });

    return (
      <Menus data={data} fromCart={true} product={this.props.product} />
    )
  }
}




export default FromCart

