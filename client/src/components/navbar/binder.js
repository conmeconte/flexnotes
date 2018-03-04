import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBinderArray, selectBinder, addTab, deleteBinder, editBinder } from '../../actions';

import Tab from './tab';
import ModalNav from './modal_nav';
import Loader from '../loader';

import '../../assets/css/navbar.css';

class Binder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editable: false,
            binderName: '',
            active: false,
            hover: false,
            editHover: false,
            deleteHover: false,
            binderHover: false
        }

        this.addTab = this.addTab.bind(this);
        this.editable = this.editable.bind(this);
        this.notEditable = this.notEditable.bind(this);
        this.binderSelect = this.binderSelect.bind(this);
        this.deleteBinder = this.deleteBinder.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidMount() {
        if (this.props.index === 0) {
            this.setState({
                active: true
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.interface.binder_id !== this.props.interface.binder_id){
            if (this.props.hasOwnProperty("binderObj")) {
                if (nextProps.interface.binder_id === this.props.binderObj._id) {
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
    }

    addTab() {
        this.props.addTab(this.props.binderObj._id);
    }

    deleteBinder(delete_id) {
        if (this.props.binderArr.length === 1) {
            console.log('can not delete last binder');
            return;
        }
        this.props.deleteBinder(delete_id);
        this.setState({
            deleteHover: false
        });
    }

    editable(event) {
        event.stopPropagation();
        this.setState({
            editable: true,
            binderName: this.props.binderObj.binder_name
        });
    }

    notEditable(event) {
        event.stopPropagation();
        const { binderName } = this.state;
        this.props.editBinder(this.props.binderObj._id, binderName);
        this.setState({
            editable: false,
            editHover: false
        });


    }
    keyPressed(event) {
        if (event.key === 'Enter') {
            this.notEditable();
        }
    }

    editBinderName(e) {
        this.setState({
            binderName: e.target.value
        });
    }

    binderSelect(event) {
        event.stopPropagation();
        this.props.selectBinder(this.props.binderObj);
    }

    hover() {
        this.setState({
            hover: true
        });
    }

    notHover() {
        this.setState({
            hover: false
        });
    }

    hoverEditBtn() {
        this.setState({
            editHover: true
        });
    }

    notHoverEditBtn() {
        this.setState({
            editHover: false
        });
    }

    hoverDeleteBtn() {
        this.setState({
            deleteHover: true
        });
    }

    notHoverDeleteBtn() {
        this.setState({
            deleteHover: false
        });
    }

    cancelEdit(event) {
        event.stopPropagation();
        this.setState({
            editable: false,
            binderName: this.props.binderObj.binder_name,
            editHover: false
        });
    }

    render() {
        const { active, editable, binderName, hover, editHover, deleteHover, binderHover } = this.state;
        if(!this.props.binderObj){

            return null;
        } 

        const { tab_arr_obj } = this.props.binderObj;

        let binder_url = this.props.binderObj._id;
        let binderArrLength = this.props.binderArr.length;
        let binder_title = [];

        if (editable) {
            binder_title = (
                <div className="editMode">
                         <input 
                             id="edit_input_binder"
                             ref='textInput'
                             type='text'
                             onChange={(e)=>this.editBinderName(e)}
                             onKeyPress={this.keyPressed.bind(this)}
                             value={binderName}
                             />
                <button type="button" className={`btn edit-mode-btn green darken-1 ${editable ? 'visible' : 'hidden'}`} onClick={(event)=>this.notEditable(event)}>
                <i className="small material-icons">check</i></button>
                 
                <button type="button" className={`btn edit-mode-btn red darken-1 ${editable ? 'visible' : 'hidden'}`} onClick={(event)=>this.cancelEdit(event)}>
                <i className="small material-icons">close</i></button>
                </div>             

            );
        } else {
            binder_title = (
                <div className={`binderTitle blue-grey ${active ? 'binderBorderTop' : ''} ${hover || active ? 'darken-2' : 'lighten-4'}`} 
                    onClick={(event) => this.binderSelect(event)} 
                    onMouseEnter={this.hover.bind(this)} 
                    onMouseLeave={this.notHover.bind(this)}>

                    <Link to={`/main/${binder_url}`} style={{ textDecoration: 'none' }}>
                        <div className={`binderLink ${hover || active ? 'textLight' : 'textDark'}`}>
                            {this.props.binderObj.binder_name}
                        </div>
                    </Link>

                    <div className="modify-btn">
                        <button type="button" 
                            onMouseEnter={this.hoverEditBtn.bind(this)} 
                            onMouseLeave={this.notHoverEditBtn.bind(this)} 
                            className={`btn binder-edit-btn grey darken-4 ${editable ? 'hidden' : 'visible'} ${editHover ? 'fullOpacity' : ''} ${hover ? 'visibleHover' : 'hiddenHover'}`} 
                            onClick={(event) => this.editable(event)}>
                            <i className="small material-icons">edit</i>
                        </button>
                        <div className="binder-delete-btn"
                            onMouseEnter={this.hoverDeleteBtn.bind(this)}
                            onMouseLeave={this.notHoverDeleteBtn.bind(this)}>

                            <ModalNav
                                callback={() => this.props.deleteBinder(this.props.binderObj._id)}
                                name={this.props.binderObj.binder_name}
                                type='binder'
                                arrLength={this.props.binderArr.length}
                                className={`btn delete-btn red darken-4 ${editable ? 'hidden' : 'visible'} ${deleteHover ? 'fullOpacity' : ''}  ${hover ? 'visibleHover' : 'hiddenHover'}`} >
                                <i className='material-icons'>delete_forever</i>
                            </ModalNav>
                        </div>
                    </div>
                </div>
            );
        }


        let tab_link = tab_arr_obj.map((item, index) => {
            let tab_url = '/' + binder_url + item._id;
            var tabStyle = {
                borderLeft: '12px solid ' + item.tab_color
            }
                return (
                    <div key={index} className="tabWrap blue-grey lighten-3">
                        <Tab index={index} tabObj={item}/>
                        <Route path={`/main/${item._id}`} component={Tab} />
                    </div>
                );               
                });
            

        return (
            <div>
                {binder_title}

                <div className={`binderBody ${active ? 'visible' : 'hidden'}`}>
                    {tab_link}
                    <button className="btn add-btn-tab waves-effect waves-light" onClick={this.addTab}>
                        New Tab</button>
                        
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        binderArr: state.binderArray.binderArr,
        binder: state.binder.binderObj,
        interface: state.interface
    }
}

export default withRouter(connect(mapStateToProps, { updateBinderArray, selectBinder, addTab, deleteBinder, editBinder })(Binder));


