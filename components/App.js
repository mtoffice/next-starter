import Layout from './layout/Layout'
import CartLayout from './layout/CartLayout'

export default class App extends React.Component {

	render(){
	  return (
	    <main>
	    	{this.props.order ?
		    	<CartLayout>
		      	{this.props.children}
		      </CartLayout>
		      :
		      <Layout pathname={this.props.pathname}>
		      	{this.props.children}
		      </Layout>
		    }
	    </main>
	  )
	}
}
