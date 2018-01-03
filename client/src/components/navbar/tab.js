import React, {Component} from 'react';

import {Link, Route} from 'react-router-dom';
import Page from './page';

export default class Tab extends Component {
    constructor(props){
        super(props);

        this.state = {
            editable: false,
            tabObject: this.props.tabObj,
            binderUrl: this.props.binderUrl
        }

        this.addPage = this.addPage.bind(this);
        this.editPages = this.editPages.bind(this);
        this.notEditPages = this.notEditPages.bind(this);
    }

    addPage(){
        console.log('addTab clicked');
        const {tabObject} = this.state;
        //console.log("addPage: ", tabObject);
        const {page_arr_obj} = tabObject;
        console.log('page_arr_obj:',page_arr_obj);

        let length = page_arr_obj.length;
         
        if(length === 0) {
            let new_page_obj = {
                page_id: 1,
                page_color: 'green',
                page_name: 'Page 1',
                page_date: '',
                page_url: '/page1'
            };

            tabObject.page_arr_obj = [new_page_obj];

            this.setState({
                tabObject: tabObject
            });

        } else {
            let new_index = page_arr_obj[length-1].page_id + 1;
            //console.log('tab_arr_obj',tab_arr_obj[length-1]);
            let new_url = '/page' + new_index;
            //console.log('new_url:',new_url);
            let new_page_obj = {
                    page_id: new_index,
                    page_color: 'green',
                    page_name: 'NewPage',
                    page_date: '',
                    page_url: new_url
                };
            
    
            tabObject.page_arr_obj = [...tabObject.page_arr_obj, new_page_obj];
    
            this.setState({
                tabObject: tabObject
            });
        }
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


    render(){

        const {tabObject, binderUrl, editable} = this.state;
        console.log('TabObj in Tab:',tabObject);
        //console.log('BinderUrl in Tab:',binderUrl);
        const{ page_arr_obj, tab_url} = tabObject;
        //console.log('page_arr_obj:', page_arr_obj);
        //console.log('tab_url:', tab_url);
        let page_link = [];

        if(editable){
            page_link = page_arr_obj.map((item, index) => {
                //console.log('editable map:', item);
                return (
                    <li key={item.page_id}>
                        <input 
                            className="edit_input"
                            ref='textInput'
                            type='text'
                            onChange={(e)=>this.pageTextChanged(e, item.page_id)}
                            // onBlur={this.notEditable}
                           // onKeyPress={this.keyPressed}
                            value={item.page_name}
                            />

                            <button type="button" className="btn btn-default btn-xs btn_delete"  onClick={()=>this.deletePage(item.page_id)} >
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>    
                    </li>
                );
            });
        } else {
            page_link = page_arr_obj.map((item, index) => {
                //console.log('map:', item);
                return (
                    <li key={item.page_id}><Link to={binderUrl + tab_url + item.page_url}>
                    <div className="pageDiv">
                        {item.page_name}
                    </div></Link></li>
                );               
            });
        }

    
        const page_route = page_arr_obj.map((item, index) => {
            return(
                <Route key={item.page_id} path={binderUrl + tab_url + item.page_url} render={()=> 
                    <Page/>
                }
                />
            );
        });
            return(
    
                <div className='nav_page'>
                    <h5>Pages</h5>
                    <button type="button" className={`nav_header btn btn-default btn-xs btn_edit ${editable ? 'hidden': 'visible'}`} onClick={this.editPages}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button type="button" className={`nav_header btn btn-default btn-xs btn_edit ${editable ? 'visible': 'hidden'}`} onClick={this.notEditPages}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
  
                    <ul className="nav-page-col">
                        {page_link}
                    </ul>
        
                    {page_route}
                    <button className={`btn btn-default btn-xs btn_add ${editable ? 'visible': 'hidden'}`} onClick={this.addPage}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>                     
                </div>
            );
    }

    
}