import * as React from "react";

// import Button from '@material-ui/core/Button';
import {StepContent} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import {Theme, WithStyles, withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import {ITestResult} from '../models/TestResult';

const styles = (theme: Theme) => ({
    root: {},
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
    scenarioData: ITestResult;
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

    public isAfterError = false;

    public render() {
        const {scenarioData, classes} = this.props;
        const {activeStep} = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation={"vertical"}>
                    {scenarioData.commands.map((label, index) => {
                        const props = {completed: true, last: false};
                        const labelProps: ILabel = {error: false};
                        if (scenarioData.failureMessages) {
                            const errorLocation = scenarioData.location;
                            if (label.id !== errorLocation) {
                                props.completed = !this.isAfterError;
                                props.last = index === scenarioData.commands.length;
                            } else if (label.id === errorLocation) {
                                labelProps.optional = (
                                    <Typography variant="caption" color="error">
                                        테스트 실패 <br/>
                                        {scenarioData.failureMessages.join("\n").split(" at ")[0]}
                                    </Typography>
                                );
                                labelProps.error = true;
                                this.isAfterError = true;
                            }
                        }
                        return (
                            <Step key={label.id} {...props}>
                                <StepLabel {...labelProps}>
                                    <Chip label={label.command} className={classes.chip}/>
                                    {label.comment}
                                </StepLabel>
                                <StepContent active={true}>
                                    <Typography>{`타겟: ${label.target}`}</Typography>
                                    <Typography>{`밸류: ${label.value}`}</Typography>
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
