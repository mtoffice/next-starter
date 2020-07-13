import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import AdminOrderList from "./AdminOrderList"
import DeleteOrder from "./popups/DeleteOrder";


const UPDATE_ORDER = gql`
    mutation UpdateOrder (
        $id: ID!
        $cartItems: [CartItemInput]
    ) {
        updateOrder(
            id: $id
            cartItems: $cartItems
        )
    }
`;

const GET_USER = gql`
  query User ($id: ID!) {
    user (id: $id) {
      id
      username
      email
      role
    }
  }
`;



export const DropdownContext = React.createContext();

class Order extends React.Component {
    state = {
        openStatus:false,
        status: "Sprejeto",
        openVersion: false,
        version: {},
        editing: false,
        versions: [],
        cartItems: [],
        type: "",
        dimenzija:"",
        updated: false
    }

    static getDerivedStateFromProps(props, state){
        if(props && (state.updated === false)){
            console.log(props);
            return({
                version: props.version ? props.version : {},
                versions: props.versions ? props.versions : [],
                updated:true,
            })
        } else {
            return null
        }
    }

    setStatus = (status) => {
        this.setState({status: status})
    };

    toggleStatus = () => {
        this.setState({openStatus:!this.state.openStatus})
    }

    setVersion = (version) => {
        this.setState({version: version})
    };

    toggleVersion = () => {
        this.setState({openVersion:!this.state.openVersion})
    }

    setCartItems = (cartItems) => {
        console.log(cartItems)
        this.setState({cartItems: cartItems});
    }

    logout = () => {
        window.localStorage.removeItem('token');
        this.props.router.push("/");
    }

    setVersionObject = (version) => {
        console.log(version);
        for (let i = 0; i < version.length; i++) {
            let arr = this.state.versions;
            arr.push(
                <DropdownButton  onClick={() => {this.setVersion(version[i]); this.toggleVersion()}} key={i}>
                    {i + 1}
                </DropdownButton>
            )
            this.setState({versions: arr});
        }

        if (Object.keys(this.state.version).length === 0) {
            this.setState({version: version[version.length - 1]});
        }
    }

    render(){

        let order = this.props.order;
        console.log(this.props.versions);
        return(
            <Wrapper>


                <Query query={GET_USER} variables={{id: order.userId}} context={{headers:{token:window.localStorage.getItem("token")}}}>
                    {({data, loading, error, client}) => {
                        if(loading) return null
                        if(error){
                            return null
                        }

                        if(data) {
                            const user = data.user;
                            return (
                                <OrderWrapper>
                                    <OrderHeader>
                                        <Line1>
                                            <Line1Wrap>
                                                <TextMargin><b>{order.company}</b></TextMargin>
                                                <TextMargin>Št. naročila: <b>{order.id}</b></TextMargin>
                                                <TextMargin>Dostava: <b>{order.delivery_method}</b></TextMargin>
                                                <Text>Status: <b>{order.status}</b></Text>
                                            </Line1Wrap>
                                            <Text>{this.props.displayData.newDate}{" ob "}{this.props.displayData.time}</Text>
                                        </Line1>
                                        {!!order.notes &&
                                        <Line2>
                                            <Text>{order.notes}</Text>
                                        </Line2>
                                        }
                                        <Line3>
                                            <DropDownContainer>
                                                <Button onClick={this.toggleStatus}>
                                                    Status:  {this.state.status}
                                                    <Img open={this.state.openStatus} onClick={this.toggleStatus} src="../../icons/menuArrClose.svg" />
                                                </Button>
                                                <DropdownWrapperStatus openStatus={this.state.openStatus}>
                                                    <Dropdown>
                                                        <DropdownButton onClick={() => {this.setStatus("Novo"); this.toggleStatus()}}>
                                                            Novo
                                                        </DropdownButton>
                                                        <DropdownButton onClick={() => {this.setStatus("V pregledu"); this.toggleStatus()}}>
                                                            V pregledu
                                                        </DropdownButton>
                                                        <DropdownButton onClick={() => {this.setStatus("Sprejeto"); this.toggleStatus()}}>
                                                            Sprejeto
                                                        </DropdownButton>
                                                        <DropdownButton onClick={() => {this.setStatus("Pripravljeno"); this.toggleStatus()}}>
                                                            Pripravljeno
                                                        </DropdownButton>
                                                    </Dropdown>
                                                </DropdownWrapperStatus>

                                            </DropDownContainer>
                                            <InlineSpacer width={16}/>
                                            <DropDownContainer>
                                                <Button width={108} onClick={this.toggleVersion}>
                                                    Verzija:  {this.state.version.version}
                                                    <Img open={this.state.openVersion} onClick={this.toggleVersion} src="../../icons/menuArrClose.svg" />
                                                </Button>
                                                <DropdownWrapperVersion openVersion={this.state.openVersion}>
                                                    <Dropdown width={108}>
                                                        {this.state.versions.map((version, j) => (
                                                            <DropdownButton  onClick={() => {this.setVersion(version); this.toggleVersion()}} key={j}>
                                                                {j + 1}
                                                            </DropdownButton>
                                                        ))}
                                                    </Dropdown>

                                                </DropdownWrapperVersion>
                                            </DropDownContainer>

                                            <InlineSpacer width={48}/>
                                            <Button onClick={()=>window.open(`mailto:info@signaco.si?subject=Imam vprašanje glede naročila št.: ${order.id}&body=Pozdravljeni,%0D%0A%0D%0AImam vprašanje glede naročila številka: ${order.id}`)}>
                                                <ButtonImg alt="mail signaco" src="../../icons/mail.svg" />
                                                Odgovori
                                            </Button>
                                            <Button >
                                                <ButtonImg alt="mail signaco" src="../../icons/trash.svg" />
                                               <DeleteOrder id={order.id} />
                                            </Button>
                                            <Mutation mutation={UPDATE_ORDER} context={{headers:{token:window.localStorage.getItem("token")}}}>
                                                {(updateOrder, {data, loading, error, client}) => {
                                                    if (error) {
                                                       console.log(error)
                                                    }
                                                    return (
                                                        <SaveButtonWrapper>
                                                            {this.state.editing === true ?
                                                                <Button save={true} onClick={() => {
                                                                        order.cartItems.forEach((o) => {delete o.__typename})
                                                                        updateOrder({
                                                                            variables: {
                                                                                id: order.id,
                                                                                cartItems: order.cartItems
                                                                            }
                                                                        });
                                                                        this.setState({editing: false})
                                                                }}>
                                                                    <ButtonImg alt="mail signaco" src="../../icons/save.svg" />
                                                                    Shrani spremembe
                                                                </Button>
                                                                :
                                                                <Button save={true} onClick={()=> this.setState({editing: true})}>
                                                                    <ButtonImg alt="mail signaco" src="../../icons/pen.svg" />
                                                                    Uredi naročilo
                                                                </Button>
                                                            }
                                                        </SaveButtonWrapper>
                                                    )
                                                }}
                                            </Mutation>
                                        </Line3>
                                    </OrderHeader>
                                    <DropdownContext.Provider value={{
                                        type: this.state.type,
                                        changeType: (e) => {
                                            this.setState({type:e})
                                        },
                                        dimenzija: this.state.dimenzija,
                                        changeDimension: (e) => {
                                            this.setState({dimenzija:e})
                                        }
                                    }}>
                                        <AdminOrderList versionId={this.state.version.id} editing={this.state.editing}/>
                                    </DropdownContext.Provider>
                            </OrderWrapper>
                            )
                        }
                    }}
                </Query>
            </Wrapper>
        )
    }
}

