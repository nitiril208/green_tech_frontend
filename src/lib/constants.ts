import AssesmentIcon from "@/assets/images/assesment.svg";
import PdfIcon from "@/assets/images/pdfIcon.svg";
import document_Option_1 from "@/assets/images/upload_option_1.png";
import document_Option_2 from "@/assets/images/upload_option_2.png";
import document_Option_4 from "@/assets/images/upload_option_4.png";
import document_Option_6 from "@/assets/images/upload_option_6.png";
import VideoICon from "@/assets/images/videoIcon.svg";
import assesmentTest from "@/assets/svgs/assesmentTest.svg";
// QUERY KEYS
export const QUERY_KEYS = {
  pillarList: "pillar_list",
  courseSlider: "course_slider",
  trainerList: "trainer_list",
  bannerSlider: "banner_slider",
  questionList: "question_list",
  companyList: "company_list",
  oneCompany: "one_company",
  assessment: "assessment",
  totalAssessment: "total_assessment",
  clientwiseBannerSlider: "clientwise_banner_slider",
  clientwiseCourseSlider: "clientwise_course_slider",
  fetchDataByClientwise: "fetch_data_by_clientwise",
  clientwisePillarList: "clientwise_pillar_list",
  getQuestionAnswer: "get_question_answer",
  maturityLevel: "maturity_level",
  fetchbyclientMaturity: "fetch_by_client_maturity",
  maturitypillar: "maturity_pillar",
  filterMaturityMeasures: "filter_maturity_measures",
  measuresItems: "measures_items",
  updatePillar: "update_pillar",
  checkedMeasures: "checked_measures",
  themeChanges: "theme_Changes",
  fetchbycourse: "course",
  authenums: "authenums",
  enumUpadateList: "enum_upadate_list",
  fetchbyallcourse: "allcourse",
  fetchbycourseallocate: "allocatedcourse",
  fetchbyrecommendedcourse: "recommendedcourses",
  fetchbypillarcource: "fetchbypillarcource",
  fetchbypillar: "fetchbypillar",
  fetchEnrollmentRequestBytrainer: "fetch_enrollment_request_by_trainer",
  fetchAllCourse: "fetchAllCourse",
  companyDetailsId: "companyDetailsById",
  fetchbycourseallocateById: "fetchbycourseallocateById",
  chatUserList: "chatUserList",
  chatList: "chatList",
  clientList: "clientList",
  emailTemplate: "emailTemplate",
  companyOrTrainerCompany: "companyOrTrainerCompany",
  supportTicketList: "support_ticket_list",
  fetchSupportTicketCompany: "fetch_support_ticket_company",
  supportTicketCount: "support_ticket_count",
  fetchAllCourseModule: "fetchAllCourseModule",
  faqsList: "faqsList",
  getSingleSupportTicket: "getSingleSupportTicket",
  courseTopFive: "courseTopFive",
  AssignTo: "AssignTo",
  fetchDocument: "fetchDocument",
  getSingleCourse: "getSingleCourse",
  selectTargetPillarLimit: "selectTargetPillarLimit",
  pillarMaturity: "pillarMaturity",
  getCohortsByCourse: "getCohortsByCourse",
  MemberList: "MemberList",
  enrolledCourses: "enrolled_courses",
  getActionItems: "getActionItems",
  itemHistory: "itemHistory",
  getEmployeeList: "getEmployeeList",
  employeeDetails: "employeeDetails",
  userDetails: "userDetails",
  getTargetUserby: "getTargetUserby",
  deleteMeasuresItems: "deleteMeasuresItems",
  assessmentQuestionScore: "assessmentQuestionScore",
  getEmployeeProgress: "getEmployeeProgress",
  fetchCourseDiscountEnroll: "fetchCourseDiscountEnroll",
  notificationList: "notificationList",
  notificationCount: "notificationCount",
  notification: "notification",
  assessmentOptions: "assessmentOptions",
  getcertificate: "certificate",
  certificateDetail: "certificateDetail",
  getEmployeeWiseAcion: "getEmployeeWiseAcion",
  fetchModuleSection: "fetchModuleSection",
  fetchTraineeCompany: "fetchTraineeCompany",
  fetchTrainee: "fetchTrainee",
  myCourses: "myCourses",
  courseByVersionList: "courseByVersionList",
  getcertifications: "getcertifications",
  createLiveSessions: "createLiveSessions",
  fetchLiveSession: "fetchLiveSession",
  getUserManual: "getUserManual",
  issuedCertificate: "issuedCertificate",
  allLiveSession: "allLiveSession",
  fetchLiveSessionById: "fetchLiveSessionById",
  getdashboardEmployeeCourse: "getdashboardEmployeeCourse",
  getAssesmentById: "getAssesmentById",
  getInstitutions: "getInstitutions",
  fetchgetCoursesNameList: "fetchgetCoursesNameList",
  fetchAssigToUserList: "fetchAssigToUserList",
  fetchforumquestion: "fetchforumquestion",
  fetchfaqquestion: "fetchfaqquestion",
  fetchEmployeeByCourse: "fetchEmployeeByCourse",
  feedback: "feedback",
  checkedMeasuresbyAssessment: "checkedMeasuresbyAssessment",
  fetchEvalute: "fetchEvalute",
  getAssessmentQuestion: "getAssessmentQuestion",
  fetchEmployeeSingeCourse: "fetchEmployeeSingeCourse",
  getAssessmentSingleQuestion: "getAssessmentSingleQuestion",
  getAssessmentScore: "getAssessmentScore",
  fetchModuleForumQuestion: "fetchModuleForumQuestion",
  fetchEnrollmentAcceptedFilter: "fetchEnrollmentAcceptedFilter",
  fetchAgeRanges: "fetchAgeRanges",
  fetchEmploymentStatus: "fetchEmploymentStatus",
  fetchOccupationalCategories: "fetchOccupationalCategories",
  fetchUnemploymentTime: "fetchUnemploymentTime",
  fetchProviderTypes: "fetchProviderTypes",
  fetchGroupChat: "fetchGroupChat",
  coursePublishAdminClient: "coursePublishAdminClient",
  getenrolledcourse: "getenrolledcourse",
  fetchTrainerByEmailType: "fetchTrainerByEmailType",
  topCourses: "topCourses",
  courseCompletion: "courseCompletion",
};

