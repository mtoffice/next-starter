import Link from 'next/link'
import { withRouter } from 'next/router'
import styled from 'styled-components'

const Header = ({ router: { pathname } }) => (
  <Wrapper>
    <Link href="/">
      <A active={pathname === '/'}>Home</A>
    </Link>
    <Link href="/client-only">
      <A active={pathname === '/client-only'}>
        Client-Only
      </A>
    </Link>
    <Link href="/about">
      <A active={pathname === '/about'}>About</A>
    </Link>
  </Wrapper>
)

export default withRouter(Header)

const A = styled.a(props => ({
  fontSize: "14px",
  marginRight: "15px",
  textDecoration: "none",
  textDecoration: props.active ? "underline" : "none",
}));

const Wrapper = styled.header(props => ({
  marginBottom: "25px",
}));
