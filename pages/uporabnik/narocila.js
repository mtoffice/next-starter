import AppDashboard from '../../components/AppDashboard'
import { withApollo } from '../../lib/apollo'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Link from "next/link";
import LogoutButton from "../../components/dashboard/orders/popups/LogoutButton";
import {Query} from "react-apollo";
import gql from "graphql-tag";

const Orders = dynamic(
  () => import('../../components/dashboard/orders/Orders'),
  { ssr: false }
)


class narocila extends React.Component {
  static async getInitialProps(context) {
    var data = context.query;
    return { data }
  }


  render() {
    return (
      <AppDashboard>
        <Wrapper>
          <Orders hash={this.props.data.hash} />
        </Wrapper>
      </AppDashboard>
    )
  }
}


export const Wrapper = styled.div(props => ({
  width:"100%",
}));






export default withApollo({ssr:true})(narocila)
