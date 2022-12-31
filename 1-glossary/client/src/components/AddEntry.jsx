import React, {useState} from 'react';

const AddEntry = (props) => {
  // declare state for both the term and definition text fields
  // const [termState, setTermState] = useState('');
  // const [defState, setDefState] = useState('');

  // input change handler that can handle both inputs
  const changeHandler = (event) => {
    if (event.target.id === 'term') {
      props.setTermState(event.target.value);
    } else {
      props.setDefState(event.target.value);
    }
  }

  return (
    <div>
      <input type="text" id="term" placeholder="Term" value={props.termState} onChange={changeHandler}></input>
      <input type="text" id="definition" placeholder="Definition" value={props.defState} onChange={changeHandler}></input>
      <button onClick={() => {props.submitHandler(props.termState, props.defState)}}>Add to Glossary</button>
    </div>
  )
}

export default AddEntry;