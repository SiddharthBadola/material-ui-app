import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ButtonArrow from "./ButtonArrow";
import background from "../../assets/background.jpg";
import mobileBackground from "../../assets/mobileBackground.jpg";

const useStyles = makeStyles((theme) => ({
  learnButton: {
    ...theme.typography.learnButton,
    height: "35px",
    padding: "5px",
    fontSize: "0.7rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
    height: "60em",
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
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      marginRight: "0",
      marginTop: "50px",
    },
  },
}));

export default function CallToAction(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      className={classes.background}
      justify={matchesSM ? "center" : "space-between"}
      alignItems="center"
      direction={matchesSM ? "column" : "row"}
    >
      <Grid
        item
        style={{
          marginLeft: matchesSM ? "0" : "5em",
          textAlign: matchesSM ? "center" : "inherit",
        }}
      >
        <Grid container direction="column">
          <Typography variant="h2">
            Simple Software.
            <br />
            Revolutionary Results.
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ color: "white", fontSize: "1.5rem" }}
          >
            Take advantage of the 21st Century
          </Typography>
          <Grid container item justify={matchesSM ? "center" : undefined}>
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
  );
}
