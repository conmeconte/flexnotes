import React, {Component} from 'react';
import Panel from './panel';
import NavBar from '../components/navbar/nav';
import Login from './login';
import '../assets/css/app.css';

class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Panel/>

                <Login />
            </div>
        );
    }
}

export default App;
