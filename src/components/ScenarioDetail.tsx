import * as React from "react";

import { Theme, WithStyles, withStyles } from "@material-ui/core/styles";

// import Button from '@material-ui/core/Button';
import { StepContent } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";

const styles = (theme: Theme) => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  chip: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.background.default
  }
});

export interface IScenarioResult {
  name: string;
  description: string;
  success: boolean;
  steps: IStepData[];
  failureDetail?: {
    index: number;
    reason: string;
  };
}

export interface IStepData {
  keyword: string;
  name: string;
  line: number;
  duration: number;
}

interface IProps
  extends WithStyles<"root" | "button" | "instructions" | "chip"> {
  scenarioData: IScenarioResult;
}

interface IState {
  activeStep: number;
  skipped: any;
}

interface ILabel {
  optional?: JSX.Element;
  error?: boolean;
}

class ScenarioDetail extends React.Component<IProps, IState> {
  public state = {
    activeStep: 0,
    skipped: new Set()
  };

  public render() {
    const { scenarioData, classes } = this.props;
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation={"vertical"}>
          {scenarioData.steps.map((label, index) => {
            const props = { completed: true, last: false };
            const labelProps: ILabel = { error: false };
            if (scenarioData.failureDetail) {
              const errorIndex = scenarioData.failureDetail.index;
              if (index > errorIndex) {
                props.completed = false;
                props.last = index === scenarioData.steps.length;
              } else if (index === errorIndex) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                    테스트 실패 <br />
                    {scenarioData.failureDetail.reason}
                  </Typography>
                );
                labelProps.error = true;
              }
            }
            return (
              <Step key={label.name} {...props}>
                <StepLabel {...labelProps}>
                  <Chip label={label.keyword} className={classes.chip} />
                  {label.name}
                </StepLabel>
                <StepContent active={true}>
                  <Typography>{label.line} 번째 줄</Typography>
                  <Typography>실행 시간: {label.duration} ms</Typography>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

export default withStyles(styles)(ScenarioDetail);
