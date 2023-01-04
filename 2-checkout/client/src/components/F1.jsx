import React, {useState} from 'react';

const F1 = (props) => {

  const [nameState, setNameState] = useState('');
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const F1TextChangeHandler = (event) => {
    if (event.target.id === 'nameField') {
      setNameState(event.target.value);
    } else if (event.target.id === 'emailField') {
      setEmailState(event.target.value);
    } else {
      setPasswordState(event.target.value);
    }
  }

  return (
    <div>
      <p>Create an Account for Faster Checkout!</p>
      <input type="text" className="input" id="nameField" placeholder="Name" value={nameState} onChange={F1TextChangeHandler}></input>
      <input type="text" className="input" id="emailField" placeholder="Email" value={emailState} onChange={F1TextChangeHandler}></input>
      <input type="text" className="input" id="passWordField" placeholder="Password" value={passwordState} onChange={F1TextChangeHandler}></input>
      <button onClick={() => {props.form2RenderHandler()}}>Next</button>
    </div>
  )
}

export default F1;