import React, { Component } from 'react';

export default class ModalNav extends Component {
    constructor (props){
        super(props);

        this.state = {
            visible: false
        }

       this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleConfirm(){
        this.props.callback();
        this.setState({
            visible: false
        });
    }

    render(){
        //console.log('Modal props:', this.props);
        const {visible} = this.state;
        let bodyText = '';
        let modalBtn = [];
        
        if(this.props.arrLength === 1){
            bodyText = 'Cannot delete the last '+this.props.type+'!';
            modalBtn = (
                <div className='card-action modal-nav'>
                    <button onClick={()=>this.setState({visible: false})} className='btn grey lighten-4'>Back</button>
                </div>
            );
        } else {
            bodyText = 'Delete '+ this.props.name +'?';
            modalBtn = (
                <div className='card-action modal-nav'>
                    <button onClick={()=>this.setState({visible: false})} className='btn grey lighten-4'>Cancel</button>
                    <button onClick={this.handleConfirm} className='btn red darken-3'>Delete</button>
                </div>
            );
        }

        const button = (
            <button onClick={()=>this.setState({visible: true})} 
            className={` ${visible  ? 'fullOpacity visible' : 'visibleHover'} ${this.props.className  ? this.props.className : ''}`}>
            {this.props.children ? this.props.children : ''}
            </button>
        );

        if(this.state.visible){
            return(
                <span>
                    {button}
                    <div className='confirm-modal modal-nav'>
                        <div className="modal-content modal-nav">
                                <div className="card">
                                    <div className='card-content'>
                                        {bodyText}
                                    </div>
                                        {modalBtn}
                                </div>
                        
                        </div>
                    </div>
                </span>

            );
        } 
        return(
            button
        );
    }
}