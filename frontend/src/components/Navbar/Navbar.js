import React from 'react';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { Link as RouterLink, useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  grow: {
    display: 'flex',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    color: '#000',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      fontWeight: 900,
      cursor: 'pointer',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: blueGrey[500],
  },
  inputRoot: {
    color: blueGrey[500],
    
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      margin: theme.spacing(0, 0, 0, 2),
    },
  },
  sectionMoblie: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  link: {
    color: '#000',
    fontSize: '18px',
    fontWeight: '50',
    textAlign: 'center',
    alignSelf: 'center',
    margin: theme.spacing(0, 0, '-3px', 2),
  },
  linkMoblie: {
    color: '#000',
    fontSize: '18px',
    fontWeight: '50',
    textAlign: 'center',
    alignSelf: 'center',
  },
  header: {
    display: 'flex',
  },
  buttonLogin: {
    backgroundColor: '#fff',
    color: 'black',
    width: '100px',
    padding: theme.spacing(0.5, 1, 0.5, 1),
    "&:hover": {
      backgroundColor: '#eceff1'
  }
  },
  appbar: {
    backgroundColor: '#fff',
    zIndex: theme.zIndex.drawer + 1,
  },
  sectionMobile: {
    display: 'flex',
    color: blueGrey[500],
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 240,
  },
}));

export default function Navbar(props) {
  let history = useHistory();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = props;
  const theme = useTheme();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function handleClick() {
    history.push("/");
  }

  const renderMobileMenu = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem >
          <Link component="button" variant="body1" component={RouterLink} to="/" className={classes.linkMoblie}>
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link component="button" variant="body1" component={RouterLink} to="/browse" className={classes.linkMoblie}>
            Browse
          </Link>
        </ListItem>
      </List>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
          <header className={classes.header}>
            <Typography className={classes.title} variant="h6" noWrap onClick={handleClick}>
              RICE Nutrition
          </Typography>
            <div className={classes.sectionDesktop}>
            <Link component="button" variant="body1" component={RouterLink} to="/" className={classes.link}>
                Home
            </Link>
              <Link component="button" variant="body1" component={RouterLink} to="/browse"  className={classes.link}>
                Browse
            </Link>
            </div>
          </header>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button color="inherit" size="small" className={classes.buttonLogin}>Log in</Button>
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {renderMobileMenu}
          </Drawer>
        </Hidden>

    </div>
  );
}
