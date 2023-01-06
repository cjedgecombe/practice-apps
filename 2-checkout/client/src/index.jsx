import React, {useState} from "react";
import * as ReactDOM from 'react-dom';
import { render } from "react-dom";
import F1 from './components/F1.jsx';
import F2 from './components/F2.jsx';
import F3 from './components/F3.jsx';
import ConfirmationPage from './components/ConfirmationPage.jsx';
const axios = require('axios');


const App = () => {

  const [checkoutState, setCheckoutState] = useState(true);
  const [form1State, setForm1State] = useState(false);
  const [form2State, setForm2State] = useState(false);
  const [form3State, setForm3State] = useState(false);
  const [responsesState, setResponsesState] = useState({});
  const [confirmationPageState, setConfirmationPageState] = useState(false);

  const form1RenderHandler = () => {
    setCheckoutState(false);
    setForm1State(true);
  }

  const form1SubmitHandler = (name, email, password) => {
    // send request to server in order to save form data to db
    axios.post('/form1', {
      data: {
        'name': name,
        'email': email,
        'password': password
      }
    })
    .then(() => {
      // render form 2
      setForm1State(false);
      setForm2State(true);
    })
    .catch((err) => {
      // an error here likely means that a form has already been submitted for this session
      console.log('form 1 submit error', err);
      // inform the user and return them to the home page
      alert('This user has already checked out');
      setCheckoutState(true);
      setForm1State(false);
    })
  }

  const form2SubmitHandler = (address1, address2, city, state, zip, phone) => {
    // send request to server in order to save form data to db
    axios.post('/form2', {
      data: {
        'address1': address1,
        'address2': address2,
        'city': city,
        'state': state,
        'zip': zip,
        'phone': phone
      }
    })
    .then(() => {
      // render form 3
      setForm2State(false);
      setForm3State(true);
    })
    .catch((err) => {
      console.log('form 2 submit error', err);
    })
  }

  const form3SubmitHandler = (cardNumber, expDate, cvv, billingZip) => {
    // send request to server in order to save form data to db
    axios.post('/form3', {
      data: {
        'cardNumber': cardNumber,
        'expDate': expDate,
        'cvv': cvv,
        'billingZip': billingZip
      }
    })
    .then(() => {
      axios.get('/responses')
      .then((responses) => {
        console.log('responses', responses);
        // set confirmation page state to be list of responses
        setResponsesState(responses.data);
        // set form 3 state to false
        setForm3State(false);
        // set confirmation page state to true
        setConfirmationPageState(true);
      })
    })
    .catch((err) => {
      console.log('form 3 submit error', err);
    })
  }

  const purchaseHandler = () => {
    setConfirmationPageState(false);
    setCheckoutState(true);
  }

  return (
    <div>
      <p>Hello, World!</p>
      <p>
        <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
      </p>
      {checkoutState && <button onClick={() => {form1RenderHandler()}}>Checkout</button>}
      {form1State && <F1 form1SubmitHandler={form1SubmitHandler}/>}
      {form2State && <F2 form2SubmitHandler={form2SubmitHandler}/>}
      {form3State && <F3 form3SubmitHandler={form3SubmitHandler}/>}
      {confirmationPageState && <ConfirmationPage responses={responsesState} purchaseHandler={purchaseHandler}/>}
    </div>

  )
}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);
