import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { resolvers, typeDefs } from "./lib/resolvers";
import { createUploadLink } from 'apollo-upload-client';

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  
  var cache = new InMemoryCache().restore(initialState);

  var token; 
  if(process.browser){
    if(!!localStorage.getItem("token")){
      token = {token: localStorage.getItem("token")}
    } else {
      token = null
    } 
  }
    
    

  const client = new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new createUploadLink({
      uri: process.env.NODE_ENV==="production" ? "https://signaco-api.herokuapp.com/graphql" : 'http://localhost:3000/graphql',
      headers: token,
      credentials: 'same-origin',
    }),
    cache: cache,
    typeDefs,
    resolvers
  });

  client.cache.writeData({
    data: {
      isLoggedIn: false,
      isAdmin: false,
      isPreview: false,
      agreeToPrivacyPolicy:false,
      orders:[],
      cartItems:[],
      successPopup: {
        __typename: "successPopup",
        show: false,
        error: false
      },
    }
  });

  if(process.browser){
    var cartItems = [];
    if(window.localStorage.cartItems){
      cartItems = JSON.parse(window.localStorage.cartItems)
    }
    client.cache.writeData({
      data: {
        isLoggedIn: !!localStorage.getItem("token"),
        isAdmin: false,
        isPreview: false,
        agreeToPrivacyPolicy: false,
        orders:[],
        cartItems:cartItems,
        successPopup: {
          __typename: "successPopup",
          show: false,
          error: false
        },
      }
    });
  }

  return client;
}