export const urlRegex =
  "/((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,w]+@)[A-Za-z0-9.-]+)((?:/[+~%/.w-_]*)???(?:[-+=&;%@.w_]*)#?(?:[w]*))?)/";

export const youtubeRegex =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

export const FileType = {
  Document: {
    name: "Document",
    fileType: ["docx", "doc"],
    fileTypeText: ".docx,.doc",
    image: document_Option_1,
    enum: 1,
    listIcon: AssesmentIcon,
  },
  Excel: {
    name: "Excel",
    fileType: ["xlsx", "xml"],
    fileTypeText: ".xlsx,.xml",
    image: document_Option_2,
    enum: 2,
    listIcon: AssesmentIcon,
  },
  Pdf: {
    name: "Pdf",
    fileType: ["pdf"],
    fileTypeText: ".pdf",
    image: document_Option_4,
    enum: 3,
    listIcon: PdfIcon,
  },
  Video: {
    name: "Video",
    fileType: ["mp4"],
    fileTypeText: ".mp4",
    image: document_Option_6,
    enum: 4,
    listIcon: VideoICon,
  },
  Live: {
    name: "Live",
    fileType: ["live"],
    fileTypeText: "live",
    image: document_Option_6,
    enum: 5,
    listIcon: VideoICon,
  },
  AssessmentTest: {
    name: "AssesmentTest",
    fileType: ["test"],
    fileTypeText: "test",
    image: assesmentTest,
    enum: 6,
    listIcon: assesmentTest,
  },
};

export const sectorOption = [
  {
    label: "Agriculture",
    value: "Agriculture",
  },
  {
    label: "Business",
    value: "Business",
  },
  {
    label: "Construction",
    value: "Construction",
  },
  {
    label: "Engineering",
    value: "Engineering",
  },
  {
    label: "Environmental Goods & Services",
    value: "Environmental Goods & Services",
  },
  {
    label: "Food & Drink",
    value: "Food & Drink",
  },
  {
    label: "Green Technology",
    value: "Green Technology",
  },
  {
    label: "Health",
    value: "Health",
  },
  {
    label: "ICT Manufacturing & Services",
    value: "ICT Manufacturing & Services",
  },
  {
    label: "Financial Services",
    value: "Financial Services",
  },
  {
    label: "Life Sciences",
    value: "Life Sciences",
  },
  {
    label: "Manufacturing",
    value: "Manufacturing",
  },
  {
    label: "Media/Audiovisual",
    value: "Media/Audiovisual",
  },
  {
    label: "Mixed",
    value: "Mixed",
  },
  {
    label: "Pharmaceutical",
    value: "Pharmaceutical",
  },
  {
    label: "Retail",
    value: "Retail",
  },
  {
    label: "Services",
    value: "Services",
  },
  {
    label: "Technology",
    value: "Technology",
  },
  {
    label: "Tourism & Travel",
    value: "Tourism & Travel",
  },
  {
    label: "Transportation",
    value: "Transportation",
  },
  {
    label: "Visual Arts",
    value: "Visual Arts",
  },
  {
    label: "Wholesale Trade",
    value: "Wholesale Trade",
  },
  {
    label: "Aviation",
    value: "Aviation",
  },
  {
    label: "Homemaker",
    value: "Homemaker",
  },
  {
    label: "Legal",
    value: "Legal",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export const employeeOption = [
  {
    label: "0 - 9",
    value: "0 - 9",
  },
  {
    label: "10 - 49",
    value: "10 - 49",
  },
  {
    label: "50 - 250",
    value: "50 - 250",
  },
  {
    label: "250+",
    value: "250+",
  },
];
