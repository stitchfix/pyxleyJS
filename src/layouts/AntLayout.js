import {Layout, Menu} from 'antd';
import React from 'react';
const {Header} = Layout;


class AntHeader extends React.Component {
    static get defaultProps() {
        return {
            navlinks: [],
            logo: null
        };
    }

    constructor(props) {
        super(props);
    }

    render() {
        let links = this.props.navlinks.map(function(x, index){
            if(x.path !== '/'){
                let path = x.path
                if( "query" in x ){
                    path = path.concat("#", x.query)
                }
                let _key="navlink_".concat(index);
                let link = (<a href={path}><span>{x.label}</span></a>);
                return (
                    <Menu.Item key={_key}>{link}</Menu.Item>
                );
            }
        });

        let logo = null;
        if(this.props.logo !== null){
            logo = (
                <a href="/">
                    <img id="logo_img" src={this.props.logo} />
                </a>
            );
        }
        return (
            <Header className="header">
                <div className="logo">
                    {logo}
                </div>
                <Menu
                    mode="horizontal"
                    className="pyxley-ant-header"
                    defaultSelectedKeys={['0']}
                    style={{lineHeight: '64px'}}>
                    {links}
                </Menu>
            </Header>
        )
    }
}

// AntHeader.defaultProps = {
//     navlinks: [],
//     logo: null
// };

export {AntHeader};
