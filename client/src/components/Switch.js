import React from "react";
import { Switch } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const switchStyles = (theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    color: "#005A3C",
    padding: 1,
    "& + $track": {
      backgroundColor: "#B8D5D1",
      opacity: 1,
      border: "none",
    },
    "&$checked": {
      transform: "translateX(16px)",
      color: "#005A3C",
      "& + $track": {
        backgroundColor: "#B8D5D1",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#B8D5D1",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {  },
  focusVisible: {},
});

export default withStyles(switchStyles)(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});