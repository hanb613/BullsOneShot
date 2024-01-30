import {
  ResponseCertIssueType,
  ResponseCertListType,
  ResponseCertType,
} from '@/types/certification/certification.type';
import { authHttp } from '@utils/http';

export async function getCertList(): Promise<ResponseCertListType> {
  return authHttp.post(`/cert/list`);
}

export async function getCertDetail(certId: number): Promise<ResponseCertType> {
  return authHttp.post(`/cert/get/${certId}`);
}

export async function issueCert(kind: string): Promise<ResponseCertIssueType> {
  return authHttp.post(`/cert/new`, { certName: kind });
}
