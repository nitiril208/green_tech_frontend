
export interface MaturityLevelResponse {
    length: number;
    data?: (MaturityLevelResult)[];
    message: string;
    clientData: boolean;
}
export interface MaturityLevelResult {
    id: number;
    maturityLevelName: string;
    rangeStart: number;
    rangeEnd: number;
    color: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
export interface Headers {
    "content - length": string;
    "content - type": string;
}
export interface Config {
    transitional: Transitional;
    adapter?: (string)[] | null;
    transformRequest?: (null)[] | null;
    transformResponse?: (null)[] | null;
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: EnvOrRequest;
    headers: Headers1;
    baseURL: string;
    url: string;
    method: string;
    data: string;
}
export interface Transitional {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
}
export interface EnvOrRequest {
}
export interface Headers1 {
    Accept: string;
    "Content - Type": string;
}


export interface AllActionDataPillerWise {
    data?: (AllActionDataPillerWiseResult)[];
    message: string;
}
export interface AllActionDataPillerWiseResult {
    pillarid: number;
    checked: number;
    pillarname: string;
    totalquestionsattempted: number;
    totalquestionsavailable: string;
    totalmaxpoint: number;
    totalpoints: number;
    questiontitle: string;
    value: number;
    maturityLevelName: string;
    rangeStart: number;
    rangeEnd: number;
    maturityNameRecommended: string;
    filteredOptions: (FilteredOptionsEntity)[];
    actionItem: (ActionItemEntity)[];
}
export interface FilteredOptionsEntity {
    name: string;
    point: number;
    measures: string;
    optionId: string;
    percentage: number;
}
export interface ActionItemEntity {
    id: number;
    measure: string;
    startDate?: string | null;
    endDate?: string | null;
    evidence?: string | null;
    iscompleted: number;
    empAssignDate?: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    pillerId: PillerId;
}
export interface PillerId {
    id: number;
    pillarName: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
