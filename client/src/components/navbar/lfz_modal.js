import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLfzBinder } from '../../actions';
import lfzLogo from '../../assets/images/lfz-logo.png';

class LfzModal extends Component {
    constructor (props){
        super(props);

        this.state = {
            visible: false,
            password: '',
            response: ''
        }

       this.handleConfirm = this.handleConfirm.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.interface_obj.lfz_response === false){
            this.setState({
                response: 'Incorrect Password!'
            });
        } else if(nextProps.interface_obj.lfz_response === true){
            this.setState({
                visible: false,
                response: ''
            });
        }
    }

    handleConfirm(){
        const { password } = this.state;
        let learningFuzeCheck = true;
        for(let i =0; i<this.props.binderArr.length; i++){
            if(this.props.binderArr[i]._id === "5a6784f1bbd0a222889603a3"){
                learningFuzeCheck = false;
                this.setState({
                    response: 'LearningFuze binder already exists!'
                })
            }
        }
        if(learningFuzeCheck){
            this.props.addLfzBinder(password);
        }
    }
    handleForm(e){
        this.setState({
            password: e.target.value
        });
    }
    keyPressed(event) {
        if (event.key === 'Enter') {
            this.handleConfirm();
        }
    }
    render(){
        console.log('lfzmodal', this.props);
        const {visible, response} = this.state;
        
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
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={(e)=>this.handleForm(e)}
                                    onKeyPress={this.keyPressed.bind(this)}
                                    />
                                <div className="red-text">{response}</div>
                                </div>
                                <div className='card-action modal-nav'>
                                    <button onClick={()=>this.setState({visible: false, response: ''})} className='btn grey lighten-4'>Cancel</button>
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

function mapStateToProps(state) {
    return {
        binderArr: state.binderArray.binderArr,
        interface_obj: state.interface
    }
}

export default connect(mapStateToProps, { addLfzBinder })(LfzModal);