import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function OutlinedChips(props) {
  const classes = useStyles();

  const handleDelete = (chipToDelete) => () => {
    props.setChip((chips) => chips.filter((chip) => chip !== chipToDelete));
  };



  return (
    <div className={classes.root}>
    {props.item.map((item) =>
      <Chip label={item} onDelete={handleDelete(item)} color="primary" variant="outlined" size="small" />
    )}
    </div>
  );
}