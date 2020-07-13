import App from '../../components/App'
import Showcase from '../../components/products/Showcase'
import Menus from '../../components/products/Menus'
import { withApollo } from '../../lib/apollo'
import styled from 'styled-components'
import Link from 'next/link'
import { Query } from 'react-apollo';
import gql from "graphql-tag";



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

class znak extends React.Component {
  static async getInitialProps(context) {
    var data = context.query;
    return { data }
  }

  render() {
    var id;
    if(this.props.data.hash){
      id = this.props.data.hash;
    } else {
      id = window.location.pathname.substring(14);
    }
    return (
      <App>
       <Query variables={{tag:id}} query={GET_PRODUCT_BY_ID}>
          {({ loading, error, data }) => {
            if (loading) return '';
            if (error) return `Error! ${error.message}`;
            return (
              <Wrapper>
                <Showcase product={data.product} />
                <Menus product={data.product} />
              </Wrapper>
            );
          }}
        </Query>
      </App>
    )
  }
}


export const Wrapper = styled.div(props => ({
   width:"calc(100% - 60px)",
   margin:"0 auto",
   maxWidth:760,
   minWidth:500,
   display:"flex",
   justifyContent:"space-between",
}));






export default withApollo({ ssr: true })(znak)
