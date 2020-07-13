import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import AddOn from "./AdminCartItemAddOn";
import Dropdown from "../../products/Dropdown";

const GET_PRODUCT_BY_ID = gql`
    query Product($tag: String!) {
        product(tag: $tag){
            id
            tag
            category
            subcategory
            class
            title
            description
            picture_link
            purpose_of_marking
            additional_requirements
        }
    }
`;


const GET_CART_ITEMS_BY_VERSION_ID = gql`
    query CartItemsByVersionId($versionId: ID) {
        cartItemsByVersionId(versionId: $versionId) {
            id
            productId
            number
            type
            dimensions
#            barLength
#            barDiameter
#            barMaterial
            complementary
            file
            text
#            textComplementary
#            clamp
            addOns
            orderVersionId
        }
    }
`;




class AdminOrderList extends React.Component {

    state = {

    }

    render(){
        console.log(this.props.versionId);
        return (
            <Query query={GET_CART_ITEMS_BY_VERSION_ID} variables={{versionId: this.props.versionId}}>
                {({data, error, loading, client}) => {
                    if (error) {
                        console.log(error)
                    }


                    if(data) {
                        let cartItems = data.cartItemsByVersionId;
                        return(
                            <Wrapper>
                                <Title>Naročilo</Title>
                                {cartItems.map((cartItem, i)=>(
                                        <Query key={i} variables={{tag:cartItem.productId}} query={GET_PRODUCT_BY_ID}>
                                            {({ data, loading }) => {
                                                if(loading) return null
                                                var product = data.product;
                                                return(
                                                    <Item>
                                                        <ItemHeader>
                                                            <TopWrapper>
                                                                <ProductWrapper>
                                                                    {product &&
                                                                    <Img src={product.picture_link.replace(" | ", "")} />
                                                                    }
                                                                    <ProductDetails>
                                                                        <Label>
                                                                            <b>{cartItem.productId}</b>
                                                                        </Label>
                                                                        {product &&
                                                                        <Description>
                                                                            {product.title}
                                                                        </Description>
                                                                        }
                                                                        <Label>
                                                                            Dimenzija: <b>{cartItem.dimensions}mm</b>
                                                                        </Label>
                                                                        <Label>
                                                                            Tip folije: <b>{cartItem.type}</b>
                                                                        </Label>
                                                                    </ProductDetails>
                                                                </ProductWrapper>
                                                                <CountWrapper>
                                                                    <Count>{cartItem.number}</Count>
                                                                </CountWrapper>
                                                            </TopWrapper>

                                                            <DropdownWrapper>
                                                                <Dropdown
                                                                    scrollID="dimenzija"
                                                                    change={null}
                                                                    value={null}
                                                                    title="Dimenzija"
                                                                    values={["450 mm","600 mm","900 mm","1200 mm"]}
                                                                    border={"black"}
                                                                    width={200}
                                                                />
                                                                <Dropdown
                                                                    scrollID="tip"
                                                                    change={null}
                                                                    value={null}
                                                                    title="Tip folije"
                                                                    values={["RA1","RA2","RA3"]}
                                                                    border={"black"}
                                                                    width={200}
                                                                />
                                                            </DropdownWrapper>
                                                        </ItemHeader>


                                                        {!!cartItem.addOns &&
                                                        <ItemDetails>
                                                            <AddOn drodowns={[{
                                                                scrollID: "clips",
                                                                title: "Dimenzija",
                                                                type: this.context.dimenzija,
                                                                change: this.context.changeDimension,
                                                                values: ["450 mm","600 mm","900 mm","1200 mm"],}]}/>
                                                        </ItemDetails>
                                                        }
                                                    </Item>
                                                )
                                            }}
                                        </Query>
                                    )
                                )}
                            </Wrapper>
                        )
                    }

                    return null

                }}
            </Query>

        )

    }
}



export const Wrapper = styled.div(props => ({
    marginTop:48,
}));

export const TopWrapper = styled.div(props => ({
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:20,
}));


export const DropdownWrapper = styled.div(props => ({
    display: "flex"
}));

export const Title = styled.div(props => ({
    borderBottom:"1px solid #C4C4C4",
    paddingBottom:8,
}));

export const Item = styled.div(props => ({
    borderBottom:"1px solid #C4C4C4",
    marginTop:24,
}));
export const ItemHeader = styled.div(props => ({

}));
export const ProductWrapper = styled.div(props => ({
    display:"flex",
    justifyContent:"space-between",
    alignItems:"flex-start",
}));
export const Img = styled.img(props => ({
    width:140,
    height:140,
}));
export const ProductDetails = styled.div(props => ({
    marginTop:4,
    marginLeft:24,
}));
export const Label = styled.div(props => ({
    marginBottom:8,
}));
export const Description = styled.div(props => ({
    maxWidth:350,
    marginBottom:24,
}));
export const Count = styled.div(props => ({
    border:"1px solid #000",
    paddingLeft:10,
    paddingRight:10,
    background:"#F3F4F7",
}));
export const CountWrapper = styled.div(props => ({

}));
export const ItemDetails = styled.div(props => ({
    marginBottom:24,
    marginLeft: 30
}));
export const AdOn = styled.div(props => ({
    padding:16,
    borderRight:"1px solid #000",
    borderTop:"1px solid #000",
    borderBottom:"1px solid #000",
}));





export default withRouter(AdminOrderList)