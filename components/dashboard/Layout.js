import styled from 'styled-components'
import Header from './Header'


const Layout = ({ children }) => {
	return(
		<Wrapper>
	  	<Header />
	  	{children}
	  </Wrapper>
	)
}



export const Wrapper = styled.div(props => ({
   width:"100%",
}));

export default Layout
