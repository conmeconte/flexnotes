import React, {Component} from 'react';

import {Link, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { selectPage, addPage } from '../../actions';

class Page extends Component {
    constructor(props){
        super(props);

        this.state = {
            editable: false,
            //tabObject: this.props.tabObj,
            //binderUrl: this.props.binderUrl
        }

        this.addPage = this.addPage.bind(this);
        this.editPages = this.editPages.bind(this);
        this.notEditPages = this.notEditPages.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    addPage(){
        //console.log('addPage clicked');
        this.props.addPage(this.props.interface.binder_id, this.props.interface.tab_id);
    }

    editPages(){
        console.log("editable should be true");
        this.setState({
            editable: true
        });
    }

    notEditPages() {
        console.log("editable should be false");
        this.setState({ 
            editable: false 
        });
    }

    pageTextChanged(e, id){
        const {tabObject} = this.state;
        const {page_arr_obj} = tabObject;
        //console.log("text changed, id:", id);
        //console.log(e.target.value);

        for(let i =0; i<page_arr_obj.length; i++){
            if(page_arr_obj[i].tab_id===id ){
                //console.log('binder_id and id match');
                page_arr_obj[i].tab_name = e.target.value;
            }
        }

        tabObject.page_arr_obj = page_arr_obj;

        this.setState({
            tabObject: tabObject
        });
    }
    
    deletePage(delete_id){

        const {tabObject} = this.state;
        const {page_arr_obj} = tabObject;
        //console.log(binder_array);
        let deleteIndex = 0;
        for(deleteIndex; deleteIndex<page_arr_obj.length; deleteIndex++){
            if(page_arr_obj[deleteIndex].page_id === delete_id){
                page_arr_obj.splice(deleteIndex, 1);
            }
        }

        tabObject.page_arr_obj = page_arr_obj;

        this.setState({
            tabObject: tabObject
        });
    }   

    handleClick(){
        //this.props.selectBinder(binderObj);
        this.props.selectPage(this.props.pageObj);
        //console.log("page id updated");
    }

    render(){

        const {tabObject, binderUrl, editable} = this.state;
        console.log('Props in Page:',this.props);
        let url = this.props.interface.binder_id + "/"+this.props.interface.tab_id+"/"+this.props.pageObj._id;
        // let tabArrLength = this.props.binderObj.tab_arr_obj.length;
        // let tabIndex = null;
        // for(let i=0; i <tabArrLength; i++){
        //     if(this.props.interface.tab_id === this.props.binderObj.tab_arr_obj[i]._id){
        //         //console.log('tabid = interface id at index:', i);
        //         tabIndex = i;
        //     }
        // }    
        // const { page_arr_obj } = this.props.binderObj.tab_arr_obj[tabIndex];
        // //console.log('page arr obj in page:', page_arr_obj);

        // let page_link = [];

        // if(editable){
        //     page_link = page_arr_obj.map((item, index) => {
        //         //console.log('editable map:', item);
        //         return (
        //             <li key={index}>
        //                 <input 
        //                     className="edit_input"
        //                     ref='textInput'
        //                     type='text'
        //                     onChange={(e)=>this.pageTextChanged(e, item.page_count)}
        //                     // onBlur={this.notEditable}
        //                    // onKeyPress={this.keyPressed}
        //                     value={item.page_name}
        //                     />

        //                     <button type="button" className="btn btn-default btn-xs btn_delete"  onClick={()=>this.deletePage(item.page_id)} >
        //                         <span className="glyphicon glyphicon-minus"></span>
        //                     </button>    
        //             </li>
        //         );
        //     });
        // } else {
        //     page_link = page_arr_obj.map((item, index) => {
        //         //console.log('page map:', item);
        //         let page_url = '/' + item._id;
        //         return (
        //             <li key={index}><Link to={'/main'+this.props.binder_url + this.props.tab_url + page_url} style={{ textDecoration: 'none' }}>
        //             <div className="pageDiv" onClick={()=>{this.handleClick(item)}}>
        //                 {item.page_name}
        //             </div></Link></li>
        //         );               
        //     });
        // }

    
        // const page_route = page_arr_obj.map((item, index) => {
        //     let page_url = '/' + item._id;
        //     return(
        //         <Route key={index} path={'/main'+this.props.binder_url + this.props.tab_url + page_url} render={()=> 
        //             <PageOld/>
        //         }
        //         />
        //     );
        // });
            return(
    
                <li className='pageBody'>
            <Link to={`/main/${url}`} style={{ textDecoration: 'none' }} >
                <div className=""  onClick={()=>this.handleClick()}>
                    {this.props.pageObj.page_name}
                </div>
                </Link>
                    {/* <button type="button" className={`btn btn-default btn-xs btn_edit_page ${editable ? 'hidden': 'visible'}`} onClick={this.editPages}>
                        Pages <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button type="button" className={`btn btn-default btn-xs btn_edit_page ${editable ? 'visible': 'hidden'}`} onClick={this.notEditPages}>
                        Pages <span className="glyphicon glyphicon-ok"></span>
                    </button>
  
                    <ul className="nav-page-col">
                        {page_link}
                    </ul>
        
                    {page_route}
                    <button className="btn btn-default btn-xs btn_add" onClick={this.addPage}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>                      */}
                </li>
            );
    }

    
}

function mapStateToProps(state){
    //console.log('page mstp', state);
    return {
        binderObj: state.binder.binderObj,
        interface: state.interface
    }
}
export default withRouter(connect(mapStateToProps,{ selectPage, addPage })(Page));
//use binder reducer for logic