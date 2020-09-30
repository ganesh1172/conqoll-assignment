import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { RiDeleteBin5Fill } from 'react-icons/ri';

export default class Shortlist extends Component {
    render() {
        return (
            <div>
                <table className="rwd_table box_effect">
                    <tbody>
                        <tr>
                            <th>City</th>
                            <th>State</th>
                            <th>District</th>
                            <th>Action</th>
                        </tr>
                        {this.props.list.map((item, index) =>
                            <tr key={index}>
                                <td>{item.City}</td>
                                <td>{item.State}</td>
                                <td>{item.District}</td>
                                <td><button onClick={() => { this.props.delFromShortlist(index) }}><RiDeleteBin5Fill className="delete_row btn_cta" /></button></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

Shortlist.propTypes = {
    list: PropTypes.array.isRequired,
    delFromShortlist: PropTypes.func.isRequired,
}