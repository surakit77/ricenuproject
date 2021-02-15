import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DataTable from './DataTable'
import Paper from '@material-ui/core/Paper';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Table() {
  const classes = useStyles();
  const [chip, setChip] = useState([]);

  useEffect(()=>{
    console.log(chip)
  },[chip])


  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Paper>
          <DataTable chip={chip} setChip={setChip}/>
        </Paper>
      </main>
    </div> 
  );
}
