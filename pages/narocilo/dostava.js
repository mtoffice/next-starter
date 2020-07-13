import App from '../../components/App'
import { withApollo } from '../../lib/apollo'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

const DeliveryData = dynamic(
  () => import('../../components/order/DeliveryData'),
  { ssr: false }
)

const SignUpInTrigger = dynamic(
  () => import('../../components/signUpIn/SignUpInTrigger'),
  { ssr: false }
)


class dostava extends React.Component {
  render() {
    return (
      <App order={true}>
        <Wrapper>
          <SignUpInTrigger /> 
          <DeliveryData />
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






export default withApollo({ssr:true})(dostava)
