import {Layout, Menu, Row} from 'antd';
import React from 'react';
const {Header} = Layout;


class AntHeader extends React.Component {
    static get defaultProps() {
        return {
            navlinks: [],
            logo: null,
            logo_href: "/"
        };
    }

    constructor(props) {
        super(props);
    }

    render() {
        let selected = ""
        let selected_path = window.location.pathname;
        let links = this.props.navlinks.map(function(x, index){
            if(x.path !== '/'){
                let path = x.path
                if( "query" in x ){
                    path = path.concat("#", x.query)
                }
                let _key="navlink_".concat(index);
                if(path == selected_path){
                    selected = _key;
                }
                let link = (<a href={path}><span>{x.label}</span></a>);
                return (
                    <Menu.Item key={_key}>{link}</Menu.Item>
                );
            }
            else {
                selected = "navlink_0";
            }
        });

        let logo = null;
        if(this.props.logo !== null){
            logo = (
                <a href={this.props.logo_href}>
                    <img id="logo_img" src={this.props.logo} />
                </a>
            );
        }
        return (
            <Header className="header">
                <Row className="header-row">
                <div className="logo">
                    {logo}
                </div>
                <Menu
                    mode="horizontal"
                    className="pyxley-ant-header"
                    defaultSelectedKeys={['0']}
                    selectedKeys={[selected]}>

                    {links}
                </Menu>
                </Row>
            </Header>
        )
    }
}

// AntHeader.defaultProps = {
//     navlinks: [],
//     logo: null
// };

export {AntHeader};
