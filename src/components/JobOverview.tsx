import * as React from "react";
import { Link } from "react-router-dom";

import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import * as classNames from "classnames";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export interface IJobOverview {
  id: string;
  name: string; // JobOverview name (ex. ui test)
  description?: string;
  state: "finished" | "running" | "pending";
  success: boolean;

  queuedAt: string;
  scheduledAt?: string;
  startedAt?: string;
  finishedAt?: string;
}

interface IProps {
  overviewData: IJobOverview;
}

const lightGrey = "#FAFAFA";
const successColor = "#3F51B5";
const failColor = "#BF360C";
function colorDecision(a:string, b:boolean){
  return a === "finished" ?
    b ? successColor : failColor
    : lightGrey
}

type PropTypes = IProps &
  WithStyles<
    | "root"
    | "marginPage"
    | "heading"
    | "secondaryHeading"
    | "jobTitle"
    | "jobAction"
    | "icon"
    | "details"
    | "column"
    | "helper"
    | "link"
    | "chip"
  >;

const styles = (theme: Theme) => ({
  root: {
    width: "100%"
  },
  marginPage: {
    margin: "auto",
    marginTop: "2vh !important",
    width: "80%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20)
  },
  secondaryHeading: {
    border: "1px solid",
    borderRadius: 4,
    fontSize: theme.typography.pxToRem(15),
    // color: theme.palette.text.secondary,
    height: 28,
    width: 80,

    paddingTop: 4,
  },
  jobTitle: {
    height: 72,
  },
  jobAction: {
    backgroundColor: lightGrey,
    padding: "8px 24px",
  },
  chip: {
    color: "#424242",
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center",
    padding: "8px 24px 16px 24px",
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

function JobOverview(props: PropTypes) {
  const { overviewData, classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={true} className={classes.marginPage}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.jobTitle}>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              {overviewData.name}
              <Typography variant="caption">
                잡 아이디: {overviewData.id}
              </Typography>
            </Typography>
          </div>
          <div className={classes.column}>
            <Chip label={overviewData.state} className={classes.chip} />
          </div>
          <div className={classes.column}>
            <div className={classes.secondaryHeading}
                 style={{ borderColor: colorDecision(overviewData.state, overviewData.success)}}>
              <Typography align="center" variant="body2"
                          style={{ color: colorDecision(overviewData.state, overviewData.success) }}>
              {overviewData.state === "finished"
                ? overviewData.success
                  ? "성공"
                  : "실패"
                : ""}
              </Typography>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Typography variant="body1">{overviewData.description}</Typography>
          </div>
          <div className={classNames(classes.column, classes.helper)}>
            <Typography variant="caption">
              대기 시작 시각: {overviewData.queuedAt}
            </Typography>
            <Typography variant="caption">
              예정 시작 시각: {overviewData.scheduledAt}
            </Typography>
          </div>
          <div className={classNames(classes.column, classes.helper)}>
            <Typography variant="caption">
              실제 시작 시각: {overviewData.startedAt}
            </Typography>
            <Typography variant="caption">
              실제 종료 시각: {overviewData.finishedAt}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions className={classes.jobAction}>
          <Button size="small" color="secondary">
            테스트 취소
          </Button>
          <Link to={`detail/${overviewData.id}`}>
            <Button size="small" color="primary">
              자세히 보기
            </Button>
          </Link>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

export default withStyles(styles)(JobOverview);
