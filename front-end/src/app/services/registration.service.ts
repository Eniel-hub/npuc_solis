import { ServerIP } from './../../../config';
import { ServerPORT } from './../../../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private gcrUrl = `http://${ServerIP}:${ServerPORT}/registration/get`;
  private gnrUrl = `http://${ServerIP}:${ServerPORT}/registration/getnext`;
  private snrUrl = `http://${ServerIP}:${ServerPORT}/registration/setnext`;
  private chkUrl = `http://${ServerIP}:${ServerPORT}/registration/check`;
  private rmvUrl = `http://${ServerIP}:${ServerPORT}/registration/rmv`;

  constructor(private httpClient: HttpClient) {}

  getCurrentRegistration() {
    return this.httpClient.get(this.gcrUrl, { withCredentials: true });
  }

  getNextRegistration(gradeID: number) {
    return this.httpClient.get(`${this.gnrUrl}/${gradeID}`, {
      withCredentials: true,
    });
  }

  setNextRegistration(gradeLevel: string, schoolYear: number) {
    return this.httpClient.post(
      this.snrUrl,
      { grade_level: gradeLevel, enrollmentYearId: schoolYear },
      { withCredentials: true }
    );
  }

  checkRegistration() {
    return this.httpClient.get(this.chkUrl, { withCredentials: true });
  }

  deleteRegistration(record_id: number) {
    return this.httpClient.post(
      this.rmvUrl,
      {
        record_id: record_id,
      },
      { withCredentials: true }
    );
  }
}
