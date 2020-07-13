import styled from 'styled-components'
import { withRouter } from 'next/router'
import { withApollo } from '../../../../lib/apollo'
import LogoutButton from './LogoutButton'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import SignUpInTrigger from "../../../signUpIn/SignUpInTrigger"
import Link from 'next/link'

const ME = gql`
	query Me {
		me {
			id
			company
			username
			role
		}
	}
`;

const IS_ADMIN = gql`
	query IsAdmin @Client {
		isAdmin
	}
`;



class HeaderDropdown extends React.Component {
	state = {
		open:false,
	}

	open = () => {
		this.setState({open:true})
	}

	toggle = () => {
		this.setState({open:!this.state.open})
	}

	close = () => {
		this.setState({open:false})
	}

	logout = () => {
		window.localStorage.removeItem('token');
		this.props.router.push("/");
	}

	mouseDown = () => {
		this.setState({open:false})
	}

	componentDidMount() {
		// document.getElementById("profil").addEventListener('mouseleave', this.mouseDown);
  }

  componentWillUnmount() {
  	// document.getElementById("profil").removeEventListener('mouseleave', this.mouseDown);
  }



	render(){

		return(
			<Wrapper>
				<Query query={ME} context={{headers:{token:window.localStorage.getItem("token")}}}>
					{({ data, loading, error, client }) => {

						if(loading) return null
						if(error) {
							if(error.message == "GraphQL error: Your session expired. Sign in again."){
								client.writeData({ data: { isLoggedIn: false } })
								return <SignUpInTrigger tokenExpired={true} /> ;
							} else {
								return null
							}
						}
						var me = data.me; 
						if (me && me.role === "ADMIN") {
							client.writeData({data: {isAdmin: true}})
						}
						var company = me.username;
						if(me){
							if(me.company){
								company = me.company
							}
						}
						
						return(
							<Query query={IS_ADMIN}>
								{({data, error}) => (
									<React.Fragment>
										<Button onClick={this.toggle}>
											{data.isAdmin ? 
												"Signaco d.o.o."
												:
												company
											}
										</Button>
										<Img open={this.state.open} onClick={this.toggle} src="../../../../icons/menuArrClose.svg" />
									</React.Fragment>
								)}
							</Query>
						)
					}}
				</Query>
				<Query query={IS_ADMIN}>
					{({data, error}) => {
						return (
							<DropdownWrapper open={this.state.open}>
								<Dropdown>
									<Link href="/">
										<DropdownButton admin={true} onClick={this.close}>
											Vsi znaki
										</DropdownButton>
									</Link>
									<Link href="/uporabnik/narocila">
										<DropdownButton admin={true} onClick={this.close}>
											Naročila
										</DropdownButton>
									</Link>
									<Link href="/uporabnik/nastavitve">
										<DropdownButton admin={!data.isAdmin} onClick={this.close}>

											Nastavitve
										</DropdownButton>
									</Link>
									<LogoutButton />
								</Dropdown>
							</DropdownWrapper>
						)
					}}
				</Query>
			</Wrapper>
		)
	}
}

export const InnerWrapper = styled.div(props => {

})


export const Wrapper = styled.div(props => ({
   display:"flex",
   alignItems:"center",
   marginRight:30,
   position:"relative",
}));

export const Button = styled.div(props => ({
  display:"block",
  transition: "0.3s ease-in-out",
  userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  textDecoration:"underline",
  color:"#4CAF50",
  cursor:"pointer",
}));

export const Img = styled.img(props => ({
	cursor:"pointer",
	paddingLeft:8,
	paddingRight:10,
	paddingTop:0 ,
	transform:props.open ? "rotate(180deg)" : "rotate(0deg)",
	transition:"0.2s ease-in-out",
}));

export const DropdownWrapper = styled.div(props => ({
	opacity:props.open ? 1 : 0,
	transition:props.open ? "opacity 0.3s ease-in-out, height 0.1s ease-in-out" : "opacity 0.3s ease-in-out, height 0.1s ease-in-out 0.2s",
	overflow:"hidden",
	position:"absolute",
	top:40,
	right:0,
	display: props.open ? "flex" : "none",
	justifyContent:"center",
	alignItems:"center",
	boxShadow: "0px 2px 12px rgba(21, 23, 54, 0.15)",
}));

export const Dropdown = styled.div(props => ({
	height:"100%",
	width:200,
	background:"#fff",
	overflow:"hidden",
}));

export const DropdownButton = styled.div(props => ({
	display: props.admin ? "flex" : "none",
	height:48,
	paddingLeft:20,
	cursor:"pointer",
	justifyContent:"flex-start",
	alignItems:"center",
	userSelect:"none",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "17px",
  color:"#4CAF50",
  ":hover":{
  	background:"#F1F1F4",
  }
}));



export default withApollo()(withRouter(HeaderDropdown))
