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

    let data = props.data;
    if (!data) {
      data = {
        title: "",
        dueDate: "",
        status: "",
      };
    }
    this.state = data;
  }

  /**
   * Callback to handle when the user makes changes to any input field. Updates
   * the state with the given key and value, if the key already exists in the
   * state.
   * @param {String} key The key to update in the state
   * @param {Any} newValue The new value to set for the key
   */
  handleInputChange = (key, newValue) => {
    if (this.state.hasOwnProperty(key)) {
      this.setState({
        [key]: newValue,
      });
    }
  };

  /**
   * Handles form submission.
   */
  submitForm = () => {
    alert("submit");
  };

  render() {
    const data = this.state;

    return (
      <div className="modal-background">
        <div className="task-form">
          <div className="task-form-row">
            <InputText
              label="Title"
              value={data.title}
              stateKey={"title"}
              onChange={this.handleInputChange}
              leftmost
              wide
            />
          </div>
          <div className="task-form-row">
            <div className="task-form-col">
              <InputDate
                label="Due Date"
                value={data.dueDate}
                stateKey={"dueDate"}
                onChange={this.handleInputChange}
                leftmost
              />
            </div>
            <div className="task-form-col">
              <InputDropdown
                label="Status"
                options={[
                  "Pending Assignment",
                  "In Progress",
                  "Under Review",
                  "Completed",
                ]}
                value={data.status}
                stateKey={"status"}
                onChange={this.handleInputChange}
                leftmost
              />
            </div>
          </div>
          <div className="form-button-container">
            <FormButton
              title="Save Task"
              type="primary"
              onClick={this.submitForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
