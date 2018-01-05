import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

import Binder from './binder';

import './navbar.css';

export default class Nav extends Component {
    constructor(props){
        super(props);

        this.state = {
            editable: false,
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
        this.editable = this.editable.bind(this);
        this.notEditable = this.notEditable.bind(this);
    }

    addBinder(){
        console.log('add Binder');
        const {binder_array, new_tab_arr} = this.state;

        let length = binder_array.length;
        if(length === 0){
            //new binder when there are no binders
            let new_binder_obj = {
                binder_id: 1,
                binder_name: 'Binder1',
                binder_color: 'color',
                binder_url: '/binder1',
                tab_arr_obj: new_tab_arr
            }

            this.setState({
                binder_array: [new_binder_obj]
            });

        } else {
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

    }

    deleteBinder(delete_id){
        console.log('delete button clicked, binder_id: ', delete_id);

        const {binder_array} = this.state;
        console.log(binder_array);
        let deleteIndex = 0;
        for(deleteIndex; deleteIndex<binder_array.length; deleteIndex++){
            if(binder_array[deleteIndex].binder_id === delete_id){
                binder_array.splice(deleteIndex, 1);
            }
        }

        this.setState({
            binder_array: binder_array
        });
    }

    editable(){
        console.log("editable should be true");
        this.setState({
            editable: true
        });
    }

    notEditable() {
        console.log("editable should be false");
        this.setState({ 
            editable: false 
        });
    }

    // keyPressed(event) {
    //     if(event.key == 'Enter') {
    //       //this.notEditable();
    //   }
    // }

    textChanged(e, id){
        const {binder_array} = this.state;
        //console.log("text changed, id:", id);
        //console.log(e.target.value);

        for(let i =0; i<binder_array.length; i++){
            if(binder_array[i].binder_id===id ){
                //console.log('binder_id and id match');
                binder_array[i].binder_name = e.target.value;
            }
        }
        this.setState({
            binder_array: binder_array
        });
    }

    /*
    
    
    
    
    //keep data updated with database.




    */
    render(){
        const {binder_array, editable} = this.state;
        //console.log('Render binderArray:', binder_array);
        let binder_link = [];
        //map binders
        if(editable){
            binder_link = binder_array.map((item, index) => {
                //console.log('editable map:', item);
                return (
                    <li key={item.binder_id}>
                        <input 
                            className="edit_input"
                            ref='textInput'
                            type='text'
                            onChange={(e)=>this.textChanged(e, item.binder_id)}
                            // onBlur={this.notEditable}
                           // onKeyPress={this.keyPressed}
                            value={item.binder_name}
                            />

                            <button type="button" className="btn btn-default btn-xs btn_delete"  onClick={()=>this.deleteBinder(item.binder_id)} >
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>    
                    </li>
                );
            });

        } else {
            binder_link = binder_array.map((item, index) => {
                //console.log('map:', item);
                return (
                    <li key={item.binder_id}>
                        <Link to={'/main'+item.binder_url}>{item.binder_name}</Link>
                    </li>
                );               
            });
        }





        const binder_route = binder_array.map((item, index) => {
            return(
                <Route key={item.binder_id} path={'/main'+item.binder_url} render={()=> 
                    <Binder binder_obj={item}/>}
                />
            );
        });

        return(
            <div className="nav_binder col-xs-2">

                <h3 className="nav_header">Binder</h3>
                <button type="button" className={`nav_header btn btn-default btn-xs btn_edit ${editable ? 'hidden': 'visible'}`} onClick={this.editable}>
                        <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <button type="button" className={`nav_header btn btn-default btn-xs btn_edit ${editable ? 'visible': 'hidden'}`} onClick={this.notEditable}>
                        <span className="glyphicon glyphicon-ok"></span>
                </button>



                <ul className="nav-binder-row">
                    {binder_link}
                </ul>
                {binder_route}
                <button className={`btn btn-default btn-xs btn_add ${editable ? 'visible': 'hidden'}`} onClick={this.addBinder}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>  
            </div>
        );
    }
}
