import React, {Component} from 'react';
import '../assets/css/modal.css';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
        // this.handleConfirm = this.handleConfirm.bind(this);
    }

    // handleConfirm() {
    //
    //     this.setState({         visible: false     }); } MODAL IS IN
    // MATERIALIZE...change it to Bootstrap if necessary (it's in index.html) //
    render() {
        // console.log('Modal Props: ', this.props);
        const calButton = (
            <button onClick={() => this.setState({visible: true})} className="btn">
                <span className="glyphicon glyphicon-calendar"></span>
            </button>
        );

        if (this.state.visible) {
            return (
                <span>
                    {calButton}
                    <div className="confirmModal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title">Calendar</h3>
                                <button onClick= {() => this.setState({visible: false})}>x</button>
                            </div>
                            <div className="modal-body">
                                <div className="card-content">
                                    <div className="mockCal">.mockCal is temp div to test size</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            );
        }
        return calButton;
    }
}

export default Modal;