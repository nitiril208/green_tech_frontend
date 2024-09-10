
export interface AssesmentDashboardData {
    data: AssesmentDashboardResponse;
    message: string;
}
export interface AssesmentDashboardResponse {
    avTotalquestionsattempted: number;
    avTotalquestionsavailable: number;
    avTotalmaxpoint: number;
    avTotalpoints: number;
}


export interface DashboardData {
    data: DashboardDataResponse;
    message: string;
}
export interface DashboardDataResponse {
    lastAssessmentTakenOn: string;
    totalActionItems: TotalActionItems;
    pendingActionItems: number;
    supportTickets: SupportTickets;
    upcomingCourses: number;
    upcomingCoursesList: (Course)[];
}
export interface TotalActionItems {
    metric: number;
    report: Report;
}
export interface Report {
    completed: number;
    open: number;
    delayed: number;
}
export interface SupportTickets {
    open: OpenOrResolved;
    resolved: OpenOrResolved;
}
export interface OpenOrResolved {
    high: number;
    medium: number;
    low: number;
}

export interface SMEDashboard3Response {
    data: Data;
    message: string;
}
export interface Data {
    overView: OverView;
    courses?: (null)[] | null;
    employeePerformanceOverview: EmployeePerformanceOverview;
}
export interface OverView {
    totalCourse: number;
    completedCourse: number;
    onGoingCourse: number;
}
export interface EmployeePerformanceOverview {
    totalCourse: number;
    coursesCompletion?: null;
}

export interface EmployeeDashboardResponse {
    sessions: (SessionsEntity)[];
    upcomingSessionsCount: number;
}
export interface SessionsEntity {
    id: number;
    platform: number;
    zoomApiBaseUrl: string;
    subtitle: string;
    description: string;
    date: string;
    startTime: string;
    startAmPm?: null;
    sessionDuration: number;
    position?: null;
    liveSecinformation: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    course: Course;
}

export interface SMEEnrollDashboardResponse {
    data: (DataEntity)[];
    message: string;
}
export interface DataEntity {
    month: string;
    enrollmentsCount: number;
}

