import 'antd/dist/antd.css';
import {Table, Icon} from 'antd'
import React from 'react'

const {Column, ColumnGroup} = Table;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const formatColumnGroup = (group) => {
    let cols = group.columns.map( c => {
        let props = {}
        for (let k in c) {
            props[k] = c[k]
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

const makeHeader = (columns) => {
    if( Object.prototype.toString.call(columns) === '[object Array]'){
        return columns.map( (c) => {
            return formatColumnGroup(c);
        });
    }
    return null;

}

class AntTable extends React.Component {
    constructor(props) {
        super(props);
    }

    drawTable() {
        let columns = makeHeader(this.props.data.header)
        if (columns === null) {
            return null;
        }

        let props = this.props.options.options;
        props.dataSource = this.props.data.data;
        if ("options" in this.props.data) {
            for(let key in this.props.data.options){
                props[key] = this.props.data.options[key]
            }
        }
        if (props.useRowSelection){
            props.rowSelection = rowSelection;
        }
        return (
            <Table { ...props }>
            {columns}
            </Table>
        );
    }

    render() {
        let table = this.drawTable()

        return (
            <div id={this.props.id}>
                {table}
            </div>
        );
    }
}

export { AntTable, makeHeader }
