import * as ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import AddEntry from './components/AddEntry.jsx';
import EntryList from './components/EntryList.jsx';
const axios = require('axios');


const App = () => {

  const [listState, setListState] = useState([]);
  // use useEffect to populate the page with all the glossary terms on load
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = () => {
    axios.get('entries')
    .then((response) => {
      setListState(response.data);
    })
    .catch((err) => {
      console.log('client FETCH error', err);
    })
  }

  const submitHandler = (term, definition) => {
    axios.post('/entries', {
      data: {
        'term': term,
        'definition': definition
      }
    })
    .then(() => {
      // re-render the list of terms
      fetchEntries();
      console.log('success');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <h1>Glossary</h1>
      <h3>Add an Entry</h3>
      <AddEntry submitHandler={submitHandler}/>
      <EntryList currentList={listState}/>
      <h3>Entry Search</h3>
    </div>
  )
}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);