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
    //     this.setState({
    //         visible: false
    //     });
    // }


    // MODAL IS IN MATERIALIZE...change it to Bootstrap if necessary (it's in index.html) //
    render() {
        // console.log('Modal Props: ', this.props);
        const button = (
            <button onClick={() => this.setState({visible: true})} className="btn blue">
                <i className="material-icons">date_range</i>
            </button>
        );

        if (this.state.visible) {
            return (
                <span>
                    {button}
                    <div className="confirmModal">
                        <div className="modal-content">
                            <div className="card">
                                <div className="card-content">
                                    <div>

                                    </div>
                                </div>
                                <div className="card-action">
                                    <button onClick={() => this.setState({visible: false})} className="btn red">
                                        <i className="material-icons">close</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            );
        }
        return button;
    }
}

export default Modal;