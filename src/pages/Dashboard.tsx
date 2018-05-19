import * as React from 'react';

import JobOverview from '../components/JobOverview';

const dummy = {
    id: "1234",
    name: "UI 시나리오 테스트", // Job name (ex. ui test)
    description: "여기는 세부설명 항목입니다. 여기는 세부설명 항목입니다. 여기는 세부설명 항목입니다. 여기는 세부설명 항목입니다. 여기는 세부설명 항목입니다.",
    state: "finished" as "finished",
    success: true,
    queuedAt: "오늘 오전 1시 34분",
    scheduledAt: "오늘 오전 1시 34분",
    startedAt: "오늘 오전 1시 36분",
    finishedAt: "오늘 오전 1시 37분"
};

const Dashboard = () => {

    const testList = [dummy, dummy, dummy];

    return (
        <>
            {testList.map((element, idx) =>
                <JobOverview key={idx} overviewData={element}/>
            )}
        </>
    );
};

export default Dashboard;