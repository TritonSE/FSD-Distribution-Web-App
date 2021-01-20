import InputDropdown from "./InputDropdown";
import "./formstyle.css";

/**
 * InlineDropdown is a subclass of InputDropdown that places the Dropdown in-
 * line with other elements.
 * Expected props: see InputDropdown
 */
class InlineDropdown extends InputDropdown {
  groupClass() {
    return null;
  }
}

export default InlineDropdown;
