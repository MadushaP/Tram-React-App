import React from 'react';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import {Link} from 'react-router-dom'
import {LinkContainer} from "react-router-bootstrap";

function SideBar(props) {
    const {classes} = props;
    return (
        <SideNav
            onSelect={(selected) => {
                // Add code here
            }}
        >
            <SideNav.Toggle/>
            <SideNav.Nav>
                <IndexLinkContainer to="/" >
                    <NavItem>
                        <NavIcon>
                             <i className="fa fa-fw fa-home" style={{fontSize: '1.75em', color: 'black'}}/>
                        </NavIcon>
                        <NavText style={{fontSize: '1.2em', color: 'black'}}>
                           Home
                        </NavText>
                    </NavItem>
                </IndexLinkContainer>
                <IndexLinkContainer to="/Tracker">
                    <NavItem >
                        <NavIcon>
                             <i className="fas fa-search-location"
                                                    style={{fontSize: '1.75em', color: 'black'}}/>
                        </NavIcon>
                        <NavText style={{fontSize: '1.2em', color: 'black'}}>
                          Tracker
                        </NavText>
                    </NavItem>
                </IndexLinkContainer>
            </SideNav.Nav>
        </SideNav>

    );
}

export default (SideBar);
