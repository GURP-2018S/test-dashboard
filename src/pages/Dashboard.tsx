import * as React from "react";

import axios from "axios";

import Typography from "@material-ui/core/Typography/Typography";

import JobOverview, { IJobOverview } from "../components/JobOverview";

interface IState {
  jobList?: IJobOverview[];
}

async function getJobList() {
  const response = await axios.get<IJobOverview[]>(
    `${process.env.REACT_APP_URI}/jobs`
  );
  return response.data;
}

class Dashboard extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = { jobList: undefined };
  }

  public componentDidMount() {
    this.loadData();
  }

  public render() {
    const { jobList } = this.state;

    return (
      <>
        {jobList && jobList.length > 0 ? (
          jobList.map((element: IJobOverview, idx: number) => (
            <JobOverview key={idx} overviewData={element} />
          ))
        ) : (
          <Typography variant="display2" align="center">
            실행한 잡이 없습니다.
          </Typography>
        )}
      </>
    );
  }

  public loadData() {
    getJobList().then(value => this.setState({ jobList: value }));
  }
}

export default Dashboard;
