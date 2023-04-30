import React from "react";

const GreetingCard=({heading,heading2,msg,groom,bride})=>{
    return (<div id="fh5co-couple">
    <div className="container">
        <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
                <h2>{heading}</h2>
                <h3>{heading2}</h3>
                <p>{msg}</p>
            </div>
        </div>
        <div className="couple-wrap animate-box">
            <div className="couple-half">
                <div className="groom">
                    <img src={groom.Image} alt="groom" className="img-responsive"/>
                </div>
                <div className="desc-groom">
                    <h3>{groom.Name}</h3>
                    <p>{groom.Message}</p>
                </div>
            </div>
            <p className="heart text-center"><i className="icon-heart2"></i></p>
            <div className="couple-half">
                <div className="bride">
                    <img src={bride.Image} alt="groom" className="img-responsive"/>
                </div>
                <div className="desc-bride">
                    <h3>{bride.Name}</h3>
                    <p>{bride.Message}</p>
                </div>
            </div>
        </div>
    </div>
</div>)
}

export default GreetingCard;