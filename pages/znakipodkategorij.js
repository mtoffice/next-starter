import App from '../components/App'
import { withApollo } from '../lib/apollo'
import Signs from '../components/viewer/signs'
import styled from 'styled-components'
import Link from 'next/link'
import { Query } from 'react-apollo';
import gql from "graphql-tag";


const GET_PRODUCTS_BY_CATEGORY = gql`
  query ProductsBySubcategory($subcategory: String!) {
    productsBySubcategory(subcategory: $subcategory ){
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

class znaki extends React.Component {
  static async getInitialProps(context) {
    var data = context.query;
    return { data }
  }


  render() {
    var id, id2, category, subcategory, index;
    if(this.props.data.category){
      id = this.props.data.category;
      id2 = this.props.data.subcategory;
    } else {
      id = window.location.pathname.substring(1);
    }

    id = id.replace(/-/g," ").replace("%C5%A1","š").replace("%C4%8D","č").replace("%C5%BE","ž")

    index = id.indexOf("/");
    console.log(index)
    category = id.substring(0,index)
    subcategory = id.substring(index+1)
    var pathname = category.replace(/ /g,"-")

    console.log(category, subcategory)
    return (
      <App pathname={pathname}>
        <Wrapper>
          dsadsa
          <Query variables={{subcategory:subcategory}} query={GET_PRODUCTS_BY_CATEGORY}>
            {({ loading, error, data }) => {
              if(loading){
                return(
                  <React.Fragment>
                    <TitleH1>Err: {category}</TitleH1>
                    <SignsWrapper>
                      <Sign/><Sign/><Sign/><Sign/>
                      <Sign/><Sign/><Sign/><Sign/>
                      <Sign/><Sign/><Sign/><Sign/>
                      <Sign/><Sign/>
                    </SignsWrapper>
                  </React.Fragment>
                );
              }
              if (error) return `Error! ${error.message}`;
              var subcategories = [];
              console.log(data);
              for(var i = 0; i<data.productsBySubcategory.length; i++){
                var je = false;
                for(var j = 0; j<subcategories.length; j++){
                  if(data.productsBySubcategory[i].subcategory === subcategories[j]){
                    je = true;
                  }
                }
                if(!je){
                  subcategories.push(data.productsBySubcategory[i].subcategory)
                }
              }

              console.log(subcategories);
              return (
                <Signs subcategories={subcategories} data={data.productsBySubcategory} />
              );
            }}
          </Query>
        </Wrapper>
      </App>
    )
  }
}


export const Wrapper = styled.div(props => ({
   width:"calc(100% - 60px)",
   margin:"0 auto",
   maxWidth:1000,
   minWidth:500,
}));

export const SignsWrapper = styled.div(props => ({
   display:"flex",
   justifyContent:"flex-start",
   alignItems:"center",
   flexWrap:"wrap",
   width:"100%",
   marginTop:20,
}));


export const Sign = styled.div(props => ({
  width:200,
  margin:24,
  height:280,
  display:"flex",
  justifyContent:"flex-start",
  alignItems:"center",
  flexDirection:"column",
  background:"#ececec",
}));



export const TitleH1 = styled.h1(props => ({
  margin:0,
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "22px",
  paddingTop:60,
  marginLeft:24,
}));



export default withApollo({ ssr: true })(znaki)
