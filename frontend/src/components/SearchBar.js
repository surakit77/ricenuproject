import React, { useState, useEffect } from 'react';
import { Button, Box, Grid, Container, Toolbar, IconButton, InputLabel, TextField, OutlinedInput, FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'
import SearchIcon from "@material-ui/icons/Search";
import { Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    searchBar: {
        backgroundColor: '#fff',
        color: '#000',
        fontSize: '18px',
    },
    searchMenu: {
        position: 'relative',
        display: 'block',
        margin: 'auto',
        width: '100%',
        top: '80px',
        padding: '75px 10% 48px',
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    MuiOutlinedInputInput: {
    },
    buttonOne: {
        backgroundColor: '#fff',
        minWidth: '120px',
        width: '200px',
        padding: '1rem',
        margin: '0 .5rem 1rem',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        textAlign: 'center',

    },
    buttonTwo: {
        color: '#fff',
        minWidth: '120px',
        width: '200px',
        padding: '1rem',
        margin: '0 .5rem 1rem',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        textAlign: 'center',
    },
}));
export default function SearchBar(props) {

    const [input, setInput] = useState('');
    const classes = useStyles();
    const handleChange = event => props.setFilter(event.target.value);

    useEffect(() => {
        console.log(props.filter);
    }, [props.filter])


    return (
        <div className={classes.searchMenu}>
            {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        onInputChange={handleChange}
        options={dataArray.map((option) => option.nameTh)}
        renderInput={(params) => (
          <TextField {...params} label="Name" margin="normal" variant="outlined" />
        )}
      /> */}
                <div>
                <Grid container  justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <FormControl fullWidth  color="secondary"  margin="normal" size="medium">
                            <InputLabel htmlFor="component-outlined"  variant="filled">Name</InputLabel>
                            <OutlinedInput id="component-outlined"  className={classes.searchBar} value={props.filter} onChange={handleChange} label="Name" />
                        </FormControl>
                    </Grid>
                </Grid>
                </div>
                <div className={classes.heroButtons}>
                    <Grid container spacing={5} justify="center">
                        <Grid item >
                            <Button variant="contained" className={classes.buttonOne} component={RouterLink} 
                            to={{pathname: "/browse",search: "?name="+props.filter }}>
                                Search
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button variant="outlined" className={classes.buttonTwo}>
                            Advanced Search
                            </Button>
                        </Grid>
                    </Grid>
                </div>
        </div>
    );
}