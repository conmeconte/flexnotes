import React, { Component } from 'react';
import Binder from './binder';
import Login from '../login';
import logo from '../../assets/images/logo.png';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBinderArray, deleteBinder, addBinder, updateBinderObj, minNav, showNav} from '../../actions';

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
        this.addBinder = this.addBinder.bind(this);
        this.editable = this.editable.bind(this);
        this.notEditable = this.notEditable.bind(this);
        this.deleteBinder = this.deleteBinder.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.interface.pull_from_db || nextProps.interface.page_id !== this.props.interface.page_id){
            console.log("update binder array");
            this.props.updateBinderArray();
        }

        if(nextProps.interface.sent_to_db){
            console.log("sent to db = true");
            for (let i = 0; i < this.props.binderArr.length; i++) {
                if (this.props.binderArr[i]._id === nextProps.interface.binder_id) {
                    let binderObj = this.props.binderArr[i];
                    console.log("binder object: ", binderObj);
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
        if(this.props.binderArr.length === 1){
            console.log('can not delete last binder');
            return;
        }
        this.props.deleteBinder(delete_id);
        // const { binder_arr_obj } = this.state;
        // console.log(binder_arr_obj);
        // let deleteIndex = 0;
        // for (deleteIndex; deleteIndex < binder_arr_obj.length; deleteIndex++) {
        //     if (binder_arr_obj[deleteIndex].binder_id === delete_id) {
        //         binder_arr_obj.splice(deleteIndex, 1);
        //     }
        // }
    }

    editable() {
        console.log("editable should be true");
        this.setState({
            editable: true
        });
    }

    editName(){
        console.log('editname');
    
    }

    hideNav(){
        this.props.minNav();
    }

    openNav(){
        this.props.showNav();
    }
    
    notEditable() {
        console.log("editable should be false");
        this.setState({
            editable: false
        });
    }
    render(){
        console.log("navbar props:", this.props);
        const { editable } = this.state;
        let binder = [];
        if(editable){
            // binder = this.props.binderArr.map((item, index) => {
            //     //let binder_url = '/' + item._id;
            //     //console.log('Route binder id: ', binder_url);
            //     //console.log("binder_url", binder_url);
            //     console.log('navbar item', item);
                
            //     return (
            //         <div key={index}>
            //             <div onClick={()=>this.editName()}>{item.binder_name}</div>
            //             <button type="button" className="btn btn-default btn_delete" onClick={()=>this.deleteBinder(item._id)} >
            //              <span className="glyphicon glyphicon-minus"></span>Delete Binder
            //             </button>
            //         </div>
            //     );
            // });
        }else{
            binder = this.props.binderArr.map((item, index) => {
                //let binder_url = '/' + item._id;
                //console.log('Route binder id: ', binder_url);
                //console.log("binder_url", binder_url);
                //console.log('navbar item', item);
                
                return (
                    <div key={index} className="binderWrap second-step">
                        <Binder index={index} binderObj={item}/>

                    </div>
                );
            });
        }







        // const binder_route = this.props.binderArr.map((item, index) => {
        //     let binder_url = '/' + item._id;
        //     //console.log('Route binder id: ', binder_url);
        //     //console.log("binder_url", binder_url);
        //     return (
        //         <Route key={index} path={'/main/:binder'} component={Binder}/>
        //     );
        // });
        return (
            <div>

            
            <button className={`${this.props.interface.navbar_min ? 'visible' : 'hidden'}`} onClick={this.openNav.bind(this)}>
            <i className="small material-icons">chevron_right</i>
            </button>
            <div className={`navbar col s2 ${this.props.interface.navbar_min ? 'hidden' : 'visible'}`}>
                {/* <div className="logout">
                    <img className="logoImage" src={logo} />
                    <Login />
                </div> */}
                <button className='hideNavbar' onClick={this.hideNav.bind(this)}>
                <i className="small material-icons">chevron_left</i>
                </button>

                
                {binder}
                <button className="btn add-btn-binder waves-effect waves-light" onClick={this.addBinder}>
                New Binder</button>  
                <Route path={'/main/:binder'} component={Binder}/>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    //console.log('binder mstp', state);
    return{
        binderArr: state.binderArray.binderArr,
        binder: state.binder.binderObj,
        interface: state.interface
    }
}

export default connect(mapStateToProps,{ updateBinderArray, deleteBinder, addBinder, updateBinderObj, minNav, showNav})(NavBar);
