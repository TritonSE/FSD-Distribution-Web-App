import InputDropdown from "./InputDropdown";

/**
 * InlineDropdown is a subclass of InputDropdown that places the Dropdown in-
 * line with other elements.
 * Expected props: see InputDropdown
 */
class InlineDropdown extends InputDropdown {
  groupClass() {
    return "inline-dropdown";
  }
}

export default InlineDropdown;
