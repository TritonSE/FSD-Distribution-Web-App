import React, {Component} from 'react';

class Table extends Component {
    render(){
        return(
            <table>
                <tr>
                    <th> Agency # </th>
                    <th>Agency Name</th>
                    <th>Status</th>
                    <th> Region </th>
                    <th>City</th>
                </tr>
            </table>
        )
    }
}