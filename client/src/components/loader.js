import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loader extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.interface !== nextProps.interface){
            if(nextProps.interface.sent_to_db === true || nextProps.interface.pull_from_db === true){
                this.setState({
                    visible: true
                });
            } else {
                this.setState({
                    visible: false
                });
            }
        }
    }

    render(){
        const { visible } = this.state;

        if(visible){
            return (
                <div className="loader-container">
                    <div className="preloader-wrapper small active">
                        <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        interface: state.interface
    }
}

export default connect(mapStateToProps, null)(Loader);