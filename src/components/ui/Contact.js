import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import ButtonArrow from "./ButtonArrow";

import background from "../../assets/background.jpg";
import mobileBackground from "../../assets/mobileBackground.jpg";
import phoneIcon from "../../assets/phone.svg";
import emailIcon from "../../assets/email.svg";
import airplane from "../../assets/send.svg";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "60em",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url(${mobileBackground})`,
    },
  },
  estimate: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    height: "80px",
    width: "205px",
    backgroundColor: theme.palette.common.orange,
    fontSize: "1.5rem",
    marginLeft: "2em",
    marginRight: "5em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "0",
      marginRight: "0",
      marginTop: "50px",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    height: "35px",
    padding: "5px",
    fontSize: "0.7rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
  },
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop: "5em",
    borderRadius: "0.5em",
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    height: "45px",
    width: "245px",
    fontSize: "1rem",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("sm")]: {
      height: "40px",
      width: "225px",
    },
  },
}));

export default function Contact(props) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");

  const [message, setMessage] = useState("");

  const [open, setOpen] = useState(false);

  const onChange = (event) => {
    let valid;
    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );
        if (!valid) {
          setEmailHelper("Invalid Email");
        } else {
          setEmailHelper("");
        }
        break;
      case "phone":
        setPhone(event.target.value);
        valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
          event.target.value
        );
        if (!valid) {
          setPhoneHelper("Invalid Phone");
        } else {
          setPhoneHelper("");
        }
        break;
      default:
        break;
    }
  };

  return (
    <Grid container>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        lg={4}
        xl={3}
        style={{
          marginTop: matchesSM ? "1em" : matchesMD ? "5em" : 0,
          marginBottom: matchesSM ? "1em" : matchesMD ? "5em" : 0,
        }}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography
                align={matchesMD ? "center" : "left"}
                variant="h2"
                style={{ lineHeight: "1" }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="body1"
                style={{ color: theme.palette.common.blue }}
                align={matchesMD ? "center" : "left"}
              >
                We're waiting
              </Typography>
            </Grid>

            <Grid item container style={{ marginTop: "2em" }}>
              <Grid item>
                <img
                  src={phoneIcon}
                  alt="phone"
                  style={{ marginRight: "0.5em", verticalAlign: "bottom" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{
                    color: theme.palette.common.blue,
                    fontSize: "1rem",
                  }}
                >
                  <a
                    href="tel:siddharthbadola97@gmail.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    (555) 555-5555
                  </a>
                </Typography>
              </Grid>
            </Grid>

            <Grid item container>
              <Grid item>
                <img
                  src={emailIcon}
                  alt="email"
                  style={{ marginRight: "0.5em", verticalAlign: "bottom" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                >
                  <a
                    href="mailto:siddharthbadola97@gmail.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    test@test.com
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              style={{ maxWidth: "20em", marginTop: "2em" }}
            >
              <Grid item style={{ marginBottom: "0.5em" }}>
                {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                <TextField
                  fullWidth
                  label="Name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  fullWidth
                  label="Email"
                  helperText={emailHelper}
                  error={emailHelper.length !== 0}
                  id="email"
                  value={email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  fullWidth
                  error={phoneHelper.length !== 0}
                  helperText={phoneHelper}
                  label="Phone"
                  id="phone"
                  value={phone}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Grid item container style={{ maxWidth: "20em" }}>
              <TextField
                fullWidth
                value={message}
                id="message"
                className={classes.message}
                InputProps={{ disableUnderline: true }}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={10}
              />
            </Grid>
            <Grid item container justify="center" style={{ marginTop: "2em" }}>
              <Button
                disabled={
                  name.length === 0 ||
                  message.length === 0 ||
                  phoneHelper.length !== 0 ||
                  emailHelper.length !== 0 ||
                  email.length === 0 ||
                  phone.length === 0
                }
                variant="contained"
                className={classes.sendButton}
                onClick={() => setOpen(true)}
              >
                Send Message
                <img
                  src={airplane}
                  alt="paper airplane"
                  style={{ marginLeft: "1em" }}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        fullScreen={matchesXS}
        onClose={() => setOpen(false)}
        style={{ zIndex: "1500" }}
        PaperProps={{
          style: {
            padding: matchesXS
              ? "1em 0 1em 0"
              : matchesSM
              ? "2.5em 4.5em"
              : matchesMD
              ? "2.5em 8.5em"
              : "2.5em 8.5em",
          },
        }}
      >
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4" gutterBottom align="center">
                Confirm Message
              </Typography>
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              {/* <InputLabel htmlFor="name">Name</InputLabel> */}
              <TextField
                fullWidth
                label="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                fullWidth
                label="Email"
                helperText={emailHelper}
                error={emailHelper.length !== 0}
                id="email"
                value={email}
                onChange={onChange}
              />
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                fullWidth
                error={phoneHelper.length !== 0}
                helperText={phoneHelper}
                label="Phone"
                id="phone"
                value={phone}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            style={{ maxWidth: matchesXS ? "100%" : "20em" }}
          >
            <TextField
              style={{ marginTop: "1em" }}
              fullWidth
              value={message}
              id="message"
              className={classes.message}
              InputProps={{ disableUnderline: true }}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={6}
            />
          </Grid>
          <Grid
            item
            direction={matchesSM ? "column" : "row"}
            container
            style={{ marginTop: "2em" }}
            alignItems="center"
          >
            <Grid item>
              <Button
                style={{ fontWeight: "300" }}
                onClick={() => setOpen(false)}
                color="primary"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={
                  name.length === 0 ||
                  message.length === 0 ||
                  phoneHelper.length !== 0 ||
                  emailHelper.length !== 0 ||
                  email.length === 0 ||
                  phone.length === 0
                }
                variant="contained"
                className={classes.sendButton}
                onClick={() => setOpen(true)}
              >
                Send Message
                <img
                  src={airplane}
                  alt="paper airplane"
                  style={{ marginLeft: "1em" }}
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid
        direction={matchesMD ? "column" : "row"}
        item
        container
        className={classes.background}
        lg={8}
        xl={9}
        alignItems="center"
        justify={matchesMD ? "center" : "flex-start"}
      >
        <Grid
          item
          style={{
            marginLeft: matchesMD ? "0" : "3em",
            textAlign: matchesMD ? "center" : "inherit",
          }}
        >
          <Grid container direction="column">
            <Typography variant="h2" align={matchesMD ? "center" : "left"}>
              Simple Software.
              <br />
              Revolutionary Results.
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ color: "white", fontSize: "1.5rem" }}
              align={matchesMD ? "center" : "left"}
            >
              Take advantage of the 21st Century
            </Typography>
            <Grid container item justify={matchesMD ? "center" : undefined}>
              <Button
                variant="outlined"
                className={classes.learnButton}
                component={Link}
                to="/revolution"
                onClick={() => props.setValue(2)}
              >
                <span style={{ marginRight: "5px" }}>Learn More</span>
                <ButtonArrow
                  width={10}
                  height={10}
                  fill={theme.palette.common.blue}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={classes.estimate}
            component={Link}
            to="/estimate"
            onClick={() => props.setValue(false)}
          >
            Free Estimate
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
