import App from '../components/App'
import { withApollo } from '../lib/apollo'
import Signs from '../components/viewer/signs'
import styled from 'styled-components'
import { Query } from 'react-apollo';
import gql from "graphql-tag";
import { withRouter } from 'next/router'


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


class dopolnilneTable extends React.Component {
  static async getInitialProps(context) {
    var data = context.query;
    return { data }
  }


  render() {
    var id, subcategory, index;
    if(this.props.data.subcategory){
      id = this.props.data.subcategory;
    } else if(process.browser) {
      id = window.location.pathname.substring(1);
    }
    if(id){
      id = id.replace(/-/g," ").replace(/%C5%A1/g,"š").replace(/%C4%8D/g,"č").replace(/%C5%BE/g,"ž")

      index = id.indexOf("/");
      subcategory = id.substring(index+1)
    }
    return (
      <App pathname={"dopolnilne-table"}>
        <Wrapper>
          <Query  query={GET_PRODUCTS_BY_CATEGORY}>
            {({ loading, error, data }) => {
              if(loading){
                return(
                  <React.Fragment>
                    <TitleH1>Dopolnilne table</TitleH1>
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

              for(var i = 0; i<data.productsByCategory.length; i++){
                var je = false;
                for(var j = 0; j<subcategories.length; j++){
                  if(data.productsByCategory[i].subcategory === subcategories[j]){
                    je = true;
                  }
                }
                if(!je){
                  subcategories.push(data.productsByCategory[i].subcategory)
                }
              }

              var data = data.productsByCategory;
              var filter = data.filter(product => product.subcategory === subcategory);
              if(filter.length > 0){
                data = filter
              }
              return (
                <Signs subcategory2={subcategory} pathname={"dopolnilne-table"} subcategories={subcategories} data={data} />
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



export default withApollo({ ssr: true })(withRouter(dopolnilneTable))

