import React, { Component } from 'react'
import AgencyProfile from '../../components/AgencyProfile/AgencyProfile'

class AgencyProfilePage extends Component {
  render() {
    const { data } = this.props.location;
    return (
      <div>
        <AgencyProfile data={data} />
      </div>
    )
  }
}

export default AgencyProfilePage;