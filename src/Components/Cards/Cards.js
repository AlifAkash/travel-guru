import React from 'react';
import "./Cards.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        minWidth: 250,
    }
});

const Cards = (props) => {
    const classes = useStyles();
    const { name, img, id } = props.item;
    const handleDisplay = props.handleDisplay;
    
    return (
            <Card className={classes.root}
                   style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${img}')`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        height: "60vh",
                        width: "13vh",
                        margin: "10px 3px",
                        border: "2px solid goldenrod",
                        borderRadius: "20px",
                        display:"flex",
                        alignItems: "flex-end",
                        color:"white"
                    }} 
            >
                <CardActions className="Card">
                    <Button  style={{
                                        color:"white",
                                        fontSize:"2rem"
                                    }}
                             onClick={() => handleDisplay(id)}
                    >{name}</Button>
                </CardActions>
            </Card>
    );
};

export default Cards;