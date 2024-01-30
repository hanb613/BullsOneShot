import { ResponseErrorType } from '../common/common.type';

export type CertificationType = {
  certId?: string;
  certName?: string;
  certContent?: string;
  getTime?: string;
  trainingHour?: number;
  userId?: string;
};

export type ResponseCertListType = {
  success: boolean;
  response: CertificationType[];
  error: ResponseErrorType;
};

export type ResponseCertType = {
  success: boolean;
  response: CertificationType;
  error: ResponseErrorType;
};

export type ResponseCertIssueType = {
  success: boolean;
  response: string;
  error: ResponseErrorType;
};
