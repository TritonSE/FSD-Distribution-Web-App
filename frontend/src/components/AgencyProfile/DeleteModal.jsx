import React from 'react'
import "./DeleteModal.css"
import FormButton from "../FormComponents/FormButton";
import  { useHistory } from 'react-router-dom'
function DeleteModal({showModal, toggleModal, agencyName, agencyNumber, agencyId}){
  const history  = useHistory();
  function deleteAgency(){
    fetch(`http://localhost:8000/agency/${agencyId}`, { method: 'DELETE' }).then(response => response.json()).catch(err => { console.log(err);})
    if (history) {
      history.push("/agency");
    }
  }
  return(
      <>
      {
        showModal ? (
        <div className="modal-background">
          <div className="delete-form">
            <div className="delete-form-row">
              <p>
                Are you sure you want to delete <b>"{agencyNumber} - {agencyName}"</b>?
              </p>
              <p className="warning">
                Note: All files and data will be lost and non restorable
              </p>
            </div>
            <div className="delete-form-row">
              <div className="delete-form-col">
                <div className="button-pos">
                  <FormButton
                    title="Confirm"
                    type="primary"
                    style={{width: "315px"}}
                    onClick={deleteAgency}
                  />
                </div>
              </div>
              <div className="delete-form-col">
                <div className="button-pos">
                  <FormButton
                  title="Cancel"
                  type="secondary"
                  style={{width: "315px"}}
                  onClick={toggleModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null
    }
      </>
    )
}

export default DeleteModal