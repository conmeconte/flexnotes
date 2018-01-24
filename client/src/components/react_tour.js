import React, { Component } from 'react';
// import Tour from 'reactour';

function FlexNotesTour({toggleTour}){
    return(
        <button className="startTour" onClick={toggleTour}>Tour</button>
    )
}

// class FlexNotesTour extends Component {
//     constructor(props){
//         super(props);
//
//         this.state = {
//             isTourOpen: false
//         }
//     }
//
//     closeTour = () => {
//         this.setState({ isTourOpen: false });
//     };
//
//     openTour = () => {
//         this.setState({ isTourOpen: true });
//     };
//
//     render(){
//         return(
//             <button className="startTour" onClick={this.openTour}>Tour</button>
//         )
//     }
// }

export default FlexNotesTour;



