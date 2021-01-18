/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { Button, Box, Grid, Container, Input, IconButton, InputLabel, TextField, OutlinedInput, FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'
import SearchIcon from "@material-ui/icons/Search";
import { Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import SearchAppBar from './AppBar'
import SearchBar from './SearchBar'



export default function Search() {

  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');
  const [dataArray, setDataArray] = useState([])




  useEffect(() => {
    axios.get('api/rice/search').then(result => {
      const { data } = result
      setDataArray(data)
    })
  }, [])

  return (
      <SearchBar filter={filter} setFilter={setFilter} />
    

  );
}