export interface TraineeEnrollDashboardResponse {
    trainerCourseCount: number;
    trainerEnrollCourse?: (TrainerEnrollCourseEntityOrTrainerUpcommingCourseEntity)[] | null;
    trainerEnrollCourseCount: number;
    trainerUpcommingCourse?: (TrainerEnrollCourseEntityOrTrainerUpcommingCourseEntity)[] | null;
    trainerUpcommingCourseCount: number;
    forumQuestion?: (ForumQuestionEntity)[] | null;
    forumQuestionCount: number;
    UpcomingSessions: (SessionsEntity)[] | null;
    upcomingSessionsCount: number;
    message: string;
    discussionForumActivity: {
        activeUsers: number,
        posts: number,
        replies: number
    }
}
export interface TrainerEnrollCourseEntityOrTrainerUpcommingCourseEntity {
    id: number;
    title: string;
    institute: string;
    instituteWebsite: string;
    instituteWebsite2?: string | null;
    freeCourse: number;
    discout: number;
    discountApplicable?: number | null;
    provider: number;
    ectsCredits?: string | null;
    fetCredits?: string | null;
    certificate?: string | null;
    time: number;
    isOnline: number;
    universityAddress?: string | null;
    duration?: string | null;
    price?: number | null;
    instituteOther?: string | null;
    otherInstitutionName?: string | null;
    description?: string | null;
    bannerImage?: string | null;
    keys?: string | null;
    courseData?: (CourseDataEntity | null)[] | null;
    status: string;
    publishDate?: string | null;
    step: string;
    tab: string;
    creationCompleted: boolean;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    courseEnroll?: (null)[] | null;
    moduleLiveSection?: (ModuleLiveSectionEntity | null)[] | null;
    module?: (ModuleEntity | null)[] | null;
}
export interface CourseDataEntity {
    pillarId: number;
    maturityId: number;
}
export interface ModuleLiveSectionEntity {
    id: number;
    platform: number;
    zoomApiBaseUrl: string;
    subtitle: string;
    description: string;
    date?: string | null;
    startTime: string;
    startAmPm?: null;
    sessionDuration: number;
    position?: null;
    liveSecinformation: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
export interface ModuleEntity {
    id: number;
    title: string;
    position: number;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    moduleSection?: (ModuleSectionEntity)[] | null;
}
export interface ModuleSectionEntity {
    id: number;
    title: string;
    information: string;
    documentType?: number | null;
    url?: string | null;
    uploadContent?: string | null;
    attachment?: string | null;
    duration?: null;
    formate?: null;
    position: number;
    readingTime?: ReadingTime | null;
    isLive: number;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    completedEmployee?: (null)[] | null;
    progressEmployee?: (null)[] | null;
}
export interface ReadingTime {
    hour: number;
    minute: number;
    second: number;
}
export interface ForumQuestionEntity {
    id: number;
    question: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    comments?: (null)[] | null;
    like?: (null)[] | null;
    unlike?: (null)[] | null;
}
export interface SessionsEntity {
    id: number;
    platform: number;
    zoomApiBaseUrl: string;
    subtitle: string;
    description: string;
    date: string;
    startTime: string;
    startAmPm?: null;
    sessionDuration: number;
    position?: null;
    liveSecinformation: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}


export interface TrainerEnrollDashboardResponse {
    data: Data;
    message: string;
}
export interface Data {
    publishedCoursesCount: number;
    trainingProviderEnrollmentRequests: number;
    enrollmentsRequestsFigures?: (EnrollmentsRequestsFiguresEntity)[] | null;
    pendingEnrollmentRequestsCount: number;
    trainersCount: number;
    trainerCompanyFeedbacksCount: number;
    courseFeedbacksCount: number;
    courseContentApprovalRequest: number;
    supportTicketsCount: SupportTicketsCount;
    approvedEnrollmentRequests: number;
}
export interface EnrollmentsRequestsFiguresEntity {
    course: Course;
    enrolledCompanies?: (CompanyOrEnrolledCompaniesEntity)[] | null;
}
export interface Course {
    id: number;
    title: string;
    institute: string;
    instituteWebsite: string;
    instituteWebsite2: string;
    freeCourse: number;
    discout: number;
    discountApplicable: number;
    provider: number;
    ectsCredits: string;
    fetCredits: string;
    certificate?: string | null;
    time: number;
    isOnline: number;
    universityAddress: string;
    duration: string;
    price: number;
    instituteOther: string;
    otherInstitutionName?: string | null;
    description: string;
    bannerImage: string;
    keys: string;
    courseData?: (CourseDataEntity)[] | null;
    status: string;
    publishDate: string;
    step: string;
    tab: string;
    creationCompleted: boolean;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    courseEnroll?: (CourseEnrollEntity)[] | null;
}
export interface CourseDataEntity {
    pillarId: number;
    maturityId: number;
}
export interface CourseEnrollEntity {
    id: number;
    numberOfEmployee: string;
    price: number;
    request: number;
    isdiscounted: number;
    enroll: number;
    createdAt: string;
    deletedAt?: string | null;
    updatedAt: string;
    company: CompanyOrEnrolledCompaniesEntity;
}
export interface CompanyOrEnrolledCompaniesEntity {
    id: number;
    companyId?: string | null;
    name: string;
    address?: string | null;
    county?: string | null;
    soleTrader?: boolean | null;
    sector?: string | null;
    averageNumberOfEmployees?: string | null;
    parentCompanyName?: string | null;
    parentCompanyAddress?: string | null;
    parentCompanyCounty?: null;
    note?: null;
    status: string;
    profileImage?: null;
    maxEmployeeLimit: number;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
}
export interface SupportTicketsCount {
    open: OpenOrResolved;
    resolved: OpenOrResolved;
}
export interface OpenOrResolved {
    high: number;
    medium: number;
    low: number;
}
