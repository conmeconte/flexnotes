import React, { Component } from 'react';
import Binder from './binder';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBinderArray, deleteBinder, addBinder} from '../../actions';


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
        if(nextProps.interface.pull_from_db){
            this.props.updateBinderArray();
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
    
    notEditable() {
        console.log("editable should be false");
        this.setState({
            editable: false
        });
    }
    render(){
        //console.log("navbar props:", this.props);
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
                    <div key={index}>
                        <Binder index={index} binderObj={item}/>
                        <button type="button" className="btn btn-default btn_delete" onClick={()=>this.deleteBinder(item._id)} >
                            <span className="glyphicon glyphicon-minus"></span>Delete Binder
                        </button>
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
            <div className="navbar col s2">
            {/* <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'hidden' : 'visible'}`} onClick={this.editable}>
                    Binders <span className="glyphicon glyphicon-pencil"></span>
            </button>
            <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'visible' : 'hidden'}`} onClick={this.notEditable}>
                    Binders <span className="glyphicon glyphicon-ok"></span>
            </button> */}
                {binder}
                {/* <div className="contain-tab">
                    <h4 className="nav_header"></h4>
                </div>
                <div className="contain-page">
                    <h4 className="nav_header"></h4>
                </div> */}
                {/* {binder_route} */}
                
                <button className={"btn btn-default btn-xs btn_add"} onClick={this.addBinder}>
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
        binder: state.binder.binderObj,
        interface: state.interface
    }
}

export default connect(mapStateToProps,{ updateBinderArray, deleteBinder, addBinder})(NavBar);
