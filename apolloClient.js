import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
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
      uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
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
      cartItems:[],
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
        cartItems:cartItems,
      }
    });
  }

  return client;
}
