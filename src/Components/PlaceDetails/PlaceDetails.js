import React from 'react';
import 'date-fns';
import "./PlaceDetails.css";
import { useHistory, useParams } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import fakeData from '../FakeData/FakeData';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { useContext } from 'react';
import { BgImgContext } from '../../App';

const useStylesT = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const PlaceDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-08-18T21:11:54'));
    const classesT = useStylesT();
    const history = useHistory();
    const [bgImg] = useContext(BgImgContext);

    const place = fakeData.find(place => place.id === parseInt(id));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleBooking = () => {
        history.push("/stay")
    }

    return (
        <div className="placeDetails">
            <div className={classes.root} >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className="details">
                            <h1>{place.name}</h1>
                            <p>{place.description}</p>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="timePicker">
                            <form className={classesT.root} noValidate autoComplete="off">
                                <div>
                                    <TextField required id="standard-required" label="Origin" />
                                    <TextField required id="standard-required" label="Destination" />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Date From"
                                                format="MM/dd/yyyy"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Date To"
                                                format="MM/dd/yyyy"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <input
                                        className="loginButton"
                                        type="button"
                                        value="Start Booking"
                                        onClick={handleBooking}
                                    />
                                </div>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default PlaceDetails;