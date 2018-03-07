import React from 'react';

function TourButton({toggleTour}){
    return(
        <button className="btn startTour" onClick={toggleTour}>TOUR</button>
    )
}

export default TourButton;



