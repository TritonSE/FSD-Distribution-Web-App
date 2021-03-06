import React, { Component } from "react";
import InputText from "../../FormComponents/InputText";
import InputDate from "../../FormComponents/InputDate";
import InputDropdown from "../../FormComponents/InputDropdown";

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
      <div className="task-form">
        <InputText
          label="Title"
          value={}
          stateKey={}
          onChange={}
          leftmost
          wide
        />
        <InputDate label="Due Date" value={} stateKey={} onChange={} leftmost />
        <InputDropdown
          label="Status"
          options={[]}
          stateKey={}
          onChange={}
          leftmost
        />
        <FormButton title="Save Task" type="Primary" onClick={} />
      </div>
    );
  }
}

export default TaskForm;
