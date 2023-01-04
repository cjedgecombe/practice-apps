import React, {useState} from 'react';

const F3 = (props) => {

  const [creditCardState, setCreditCardState] = useState('');
  const [expDateState, setExpDateState] = useState('');
  const [cvvState, setCVVState] = useState('');
  const [billingZipState, setBillingZipState] = useState('');

  const F3TextChangeHandler = (event) => {
    var id = event.target.id;
    var value = event.target.value;

    if (id === 'creditField') {
      setCreditCardState(value);
    } else if (id === 'expirationField') {
      setExpDateState(value);
    } else if (id === 'cvvField') {
      setCVVState(value);
    } else {
      setBillingZipState(value);
    }
  }

  return (
    <div>
      <p>Payment Information</p>
      <input type="text" className="input" id="creditField" placeholder="Card Number" value={creditCardState} onChange={F3TextChangeHandler}></input>
      <input type="text" className="input" id="expirationField" placeholder="Expiration Date" value={expDateState} onChange={F3TextChangeHandler}></input>
      <input type="text" className="input" id="cvvField" placeholder="CVV" value={cvvState} onChange={F3TextChangeHandler}></input>
      <input type="text" className="input" id="billingZipField" placeholder="Billing Zip Code" value={billingZipState} onChange={F3TextChangeHandler}></input>
      <button onClick={() => {props.completePurchaseHandler()}}>Purchase</button>
    </div>
  )
}

export default F3;