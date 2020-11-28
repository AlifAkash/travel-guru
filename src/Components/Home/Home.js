import React, { useEffect, useState } from 'react';
import "./Home.css";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import fakeData from '../FakeData/FakeData';
import Cards from '../Cards/Cards';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { BgImgContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    let [leftSlider, setLeftSlider] = useState(0);
    let [rightSlider, setRightSlider] = useState(3);
    const [displayData, setDisplayData] = useState(fakeData[0]);
    const [bgImg, setBgImg] = useContext(BgImgContext);

    const cardData = fakeData.slice(leftSlider,rightSlider);

    const rightSliderHandler = () => {
         const newRightValue = rightSlider+1;
         setRightSlider(newRightValue);
        const newLeftValue = leftSlider+1;
        setLeftSlider(newLeftValue);
    }

    const leftSliderHandler = () => {
        const newRightValue = rightSlider-1;
        setRightSlider(newRightValue);
       const newLeftValue = leftSlider-1;
       setLeftSlider(newLeftValue);
    }

    const handleDisplay = (id) => {
        const idData = fakeData.find(item => item.id === parseInt(id));
        const newDisplayData = {...idData};
        console.log(newDisplayData);
        setDisplayData(newDisplayData);
    }

    const handleBook = (id, img) => {
        history.push(`/place/${id}`);
        setBgImg(img);
    }

    return (
        <div className="Home">
            <div style={{paddingLeft:"50px"}} className={classes.root} >
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <div>
                            <h1>{displayData.name}</h1>
                            <p>{displayData.description.slice(0,250)}...</p>
                            <button 
                                className="loginButton"
                                onClick={() => handleBook(displayData.id, displayData.img)}
                            > Booking &rarr;</button>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className="Cards">
                            {
                                cardData.map(item=> <Cards handleDisplay={handleDisplay} item={item}></Cards>)
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="btn">
                <button
                    disabled={leftSlider===0? true: false}
                    onClick={leftSliderHandler} 
                    className="slidBtn"
                >&lt;</button>
                <button
                    disabled={rightSlider===6? true: false}
                    onClick={rightSliderHandler}
                    className="slidBtn"
                >&gt;</button>
            </div>
        </div>
    );
};

export default Home;