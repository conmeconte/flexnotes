import React, {Component} from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect} from 'react-redux';
import * as actions from "../actions";
//import Panel from './panel';
//import NavBar from '../components/navbar/nav';
// import Login from './login';
import LandingPage from './landingpage';
import Dashboard from './dashboard';
import LandingPage from './LandingPage';

class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
               <BrowserRouter >
                <div>
                    <Route exact path="/main" component={Dashboard} />
                    <Route exact path="/" component={LandingPage} />
                        {/* // <NavBar/>
                        // <Panel/>
                        // <Login /> */}

                </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
