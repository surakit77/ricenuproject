import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Seacrch from '../Search';
import Map from './Map'
const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: blueGrey[900],
       
        height: 500 ,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
}));
function Home() {
    const classes = useStyles();
    return (
        <>
        <div className={classes.heroContent}>
            <Container maxWidth='md'>
            <Seacrch />
            </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
            <Map />
        </Container>
        </>
    )
}
export default Home;
