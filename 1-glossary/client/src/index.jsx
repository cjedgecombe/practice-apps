import * as ReactDOM from 'react-dom';


const App = () => {


  return (
    <div>
      <h1>Glossary</h1>
      <h3>Existing Entries</h3>
      <h3>Add an Entry</h3>
      <h3>Entry Search</h3>
    </div>
  )
}

const root = document.getElementById('root');
ReactDOM.render(<App/>, root);