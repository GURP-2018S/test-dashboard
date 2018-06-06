import * as React from "react";

import axios, {AxiosResponse} from "axios";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {Theme, WithStyles, withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';


import JobOverview from "../components/JobOverview";
import PopUp from "../components/PopUp";
import {ITestJobOverview} from "../models/TestResult";

interface IProps
    extends WithStyles<"button" | "container" | "formControl"> {
}

interface IState {
    jobList?: ITestJobOverview[];
    scheduled: boolean;

    notice: boolean;
    recentMessage?: string;

    isScheduling: boolean;
    time: string;
}

const styles = (theme: Theme) => ({
    button: {
        margin: theme.spacing.unit,
        position: "absolute" as "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: '100%',
    },
});

async function getJobList() {
    const response = await axios.get<ITestJobOverview[]>(
        `${process.env.REACT_APP_URI}/jobs`
    );
    return response.data;
}

class Dashboard extends React.Component<IProps, IState> {

    private static async scheduleTestJob() {
        console.log("RunTest");
        return await axios.post(`${process.env.REACT_BACKEND_URI || "http://localhost:3000"}/jobs`,
            {"processor": "jest", "when": "now"}
        )
    }

    private static async cancelTestJob(id: string) {
        console.log("CancelTest");
        return await axios.delete(`${process.env.REACT_BACKEND_URI || "http://localhost:3000"}/jobs/${id}`)
    }


    constructor(props: IProps) {
        super(props);
        this.state = {
            jobList: undefined,
            isScheduling: false,
            scheduled: false,
            notice: false,
            recentMessage: undefined,
            time: "now",
        };
        this.loadData = this.loadData.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSchedule = this.handleSchedule.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleJobCancel = this.handleJobCancel.bind(this);
        this.handlePopUpClose = this.handlePopUpClose.bind(this);
    }

    public componentDidMount() {
        this.loadData();
    }

    public render() {
        const {jobList} = this.state;
        const {classes} = this.props;

        return (
            <>
                {jobList && jobList.length > 0 ? (
                    jobList.map((element: ITestJobOverview, idx: number) => (
                        <JobOverview key={idx} overviewData={element} recent={idx === 0} onJobCancel={this.handleJobCancel}/>
                    ))
                ) : (
                    <Typography variant="display2" align="center">
                        실행한 잡이 없습니다.
                    </Typography>
                )}
                <Tooltip id="tooltip-fab" title="테스트 실행">
                    <Button variant="fab" color="primary" aria-label="add" disabled={this.state.isScheduling}
                            className={classes.button}>
                        <PlayArrowIcon onClick={this.handleSelect}/>
                    </Button>
                </Tooltip>
                {/* Job Scheduler */}
                <Dialog
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    open={this.state.isScheduling}
                    onClose={this.handleCancel}
                >
                    <DialogTitle>새로운 잡을 실행할 시간을 정해주세요</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="time-native-simple">시간</InputLabel>
                                <Select
                                    native={true}
                                    value={this.state.time}
                                    onChange={this.handleChange}
                                    input={<Input id="time-native-simple"/>}
                                >
                                    <option value={"now"}>지금</option>
                                    {/*<option value={"5 minutes after"}>5분 뒤</option>*/}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSchedule} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <PopUp open={this.state.notice} message={this.state.recentMessage} onClose={this.handlePopUpClose}/>
            </>
        )
    }

    public loadData() {
        getJobList().then(value => {
            this.setState({
                jobList: value.sort((a, b) => {
                    if (a.startedAt === b.startedAt) {
                        return 0
                    }
                    else if (a.startedAt === undefined) {
                        return 1
                    }
                    else if (b.startedAt === undefined) {
                        return -1
                    }
                    return (new Date(a.startedAt) >= new Date(b.startedAt)) ? -1 : 1
                })
            })
        });
    }

    public handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target !== null) {
            this.setState({time: event.target.value});
        }
    };
    public handleCancel = () => {
        this.setState({isScheduling: false});
    };
    public handleSelect = () => {
        this.setState({isScheduling: true});
    };
    public handleSchedule = () =>
        Dashboard.scheduleTestJob().then((response: AxiosResponse) => {
            this.setState({isScheduling: false, notice: true, recentMessage: `잡 ${response.data.id} 가 예약 되었습니다.`});
            this.loadData();
        });
    public handleJobCancel = (id: string) =>
        Dashboard.cancelTestJob(id).then((_: AxiosResponse) => {
            this.setState({notice: true, recentMessage: `잡 ${id} 가 취소 되었습니다.`});
            this.loadData();
        });
    public handlePopUpClose = () => {
        this.setState({notice: false});
    };
}

export default withStyles(styles)(Dashboard);
