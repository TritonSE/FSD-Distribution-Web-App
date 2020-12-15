import "./formstyle.css";
import React, { Component } from "react";
//import "./agency-profile-form/node_modules/typeface-roboto";
import Form from "react-bootstrap/Form";
import FormSectionHeader from "./FormSectionHeader";
import InputText from "./InputText";
import InputDropdown from "./InputDropdown";
import FormButton from "./FormButton";
import "bootstrap/dist/css/bootstrap.min.css";


//For pulling: git pull (once you are in proper branch)
// For pushing: git add -A .; git commit -m '<COMMENT>'; git push

// Page name
// Section headers
// Input components (label + required mark + input):
// Text field (placeholders) - EF (make sure that the style is right)
// Single-select dropdown - WW
// Checkbox list - WW
// Number field / counter - EF/WW
// Button - EF/WW

/*class FormSectionHeader extends Component {
  render() {
    const { width, height, left, top, header } = this.props;
    return (
      <div>
        <label
          className="form-section-header"
          style={{
            width: width + "px",
            height: height + "px",
            left: left + "px",
            top: top + "px",
          }}
        >
          {header}
        </label>
        <div
          className="form-section-header-underline"
          style={{
            width: width + "px",
            height: "4px",
            left: left + "px",
            top: top + 32 + "px",
          }}
        />
      </div>
    );
  }
}*/

class AgencyProfileForm extends Component {
  render() {
    return (
      <div>
        <p
          className="page-header"
          style={{
            position: "absolute",
            width: "419px",
            height: "41px",
            left: "130px",
            top: "273px",
          }}
        >
          Add a New Agency Profile.{" "}
        </p>

        {/* TEXT INPUT FIELD */}
        <Form>
          <div>
            <FormSectionHeader
              width={203}
              height={29}
              left={130}
              top={384}
              header={"Quick Information"}
            />

            <InputText
              fieldWidth={289}
              fieldHeight={43}
              left={137}
              top={451}
              header={"Agency Number"}
            />

            <InputText
              fieldWidth={698}
              fieldHeight={43}
              left={559}
              top={451}
              header={"Agency Name"}
            />

            <InputText
              fieldWidth={289}
              fieldHeight={43}
              left={137}
              top={546}
              header={"Primary Contact"}
            />

            <InputText
              fieldWidth={698}
              fieldHeight={43}
              left={559}
              top={546}
              header={"Main Site Address"}
            />
          </div>

          {/*SELECT DROPDOWN*/}
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Example select</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <FormSectionHeader
            width={271}
            height={29}
            left={130}
            top={791}
            header={"Location and Addresses"}
          />

          <FormSectionHeader
            width={101}
            height={29}
            left={130}
            top={1540}
            header={"Contacts"}
          />

          {/*CHECKBOX*/}
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Check me out"
              className="checkbox-label"
            />
          </Form.Group>

          {/*BUTTON*/}
          <FormButton
            left={"calc(50% - 376px/2 - 216.5px)"}
            top={"4030px"}
            label={"Create Profile"}
            labelColor={"#FFFFFF"}
            borderColor={"#54682F"}
            backgroundColor={"#54682F"}
          />

          <FormButton
            left={"calc(50% - 376px/2 + 223.5px)"}
            top={"4030px"}
            label={"Cancel"}
            labelColor={"#000000"}
            borderColor={"#000000"}
            backgroundColor={"#FFFFFF"}
          />
        </Form>
      </div>
    );
  }
}

export default AgencyProfileForm;
