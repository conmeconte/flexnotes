import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBinderArray, selectBinder, addTab, deleteTab } from '../../actions';


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

        this.addTab = this.addTab.bind(this);
        this.deleteTab = this.deleteTab.bind(this);
        // this.editable = this.editable.bind(this);
        // this.notEditable = this.notEditable.bind(this);
        // this.binderLinkActive = this.binderLinkActive.bind(this);
        // this.binderLinkNotActive = this.binderLinkNotActive.bind(this);
        this.binderSelect = this.binderSelect.bind(this);
    }

    componentDidMount(){
        if(this.props.index===0){
            this.setState({
                active: true
            });
        }
    }

    componentWillReceiveProps(nextProps){
        //console.log('nextProps: ',nextProps);
        //console.log('this.props in CWRP: ', this.props);
        // if(!this.props.binder || !nextProps.binder){
        //     return;
        // }
        //  if(this.props.binder != nextProps.binder){
        //      this.props.updateBinderArray();
        //  }
        if(this.props.hasOwnProperty("binderObj")){
            if(nextProps.interface.binder_id === this.props.binderObj._id){
                console.log('setting active to true');
                this.setState({
                    active: true
                });
            } else {
                this.setState({
                    active: false
                });
            }
        }

    }

    addTab(){
        //console.log('addTab clicked');
        this.props.addTab(this.props.binderObj._id);
        //this.props.updateBinderArray();
    }

    deleteTab(tab_id) {
        //console.log('delete tab btn clicked, tab_id: ', tab_id);
        //console.log('delete tab btn clicked, binder_id: ', this.props.binderObj._id);
        if(this.props.binderObj.tab_arr_obj.length === 1){
            console.log('can not delete last tab');
            return;
        }

        this.props.deleteTab(this.props.binderObj._id, tab_id);
        // const { binder_arr_obj } = this.state;
        // console.log(binder_arr_obj);
        // let deleteIndex = 0;
        // for (deleteIndex; deleteIndex < binder_arr_obj.length; deleteIndex++) {
        //     if (binder_arr_obj[deleteIndex].binder_id === delete_id) {
        //         binder_arr_obj.splice(deleteIndex, 1);
        //     }
        // }
    }

    // editable() {
    //     console.log("editable should be true");
    //     this.setState({
    //         editable: true
    //     });
    // }

    // notEditable() {
    //     console.log("editable should be false");
    //     this.setState({
    //         editable: false
    //     });
    // }

    // keyPressed(event) {
    //     if(event.key == 'Enter') {
    //       //this.notEditable();
    //   }
    // }

    // textChanged(e, id) {
    //     const { binder_arr_obj } = this.state;
    //     //console.log("text changed, id:", id);
    //     //console.log(e.target.value);

    //     for (let i = 0; i < binder_arr_obj.length; i++) {
    //         if (binder_arr_obj[i].binder_id === id) {
    //             //console.log('binder_id and id match');
    //             binder_arr_obj[i].binder_name = e.target.value;
    //         }
    //     }
    //     this.setState({
    //         binder_arr_obj: binder_arr_obj
    //     });
    // }

    // binderLinkActive(){
    //     //console.log('binderlinkactive color:', color);
    //     // this.setState({
    //     //     active: true
    //     // });
    // }

    // binderLinkNotActive(){
    //     //console.log('binderlinkactive color:', color);
    //     // this.setState({
    //     //     active: false
    //     // });
    // }

    binderSelect(){
        //console.log('binderObj:' ,binderObj);
        this.props.selectBinder(this.props.binderObj);
    }

    render() {
        const { active, editable } = this.state;
        //console.log("Binder props:", this.props);
        //console.log("Binder active state:", active);
        if(!this.props.binderObj){
            return null;
        }
        const { tab_arr_obj } = this.props.binderObj;

        //let currentTabArr = [];

        // if(this.props.binder._id === this.props.binderObj._id){
        //     currentTabArr = this.props.binder.tab_arr_obj;
        // } else {
        //     console.log('binder and binderObj are not the same');
        //     currentTabArr = this.props.binderObj.tab_arr_obj;
        // }
        
        let binder_url = this.props.binderObj._id;


        

        let tab_link = tab_arr_obj.map((item, index) => {
            let tab_url = '/' + item._id;
            //console.log('tab map:', item);
            var tabStyle ={
                borderLeft: '12px solid '+item.tab_color
            }

                return (
                    <div key={index}>
                        <Tab index={index} tabObj={item}/>
                        <button type="button" className="btn btn-default btn_delete" onClick={()=>this.deleteTab(item._id)} >
                            <span className="glyphicon glyphicon-minus"></span>Tab
                        </button>
                    </div>
                    // <Link to={'/main/'+ binder_url + tab_url} key={index} style={{ textDecoration: 'none' }}>

                    //     <div className=""style={tabStyle}>
                    //         {item.tab_name}
                    //     </div>
                    // </Link>
                );               
             });

        return (
            <div>
                <div className="binderTitle">
                    <Link to={`/main/${binder_url}`} style={{ textDecoration: 'none' }} >
                                <div className=""  onClick={()=>this.binderSelect()}>
                                    {this.props.binderObj.binder_name}
                                </div>
                    </Link>
                </div>

                <div className={`binderBody ${active ? 'visible' : 'hidden'}`}>
                    {tab_link}
                
                
                {/* <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'hidden' : 'visible'}`} onClick={this.editable}>
                    Binders <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <button type="button" className={`btn btn-default btn-xs btn_edit_binder ${editable ? 'visible' : 'hidden'}`} onClick={this.notEditable}>
                    Binders <span className="glyphicon glyphicon-ok"></span>
                </button>



                <ul className="binder_wrap">
                    {/* {binder_link} 




                <button className={"btn btn-default btn-xs btn_add"} onClick={this.addBinder}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button> */}
                <button className="btn btn-default btn-xs btn_add" onClick={this.addTab}>
                    <span className="glyphicon glyphicon-plus"></span>Tab
                </button>
                <Route path={`/main/${binder_url}`+"/:tab"} component={Tab}/>
                </div>
            </div>
        );
    }
}
    function mapStateToProps(state){
        //console.log('binder mstp', state);
        return{
            //binderArr: state.binderArray.binderArr,
            binder: state.binder.binderObj,
            interface: state.interface
        }
    }

    export default withRouter(connect(mapStateToProps,{ updateBinderArray, selectBinder, addTab, deleteTab})(Binder));


