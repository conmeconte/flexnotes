import React, { Component } from 'react';
import Binder from './binder';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBinderArray, deleteBinder, addBinder} from '../../actions';


class NavBar extends Component{

    addBinder() {
        //console.log('add Binder');
        this.props.addBinder();
    }
    render(){
        console.log("navbar props:", this.props);

        const binder = this.props.binderArr.map((item, index) => {
            //let binder_url = '/' + item._id;
            //console.log('Route binder id: ', binder_url);
            //console.log("binder_url", binder_url);
            console.log('navbar item', item);
            
            return (
                <div key={index} className="binderSingle">
                    <Binder binderObj={item}/>
                </div>
            );
        });

        // const binder_route = this.props.binderArr.map((item, index) => {
        //     let binder_url = '/' + item._id;
        //     //console.log('Route binder id: ', binder_url);
        //     //console.log("binder_url", binder_url);
        //     return (
        //         <Route key={index} path={'/main/:binder'} component={Binder}/>
        //     );
        // });
        return (
            <div className="navbar col-xs-2">
                {binder}
                {/* <div className="contain-tab">
                    <h4 className="nav_header"></h4>
                </div>
                <div className="contain-page">
                    <h4 className="nav_header"></h4>
                </div> */}
                {/* {binder_route} */}
                
                <button className={"btn btn-default btn-xs btn_add"} onClick={this.addBinder.bind(this)}>
                    <span className="glyphicon glyphicon-plus"></span>Add Binder
                </button>
                <Route path={'/main/:binder'} component={Binder}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    //console.log('binder mstp', state);
    return{
        binderArr: state.binderArray.binderArr,
    }
}

export default connect(mapStateToProps,{ updateBinderArray, deleteBinder, addBinder})(NavBar);
