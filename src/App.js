import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Leagues from './components/Leagues/Leagues';
import Teams from './components/Teams/Teams';
import CalendarTeam from './components/CalendarTeam/CalendarTeam';
import CalendarLeague from './components/CalendarLeague/CalendarLeague';

function App() {
  return (
    <Router>
      <div className='app-wraper'>
        <Header />
        <Navbar />
        <div  className='app-wraper-content'>
          <Switch>
            <Route path='/leagues' component={Leagues} />
            <Route path='/teams' component={Teams} />
            <Route path='/calendarTeam/:id' component={CalendarTeam} />
            <Route path='/calendarLeague/:id' component={CalendarLeague} />      
          </Switch>
        </div>      
      </div>
    </Router>
  );
}

export default App;
