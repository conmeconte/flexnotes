import React, {Component} from 'react';

import {Link, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { selectPage, deletePage, editPage } from '../../actions';

class Page extends Component {
    constructor(props){
        super(props);

        this.state = {
            editable: false,
            pageName: ''
            //tabObject: this.props.tabObj,
            //binderUrl: this.props.binderUrl
        }

        // this.addPage = this.addPage.bind(this);
        // this.editPages = this.editPages.bind(this);
        // this.notEditPages = this.notEditPages.bind(this);
        this.deletePage = this.deletePage.bind(this);
        this.editPage = this.editPage.bind(this);
        this.notEditPage = this.notEditPage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    // componentWillReceiveProps(nextProps){
    //     //console.log('nextProps: ',nextProps);
    //      if(this.props.binderObj != nextProps.binderObj){
    //          this.props.updateBinderArray();
    //      }
    // }

    // addPage(){
    //     //console.log('addPage clicked');
    //     this.props.addPage(this.props.interface.binder_id, this.props.interface.tab_id);
    // }

    // editPages(){
    //     console.log("editable should be true");
    //     this.setState({
    //         editable: true
    //     });
    // }

    // notEditPages() {
    //     console.log("editable should be false");
    //     this.setState({ 
    //         editable: false 
    //     });
    // }

    // pageTextChanged(e, id){
    //     const {tabObject} = this.state;
    //     const {page_arr_obj} = tabObject;
    //     //console.log("text changed, id:", id);
    //     //console.log(e.target.value);

    //     for(let i =0; i<page_arr_obj.length; i++){
    //         if(page_arr_obj[i].tab_id===id ){
    //             //console.log('binder_id and id match');
    //             page_arr_obj[i].tab_name = e.target.value;
    //         }
    //     }

    //     tabObject.page_arr_obj = page_arr_obj;

    //     this.setState({
    //         tabObject: tabObject
    //     });
    // }
    
    // deletePage(delete_id){

    //     const {tabObject} = this.state;
    //     const {page_arr_obj} = tabObject;
    //     //console.log(binder_array);
    //     let deleteIndex = 0;
    //     for(deleteIndex; deleteIndex<page_arr_obj.length; deleteIndex++){
    //         if(page_arr_obj[deleteIndex].page_id === delete_id){
    //             page_arr_obj.splice(deleteIndex, 1);
    //         }
    //     }

    //     tabObject.page_arr_obj = page_arr_obj;

    //     this.setState({
    //         tabObject: tabObject
    //     });
    // }   
    editPageName(e){


        this.setState({
            pageName: e.target.value
        });
    }
    editPage(){
        //console.log("editable should be true");
        this.setState({
            editable: true,
            pageName: this.props.pageObj.page_name
        });
    }

    notEditPage() {
        //console.log("editable should be false");
        const { pageName } = this.state;
        this.props.editPage(this.props.interface.binder_id, this.props.tabID, this.props.pageObj._id, pageName);
        this.setState({ 
            editable: false 
        });
    }

    deletePage(page_id){
        //console.log('delete page id:', page_id);
        let deleteIndex = null;
        for(let i = 0; i < this.props.binder.tab_arr_obj.length; i++){
            if(this.props.binder.tab_arr_obj[i]._id === this.props.tabID){
                console.log('delete Index', deleteIndex);
                deleteIndex = i;
            }
        }
        if(this.props.binder.tab_arr_obj[deleteIndex].page_arr_obj.length === 1){
            console.log('can not delete last page');
            return;
        }
        this.props.deletePage(this.props.interface.binder_id, this.props.tabID, this.props.pageObj._id);
    }

    handleClick(){
        //this.props.selectBinder(binderObj);
        this.props.selectPage(this.props.interface.binder_id, this.props.tabID, this.props.pageObj._id);
        //console.log("page id updated");
        //this.props.
    }

    render(){

        const {editable, pageName} = this.state;
        if(!this.props.pageObj){
            return null;
        }
        
        let url = this.props.interface.binder_id + "/"+this.props.interface.tab_id+"/"+this.props.pageObj._id;

        //console.log('Props in Page:',this.props);
        //console.log('State in Page:',this.state);
        let page_list = [];
        if(editable){
            //let editName = this.props.binderObj.binder_name;
            page_list = (
                <div className="tabTitle">
                         <input 
                             className="edit_input"
                             ref='textInput'
                             type='text'
                             onChange={(e)=>this.editPageName(e)}
                             // onBlur={this.notEditable}
                            // onKeyPress={this.keyPressed}
                             value={pageName}
                             />
                <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'visible' : 'hidden'}`} onClick={this.notEditPage}>
                    Done <span className="glyphicon glyphicon-ok"></span>
                </button>
            </div>              
            );
        } else {
            page_list = (
                <div className="">
            <Link to={`/main/${url}`} style={{ textDecoration: 'none' }} >
                <div className="pageLink"  onClick={()=>this.handleClick()}>
                    {this.props.pageObj.page_name}
                </div>
                </Link>
                <div className="right-align btn-div">
                    <button type="button" className='btn page-btn' onClick={this.editPage}>
                            E P
                    </button>
                    <button type="button" className="btn page-btn" onClick={()=>this.deletePage()} >
                    D P
                    </button>
                </div>

                </div>
            );
        }



        return(
            <li className="pageBody">
                {page_list}
            </li>
            
        );
    }

    
}

function mapStateToProps(state){
    //console.log('page mstp', state);
    return {
        binder: state.binder.binderObj,
        interface: state.interface
    }
}
export default withRouter(connect(mapStateToProps,{ selectPage, deletePage, editPage })(Page));
//use binder reducer for logic