import React, {Component} from 'react';
import Notes from './notes';
import Modal from './modal';
import '../assets/css/app.css';

class App extends Component {
    render() {
        return (
            <div>
                <Notes />
                <Modal />
            </div>
        );
    }
}

export default App;
