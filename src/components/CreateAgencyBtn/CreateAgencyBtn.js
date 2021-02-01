import { useHistory } from "react-router-dom";

export default function CreateAgencyBtn() {
    let history = useHistory();
  
    function handleClick() {
      history.push("/create-agency");
    }
  
    return (
      <button type="button" onClick={handleClick}>
        Button
      </button>
    );
  }
