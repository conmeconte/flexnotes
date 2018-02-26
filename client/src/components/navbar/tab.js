import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectTab, addPage, updateBinderArray, editTab, deleteTab } from '../../actions';

import Page from './page';
import ModalNav from './modal_nav';
import Loader from '../loader';

class Tab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab_color_arr: ['#ff0000', '#0000ff', '#ff00ff', '#FF8C00', '#008000'],
            editable: false,
            open: false,
            tabName: '',
            hover: false,
            editHover: false,
            deleteHover: false
        }



        this.addPage = this.addPage.bind(this);
        this.editTabs = this.editTabs.bind(this);
        this.notEditTabs = this.notEditTabs.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.cancelTabEdit = this.cancelTabEdit.bind(this);
    }

    componentDidMount() {
        if (this.props.index === 0) {
            this.setState({
                open: true
            });
        }
    }
    addPage() {
        this.props.addPage(this.props.interface.binder_id, this.props.tabObj._id);
    }

    editTabs(event) {
        event.stopPropagation();
        this.setState({
            editable: true,
            tabName: this.props.tabObj.tab_name
        });
    }

    notEditTabs() {
        const { tabName } = this.state;
        this.props.editTab(this.props.binder._id, this.props.tabObj._id, tabName);
        this.setState({
            editable: false,
            editHover: false
        });
    }

    editTabName(e) {
        this.setState({
            tabName: e.target.value
        });
    }

    deleteTab(tab_id) {
        if (this.props.binder.tab_arr_obj.length === 1) {
            console.log('can not delete last tab');
        } else {
            this.props.deleteTab(this.props.interface.binder_id, this.props.tabObj._id);
        }
    }
    keyPressed(event) {
        if (event.key === 'Enter') {
            this.notEditTabs();
        }
    }


    handleClick() {
        const { open } = this.state;
        let toggle = !open;
        this.props.selectTab(this.props.tabObj);
        this.setState({
            open: toggle
        });
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

    cancelTabEdit() {
        this.setState({
            editable: false,
            tabName: this.props.tabObj.tab_name,
            editHover: false
        });
    }
    render() {
        const { open, editable, tabName, hover, editHover, deleteHover } = this.state;
        if (!this.props.binder || !this.props.tabObj) {
            return null;
        }
        let url = this.props.binder._id + "/" + this.props.tabObj._id;
        const { page_arr_obj } = this.props.tabObj;
        let tab_title = [];

        if (editable) {
            tab_title = (
                <div className="editMode">
                    <input
                        className="edit_input_tab"
                        ref='textInput'
                        type='text'
                        onChange={(e) => this.editTabName(e)}
                        onKeyPress={this.keyPressed.bind(this)}
                        value={tabName}
                    />
                    <button type="button" className={`btn edit-mode-btn green darken-1 ${editable ? 'visible' : 'hidden'}`} onClick={(event) => this.notEditTabs(event)}>
                        <i className="small material-icons">check</i></button>

                    <button type="button" className={`btn edit-mode-btn red darken-1 ${editable ? 'visible' : 'hidden'}`} onClick={(event) => this.cancelTabEdit(event)}>
                        <i className="small material-icons">close</i></button>
                </div>
            );
        } else {
            tab_title = (
                <div className="tabTitle" onClick={() => this.handleClick()} onMouseEnter={this.hover.bind(this)} onMouseLeave={this.notHover.bind(this)}>
                    <Link to={`/main/${url}`} style={{ textDecoration: 'none' }} >
                        <div className="tabLink" >
                            {this.props.tabObj.tab_name}
                        </div>
                    </Link>
                    <div className="modify-btn">
                        <button type="button" onMouseEnter={this.hoverEditBtn.bind(this)} onMouseLeave={this.notHoverEditBtn.bind(this)} className={`btn navbar-btn edit-btn grey darken-4 ${editHover ? 'fullOpacity' : ''} ${hover ? 'visibleHover' : 'hiddenHover'}`} onClick={(event) => this.editTabs(event)}>
                            <i className="small material-icons">edit</i>
                        </button>
                        <div className="navbar-btn" onMouseEnter={this.hoverDeleteBtn.bind(this)} onMouseLeave={this.notHoverDeleteBtn.bind(this)}>
                            <ModalNav
                                callback={() => this.deleteTab(this.props.interface.binder_id)}
                                name={this.props.tabObj.tab_name}
                                type='tab'
                                arrLength={this.props.binder.tab_arr_obj.length}
                                className={`btn delete-btn red darken-4 ${editable ? 'hidden' : 'visible'} ${deleteHover ? 'fullOpacity' : ''}  ${hover ? 'visibleHover' : 'hiddenHover'}`} >
                                <i className='material-icons'>delete_forever</i>
                            </ModalNav>
                        </div>
                    </div>
                </div>
            );
        }


        let page_list = page_arr_obj.map((item, index) => {
            return (
                <div key={index}>
                    <Page pageObj={item} tabID={this.props.tabObj._id} />
                </div>
            );
        });
        return (

            <div>
                {tab_title}
                <div className={`tabBody ${open ? 'visible' : 'hidden'}`}>

                    <ul className="collection">
                        {page_list}
                    </ul>
                    <button className="btn add-btn-page waves-effect waves-light" onClick={this.addPage}>
                        New Page</button>
                    <Route path={`/main/${url}` + "/:page"} component={Page} />
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
export default withRouter(connect(mapStateToProps, { selectTab, addPage, deleteTab, editTab, updateBinderArray })(Tab));
