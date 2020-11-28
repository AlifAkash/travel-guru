import React from 'react';
import "./Room.css";
import starIconSrc from "../travel-guru/Icon/star_1_.png"

const Room = (props) => {
    const { title, description, star, price, img } = props.room;
    return (
        <div className="Room">
            <div className="Img">
                <img src={img} alt="" />
            </div>
            <div className="des">
                <h2>{title}</h2>
                <p aria-disabled>{description}</p>
                <div className="small">
                    <div>
                        <img src={starIconSrc} alt="" />
                        <small>{star}</small>
                    </div>
                    <div>
                        <small>Price: ${price}/night</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;