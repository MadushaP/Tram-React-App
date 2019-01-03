import React from 'react';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import {Link} from 'react-router-dom'
import {LinkContainer} from "react-router-bootstrap";

function SideBar(props) {
    const {classes} = props;
    return (
        <SideNav
            onSelect={(selected) => {
                // Add on select css change
            }}
        >
            <SideNav.Toggle/>
            <SideNav.Nav>
                <LinkContainer to="/" >
                    <NavItem>
                        <NavIcon>
                             <i className="fa fa-fw fa-home" style={{fontSize: '1.75em', color: 'black'}}/>
                        </NavIcon>
                        <NavText style={{fontSize: '1.2em', color: 'black'}}>
                          Metro Tram
                        </NavText>
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/Canvas">
                    <NavItem >
                        <NavIcon>
                             <i className="fas fa-shapes"
                                                    style={{fontSize: '1.75em', color: 'black'}}/>
                        </NavIcon>
                        <NavText style={{fontSize: '1.2em', color: 'black'}}>
                          3D Canvas
                        </NavText>
                    </NavItem>
                </LinkContainer>
            </SideNav.Nav>
        </SideNav>

    );
}

export default (SideBar);
