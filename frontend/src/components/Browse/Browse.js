import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Data from './Data'
import Search from './Search'

import TextField from '@material-ui/core/TextField';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(0, 0, 0, 0),
    },
    root: {
        display: 'flex',
      },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
    drawer: {
        width: 240,
        flexShrink: 0,
      },
    drawerPaper: {
        width: 240,
      },
    drawerContainer: {
        overflow: 'auto',
      },
    content: {
        flexGrow: 1,
        paddingTop: '64px',
      },
    formControl: {
      minWidth: 150,
    },
    }));
export default function Browse() {
    const classes = useStyles();
    const [filter, setFilter] = useState('');
    const [rowSelect, setRowSelect] = useState([]);
    const x = rowSelect.length;
    useEffect(() => {
      console.log(rowSelect);
    }, [rowSelect])
    return (
        <div className={classes.root}>
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem>
            <Search filter={filter} setFilter={setFilter} />
            </ListItem>
            <ListItem>
            <IconButton aria-label="cart">
              <Badge badgeContent={x} color="secondary" max={999}>
                <WorkOutlineIcon />
              </Badge>
            </IconButton>
            </ListItem>
          </List>
          <Divider />
        </div>
        </Drawer>
        <main className={classes.content}>
        <Container>
          <Paper >
            <Data rowSelect={rowSelect} setRowSelect={setRowSelect}/>
          </Paper>
        </Container>
        </main>
        </div>
    )
}
