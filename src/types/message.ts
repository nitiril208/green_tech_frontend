export interface EmailTemplateType {
  id: number;
  name: string;
  message: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  target_audience: TargetAudience;
}
export interface TargetAudience {
  id: number;
  name: string;
}
export interface MaturityLevelOneResponse {
  data?: (MaturityLevelOneResult)[] | null;
  message: string;
}
export interface MaturityLevelOneResult {
  pillarid: number;
  pillarname: string;
  totalquestionsattempted: string;
  totalquestionsavailable: string;
  totalmaxpoint: string;
  totalpoints: string;
  questiontitle: string;
  maturity: string;
  maturityNameRecommended: string;
  filteredOptions?: (FilteredOptionsEntity)[] | null;
  actionItem?: (ActionItemEntity)[] | null;
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
  startDate: string;
  endDate: string;
  evidence?: null;
  iscompleted: number;
  empAssignDate?: null;
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
export interface FetchAllMessageType {
  data?: (MessageDataEntity)[] | null;
}
export interface MessageDataEntity {
  id: number;
  name: string;
  email: string;
  count: number;
  last_msg: string;
  last_msg_time: string;
  image: string;
  role: number;
  isOnline: boolean;
}


