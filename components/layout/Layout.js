import styled from 'styled-components'
import Header from './Header'
import Navigation from './Navigation'
import dynamic from 'next/dynamic'

const Preview = dynamic(
  () => import('./Preview'),
  { ssr: false }
)

const Layout = (props) => {
	return(
		<Wrapper>
	  	<Navigation pathname={props.pathname} />
	  	<PageWrapper>
	  		<Header />
	  		{props.children}
	  	</PageWrapper>
	  	<Preview />
	  </Wrapper>
	)
}

export default (Layout)


export const Wrapper = styled.div(props => ({
   display:"flex",
   alignItems: "stretch",
   width:"100%",
}));

export const PageWrapper = styled.div(props => ({
   alignItems: "stretch",
   flexGrow:1,
   background:"#F1F1F4",
}));