import * as ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import AddEntry from './components/AddEntry.jsx';
import EntryList from './components/EntryList.jsx';
const axios = require('axios');


const App = () => {

  const [listState, setListState] = useState([]);
  const [termState, setTermState] = useState('');
  const [defState, setDefState] = useState('');
  // use useEffect to populate the page with all the glossary terms on load
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = () => {
    axios.get('/entries')
    .then((response) => {
      setListState(response.data);
    })
    .catch((err) => {
      console.log('client FETCH error', err);
    })
  }

  const deleteHandler = (node) => {
    let term = node.previousElementSibling.previousElementSibling.id;
    axios.delete('/entries', {
      data: {
        'term': term
      }
    })
    .then(() => {
      fetchEntries();
      console.log('entry sucessfully deleted');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const editHandler = (newTerm, newDef, node) => {
    console.log('made it into the handler function')
    let term = node.previousElementSibling.id;
    axios.patch('/entries', {
      data: {
        'term': term,
        'newTerm': newTerm,
        'newDef': newDef
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
      <AddEntry termState={termState} defState={defState} setTermState={setTermState} setDefState={setDefState} submitHandler={submitHandler}/>
      <EntryList termState={termState} defState={defState} currentList={listState} editHandler={editHandler} deleteHandler={deleteHandler}/>
      <h3>Entry Search</h3>
    </div>
  )
}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);