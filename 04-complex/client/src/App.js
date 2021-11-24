import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Fib />
        <header>
          <Link to="/">Home</Link>
          <Link to='/otherpage'>Other Page</Link>
        </header>
        <div>
          <Routes>
            <Route exact path='/' component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
