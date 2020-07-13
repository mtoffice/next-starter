import styled from 'styled-components'
import CartHeader from './CartHeader'
import CartNavigation from './CartNavigation'



const CartLayout = ({ children }) => {
	return(
		<Wrapper>
	  	<PageWrapper>
	  		<CartHeader />
	  		<CartNavigation />
	  		{children}
	  	</PageWrapper>
	  </Wrapper>
	)
}

export default (CartLayout)


export const Wrapper = styled.div(props => ({
   display:"flex",
   alignItems: "stretch",
   width:"100%",
}));

export const PageWrapper = styled.div(props => ({
   alignItems: "stretch",
   flexGrow:1,
   background:"#fff",
}));