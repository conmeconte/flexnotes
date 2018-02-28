import React, { Component } from 'react';
import lfzLogo from '../../assets/images/lfz-logo.png';

export default class LfzModal extends Component {
    constructor (props){
        super(props);

        this.state = {
            visible: false,
            password: ''
        }

       this.handleConfirm = this.handleConfirm.bind(this);
    }

    handleConfirm(){
        const { password } = this.state;
        this.props.callback(password);
        this.setState({
            visible: false
        });
    }
    handleForm(e){
        this.setState({
            password: e.target.value
        });
    }
    render(){
        const {visible} = this.state;

        const button = (
            <img className="lfzLogo" src={lfzLogo} onClick={()=>this.setState({visible: true})}/> 
        );

        if(this.state.visible){
            return(
                <span>
                    {button}
                    <div className='confirm-modal modal-nav'>
                        <div className="modal-content modal-nav">
                                <div className="card">
                                <div className='card-content'>
                                    Add LearningFuze Binder:
                                    <input 
                                    type="text"
                                    placeholder="Enter Password"
                                    onChange={(e)=>this.handleForm(e)}
                                    />
                                </div>
                                <div className='card-action modal-nav'>
                                    <button onClick={()=>this.setState({visible: false})} className='btn grey lighten-4'>Cancel</button>
                                    <button onClick={this.handleConfirm} className='btn green darken-3'>Confirm</button>
                                </div>
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