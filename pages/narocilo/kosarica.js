import App from '../../components/App'
import { withApollo } from '../../lib/apollo'
import styled from 'styled-components'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Cart from '../../components/order/Cart'



class kosarica extends React.Component {
  render() {
    return (
      <App order={true}>
        <Wrapper>
          <Cart />
        </Wrapper>
      </App>
    )
  }
}


export const Wrapper = styled.div(props => ({
   width:"calc(100% - 60px)",
   margin:"0 auto",
   maxWidth:1250,
   minWidth:500,
}));




export default withApollo({ssr:false})(kosarica)
