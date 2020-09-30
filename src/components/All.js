import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { HiOutlineClipboardList } from 'react-icons/hi';

export default class All extends Component {
    render() {
        return (
            <div>
                <table className="rwd_table box_effect">
                    <tbody>
                        <tr>
                            <th>City</th>
                            <th>State</th>
                            <th>District</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        {this.props.list.map((item, index) =>
                            <tr key={index}>
                                <td>{item.City}</td>
                                <td>{item.State}</td>
                                <td>{item.District}</td>
                                <td><button onClick={() => { this.props.addToShortlist(index) }}><HiOutlineClipboardList className="shortList_row btn_cta" /></button></td>
                                <td><button onClick={() => { this.props.delFromAll(index) }}><RiDeleteBin5Fill className="delete_row btn_cta" /></button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

All.propTypes = {
    list: PropTypes.array.isRequired,
    addToShortlist: PropTypes.func.isRequired,
    delFromAll: PropTypes.func.isRequired
}