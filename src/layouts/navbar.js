
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import React from 'react';

class Navs extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let links = this.props.navlinks.map(function(x, index){
            if(x.path !== '/'){
                let _key="navlink_".concat(index);
                return (
                    <NavItem eventKey={index} key={_key} href={x.path}>{x.label}</NavItem>
                );
            }
        });

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='#'>{this.props.brand}</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    {links}
                </Nav>
            </Navbar>
        )
    }
}

Navs.defaultProps = {
    navlinks: [],
    brand: "Pyxley"
};

export {Navs};
