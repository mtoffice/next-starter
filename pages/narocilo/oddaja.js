import App from '../../components/App'
import Success from '../../components/order/Success'
import { withApollo } from '../../lib/apollo'
import styled from 'styled-components'



class oddaja extends React.Component {
  render() {
    return (
      <App order={true}>
        <Wrapper>
          <Success />
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



export default withApollo({ ssr: true })(oddaja)
