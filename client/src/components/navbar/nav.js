import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

import Binder from './binder';

import './navbar.css';

export default class Nav extends Component {
    constructor(props){
        super(props);

        this.state = {
            binder_array: [
                {
                    binder_id: 1,
                    binder_name: 'Binder1',
                    binder_color: 'red',
                    binder_url: '/binder1',
                    tab_arr_obj: [{
                        
                            tab_id: 1,
                            tab_color: 'blue',
                            tab_name: 'Tab1',
                            tab_url: '/tab1',
                            page_arr_obj: [
                            {
                                page_id: 1,
                                page_color: 'white',
                                page_name: 'Page1',
                                page_date: '',
                                page_url: '/page1'
                            },
                            {
                                page_id: 2,
                                page_color: 'grey',
                                page_name: 'Page2',
                                page_date: '',
                                page_url: '/page2'
                            }
                            ]
                            }, {
                                               
                            tab_id: 2,
                            tab_color: 'red',
                            tab_name: 'Tab2',
                            tab_url: '/tab2',
                            page_arr_obj: [
                                {
                                page_id: 1,
                                page_color: 'black',
                                page_name: 'Page1',
                                page_date: '',
                                page_url: '/page1'
                                },
                                {
                                page_id: 2,
                                page_color: 'red',
                                page_name: 'Page2',
                                page_date: '',
                                page_url: '/page2'
                                }
                            ]     
                        }]
                }
            ],

            new_tab_arr: [{
                tab_id: 1,
                tab_color: 'blue',
                tab_name: 'TabName',
                tab_url: '/tab1',
                page_arr_obj: [{

                    page_id: 1,
                    page_color: 'white',
                    page_name: 'PageName',
                    page_date: '',
                    page_url: '/page1'
                }]
            }]

        }

        this.addBinder = this.addBinder.bind(this);
        this.deleteBinder = this.deleteBinder.bind(this);
        this.updateBinderName = this.updateBinderName.bind(this);
    }

    addBinder(){
        console.log('add Binder');
        const {binder_array, new_tab_arr} = this.state;

        let length = binder_array.length;
        let new_index = binder_array[length-1].binder_id + 1;
        let new_url = '/binder' + new_index;

        let new_binder_obj = {
            binder_id: new_index,
            binder_name: 'New Binder',
            binder_color: 'color',
            binder_url: new_url,
            tab_arr_obj: new_tab_arr
        }

        this.setState({
            binder_array: [...binder_array, new_binder_obj]
        });
    }

    deleteBinder(binder_id){
        console.log('delete button clicked, binder_id: ', binder_id);
        // const tempData = this.state.todoData.slice();
        // console.log(tempData);
        // tempData.splice(index, 1);

        // this.setState({
        //     todoData: tempData
        // });

    }

    updateBinderName(binder_id){
        console.log('edit button clicked, binder_id: ', binder_id);

    }

    /*
    
    
    
    
    //keep data updated with database.




    */
    render(){
        const {binder_array} = this.state;
        console.log('Render binderArray:', binder_array);
        //map binders
        const binder_link = binder_array.map((item, index) => {
            console.log('map:', item);
            return (
                <li key={item.binder_id}>
                    <Link to={item.binder_url}>{item.binder_name}</Link>
                    <button type="button" className="btn btn-default btn-xs btn_edit" onClick={()=>this.updateBinderName(item.binder_id)}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button type="button" className="btn btn-default btn-xs btn_delete"  onClick={()=>this.deleteBinder(item.binder_id)} >
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </li>
            );               
        });

        const binder_route = binder_array.map((item, index) => {
            return(
                <Route key={item.binder_id} path={item.binder_url} render={()=> 
                    <Binder binder_obj={item}/>}
                />
            );
        });

        return(
            <div className="nav_binder col-xs-2">

                <h3 className="nav_header">Binder</h3>
                <button className="btn btn-default btn-xs nav_header btn_add" onClick={this.addBinder}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>                

                <ul className="nav-binder-row">
                    {binder_link}
                </ul>
                {binder_route}

            </div>
        );
    }
}
