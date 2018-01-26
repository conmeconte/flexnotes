import React, {Component} from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { selectTab, addPage, deletePage, updateBinderArray, editTab, deleteTab } from '../../actions';

import Page from './page';
import ModalNav from './modal_nav';

class Tab extends Component {
    constructor(props){
        super(props);

        this.state = {
            tab_color_arr: ['#ff0000', '#0000ff', '#ff00ff', '#FF8C00', '#008000'],
            editable: false,
            open: false,
            tabName: '',
            hover: false,
            editHover: false,
            deleteHover: false
            //binder: this.props.binder_obj
        }



        this.addPage = this.addPage.bind(this);
        this.deletePage = this.deletePage.bind(this);
        this.editTabs = this.editTabs.bind(this);
        this.notEditTabs = this.notEditTabs.bind(this);
        // this.editable = this.editable.bind(this);
        // this.notEditable = this.notEditable.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.cancelTabEdit = this.cancelTabEdit.bind(this);
    }

    componentDidMount(){
        if(this.props.index===0){
            this.setState({
                open: true
            });
        }
    }

    componentWillReceiveProps(nextProps){
        // if(nextProps.interface.editable === false){
        //     this.setState({
        //         editable: false
        //     });
        // }
    }
    // componentWillReceiveProps(nextProps){

    //     if(this.props.hasOwnProperty("binder")){
    //         // this.setState({
    //         //     binderName: this.props.binderObj.binder_name
    //         // });
    //         if(nextProps.binder.binder_name !== this.props.binder.binder_name){

    //         } else {

    //         }
    //     }

    // }
    addPage(){
        //console.log('addPage clicked');
        //this.props.addTab(this.props.binderObj._id);
        
        this.props.addPage(this.props.interface.binder_id, this.props.tabObj._id);
    }

    deletePage(page_id){
        //console.log('delete page id:', page_id);
        if(this.props.tabObj.page_arr_obj.length === 1){
            console.log('can not delete last page');
            return;
        }
        this.props.deletePage(this.props.interface.binder_id, this.props.interface.tab_id, page_id);
    }

    editTabs(event){
        event.stopPropagation();
        //console.log("editable should be true");
        this.setState({
            editable: true,
            tabName: this.props.tabObj.tab_name
        });
    }

    notEditTabs(event) {
        event.stopPropagation();
        //console.log("editable should be false");
        const { tabName } = this.state;
        this.props.editTab(this.props.binder._id, this.props.tabObj._id, tabName);
        this.setState({ 
            editable: false,
            editHover: false
        });
    }

    editTabName(e){


        this.setState({
            tabName: e.target.value
        });
    }

    deleteTab(tab_id) {
        //console.log('delete tab btn clicked, tab_id: ', tab_id);
        //console.log('delete tab btn clicked, binder_id: ', this.props.binderObj._id);
        if(this.props.binder.tab_arr_obj.length === 1){
            console.log('can not delete last tab');
        } else {
            this.props.deleteTab(this.props.interface.binder_id, this.props.tabObj._id);
        }

        
        // const { binder_arr_obj } = this.state;
        // console.log(binder_arr_obj);
        // let deleteIndex = 0;
        // for (deleteIndex; deleteIndex < binder_arr_obj.length; deleteIndex++) {
        //     if (binder_arr_obj[deleteIndex].binder_id === delete_id) {
        //         binder_arr_obj.splice(deleteIndex, 1);
        //     }
        // }
    }
    // tabTextChanged(e, id){
    //     const {binder} = this.state;
    //     const {tab_arr_obj} = binder;
    //     //console.log("text changed, id:", id);
    //     //console.log(e.target.value);

    //     for(let i =0; i<tab_arr_obj.length; i++){
    //         if(tab_arr_obj[i].tab_id===id ){
    //             //console.log('binder_id and id match');
    //             tab_arr_obj[i].tab_name = e.target.value;
    //         }
    //     }

    //     binder.tab_arr_obj = tab_arr_obj;

    //     this.setState({
    //         binder: binder
    //     });
    // }
    keyPressed(event) {
        //console.log('keypress',event);
        if(event.key === 'Enter') {
            //console.log('enter key pressed');
          this.notEditTabs();
      }
    }


