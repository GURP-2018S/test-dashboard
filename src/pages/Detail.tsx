import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import axios from "axios";

import Typography from "@material-ui/core/Typography/Typography";

import JobDetails from "../components/JobDetails";
import {ITestJobOverview} from "../models/TestResult";

interface IProps extends RouteComponentProps<{ jobID: string }, {}> {}

interface IState {
  detailData?: ITestJobOverview;
  loading: boolean;
}

async function getJobDetail(jobID: string) {
  const response = await axios.get<ITestJobOverview>(
    `${process.env.REACT_APP_URI}/jobs/${jobID}`
  );
  return response.data;
}

class Detail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { detailData: undefined, loading: true };
  }

  public componentDidMount() {
    const { match } = this.props;
    const jobID = match.params.jobID || "";
    this.loadData(jobID);
  }

  public render() {
    const { detailData, loading } = this.state;
    const jobID: string | undefined = this.props.match.params.jobID;

    return (
      <>
        {detailData ? (
          <JobDetails detailData={detailData.result}/>
        ) : (
          <Typography variant="display2" align="center">
            {jobID
              ? loading
                ? "로딩 중 입니다."
                : `해당하는 ID (${jobID}) 의 잡이 없습니다.`
              : "잡 ID를 입력해주세요."}
          </Typography>
        )}
      </>
    );
  }

  public loadData(jobID: string) {
    getJobDetail(jobID).then(value => this.setState({ detailData: value }));
  }
}

export default Detail;
