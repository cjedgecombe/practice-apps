import React from 'react';

const EntryList = (props) => {
  return (<div>
    {props.currentList.map((entry) => {
      return <div>
      <p key={entry._id} id={entry.term}>{entry.term} - {entry.definition}</p>
      <button onClick={(e) => {props.editHandler(props.termState, props.defState, e.target)}}>Edit</button>
      <button onClick={(e) => {props.deleteHandler(e.target)}}>Delete</button>
      </div>
    })}
  </div>)
}

export default EntryList;