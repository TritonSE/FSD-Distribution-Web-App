import InputText from "./InputText";

/**
 * InputLocation is a subclass of InputText that utilizes a location placeholder
 * Expected props: see InputText
 */
class InputLocation extends InputText {
  getPlaceholder() {
    return "Location";
  }
}

export default InputLocation;
