import React, { Component } from "react";
import InputText from "../FormComponents/InputText";
import InputDate from "../FormComponents/InputDate";
import InputDropdown from "../FormComponents/InputDropdown";
import FormButton from "../FormComponents/FormButton";
import "./TaskForm.css";

/**
 * TaskForm is the modal form for creating/editing a task for an agency.
 *
 * Expected props:
 * - {Object} data: (if editing a task) existing data for the task (title,
 * dueDate, status)
 * - {Number} editIndex: (if editing a task) index of the task being edited
 * - {Function} onSubmit: callback for when the submit button is pressed, should
 * take an Object representing the task data and a Number, possibly undefined,
 * representing the edit index
 * - {Function} onCancel: callback for when the cancel button is pressed, should
 * take no input
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
    const { editIndex, onSubmit } = this.props;
    const { title, dueDate, status } = this.state;
    let task = {
      title: title,
      dueDate: dueDate,
      status: status,
    };
    onSubmit(task, editIndex);
  };

  /**
   * Handles form cancellation.
   */
  cancelForm = () => {
    this.props.onCancel();
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
          <div className="button-center">
            <FormButton
              title="Save Task"
              type="primary"
              onClick={this.submitForm}
            />
          </div>
          <button
            type="button"
            className="task-form-cancel"
            onClick={this.cancelForm}
          >
            <svg className="icon-x" width="20" height="20" viewBox="0 0 20 20">
              <line x1="0" y1="0" x2="20" y2="20" strokeWidth="4" />
              <line x1="20" y1="0" x2="0" y2="20" strokeWidth="4" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default TaskForm;
