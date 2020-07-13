import App from '../../components/App'
import Cart from '../../components/order/Cart'
import { withApollo } from '../../lib/apollo'
import styled from 'styled-components'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ReviewData = dynamic(
  () => import('../../components/order/ReviewData'),
  { ssr: false }
)

const SignUpInTrigger = dynamic(
  () => import('../../components/signUpIn/SignUpInTrigger'),
  { ssr: false }
)


class kosarica extends React.Component {
  render() {
    return (
      <App order={true}>
        <Wrapper>
          <SignUpInTrigger /> 
          <ReviewData />
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





export default withApollo({ ssr: true })(kosarica)