    handleClick(){
        const {open} = this.state;
        let toggle = !open;
        //this.props.selectBinder(binderObj);
        this.props.selectTab(this.props.tabObj);
        this.setState({
            open: toggle
        });
        //console.log("tab id updated");
    }

    hover(){
        this.setState({
            hover: true
        });
    }

    notHover(){
        this.setState({
            hover: false
        });
    }

    hoverEditBtn(){
        this.setState({
            editHover: true
        });
    }

    notHoverEditBtn(){
        this.setState({
            editHover: false
        });
    }

    hoverDeleteBtn(){
        this.setState({
            deleteHover: true
        });
    }

    notHoverDeleteBtn(){
        this.setState({
            deleteHover: false
        });
    }

    cancelTabEdit(){
        this.setState({
            editable: false,
            tabName: this.props.tabObj.tab_name,
            editHover: false
        });
    }
    render(){
        //this.props.selectBinder(this.props.binderObj);
        const {open, editable, tabName, hover, editHover, deleteHover} = this.state;

        //console.log('props in tab:', this.props);
        //console.log('state in tab:', this.state);
        if(!this.props.binder|| !this.props.tabObj){
            return null;
        }
        let url = this.props.binder._id + "/" + this.props.tabObj._id;
        const{ page_arr_obj} = this.props.tabObj;
        let tab_title = [];

        if(editable){
            //let editName = this.props.binderObj.binder_name;
            tab_title = (
                <div className="editMode">
                         <input 
                             className="edit_input_tab"
                             ref='textInput'
                             type='text'
                             onChange={(e)=>this.editTabName(e)}
                             // onBlur={this.notEditable}
                             onKeyPress={this.keyPressed.bind(this)}
                             value={tabName}
                             />
                <button type="button" className={`btn-floating edit-mode-btn green accent-4 ${editable ? 'visible' : 'hidden'}`} onClick={(event)=>this.notEditTabs(event)}>
                <i className="small material-icons">check</i></button>
                 
                <button type="button" className={`btn-floating edit-mode-btn red accent-4 ${editable ? 'visible' : 'hidden'}`} onClick={(event)=>this.cancelTabEdit(event)}>
                <i className="small material-icons">close</i></button>
            </div>              
            );
        } else {
            tab_title = (
                <div className="tabTitle" onClick={()=>this.handleClick()} onMouseEnter={this.hover.bind(this)} onMouseLeave={this.notHover.bind(this)}>
                    <Link to={`/main/${url}`} style={{ textDecoration: 'none' }} >
                        <div className="tabLink" >
                            {this.props.tabObj.tab_name}
                        </div>
                    </Link>
                    <div className="modify-btn">
                        <button type="button"  onMouseEnter={this.hoverEditBtn.bind(this)} onMouseLeave={this.notHoverEditBtn.bind(this)} className={`btn-floating navbar-btn edit-btn grey darken-4 ${editHover ? 'fullOpacity' : ''} ${hover ? 'visibleHover' : 'hiddenHover'}`} onClick={(event)=>this.editTabs(event)}>
                        <i className="small material-icons">edit</i>
                        </button>
                        <div className="navbar-btn" onMouseEnter={this.hoverDeleteBtn.bind(this)} onMouseLeave={this.notHoverDeleteBtn.bind(this)}>
                            <ModalNav 
                                callback={()=>this.deleteTab(this.props.interface.binder_id)} 
                                name={this.props.tabObj.tab_name}
                                type='tab'
                                arrLength={this.props.binder.tab_arr_obj.length}
                                className={`btn-floating delete-btn red darken-4 ${editable ? 'hidden' : 'visible'} ${deleteHover ? 'fullOpacity' : ''}  ${hover ? 'visibleHover' : 'hiddenHover'}`} >
                                <i className='material-icons'>delete_forever</i>
                            </ModalNav>
                        </div>

                        {/* <button type="button" onMouseEnter={this.hoverDeleteBtn.bind(this)} onMouseLeave={this.notHoverDeleteBtn.bind(this)} className={`btn-floating navbar-btn delete-btn red darken-4 ${deleteHover ? 'fullOpacity' : ''}  ${hover ? 'visibleHover' : 'hiddenHover'}`} onClick={()=>this.deleteTab(this.props.interface.binder_id)} >
                        <i className="small material-icons">delete_forever</i>
                        </button> */}
                    </div>
                </div>
            );
        }


        let page_list = page_arr_obj.map((item, index) => {
            //let tab_url = '/' + item._id;
            //console.log('tab map:', item);
            // var tabStyle ={
            //     borderLeft: '12px solid '+item.tab_color
            // }

                return (
                    <div key={index}>
                        <Page pageObj={item} tabID={this.props.tabObj._id}/>
                    </div>
                    // <Link to={'/main/'+ binder_url + tab_url} key={index} style={{ textDecoration: 'none' }}>

                    //     <div className=""style={tabStyle}>
                    //         {item.tab_name}
                    //     </div>
                    // </Link>
                );               
             });
        //console.log('binder tab_arr_obj', tab_arr_obj);
        //console.log('binder tab_arr_obj', binder_url);
        
        // let tab_link = [];
        // if(editable){
        //     tab_link = tab_arr_obj.map((item, index) => {
        //         //console.log('editable map:', item);
        //         return (
        //             <li key={index}>
        //                 <input 
        //                     className="edit_input"
        //                     ref='textInput'
        //                     type='text'
        //                     onChange={(e)=>this.tabTextChanged(e, item.tab_count)}
        //                     // onBlur={this.notEditable}
        //                    // onKeyPress={this.keyPressed}
        //                     value={item.tab_name}
        //                     />

        //             <button type="button" className="btn btn-default btn_delete" onClick={()=>this.deleteTab(item.tab_id)} >
        //                 <span className="glyphicon glyphicon-minus"></span>
        //             </button>
                        
                          
        //             </li>
        //         );
        //     });

        // } else {

        //     tab_link = tab_arr_obj.map((item, index) => {
        //         let tab_url = '/' + item._id;
        //         //console.log('tab map:', item);
        //         var tabStyle ={
        //             borderLeft: '12px solid '+item.tab_color
        //         }

        //             return (
        //                 <li key={index}><Link to={'/main'+this.props.binder_url + tab_url} style={{ textDecoration: 'none' }}>

        //                     <div className="tabDiv" onClick={()=>{this.handleClick(item)}} style={tabStyle}>
        //                         {item.tab_name}
        //                     </div>
        //                 </Link></li>
        //             );               
        //          });
        // }
    
        // const tab_route = tab_arr_obj.map((item, index) => {
        //     let tab_url = '/' + item._id;
        //     return(

        //         <Route key={index} path={'/main'+this.props.binder_url + tab_url} render={()=> 
        //             <Page tabObj={item} binder_url={this.props.binder_url} tab_url={tab_url}/>

        //         }
        //         />
        //     );
        // });

        return(

            <div>
                {tab_title}
            <div className={`tabBody ${open ? 'visible' : 'hidden'}`}>

                    <ul className="collection">
                        {page_list}
                    </ul>
                    
   
            

                
                {/* <button type="button" className={`btn btn-default btn-xs btn_edit_tab ${editable ? 'hidden': 'visible'}`} onClick={this.editTabs}>
                    Tabs <span className="glyphicon glyphicon-pencil"></span>
                </button>
                <button type="button" className={`btn btn-default btn-xs btn_edit_tab ${editable ? 'visible': 'hidden'}`} onClick={this.notEditTabs}>
                    Tabs <span className="glyphicon glyphicon-ok"></span>
                </button>

                <ul className="nav-tab-col">
                    {tab_link}
                </ul>
                {tab_route}
                <button className="btn btn-default btn-xs btn_add" onClick={this.addTab}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>   */}
                <button className="btn add-btn-page waves-effect waves-light" onClick={this.addPage}>
                New Page</button>   
                <Route path={`/main/${url}`+"/:page"} component={Page}/>
                </div>
            </div>
        );
    }

    
}

function mapStateToProps(state){
    //console.log('tab mstp', state);
    return {
        binderArr: state.binderArray.binderArr,
        binder: state.binder.binderObj,
        interface: state.interface
    }
}
export default withRouter(connect(mapStateToProps,{ selectTab, addPage, deleteTab, editTab, deletePage, updateBinderArray })(Tab));
