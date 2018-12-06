import { Injectable } from '@angular/core';
import { Dictionary } from 'extension';

@Injectable()
export class UrlUtility {
  private queryStart = '?';
  private paramSplitter = '&';

  constructor() {}

  public buildQueryString(params: Dictionary, isEncoded = false): string {
    const queryString = Object.keys(params)
      .map( p => `${p}=${params[p]}` )
      .join(this.paramSplitter);
    if (!isEncoded) return queryString;
    return encodeURIComponent(queryString);
  }

  public buildUrl(url: string, params: Dictionary): string {
    const questionSignIndex = url.indexOf(this.queryStart);
    if (questionSignIndex > -1) url = url.substring(0, url.length - 1);
    if (!Object.keys(params).length) return url;
    const queryString = this.buildQueryString(params);
    return url + this.queryStart + queryString;
  }

  public buildAndEncodeUrl(url: string, params: Dictionary): string {
    const questionSignIndex = url.indexOf(this.queryStart);
    if (questionSignIndex > -1) url = url.substring(0, url.length - 1);
    if (!Object.keys(params).length) return url;
    const queryString = this.buildQueryString(params, true);
    return url + this.queryStart + queryString;
  }

  public getUrlParams(url: string): Dictionary {
    const decodedUrl = decodeURIComponent(url);
    const urlParams = decodedUrl.split(this.paramSplitter);
    const params = Object;
    urlParams.forEach( p => {
      const values = p.split('=');
      params[values[0]] = values[1];
    });
    return params;
  }

  public getUrlParamValue(paramName: string, url: string): string {
    const params = this.getUrlParams(url);
    return params[paramName] || null;
  }

}
