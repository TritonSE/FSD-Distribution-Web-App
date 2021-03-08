import React, { Component } from "react";
import InputText from "../FormComponents/InputText";
import InputDate from "../FormComponents/InputDate";
import InputDropdown from "../FormComponents/InputDropdown";
import FormButton from "../FormComponents/FormButton";
import "./TaskForm.css";

/**
 * TaskForm is the task form
 */
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="modal-background">
        <div className="task-form">
          <div className="task-form-row">
            <InputText
              label="Title"
              value={null}
              stateKey={null}
              onChange={null}
              leftmost
              wide
            />
          </div>
          <div className="task-form-row">
            <div className="task-form-col">
              <InputDate
                label="Due Date"
                value={null}
                stateKey={null}
                onChange={null}
                leftmost
              />
            </div>
            <div className="task-form-col">
              <InputDropdown
                label="Status"
                options={[]}
                stateKey={null}
                onChange={null}
                leftmost
              />
            </div>
          </div>
          <div className="form-button-container">
            <FormButton title="Save Task" type="primary" onClick={null} />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
