import React, { Component } from 'react';
import Binder from './binder';
import Login from '../login';
import logo from '../../assets/images/logo.png';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBinderArray, deleteBinder, addBinder, updateBinderObj, minNav, showNav, editable, notEditable } from '../../actions';

import FlexNotesTour from '../react_tour';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }

        this.addBinder = this.addBinder.bind(this);
        this.editMode = this.editMode.bind(this);
        this.notEditable = this.notEditable.bind(this);
        this.deleteBinder = this.deleteBinder.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.interface.pull_from_db || nextProps.interface.page_id !== this.props.interface.page_id) {
            //console.log("update binder array");
            this.props.updateBinderArray();
        }

        if (nextProps.interface.sent_to_db || this.props.interface.sent_to_db) {
            //console.log("sent to db = true");
            for (let i = 0; i < this.props.binderArr.length; i++) {
                if (this.props.binderArr[i]._id === nextProps.interface.binder_id) {
                    let binderObj = this.props.binderArr[i];
                    //console.log("binder object: ", binderObj);
                    this.props.updateBinderObj(binderObj);
                }
            }

        }
    }
    addBinder() {
        //console.log('add Binder');
        this.props.addBinder();
    }

    deleteBinder(delete_id) {
        //console.log('delete button clicked, binder_id: ', delete_id);
        if (this.props.binderArr.length === 1) {
            console.log('can not delete last binder');
        } else {
            this.props.deleteBinder(delete_id);
        }

        // const { binder_arr_obj } = this.state;
        // console.log(binder_arr_obj);
        // let deleteIndex = 0;
        // for (deleteIndex; deleteIndex < binder_arr_obj.length; deleteIndex++) {
        //     if (binder_arr_obj[deleteIndex].binder_id === delete_id) {
        //         binder_arr_obj.splice(deleteIndex, 1);
        //     }
        // }
    }

    editMode() {
        if (this.props.interface.editable) {
            this.props.notEditable();
        } else {
            this.props.editable();
        }

    }

    editName() {
        console.log('editname');

    }

    hideNav() {
        this.props.minNav();
    }

    openNav() {
        this.props.showNav();
    }

    notEditable() {
        console.log("editable should be false");
        this.setState({
            editable: false
        });
    }

    hoverBinder() {

    }

    notHoverBinder() {

    }

    render() {
        //console.log("navbar props:", this.props);
        let editableText = '';

        if (this.props.interface.editable) {
            editableText = 'Done';
        } else {
            editableText = 'Edit';
        }

        let binder = this.props.binderArr.map((item, index) => {

            return (
                <div key={index} onMouseEnter={this.hoverBinder.bind(this)} onMouseLeave={this.notHoverBinder.bind(this)} className="binderWrap blue-grey darken-3">
                    <Binder index={index} binderObj={item} />

                </div>
            );
        });



        return (
            <div>


                <button className={`navbarShow btn ${this.props.interface.navbar_min ? 'visible' : 'hidden'}`} onClick={this.openNav.bind(this)}>
                    <i className="small material-icons">chevron_right</i>
                </button>
                <div className={`navbar col s2 ${this.props.interface.navbar_min ? 'hidden' : 'visible'}`}>

                    <header>
                        <img className="logoImage" src={logo} /><h1><span className="dashFlex">Flex</span>Notes</h1>
                    </header>
                    <button className='btn hideNavbar' onClick={this.hideNav.bind(this)}>
                        <i className="small material-icons">chevron_left</i>
                    </button>
                    {/* <button className={`editMode btn ${this.props.interface.editable ? 'editing':'' }`} onClick={this.editMode.bind(this)}>
                    {editableText}
                </button> */}
                    <section className="second-step binder-container">
                        {binder}
                        <button className="btn add-btn-binder waves-effect waves-light" onClick={this.addBinder}>
                            New Binder</button>
                        <Route path={'/main/:binder'} component={Binder} />
                    </section>

                    <footer>
                        <FlexNotesTour toggleTour={this.props.toggleTour} />
                        <Login />
                    </footer>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.log('binder mstp', state);
    return {
        binderArr: state.binderArray.binderArr,
        binder: state.binder.binderObj,
        interface: state.interface
    }
}

export default connect(mapStateToProps, { editable, notEditable, updateBinderArray, deleteBinder, addBinder, updateBinderObj, minNav, showNav })(NavBar);
