import React from 'react';
import edit from './imgs/edit-icon.png';

function LocationAndDistributions({agency}) {
  return (
    <>
      <div className="agency-category">
        <img id="edit-icon" src={edit} alt="edit"></img>
        <h1 className="category-title">
          LOCATION AND DISTRIBUTION HOURS
        </h1>
        <p>
          <strong>Region:</strong>
          &nbsp;{agency.tableContent.region}
        </p>
        <p>
          <strong>San Diego District:</strong>
          &nbsp;{agency.sanDiegoDistrict} |
          &nbsp;<strong>County District:</strong>
          &nbsp;{agency.countyDistrict} |
          &nbsp;<strong>State Assembly District:</strong>
          &nbsp;{agency.stateAssemblyDistrict}
        </p>
        <p>
          <strong>State Senate District:</strong>
          &nbsp;{agency.stateSenateDistrict} |
          &nbsp;<strong>Federal Congressional District:</strong>
          &nbsp;{agency.federalCongressionalDistrict}
          {"\n"}
        </p>
        <p>
          <strong>Additional Site:</strong>
          &nbsp;{agency.additionalAddresses.map((add, index) => {
            if(agency.additionalAddresses.length-1 <= index) {
              return add+""
            } else {
              return add+", "
            }
          })}
        </p>
        <p>
          <strong>Billing Address and Zipcode:</strong>
          &nbsp;{agency.billingAddress}, {agency.billingZipcode}
        </p>
        <p>
          <strong>Distribution Type:</strong>
          &nbsp;{(agency.pantry && !agency.mealProgram) && "Pantry"}
          {(!agency.pantry && agency.mealProgram) && "Meal Program"}
          {(agency.pantry && agency.mealProgram) && "Pantry, Meal Program"}
        </p>
      </div>
    </>
  )
}

export default LocationAndDistributions;