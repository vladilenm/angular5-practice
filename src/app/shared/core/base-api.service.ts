import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class BaseApi {
  private baseUrl = 'http://localhost:3000/';

  constructor(public http: Http) {}

  public getUrl(addition: string): string {
    return this.baseUrl + addition;
  }

  public get(addition: string): Observable<any> {
    return this.http.get(this.getUrl(addition))
      .map((response: Response) => response.json());
  }

  public post(addition: string, data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(addition), data)
      .map((response: Response) => response.json());
  }
}
