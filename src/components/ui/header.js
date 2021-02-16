import React, { useState, useEffect, useMemo } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
// For HideOnScroll
// import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";

import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "20px",
  },
  button: {
    ...theme.typography.estimate,
    marginLeft: "20px",
    marginRight: "20px",
    borderRadius: "50px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0",
  },
  menuItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: "0.7",
    "&:hover": {
      opacity: "1",
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: "0.7",
  },
  drawerItemSelected: {
    opacity: "1",
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.secondary.main,
    opacity: "0.7",
  },
  drawerItemEstimateSelected: {
    opacity: "1",
    backgroundColor: theme.palette.secondary.light + " !important",
  },
  drawerItemSecondaryAction: {
    right: "8px",
  },
  drawerCollapseItem: {
    backgroundColor: theme.palette.primary.light,
  },
}));

/*
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
*/

const menuOptions = [
  { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
  {
    name: "Custom Software Development",
    link: "/customsoftware",
    activeIndex: 1,
    selectedIndex: 1,
  },
  {
    name: "iOS/Android App Development",
    link: "/mobileapps",
    activeIndex: 1,
    selectedIndex: 2,
  },
  {
    name: "Website Development",
    link: "/websites",
    activeIndex: 1,
    selectedIndex: 3,
  },
];

export default function Header(props) {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);
  // For active tab
  // const [value, props.setValue] = useState(0);
  // for anchoring menuList(paper) of menu
  const [anchorEl, setAnchorEl] = useState(null);
  // opening menu
  const [open, setOpen] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  // for active menu item
  // const [selectedInprops.dex, setSelectedIndex] = useState(0);

  // for better performanve in ios devices for swipeableDrawer
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // check for a breakpoint
  let match = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleChange = (e, newValue) => {
    // console.dir(e.target.closest(".MuiButtonBase-root").parentNode);
    props.setValue(newValue);
  };

  // click on our drop down menu for services tag
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  // click for menu item
  const handleMenuItemClick = (e, i, mobile = false) => {
    setAnchorEl(null);
    if (mobile) {
      setOpenMenuMobile(true);
    } else {
      setOpen(false);
    }
    props.setSelectedIndex(i);
    props.setValue(1);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const routes = useMemo(() => {
    return [
      { name: "Home", link: "/", activeIndex: 0 },
      { name: "Services", link: "/services", activeIndex: 1 },
      { name: "The Revolution", link: "/revolution", activeIndex: 2 },
      { name: "Contact Us", link: "/contact", activeIndex: 3 },
    ];
  }, []);

  useEffect(() => {
    [...menuOptions, ...routes].every((route) => {
      if (window.location.pathname === route.link) {
        if (props.value !== route.activeIndex) {
          props.setValue(route.activeIndex);
          if (route.selectedIndex) {
            props.setSelectedIndex(route.selectedIndex);
            setOpenMenuMobile(true);
          }
        }
        return false;
      } else if (window.location.pathname === "/estimate") {
        props.setValue(false);
        return false;
      } else {
        return true;
      }
    });

    // eslint-disable-next-line
  }, []);

  const tab = (
    <React.Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route) => (
          <Tab
            key={route.name + route.activeIndex}
            aria-owns={
              anchorEl && route.name === "Services" ? "simple-menu" : undefined
            }
            aria-haspopup={
              anchorEl && route.name === "Services" ? "true" : undefined
            }
            onMouseOver={(e) => {
              if (route.name === "Services") handleClick(e);
            }}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
          />
        ))}
      </Tabs>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        to="/estimate"
        onClick={() => props.setValue(false)}
      >
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        // onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: "1302" }}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option.name}
            component={Link}
            to={option.link}
            classes={{
              root: classes.menuItem,
              // selected: classes.selectedMenuItem,
            }}
            onClick={(e) => handleMenuItemClick(e, index)}
            selected={index === props.selectedIndex}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        // anchor={"right"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route) => (
            <React.Fragment key={route.name + route.activeIndex}>
              <ListItem
                divider
                button
                onClick={() => {
                  setOpenDrawer(false);
                  props.setValue(route.activeIndex);
                  setOpenMenuMobile(false);
                  if (route.name === "Services") props.setSelectedIndex(0);
                }}
                component={Link}
                to={route.link}
                selected={props.value === route.activeIndex}
              >
                <ListItemText
                  className={
                    props.value === route.activeIndex
                      ? [classes.drawerItem, classes.drawerItemSelected].join(
                          " "
                        )
                      : classes.drawerItem
                  }
                  disableTypography
                >
                  {route.name}
                </ListItemText>
                {route.name === "Services" ? (
                  <ListItemSecondaryAction
                    classes={{ root: classes.drawerItemSecondaryAction }}
                  >
                    <IconButton
                      onClick={() => setOpenMenuMobile(!openMenuMobile)}
                    >
                      {openMenuMobile ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </ListItemSecondaryAction>
                ) : null}
              </ListItem>
              {route.name === "Services" ? (
                <Collapse
                  in={openMenuMobile}
                  timeout="auto"
                  classes={{ container: classes.drawerCollapseItem }}
                >
                  {menuOptions.map((option, index) => {
                    if (index === 0) return null;
                    return (
                      <ListItem
                        key={option.name}
                        divider
                        button
                        onClick={(e) => {
                          setOpenDrawer(false);
                          props.setValue(1);
                          handleMenuItemClick(e, index, true);
                        }}
                        component={Link}
                        to={option.link}
                        selected={
                          index === props.selectedIndex &&
                          window.location.pathname === option.link
                        }
                      >
                        <ListItemText
                          className={
                            index === props.selectedIndex
                              ? [
                                  classes.drawerItem,
                                  classes.drawerItemSelected,
                                ].join(" ")
                              : classes.drawerItem
                          }
                          disableTypography
                        >
                          {option.name}
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </Collapse>
              ) : null}
            </React.Fragment>
          ))}
          <ListItem
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(false);
              setOpenMenuMobile(false);
            }}
            component={Link}
            to="/estimate"
            className={classes.drawerItemEstimate}
            selected={props.value === false}
            classes={{ selected: classes.drawerItemEstimateSelected }}
          >
            <ListItemText
              className={
                props.value === 5
                  ? [classes.drawerItem, classes.drawerItemSelected].join(" ")
                  : classes.drawerItem
              }
              disableTypography
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  );

  console.log("[Header.js] rendering");

  return (
    <React.Fragment>
      <ElevationScroll>
        {/* // <HideOnScroll> */}
        <AppBar position="fixed" style={{ zIndex: "1301" }}>
          <Toolbar disableGutters>
            <Button
              className={classes.logoContainer}
              disableRipple
              onClick={() => props.setValue(0)}
              component={Link}
              to="/"
            >
              <img alt="company logo" src={logo} className={classes.logo} />
            </Button>
            {match ? drawer : tab}
          </Toolbar>
        </AppBar>
        {/* </HideOnScroll> */}
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
