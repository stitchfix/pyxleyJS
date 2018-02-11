import 'antd/dist/antd.css';
import {Table, Icon} from 'antd'
import React from 'react'

const {Column, ColumnGroup} = Table;


const formatColumnGroup = (group, sorters) => {

    let cols = group.columns.map( c => {
        let props = {}
        for (let k in c) {
            props[k] = c[k]
        }
        if (c["dataIndex"] in sorters){
            props["sorter"] = sorters[c["dataIndex"]]
        }

        return (
            <Column { ...props } />
        );
    })
    if (group.name !== "") {

        return (
            <ColumnGroup title={group.name} key={group.name}>
            {cols}
            </ColumnGroup>
        );
    }
    return cols;
};


const getHeaderWidth = (columns) => {
    if( Object.prototype.toString.call(columns) === '[object Array]'){
        return columns.map( (c) => {
            return c.columns.map((d) => (d.width || 0)).reduce((a, b) => a + b, 0)
        }).reduce((a, b) => a + b, 0);
    }
    return 0
}

const makeHeader = (columns, sorters) => {
    if( Object.prototype.toString.call(columns) === '[object Array]'){
        return columns.map( (c) => {
            return formatColumnGroup(c, sorters);
        });
    }
    return null;

}

class AntTable extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.drawTable(nextProps)
    }


    drawTable(inProps) {
        let columns = makeHeader(inProps.data.header,
            inProps.options.sorter || {})
        if (columns === null) {
            return null;
        }

        let props = inProps.options.options;
        props.dataSource = inProps.data.data;
        if ("options" in inProps.data) {
            for(let key in inProps.data.options){
                props[key] = inProps.data.options[key]
            }
        }

        if ("width" in inProps.data ){
            props["scroll"]["x"] = inProps.data.width
        }
        let headerWidth = getHeaderWidth(inProps.data.header)
        if (headerWidth > 0) {
            props["scroll"]["x"] = headerWidth

        }

        return (
            <Table { ...props }>
            {columns}
            </Table>
        );
    }

    render() {
        let table = this.drawTable(this.props)

        return (
            <div id={this.props.id}>
                {table}
            </div>
        );
    }
}

export { AntTable, makeHeader }
