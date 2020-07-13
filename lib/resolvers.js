import gql from "graphql-tag";



const GET_CART_ITEMS = gql`
  query CartItems {
    cartItems @client{
      id
      productId
      count
      type
      dimensions
    } 
  }
`;



export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [CartItem!]!
    cartItem(id: ID): CartItem
  }

  extend type Mutation {
    toggleLogin(isLoggedIn: Boolean!): Boolean!
    addOrUpdateCartItem(cartItem: CartItem): [CartItem]!
    removeCartItem(id: ID): [CartItem]!
  }

  type CartItem {
    id: Int
    productId: String
    count: Int
    type: String
    dimensions: String
  }
`;



export const resolvers = {
  Query: {
    cartItem: (_, {id}, { cache }, info) => {
      
      var cartItems = [];
      if(window.localStorage.cartItems){
        cartItems = JSON.parse(window.localStorage.cartItems)
      }

      var data = [...cartItems]

      data = data.filter(function( obj ) {
        return obj.id == id;
      });

      return data;
    },
    cartItems: (_, args, { cache }, info) => {
      
      var cartItems = [];
      if(window.localStorage.cartItems){
        cartItems = JSON.parse(window.localStorage.cartItems)
      }

      var data = [...cartItems]

      data.sort(function(a, b) { 
        return  a.id - b.id;
      });

      return data;
    },
  },

  Mutation: {
    toggleLogin: (_root, variables, { cache, getCacheKey }) => {
      const data = { isLoggedIn: variables.isLoggedIn };
      cache.writeData({ data });
      return variables.isLoggedIn;
    },
    
    removeCartItem: (_, {id}, { cache }, info) => {
      const queryResult = cache.readQuery({
        query: GET_CART_ITEMS
      });
      const { cartItems } = queryResult;

      var data = [...cartItems]

      data = data.filter(function( obj ) {
        return obj.id !== id;
      });

      data = {
        cartItems:[...data]
      }

      cache.writeQuery({ query: GET_CART_ITEMS, data });

      window.localStorage.cartItems = JSON.stringify(data.cartItems)

      return data.cartItems;
    },
    addOrUpdateCartItem: (_, {cartItem}, { cache }) => {
      const queryResult = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const { cartItems } = queryResult;

      var data = [...cartItems];

      var id = 0;
      if(data.length > 0){
        id = parseInt(data[data.length-1].id) + 1;
      }

      const newCartItem = {
        id: cartItem.id ? cartItem.id : id,
        productId: cartItem.productId,
        count: cartItem.count,
        type: cartItem.type,
        dimensions: cartItem.dimensions,
        __typename: 'cartItem',
      };
        

      data = data.filter(function( obj ) {
        return obj.id !== cartItem.id;
      });

      var array = [...data, newCartItem];

      array.sort(function(a, b) { 
        return a.id - b.id;
      });

      var data = {
        cartItems:[...array]
      }
      
      cache.writeQuery({ query: GET_CART_ITEMS, data });

      window.localStorage.cartItems = JSON.stringify(data.cartItems)

      return data.cartItems;
    },
  },
};