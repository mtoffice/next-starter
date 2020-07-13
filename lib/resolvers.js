import gql from "graphql-tag";

const GET_CART_ITEMS = gql`
  query CartItems {
    cartItems @client{
      id
      productId
      number
      type
      dimensions
      barLength
      barDiameter
      barMaterial
      complementary
      file
      text
      textComplementary
      clamp
      addOns
    } 
  }
`;

const GET_ORDERS = gql`
  query Orders {
    orders @client{
      id
      cartItems {
          productId
          number
          type
          dimensions
          barLength
          barDiameter
          barMaterial
          complementary
          file
          text
          textComplementary
          clamp
          addOns
      }
      date
      status
      dostava
      deliveryInfo {
        firstName
        secondName
        company
        taxNumber
        adress
        postalCode
        postal
        telephone
        notes
      }
    } 
  }
`;

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    isAdmin: Boolean!
    isPreview: Boolean!
    delivery: String
    cartItems: [CartItem!]!
    cartItem(id: ID): CartItem
    userInfo: UserInfo
    deliveryInfo: DeliveryInfo
    agreeToPrivacyPolicy: Boolean!
    orders: [Order!]!
    order(id: ID!): Order
  }

  extend type Mutation {
    togglePreview(isPreview: Boolean!): Boolean!
    toggleLogin(isLoggedIn: Boolean!): Boolean!
    toggleAgreeToPrivacyPolicy(agreeToPrivacyPolicy: Boolean!): Boolean!
    changeDelivery(delivery: String): String
    changeDeliveryInfo(deliveryInfo: DeliveryInfo): DeliveryInfo
    submitOrder(order: Order): Order
    addCartItem(cartItem: CartItem): [CartItem]!
    removeCartItem(id: ID): [CartItem]!
  }

  type CartItem {
    id: Int
    productId: String
    number: Int
    type: String
    dimensions: String
    barLength: String
    barDiameter: String
    barMaterial: String
    complementary: [Int]
    file: String
    text: String
    textComplementary: String
    clamp: String
    addOns: [Int]
  }


  type Order {
    id: ID,
    cartItems: [CartItem!]!
    date: String
    status: String
    dostava: String
    deliveryInfo: DeliveryInfo
  }

  type UserInfo {
    username: String
    email: String
    password: String
    password2: String
  }

  type DeliveryInfo {
    first_name: String
    second_name: String
    company: String
    tax_id: String
    address: String
    city: String
    zip_code: String
    phone: String
    notes: String
    delivery_method: String
  }
  

  type Product {
    id: ID
    tag: String
    category: String
    subcategory: String
    class: String
    title: String
    description: String
    picture_link: String
    propose_of_marking: String
    aditional_requirements: String
    date_created: String
    date_modified: String
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
    order: (_, {id}, { cache }, info) => {
      const queryResult = cache.readQuery({
        query: GET_ORDERS
      });
      const { orders } = queryResult;

      var data = [...orders]

      data = data.filter(function( obj ) {
        return obj.id == id;
      });
      return data;
    },
  },

  Mutation: {
    togglePreview: (_root, variables, { cache, getCacheKey }) => {
      const data = { isPreview: variables.isPreview };
      cache.writeData({ data });
      return variables.isPreview;
    },
    toggleLogin: (_root, variables, { cache, getCacheKey }) => {
      const data = { isLoggedIn: variables.isLoggedIn };
      cache.writeData({ data });
      return variables.isLoggedIn;
    },
    toggleAgreeToPrivacyPolicy: (_root, variables, { cache, getCacheKey }) => {
      const data = { agreeToPrivacyPolicy: variables.agreeToPrivacyPolicy };
      cache.writeData({ data });
      return variables.agreeToPrivacyPolicy;
    },
    changeDelivery: (_root, variables, { cache, getCacheKey }) => {
      const data = { delivery: variables.delivery };
      cache.writeData({ data });
      return variables.delivery;
    },
    changeDeliveryInfo: (_root, variables, { cache, getCacheKey }) => {
      console.log(variables)
      const data = { deliveryInfo: {
        first_name: variables.deliveryInfo.first_name,
        second_name: variables.deliveryInfo.second_name,
        company: variables.deliveryInfo.company,
        tax_id: variables.deliveryInfo.tax_id,
        address: variables.deliveryInfo.address,
        city: variables.deliveryInfo.city,
        zip_code: variables.deliveryInfo.zip_code,
        phone: variables.deliveryInfo.phone,
        notes: variables.deliveryInfo.notes,
        delivery_method: variables.deliveryInfo.delivery_method,
        __typename: 'deliveryInfo',
      }};
      console.log(data)
      cache.writeData({ data });
      console.log(cache);
      return variables.deliveryInfo;
    },
    submitOrder: (_root, variables, { cache, getCacheKey }) => {
      console.log(variables)

      const queryResult = cache.readQuery({
        query: GET_ORDERS
      });

      const newOrder = {
        productId: variables.order.productId, 
        date: variables.order.date, 
        status: variables.order.status, 
        dostava: variables.order.dostava, 
        deliveryInfo: variables.order.deliveryInfo, 
        cartItems: variables.order.cartItems, 
        __typename: 'order',
      };


      const { orders } = queryResult;

      var data = [...orders]


      var data = {
        orders:[...data, newOrder]
      }


      cache.writeQuery({ query: GET_ORDERS, data });

      return variables.order;
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
    addCartItem: (_, {cartItem}, { cache }) => {
      console.log(cartItem)
      const queryResult = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const { cartItems } = queryResult;

      var data = [...cartItems];

      var array = [...data];


      var id = 0;
      if(array.length > 0){
        array.sort(function(a, b) { 
          return  a.id - b.id;
        });
        id = parseInt(array[array.length-1].id) + 1;
      }
      

      const newCartItem = {
        id: cartItem.id ? cartItem.id : id,
        productId: cartItem.productId,
        number: cartItem.number,
        type: cartItem.type,
        dimensions: cartItem.dimensions,
        barLength: cartItem.barLength,
        barDiameter: cartItem.barDiameter,
        barMaterial: cartItem.barMaterial,
        complementary: cartItem.complementary,
        addOns: cartItem.addOns,
        file: cartItem.file,
        text: cartItem.text,
        textComplementary: cartItem.textComplementary,
        clamp: cartItem.clamp,
        __typename: 'cartItem',
      };
        

      var data = data.filter(function( obj ) {
        return obj.id !== cartItem.id;
      });

      array = [...data, newCartItem];


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