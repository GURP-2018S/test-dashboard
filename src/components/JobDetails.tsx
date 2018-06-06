import * as React from "react";

import {Theme, withStyles, WithStyles} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";

import Done from "@material-ui/icons/Done";
import Error from "@material-ui/icons/Error";

import ScenarioCard from "./ScenarioCard";
import ScenarioDetail from "./ScenarioDetail";

import {ITestJobResult} from "../models/TestResult";

function TabContainer(props: any) {
    return (
        <Typography component="div" style={{
            padding: "3vh 10vw",
            display: "flex", flexWrap: "nowrap", overflow: "auto"
        }}>
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
    menu: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

interface IProps extends WithStyles<"root" | "marginPage" | 'marginBar' | "menu"> {
    detailData: ITestJobResult;
}

interface IState {
    anchorEl?: HTMLElement;
    selectedIndex: number;
    value: number;
}

class JobDetails extends React.Component<IProps, IState> {
    public state = {
        anchorEl: undefined,
        selectedIndex: 1,
        value: 0
    };
    public handleChange = (event: any, value: number) => {
        this.setState({value});
    };
    public handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({anchorEl: event.currentTarget});
    };
    public handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        this.setState({selectedIndex: index, anchorEl: undefined});
    };
    public handleMenuItemClickCurried = (index: number) => (event: React.MouseEvent<HTMLElement>) => {
        this.setState({selectedIndex: index, anchorEl: undefined});
    };
    public handleClose = () => {
        this.setState({anchorEl: undefined});
    };

    public render() {
        const {detailData, classes} = this.props;
        const {value, anchorEl, selectedIndex} = this.state;
        const projectResults = detailData.projectResults;
        const suiteOptions = projectResults.map((element) => {
            const fileName = element.fileName.split("/").pop();
            if (fileName) {
                return fileName.split(".")[0]
            }
            return ""
        });
        const suiteResults = projectResults.map((element) => element.suiteResults);
        const currentProjectResult = projectResults[selectedIndex];
        const currentSuiteResults = suiteResults[selectedIndex];

        return (
            <>
                <div className={classes.root}>
                    <div style={{display: 'flex'}}>
                        <div className={classes.menu}>
                            <List component="nav">
                                <ListItem
                                    button={true}
                                    aria-haspopup="true"
                                    aria-controls="lock-menu"
                                    aria-label="When device is locked"
                                    onClick={this.handleClickListItem}
                                >
                                    <ListItemText
                                        primary="테스트 잡"
                                        secondary={suiteOptions[this.state.selectedIndex]}
                                    />
                                </ListItem>
                            </List>
                            <Menu
                                id="lock-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                {suiteOptions.map((option, index) => (
                                    <MenuItem
                                        key={option}
                                        selected={index === this.state.selectedIndex}
                                        onClick={this.handleMenuItemClickCurried(index)}
                                    >
                                        <Done/> {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                        <Typography variant={"subheading"}>
                            {`성공: ${currentProjectResult.success},
                            시작시간: ${new Date(currentProjectResult.startTime)},
                            종료시간: ${new Date(currentProjectResult.endTime)},
                            전체 테스트 수: ${currentProjectResult.suiteResults.length}`}
                        </Typography>
                    </div>
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
                            {currentSuiteResults ? (
                                currentSuiteResults.map((element, index) => (
                                    <Tab
                                        key={index}
                                        label={element.name}
                                        icon={element.status === "passed" ? <Done/> : <Error color="error"/>}
                                    />
                                ))
                            ) : (
                                <Tab label={"No Features"} icon={<Error color="error"/>}/>
                            )}
                        </Tabs>
                    </AppBar>
                    {currentSuiteResults ? (
                        currentSuiteResults.map(
                            (element, index) =>
                                value === index && (
                                    <TabContainer key={index}>
                                        {element.assertionResults.map((e, i) => (
                                            <ScenarioCard
                                                key={e.title}
                                                title={`시나리오 ${i + 1}: ${e.title}`}
                                                content={<ScenarioDetail scenarioData={e}/>}
                                            />
                                        ))}
                                        <div
                                            style={{color: "white"}}>__________________{/* make cell for right space */}</div>
                                    </TabContainer>
                                )
                        )
                    ) : (
                        <TabContainer> No Features </TabContainer>
                    )}
                </div>
            </>
        );
    }
}

export default withStyles(styles)(JobDetails);
