import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    width: "900px",
    "& .MuiLinearProgress-colorSecondary": {
      backgroundColor: "#5f6a9b",
      height: "20px"
    },
    "& .MuiLinearProgress-barColorSecondary": {
      backgroundColor: "#b21881"
    }
  }
});

export default function MyBar({ now, variant }) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Box className={classes.root} mr={1}>
        <LinearProgress variant={variant} value={now} color="secondary" />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          now
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
