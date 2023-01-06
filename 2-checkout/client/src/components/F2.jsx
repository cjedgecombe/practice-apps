import React, {useState} from 'react';

const F2 = (props) => {

  const [addressStateLine1, setAddressStateLine1] = useState('');
  const [addressStateLine2, setAddressStateLine2] = useState('');
  const [cityState, setCityState] = useState('');
  const [stateState, setStateState] = useState('');
  const [zipState, setZipState] = useState('');
  const [phoneState, setPhoneState] = useState('');


  const F2TextChangeHandler = (event) => {
    var id = event.target.id;
    var value = event.target.value;

    if (id === 'addressLine1') {
      setAddressStateLine1(value);
    } else if (id === 'addressLine2') {
      setAddressStateLine2(value);
    } else if (id === 'cityField') {
      setCityState(value);
    } else if (id === 'stateField') {
      setStateState(value);
    } else if (id === 'zipField') {
      setZipState(value);
    } else {
      setPhoneState(value);
    }
  }

  return (
    <div>
      <p>Shipping Address</p>
      <input type="text" className="input" id="addressLine1" placeholder="Address" value={addressStateLine1} onChange={F2TextChangeHandler}></input>
      <input type="text" className="input" id="addressLine2" placeholder="Address Line 2" value={addressStateLine2} onChange={F2TextChangeHandler}></input>
      <input type="text" className="input" id="cityField" placeholder="City" value={cityState} onChange={F2TextChangeHandler}></input>
      <input type="text" className="input" id="stateField" placeholder="State" value={stateState} onChange={F2TextChangeHandler}></input>
      <input type="text" className="input" id="zipField" placeholder="Zip Code" value={zipState} onChange={F2TextChangeHandler}></input>
      <input type="text" className="input" id="phoneField" placeholder="Phone Number" value={phoneState} onChange={F2TextChangeHandler}></input>
      <button onClick={() => {props.form2SubmitHandler(addressStateLine1, addressStateLine2, cityState, stateState, zipState, phoneState)}}>Next</button>
    </div>
  )
}

export default F2;