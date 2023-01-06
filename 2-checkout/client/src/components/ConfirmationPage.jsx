import React from 'react';

const ConfirmationPage = (props) => {
  // use use effect to fetch stored information upon component load
  return (
    <div>
      <h2>Checkout Details</h2>
      <div className="flex-container">
        <div className="flex-child">
          <h3 className="detailsBlock">Personal</h3>
          <p>Name - {props.responses.name}</p>
          <p>Email - {props.responses.email}</p>
          <p>Password - {props.responses.password}</p>
        </div>
        <div className="flex-child">
          <h3 className="detailsBlock">Shipping</h3>
          <p>Address Line 1 - {props.responses.address_line_1}</p>
          <p>Address Line 2 - {props.responses.address_line_2}</p>
          <p>City - {props.responses.city}</p>
          <p>State - {props.responses.state}</p>
          <p>Zip Code - {props.responses.zip_code}</p>
          <p>Phone - {props.responses.phone_number}</p>
        </div>
        <div className="flex-child">
          <h3 className="detailsBlock">Billing</h3>
          <p>Credit Card - {props.responses.card_number}</p>
          <p>Exp Date - {props.responses.date}</p>
          <p>CVV - {props.responses.cvv}</p>
          <p>Billing Zip - {props.responses.billing_zip}</p>
        </div>
      </div>
      <button onClick={() => {props.purchaseHandler()}}>Purchase</button>
    </div>
  )
}

export default ConfirmationPage;