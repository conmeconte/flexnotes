import React, {Component} from 'react';

import {Link, Route} from 'react-router-dom';
import Page from './page';

export default class Tab extends Component {
    constructor(props){
        super(props);

        this.state = {
            binder: this.props.tabObj,
            binderUrl: this.props.binderUrl
        }

        this.addPage = this.addPage.bind(this);
    }

    addPage(){
        console.log('addTab clicked');
        const {binder} = this.state;
        console.log("addPage: ",binder);
        const {tab_arr_obj} = binder;
        //console.log('tab_arr_obj:',tab_arr_obj);

        let length = tab_arr_obj.length;
        let new_index = tab_arr_obj[length-1].tab_id + 1;
        //console.log('tab_arr_obj',tab_arr_obj[length-1]);
        let new_url = '/tab' + new_index;
        //console.log('new_url:',new_url);
        let new_page_obj = {
                page_id: 1,
                page_color: 'green',
                page_name: 'PageName',
                page_date: '',
                page_url: '/page1'
            };
        

        binder.tab_arr_obj = [...binder.tab_arr_obj, new_tab_obj];

        this.setState({
            binder: binder
        });

    }


    render(){

        const {binder, binderUrl} = this.state;
        console.log('BinderObj in Tab:',binder);
        console.log('BinderUrl in Tab:',binderUrl);
        const{ page_arr_obj, tab_url} = binder;
        console.log('page_arr_obj:', page_arr_obj);
        console.log('tab_url:', tab_url);

        const page_link = page_arr_obj.map((item, index) => {
        console.log('map:', item);
            return (
                <li key={item.page_id}><Link to={binderUrl + tab_url + item.page_url}>{item.page_name}</Link></li>
            );               
         });
    
        const page_route = page_arr_obj.map((item, index) => {
            return(
                <Route key={item.page_id} path={binderUrl + tab_url + item.page_url} render={()=> 
                    <Page/>
                }
                />
            );
        });
            return(
    
                <div className='nav_tab'>
                    <h2>Pages</h2>
                    <ul>
                        {page_link}
                    </ul>
        
                    {page_route}
                    <button onClick={this.addPage}>Add Page</button>
                </div>
            );
    }

    
}