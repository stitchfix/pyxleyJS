import {Layout, Menu} from 'antd';
import React from 'react';
const { SubMenu } = Menu;
import {Filter} from '../filters/factory';


class AntSidebar extends React.Component {
    static get defaultProps() {
        return {
            defaultOpenKeys: []
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            current: '1'
        }
    }

    handleClick(e) {
        this.setState({
            current: e.key
        });
    }

    get_filters(filters){
        // filter is an object - each key is the group name
        // it should have the following
        // {
        //      data: [list of filter props],
        //      title: title of the group,
        //      group: boolean (should it be grouped?)
        // }

        let groups = [];
        let {prefix, onClick} = this.props;
        let group_number = 0;
        for(let key in filters){

            if( filters[key].group ) {
                let _sub = (
                    <SubMenu
                        key={prefix.concat(".submenu.",group_number)}
                        title={filters[key].title}>
                        {filters[key].data}
                    </SubMenu>
                );
                groups.push(_sub);
            } else {
                let _sub = (
                    <div className="pyxley-menu-single">
                        {filters[key].data}
                    </div>
                )
                groups.push(_sub);
            }
            group_number = group_number + 1;
        }
        return groups;
    }

    render() {
        // get the filters
        let menuItems = this.get_filters(this.props.filters);
        return (

            <Menu
                defaultOpenKeys={this.props.defaultOpenKeys}
                selectedKeys={[this.state.current]}
                style={{height: '100%'}}
                mode="inline">

                {menuItems}
            </Menu>
        );
    }
}


// AntSidebar.defaultProps = {

// }
export {AntSidebar};
