import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBinderArray, selectBinder, addBinder } from '../../actions';


import Tab from './tab';

import '../../assets/css/navbar.css';

class Binder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            binder_color_arr: [
                '#000080', '#808000', '#800000', '#a0522d', '#8a2be2'
            ],
            editable: false,
            active: false,
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
        this.binderLinkActive = this.binderLinkActive.bind(this);
        this.binderLinkNotActive = this.binderLinkNotActive.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    addBinder() {
        //console.log('add Binder');
        this.props.addBinder();
    }

    deleteBinder(delete_id) {
        console.log('delete button clicked, binder_id: ', delete_id);

        const { binder_arr_obj } = this.state;
        console.log(binder_arr_obj);
        let deleteIndex = 0;
        for (deleteIndex; deleteIndex < binder_arr_obj.length; deleteIndex++) {
            if (binder_arr_obj[deleteIndex].binder_id === delete_id) {
                binder_arr_obj.splice(deleteIndex, 1);
            }
        }

        this.setState({
            binder_arr_obj: binder_arr_obj
        });
    }

    editable() {
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

    textChanged(e, id) {
        const { binder_arr_obj } = this.state;
        //console.log("text changed, id:", id);
        //console.log(e.target.value);

        for (let i = 0; i < binder_arr_obj.length; i++) {
            if (binder_arr_obj[i].binder_id === id) {
                //console.log('binder_id and id match');
                binder_arr_obj[i].binder_name = e.target.value;
            }
        }
        this.setState({
            binder_arr_obj: binder_arr_obj
        });
    }

    binderLinkActive(){
        //console.log('binderlinkactive color:', color);
        // this.setState({
        //     active: true
        // });
    }

    binderLinkNotActive(){
        //console.log('binderlinkactive color:', color);
        // this.setState({
        //     active: false
        // });
    }

    handleClick(binderObj){
        //console.log('binderObj:' ,binderObj);
        this.props.selectBinder(binderObj);
    }
    /*
    
    
    
    
    //keep data updated with database.




    */
    render() {
        const { editable, active } = this.state;
        //console.log("Binder props:", this.props);
        //console.log('Render binderArray:', binder_array);
        let binder_link = [];
        //map binders
        if (editable) {
            binder_link = this.props.binderArr.map((item, index) => {
                //console.log('editable map:', item);
                return (
                    <li key={index}>
                        <input
                            className="edit_input"
                            ref='textInput'
                            type='text'
                            onChange={(e) => this.textChanged(e, item.binder_count)}
                            // onBlur={this.notEditable}
                            // onKeyPress={this.keyPressed}
                            value={item.binder_name}
                        />

                        <button type="button" className="btn btn-default btn_delete" onClick={() => this.deleteBinder(item.binder_id)} >
                            <span className="glyphicon glyphicon-minus"></span>
                        </button>
                    </li>
                );
            });

        } else {
            binder_link = this.props.binderArr.map((item, index) => {

                //console.log('Binder map:', item);
                var binderStyle = {
                    backgroundColor: item.binder_color
                }

                var binderStyle2 = {
                    backgroundColor: 'inherit'
                }

                let binder_url = '/' + item._id;
                //console.log('binder id: ', item._id.$oid);
                return (
                    <li key={index}>
                        <Link to={'/main' + binder_url} style={{ textDecoration: 'none' }} >
                            <div className="binderDiv" onClick={()=>{this.handleClick(item)}} style={active ? binderStyle : binderStyle2} onMouseEnter={this.binderLinkActive} onMouseLeave={this.binderLinkNotActive}>
                                {item.binder_name}
                            </div>
                        </Link>
                    </li>
                );
            });
        }

        const binder_route = this.props.binderArr.map((item, index) => {
            let binder_url = '/' + item._id;
            //console.log('Route binder id: ', binder_url);
            //console.log("binder_url", binder_url);
            return (
                <Route key={index} path={'/main'+ binder_url } render={() =>
                    <Tab binder_url={binder_url} />}
                />
            );
        });

        return (
            <div className="nav_binder">

                <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'hidden' : 'visible'}`} onClick={this.editable}>
                    Binders <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'visible' : 'hidden'}`} onClick={this.notEditable}>
                    Binders <span className="glyphicon glyphicon-ok"></span>
                </button>



                <ul className="binder_wrap">
                    {binder_link}
                </ul>
                {binder_route}



                <button className={"btn btn-default btn-xs btn_add"} onClick={this.addBinder}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>
            </div>
        );
    }
}
    function mapStateToProps(state){
        //console.log('binder mstp', state);
        return{
            binderArr: state.binderArray.binderArr,
            binder: state.binder.binderObj
        }
    }

    export default withRouter(connect(mapStateToProps,{ updateBinderArray, selectBinder, addBinder})(Binder));


