import React, { Component } from 'react';
import Panel from './panel';
import NavBar from './navbar/navbar';
import Login from './login';
import Video from './video';
import Slides from './slides';
import Notes from './notes';

import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDataObject } from '../actions';

import Tour from 'reactour';
import steps from './react_tour_steps';

import '../assets/css/dashboard.css';


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth
        }
    }
    componentWillMount(){
        this.props.getDataObject();

        this.state = {
            isTourOpen: false
        };

        this.toggleTour = this.toggleTour.bind(this);
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    }
    toggleTour() {
        if (this.state.isTourOpen) {
            this.setState({
                isTourOpen: false
            });
        } else {
            this.setState({
                isTourOpen: true
            });
        }
    }

    render(){
        const { width } = this.state;
        const isMobile = width <= 767;
        let dashboard = {};
        if(!this.props.binderArr){
            return null;
        } 
        if(isMobile){
            console.log('isMobile is true');
            dashboard = (
                <div>
                    <Route path={'/main/mNavbar'} component={NavBar} />
                    <Route path={'/main/mVideo'} component={Video} />
                    <Route path={'/main/mSlides'} component={Slides} />
                    <Route path={'/main/mNotes'} component={Notes} />

                    <ul className="mobileNav">
                        <li className="mobileLink navLink">                    
                            <Link to={`/main/mNavbar`} style={{ textDecoration: 'none' }}> 
                        <div><i className="small material-icons">dehaze</i><br/>Nav</div>    
                            </Link>
                        </li>
                        <li className="mobileLink">                    
                            <Link to={`/main/mVideo`} style={{ textDecoration: 'none' }}> 
                        <div><i className="small material-icons">video_library</i><br/>Video</div>    
                            </Link>
                        </li>
                        <li className="mobileLink">
                            <Link to={`/main/mSlides`} style={{ textDecoration: 'none' }}> 
                        <div><i className="small material-icons">video_label</i><br/>Slides</div>    
                            </Link>
                        </li>
                        <li className="mobileLink">
                            <Link to={`/main/mNotes`} style={{ textDecoration: 'none' }}> 
                        <div><i className="small material-icons">description</i><br/>Notes</div>    
                            </Link>
                        </li>
                    </ul>

                </div>
            );
        } else {
            dashboard = (
                <div id="dashboard-container" className="row">
                <NavBar toggleTour={this.toggleTour}/>
                <Panel />
                <Tour
                    steps={steps}
                    isOpen={this.state.isTourOpen}
                    onRequestClose={this.toggleTour}
                />
                </div>
            );
        }

        return(
            <div>
                {dashboard}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        binderArr: state.binderArray.binderArr
    }
}

export default connect(mapStateToProps, { getDataObject })(Dashboard);