const Version = styled.div(props => ({

}))

const SaveButtonWrapper = styled.div(props => ({

}));

const InlineSpacer = styled.div(props => ({
    width: props.width ? props.width : 50,
    display: "inline-block"
}));

export const Img = styled.img(props => ({
    cursor:"pointer",
    transform:props.open ? "rotate(180deg)" : "rotate(0deg)",
    transition:"0.2s ease-in-out",
    marginLeft: 10
}));

export const Wrapper = styled.div(props => ({
    flexGrow:2,
    width:"100%",
    margin:"0 auto",
    maxWidth:1050,
    minWidth:800,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",

    maxHeight:"calc(100vh - 61px)",
    overflowX:"hidden",
    overflowY:"scroll",
}));

export const OrderWrapper = styled.div(props => ({
    width:"calc(100% - 60px)",
    margin:"0 auto",
}));
export const OrderHeader = styled.div(props => ({
    marginTop:48,
}));
export const Line1Wrap = styled.div(props => ({
    display:"flex",
}));
export const Text = styled.div(props => ({

}));
export const TextMargin = styled.div(props => ({
    marginRight:24,
}));
export const Line1 = styled.div(props => ({
    display:"flex",
    justifyContent:"space-between",
    marginBottom:24,
}));
export const Line2 = styled.div(props => ({

}));
export const Line3 = styled.div(props => ({
    marginTop:48,
    paddingBottom:48,
    borderBottom:"1px solid #000",
    display: "flex",
}));


export const Button = styled.div(props => ({
    display:"flex",
    transition: "0.1s ease-in-out",
    overflow:"hidden",
    userSelect:"none",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    background: props.save ? "#4CAF50" : "#fff",
    cursor:"pointer",
    textDecoration:"none",
    color: props.save ? "#fff" : "#000",
    border:"2px solid #4CAF50",
    width: props.width ? props.width : 160,
    height:36,
    justifyContent:"center",
    alignItems:"center",
}));

export const ButtonImg = styled.img(props => ({
    marginRight:10,
}));

const DropDownContainer = styled.div(props => ({
    position: "relative"
}));

export const DropdownWrapperStatus = styled.div(props => ({
    opacity:props.openStatus ? 1 : 0,
    transition:props.openStatus ? "opacity 0.3s ease-in-out, height 0.1s ease-in-out" : "opacity 0.3s ease-in-out, height 0.1s ease-in-out 0.2s",
    overflow:"hidden",
    position: "absolute",
    display: props.openStatus ? "flex" : "none",
    justifyContent:"center",
    alignItems:"center",
    boxShadow: "0px 2px 12px rgba(21, 23, 54, 0.15)",
}));

export const DropdownWrapperVersion = styled.div(props => ({
    opacity:props.openVersion ? 1 : 0,
    transition:props.openVersion ? "opacity 0.3s ease-in-out, height 0.1s ease-in-out" : "opacity 0.3s ease-in-out, height 0.1s ease-in-out 0.2s",
    overflow:"hidden",
    position: "absolute",
    display: props.openVersion ? "flex" : "none",
    justifyContent:"center",
    alignItems:"center",
    boxShadow: "0px 2px 12px rgba(21, 23, 54, 0.15)",
}));

export const Dropdown = styled.div(props => ({
    height:"100%",
    width: props.width ? props.width : 160,
    background:"#fff",
    overflow:"hidden",
}));

export const DropdownButton = styled.div(props => ({
    display: "flex",
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
    },
}));

export default withRouter(Order)