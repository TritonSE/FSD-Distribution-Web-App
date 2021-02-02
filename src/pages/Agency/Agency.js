import React, { Component } from 'react'
import CreateAgencyBtn from "../../components/CreateAgencyBtn/CreateAgencyBtn";

export default class Agency extends Component {
    render() {
        return (
            <div>
                <h2>Agency</h2>
                <CreateAgencyBtn />
            </div>
        )
    }
}
