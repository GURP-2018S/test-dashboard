import * as React from 'react';
import {RouteComponentProps} from "react-router";

import JobDetails from "../components/JobDetails";

interface IProps {
    job_id: string;
}

const dummy = {
    id: "1234",
    name: "UI 시나리오 테스트", // Job name (ex. ui test)
    description: "여기는 세부설명 항목입니다. 여기는 세부설명 항목입니다. 여기는 세부설명 항목입니다. 여기는 세부설명 항목입니다. 여기는 세부설명 항목입니다.",
    state: "finished" as "finished",
    success: true,
    queuedAt: "오늘 오전 1시 34분",
    scheduledAt: "오늘 오전 1시 34분",
    startedAt: "오늘 오전 1시 36분",
    finishedAt: "오늘 오전 1시 37분",
    result: [
        {
            success: false,
            name: "네이버에 접속해 네이버를 검색하기",
            result: [
                {
                    name: "네이버 검색하기",
                    description: "",
                    success: false,
                    steps: [
                        {
                            keyword: "Given",
                            name: "네이버 검색하기",
                            line: 0,
                            duration: 0.12
                        },
                        {
                            keyword: "When",
                            name: "네이버 검색하기2",
                            line: 1,
                            duration: 2.34
                        },
                        {
                            keyword: "And",
                            name: "네이버 검색하기3",
                            line: 2,
                            duration: 2.34
                        },
                        {
                            keyword: "Then",
                            name: "네이버 검색하기3",
                            line: 3,
                            duration: 0
                        }
                    ],
                    failureDetail: {
                        index: 2,
                        reason: "Message: no such element: Unable to locate element: {\"method\":\"css selector\",\"selector\":\"#query\"}\n  (Session info: chrome=66.0.3359.170)\n  (Driver info: chromedriver=2.38.552522 (437e6fbedfa8762dec75e2c5b3ddb86763dc9dcb),platform=Linux 4.9.87-linuxkit-aufs x86_64)\n"
                    }
                },
                {
                    name: "naver 검색하기",
                    description: "",
                    success: true,
                    steps: [
                        {
                            keyword: "Given",
                            name: "네이버 검색하기",
                            line: 0,
                            duration: 0
                        }
                    ],
                    failureDetail: {
                        step: "Given 검색창에 아래 검색어를 입력",
                        index: 2,
                        reason: "Message: no such element: Unable to locate element: {\"method\":\"css selector\",\"selector\":\"#query\"}\n  (Session info: chrome=66.0.3359.170)\n  (Driver info: chromedriver=2.38.552522 (437e6fbedfa8762dec75e2c5b3ddb86763dc9dcb),platform=Linux 4.9.87-linuxkit-aufs x86_64)\n"
                    }
                }
            ]
        },
        {
            success: true,
            name: "네이버에 접속해 네이버를 검색하기",
            result: [
                {
                    name: "네이버 검색하기",
                    description: "",
                    success: true,
                    steps: [
                        {
                            keyword: "Given",
                            name: "네이버 검색하기",
                            line: 0,
                            duration: 0.12
                        },
                        {
                            keyword: "When",
                            name: "네이버 검색하기2",
                            line: 1,
                            duration: 2.34
                        },
                        {
                            keyword: "And",
                            name: "네이버 검색하기3",
                            line: 2,
                            duration: 2.34
                        },
                        {
                            keyword: "Then",
                            name: "네이버 검색하기3",
                            line: 3,
                            duration: 0
                        }
                    ]
                },
                {
                    name: "naver 검색하기",
                    description: "",
                    success: true,
                    steps: [
                        {
                            keyword: "Given",
                            name: "네이버 검색하기",
                            line: 0,
                            duration: 0
                        }
                    ],
                    failureDetail: {
                        step: "Given 검색창에 아래 검색어를 입력",
                        index: 2,
                        reason: "Message: no such element: Unable to locate element: {\"method\":\"css selector\",\"selector\":\"#query\"}\n  (Session info: chrome=66.0.3359.170)\n  (Driver info: chromedriver=2.38.552522 (437e6fbedfa8762dec75e2c5b3ddb86763dc9dcb),platform=Linux 4.9.87-linuxkit-aufs x86_64)\n"
                    }
                }
            ]
        },
        {
            success: false,
            name: "네이버에 접속해 네이버를 검색하기",
            result: [
                {
                    name: "네이버 검색하기",
                    description: "",
                    success: false,
                    steps: [
                        {
                            keyword: "Given",
                            name: "네이버 검색하기",
                            line: 0,
                            duration: 0.12
                        },
                        {
                            keyword: "When",
                            name: "네이버 검색하기2",
                            line: 1,
                            duration: 2.34
                        },
                        {
                            keyword: "And",
                            name: "네이버 검색하기3",
                            line: 2,
                            duration: 2.34
                        },
                        {
                            keyword: "Then",
                            name: "네이버 검색하기3",
                            line: 3,
                            duration: 0
                        }
                    ],
                    failureDetail: {
                        index: 2,
                        reason: "Message: no such element: Unable to locate element: {\"method\":\"css selector\",\"selector\":\"#query\"}\n  (Session info: chrome=66.0.3359.170)\n  (Driver info: chromedriver=2.38.552522 (437e6fbedfa8762dec75e2c5b3ddb86763dc9dcb),platform=Linux 4.9.87-linuxkit-aufs x86_64)\n"
                    }
                },
                {
                    name: "naver 검색하기",
                    description: "",
                    success: true,
                    steps: [
                        {
                            keyword: "Given",
                            name: "네이버 검색하기",
                            line: 0,
                            duration: 0
                        }
                    ],
                    failureDetail: {
                        step: "Given 검색창에 아래 검색어를 입력",
                        index: 2,
                        reason: "Message: no such element: Unable to locate element: {\"method\":\"css selector\",\"selector\":\"#query\"}\n  (Session info: chrome=66.0.3359.170)\n  (Driver info: chromedriver=2.38.552522 (437e6fbedfa8762dec75e2c5b3ddb86763dc9dcb),platform=Linux 4.9.87-linuxkit-aufs x86_64)\n"
                    }
                }
            ]
        }
    ]
};

const Detail = ({match}: RouteComponentProps<IProps>) => {
    return (
        <JobDetails detailData={dummy}/>
    );
};

export default Detail;