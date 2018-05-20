import * as React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted"

import FeaturedPlayList from "@material-ui/icons/FeaturedPlayList"

import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = {
  container: {
    flex: "0 0 auto",
    marginRight: "4vw",
    width: "45vw",
  },

  card: {
    minWidth: 275,
    margin: "auto",
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },

  customIcon: {
    left: 0,
    top: -2,

    position: "absolute" as "absolute",
  },
  floatingButton: {
    float: "right" as "right",
    padding: "16px 24px",
  },

  title: {
    position: "relative" as "relative",
    fontSize: 14,
    paddingLeft: "2rem",
  },

  pos: {
    marginBottom: 12
  }
};

interface IProps {
  title?: any;
  success?: any;
  content?: any;
}

type PropTypes = IProps & WithStyles<"card" | "container" | "bullet" | "title" | "pos" | "customIcon" | "floatingButton">;

function ScenarioCard(props: PropTypes) {
  const { title, content, classes } = props;

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardActions className={classes.floatingButton}>
          <Button variant="raised" color="default">
            자세히 보기
            <FeaturedPlayList style={{ paddingLeft: 6 }}/></Button>
        </CardActions>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" style={{ fontSize: "1rem"}}>
            <div>{/* set icon's position */}</div>
            <FormatListBulleted className={classes.customIcon}/>{title}
          </Typography>
          {content}
        </CardContent>
      </Card>
    </div>
  );
}

export default withStyles(styles)(ScenarioCard);
