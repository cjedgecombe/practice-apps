import React, {useState} from "react";
import * as ReactDOM from 'react-dom';
import { render } from "react-dom";
import F1 from './components/F1.jsx';
import F2 from './components/F2.jsx';
import F3 from './components/F3.jsx';


const App = () => {

  const [checkoutState, setCheckoutState] = useState(true);
  const [form1State, setForm1State] = useState(false);
  const [form2State, setForm2State] = useState(false);
  const [form3State, setForm3State] = useState(false);

  const form1RenderHandler = () => {
    setCheckoutState(false);
    setForm1State(true);
  }

  const form2RenderHandler = () => {
    // send request to server in order to save form data to db
    // then
    setForm1State(false);
    setForm2State(true);
  }

  const form3RenderHandler = () => {
    // send request to server in order to save form data to db
    // then
    setForm2State(false);
    setForm3State(true);
  }

  const completePurchaseHandler = () => {
    // send request to server in order to save form data to db
    // then
    setForm3State(false);
    setCheckoutState(true);
  }

  return (
    <div>
      <p>Hello, World!</p>
      <p>
        <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
      </p>
      {checkoutState && <button onClick={() => {form1RenderHandler()}}>Checkout</button>}
      {form1State && <F1 form2RenderHandler={form2RenderHandler}/>}
      {form2State && <F2 form3RenderHandler={form3RenderHandler}/>}
      {form3State && <F3 completePurchaseHandler={completePurchaseHandler}/>}
    </div>

  )
}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);
