import React, { useState, useEffect } from 'react';
import { Button, Box, Grid, Container, Toolbar, IconButton, InputLabel, TextField, OutlinedInput, FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'
import SearchIcon from "@material-ui/icons/Search";
import { Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));
export default function SearchBar(props) {

    const [input, setInput] = useState('');
    const classes = useStyles();
    const handleChange = event => props.setFilter(event.target.value);

    useEffect(() => {
        console.log(input);
    }, [input])


    return (
        <div>
            {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        onInputChange={handleChange}
        options={dataArray.map((option) => option.nameTh)}
        renderInput={(params) => (
          <TextField {...params} label="Name" margin="normal" variant="outlined" />
        )}
      /> */}
                <Grid container  justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <FormControl fullWidth  variant="outlined">
                            <InputLabel htmlFor="component-outlined">Name</InputLabel>
                            <OutlinedInput id="component-outlined" color='secondary' value={props.filter} onChange={handleChange} label="Name" />
                        </FormControl>
                    </Grid>
                </Grid>
        </div>
    );
}