import React from 'react';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import {Link} from 'react-router-dom'

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
                <NavItem eventKey="home">
                    <NavIcon>
                        <Link to='/'> <i className="fa fa-fw fa-home" style={{fontSize: '1.75em', color: 'black'}}/>
                        </Link>
                    </NavIcon>
                    <NavText style={{fontSize: '1.2em', color: 'black'}}>
                        <Link to='/'>Home</Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="tracker">
                    <NavIcon>
                        <Link to='/Tracker'>   <i className="fas fa-search-location" style={{fontSize: '1.75em', color: 'black'}}/></Link>
                    </NavIcon>
                    <NavText style={{fontSize: '1.2em', color: 'black'}}>
                        <Link to='/Tracker'> Tracker </Link>
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}

export default (SideBar);
