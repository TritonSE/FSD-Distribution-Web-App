import InputText from "./InputText";
import "./formstyle.css";

/**
 * InputDate is a subclass of InputText that only accepts date strings in the
 * format MM/DD/YYYY.
 * Expected props: see InputText
 */
class InputDate extends InputText {
  getPlaceholder() {
    return "MM/DD/YYYY";
  }
}

export default InputDate;
