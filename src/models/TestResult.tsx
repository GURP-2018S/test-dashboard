export interface ITestJobOverview {
    id: string;
    name: string;
    state: "finished" | "running" | "pending";
    success: boolean;

    queuedAt: string;
    scheduledAt?: string;
    startedAt?: string;
    finishedAt?: string;

    result: ITestJobResult;
}

export interface ITestJobResult {
    // Number of total tests
    numTotalTestSuites: number;
    numTotalTests: number;
    numFailedTestSuites: number;
    numFailedTests: number;
    numPassedTestSuites: number;
    numPassedTests: number;
    numPendingTestSuites: number;
    numPendingTests: number;
    numRuntimeErrorTestSuites: number;

    // Top-level Information
    success: boolean;
    wasInterrupted: boolean;
    startTime: number;

    // Result of Each Test Suite
    projectResults: IProjectResult[];
}

export interface IProjectResult {
    id: string;
    fileName: string; // "/workspace/test-environment/__test__/test2.test.js"
    success: boolean;

    startTime: number;
    endTime: number;

    suiteResults: ITestSuiteResult[];
}

export interface ITestSuiteResult {
    // Top-level Information
    name: string;
    status: "passed" | "failed";
    summary: string;

    // WHAT IS THIS?
    message: string;

    // Result of Each Test
    assertionResults: ITestResult[];

    // Time
    startTime: number;
    endTime: number;
}

export interface ITestResult {
    // Top-level Information
    title: string;
    ancestorTitles: string[]; // WHAT IS THIS?
    fullName: string; // WHAT IS THIS?
    status: "passed" | "failed";

    // WHAT IS THIS?
    failureMessages: string[];
    location: null | string;
    commands: ITestCommand[];
}

export interface ITestCommand {
    id: string;
    comment: string;
    command: string;
    target: string;
    value: string;
}
