import React, {Component} from 'react';

import {Link, Route} from 'react-router-dom';
import Tab from './tab';

export default class Binder extends Component {
    constructor(props){
        super(props);

        this.state = {
            binder: this.props.binder_obj
        }

        this.addTab = this.addTab.bind(this);
    }

    addTab(){
        console.log('addTab clicked');
        const {binder} = this.state;
        //console.log(binder);
        const {tab_arr_obj} = binder;
        //console.log('tab_arr_obj:',tab_arr_obj);

        let length = tab_arr_obj.length;
        let new_index = tab_arr_obj[length-1].tab_id + 1;
        //console.log('tab_arr_obj',tab_arr_obj[length-1]);
        let new_url = '/tab' + new_index;
        //console.log('new_url:',new_url);
        let new_tab_obj = {
            tab_id: new_index,
            tab_color: 'red',
            tab_name: 'NewTab',
            tab_url: new_url,
            page_arr_obj: [{

                page_id: 1,
                page_color: 'green',
                page_name: 'Page1',
                page_date: '',
                page_url: '/page1'
            }]
        }

        binder.tab_arr_obj = [...binder.tab_arr_obj, new_tab_obj];

        this.setState({
            binder: binder
        });

    }


    render(){

        const {binder} = this.state;
        console.log('binderObj:',binder);
        const{ tab_arr_obj, binder_url} = binder;

        const tab_link = tab_arr_obj.map((item, index) => {
        console.log('map:', item);
            return (
                <li key={item.tab_id}><Link to={binder_url + item.tab_url}>
                    <div className="tabDiv">
                        {item.tab_name}
                    </div>
                </Link></li>
            );               
         });
    
        const tab_route = tab_arr_obj.map((item, index) => {
            return(
                <Route key={item.tab_id} path={binder_url + item.tab_url} render={()=> 
                    <Tab tabObj={item} binderUrl={binder_url}/>
                }
                />
            );
        });
            return(
    
                <div className='nav_tab'>
                    <h4>Tabs</h4>
                    <button onClick={this.addTab}>Add Tab</button>
                    <ul className="nav-tab-col">
                        {tab_link}
                    </ul>
        
                    {tab_route}
                   
                </div>
            );
    }

    
}