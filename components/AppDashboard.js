import Layout from './dashboard/Layout'


export default class App extends React.Component {
	render(){
	  return (
	    <main>
	      <Layout>
	      	{this.props.children}
	      </Layout>
	    </main>
	  )
	}
}
