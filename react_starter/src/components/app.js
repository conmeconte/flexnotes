import React from 'react';
import Panel from './panel/panel';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import Video from './video/video';

import Modal from './modal';

const App = () => (
    <div>
        <div className="app">
            <Panel/>
        </div>
        {/*<Modal />*/}
    </div>
);

export default App;
