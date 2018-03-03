import React, { Component } from 'react';

import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectPage, deletePage, editPage } from '../../actions';

import ModalNav from './modal_nav';
import Loader from '../loader';

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editable: false,
            pageName: '',
            hover: false,
            editHover: false,
            deleteHover: false,
        }
        this.deletePage = this.deletePage.bind(this);
        this.editPage = this.editPage.bind(this);
        this.notEditPage = this.notEditPage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.cancelPageEdit = this.cancelPageEdit.bind(this);
    }
    editPageName(e) {
        this.setState({
            pageName: e.target.value
        });
    }

    editPage() {
        this.setState({
            editable: true,
            pageName: this.props.pageObj.page_name
        });
    }

    notEditPage() {
        const { pageName } = this.state;
        this.props.editPage(this.props.interface.binder_id, this.props.tabID, this.props.pageObj._id, pageName);
        this.setState({
            editable: false,
            editHover: false
        });
    }

    keyPressed(event) {
        if (event.key === 'Enter') {
            this.notEditPage();
        }
    }

    deletePage(page_id) {
        let deleteIndex = null;
        for (let i = 0; i < this.props.binder.tab_arr_obj.length; i++) {
            if (this.props.binder.tab_arr_obj[i]._id === this.props.tabID) {
                deleteIndex = i;
            }
        }
        if (this.props.binder.tab_arr_obj[deleteIndex].page_arr_obj.length === 1) {
            console.log('can not delete last page');
        } else {
            this.props.deletePage(this.props.interface.binder_id, this.props.tabID, this.props.pageObj._id);

        }
    }

    handleClick() {
        this.props.selectPage(this.props.interface.binder_id, this.props.tabID, this.props.pageObj._id);
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

    cancelPageEdit() {
        this.setState({
            editable: false,
            tabName: this.props.pageObj.page_name,
            editHover: false
        });
    }

    render() {

        const { editable, pageName, hover, editHover, deleteHover, active } = this.state;
        if (!this.props.pageObj) {
            return null;
        }
        let url = this.props.interface.binder_id + "/" + this.props.interface.tab_id + "/" + this.props.pageObj._id;
        let page_list = [];

        let background_color = {
            backgroundColor: ''
        }

        let whiteColor = true;

        if (this.props.interface.page_id === this.props.pageObj._id) {
            //set color to active color
            background_color = {
                backgroundColor: '#0288d1'
            }

            whiteColor = true;

        } else {
            //set color to default
            background_color = {
                backgroundColor: '#fafafa'
            }

            whiteColor = false;
        }
        if (editable) {
            page_list = (
                <div className="editMode">
                         <input 
                             id="edit_input_page"
                             ref='textInput'
                             type='text'
                             onChange={(e)=>this.editPageName(e)}
                             onKeyPress={this.keyPressed.bind(this)}
                             value={pageName}
                             />
                <button type="button" className={`btn edit-mode-btn green darken-1 ${editable ? 'visible' : 'hidden'}`} onClick={(event)=>this.notEditPage(event)}>
                <i className="small material-icons">check</i></button>
                 <button type="button" className={`btn edit-mode-btn red darken-1 ${editable ? 'visible' : 'hidden'}`} onClick={(event)=>this.cancelPageEdit(event)}>
                <i className="small material-icons">close</i></button>
            </div>              

            );
        } else {

            let deleteIndex = null;
            let pageArrLength = 1;
            for (let i = 0; i < this.props.binder.tab_arr_obj.length; i++) {
                if (this.props.binder.tab_arr_obj[i]._id === this.props.tabID) {
                    deleteIndex = i;
                    pageArrLength = this.props.binder.tab_arr_obj[deleteIndex].page_arr_obj.length;
                }
            }
            page_list = (
                <div className={`pageList ${whiteColor ? 'whiteFont' : 'blackFont'}`} onMouseEnter={this.hover.bind(this)} onMouseLeave={this.notHover.bind(this)}>
                    <Link to={`/main/${url}`} style={{ textDecoration: 'none' }} >
                        <div className="pageLink" >
                            {this.props.pageObj.page_name}
                        </div>
                    </Link>
                    <div className="modify-btn">
                        <button type="button" onMouseEnter={this.hoverEditBtn.bind(this)} onMouseLeave={this.notHoverEditBtn.bind(this)} className={`btn navbar-btn edit-btn grey darken-4  ${editHover ? 'fullOpacity' : ''} ${hover ? 'visibleHover' : 'hiddenHover'}`} onClick={(event) => this.editPage(event)}>
                            <i className="small material-icons">edit</i>
                        </button>

                        <div className="navbar-btn" onMouseEnter={this.hoverDeleteBtn.bind(this)} onMouseLeave={this.notHoverDeleteBtn.bind(this)}>
                            <ModalNav
                                callback={() => this.deletePage()}
                                name={this.props.pageObj.page_name}
                                type='page'
                                arrLength={pageArrLength}
                                className={`btn delete-btn red darken-4 ${editable ? 'hidden' : 'visible'} ${deleteHover ? 'fullOpacity' : ''}  ${hover ? 'visibleHover' : 'hiddenHover'}`} >
                                <i className='material-icons'>delete_forever</i>
                            </ModalNav>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <li className="pageBody" style={background_color} onClick={() => this.handleClick()}>
                {page_list}
            </li>

        );
    }


}

function mapStateToProps(state) {
    return {
        binder: state.binder.binderObj,
        interface: state.interface
    }
}
export default withRouter(connect(mapStateToProps, { selectPage, deletePage, editPage })(Page));
