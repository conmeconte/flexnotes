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
        //console.log('password', password);
        this.props.callback();
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
        console.log(this.props);
        const {visible} = this.state;

        let bodyText = (
            <div className='card-content'>
                Please enter password to add LearningFuze Binder
                <input 
                type="text"
                onChange={(e)=>this.handleForm(e)}
                />
            </div>
            
        );

        let modalBtn = (
            <div className='card-action modal-nav'>
                <button onClick={()=>this.setState({visible: false})} className='btn grey lighten-4'>Cancel</button>
                <button onClick={this.handleConfirm} className='btn green darken-3'>Confirm</button>
            </div>
        );
        

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
                                    {bodyText}
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