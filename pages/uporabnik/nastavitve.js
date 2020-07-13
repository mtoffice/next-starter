import AppDashboard from '../../components/AppDashboard'
import { withApollo } from '../../lib/apollo'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

const SettingsData = dynamic(
    () => import('../../components/dashboard/user/SettingsData'),
    { ssr: false }
)


class nastavitve extends React.Component {
    static async getInitialProps(context) {
        var data = context.query;
        return { data }
    }


    render() {
        return (
            <AppDashboard>
                <Wrapper>
                    <SettingsData hash={this.props.data.hash} />
                </Wrapper>
            </AppDashboard>
        )
    }
}

export const Wrapper = styled.div(props => ({
    width:"100%",
}));


export default withApollo({ssr:false})(nastavitve)