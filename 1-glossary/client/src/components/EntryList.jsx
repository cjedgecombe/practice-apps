import React from 'react';

const EntryList = (props) => {
  console.log('current list', props.currentList);
  return (<div>
    {props.currentList.map((entry) => {
      return <p key={entry._id}>{entry.term} - {entry.definition}</p>
    })}
  </div>)
}

export default EntryList;