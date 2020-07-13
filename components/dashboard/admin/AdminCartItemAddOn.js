import React from "react";
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import Counter from "../../products/Counter";
import Dropdown from "../../products/Dropdown";
import {DropdownContext} from "./AdminOrder";





class AdminCartItemsAddOn extends React.Component {

    static contextType = DropdownContext;

    render(){
        const dropdowns = [{
            scrollID: "dimenzija",
            title: "Dimenzija",
            type: this.context.dimenzija,
            change: this.context.changeDimension,
            values: ["450 mm","600 mm","900 mm","1200 mm"],
        },
            {
                scrollID: "tip",
                title: "Tip folije",
                type: this.context.type,
                change: this.context.changeType,
                values: ["RA1","RA2","RA3"]
            }]
        return (
            <Wrapper>
                <TopWrapper>
                    <LeftSideWrapper>
                        <Img src={"https://storage.googleapis.com/signaco/static/products/images/1103-1/krizisce-prednostne-in-neprednostne-ceste-1103-1-144"}/>
                        <TextWrapper>
                            <p>001</p>
                            <p>Objemke</p>
                        </TextWrapper>
                    </LeftSideWrapper>
                    <RightSideWrapper>
                        <RemoveButton>Odstrani</RemoveButton>
                    </RightSideWrapper>
                </TopWrapper>
                <BottomWrapper>
                    {dropdowns.map((dropdown, i) => {
                        return (
                            <Dropdown
                                scrollID={dropdown.scrollID}
                                change={dropdown.change}
                                value={dropdown.type}
                                title={dropdown.title}
                                values={dropdown.values}
                                border={"black"}
                                width={200}
                            />

                        )
                    })}
                </BottomWrapper>

            </Wrapper>
        )

    }
}

export const Img = styled.img(props => ({
    width:100,
    height:100,
}));

export const Wrapper = styled.div(props => ({
    marginTop:24,

}));

export const RemoveButton = styled.div(props => ({
    border: "none",
    background: "transparent",
    width: 48,
    height: 14,
    cursor: "pointer",
    color: "#4CAF50",
    textDecoration: "underline",
    alignSelf: "center"

}));

const TextWrapper = styled.div(props => ({

}));

const TopWrapper = styled.div(props => ({
    display: "flex",
    justifyContent:"space-between",
    marginBottom: 24
}));

const BottomWrapper = styled.div(props => ({
    display: "flex",
}));


const RightSideWrapper = styled.div(props => ({
    display: "flex"
}));

const LeftSideWrapper = styled.div(props => ({
    display: "flex"
}));





export default withRouter(AdminCartItemsAddOn)