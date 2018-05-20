import * as React from "react";

import { Theme, WithStyles, withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";

import Done from "@material-ui/icons/Done";
import Error from "@material-ui/icons/Error";

import { IJobOverview } from "./JobOverview";
import ScenarioCard from "./ScenarioCard";
import ScenarioDetail, { IScenarioResult } from "./ScenarioDetail";

export interface IJobDetail extends IJobOverview {
  result?: IFeatureResult[];
}

interface IFeatureResult {
  success: boolean;
  name: string;
  result: IScenarioResult[];
}

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding:"3vh 10vw",
      display: "flex", flexWrap: "nowrap", overflow: "auto"}}>
      {props.children}
    </Typography>
  );
}

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    marginTop: "-3vh",
    width: "100%"
  },
  marginPage: {
    margin: 'auto',
    width: "80%",
  },

  marginBar: {
    marginBottom: theme.spacing.unit,
  },
});

interface IProps extends WithStyles<"root" | "marginPage" | 'marginBar'> {
  detailData: IJobDetail;
}

interface IState {
  value: number;
}

class JobDetails extends React.Component<IProps, IState> {
  public state = {
    value: 0
  };

  public handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  public render() {
    const { detailData, classes } = this.props;
    const result = detailData.result;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.marginBar}>
          <Tabs
            className={classes.marginPage}
            value={value}
            onChange={this.handleChange}
            scrollable={true}
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            {result ? (
              result.map((element, index) => (
                <Tab
                  key={index}
                  label={element.name}
                  icon={element.success ? <Done /> : <Error color="error" />}
                />
              ))
            ) : (
              <Tab label={"No Features"} icon={<Error color="error" />} />
            )}
          </Tabs>
        </AppBar>
        {result ? (
          result.map(
            (element, index) =>
              value === index && (
                <TabContainer key={index}>
                  {element.result.map((e, i) => (
                    <ScenarioCard
                      key={e.name}
                      title={`시나리오 ${i + 1}: ${e.name}`}
                      content={<ScenarioDetail scenarioData={e} />}
                    />
                  ))}
                  <div style={{ color: "white" }}>__________________{/* make cell for right space */}</div>
                </TabContainer>
              )
          )
        ) : (
          <TabContainer> No Features </TabContainer>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(JobDetails);
