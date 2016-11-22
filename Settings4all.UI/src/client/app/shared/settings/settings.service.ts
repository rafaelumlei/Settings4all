import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Setting } from './setting';
import { BaseSetting } from './basesetting';
import { Config } from '../config/env.config';

@Injectable()
export class SettingsService {

    private baseEndpoint: string;

    public constructor(private http: Http) {
        this.http = http;
        this.baseEndpoint = Config.SETTINGS4NET_API;
    }

    getApps(): Promise<string[]> {
        return this.http.get(this.baseEndpoint + '/applications')
            .map((r: Response) =>
                r.json() as string[]
            )
            .toPromise();
    }

    getAppEnvironments(app: string): Promise<string[]> {
        return this.http.get(this.baseEndpoint + '/applications/' + app + '/environments')
            .map((r: Response) => r.json() as string[])
            .toPromise();
    }

    mapBaseSetting(source: any) : BaseSetting {
        let mappedSetting : BaseSetting = new BaseSetting();
        mappedSetting.id = source.Id;
        mappedSetting.application = source.Application;
        mappedSetting.created = source.Created;
        mappedSetting.environment = source.Environment;
        mappedSetting.fullpath = source.Fullpath;
        mappedSetting.updated = source.Updated;
        return mappedSetting;
    }

    mapSetting(source: any) : Setting {
        let mappedSetting : Setting = new Setting();
        mappedSetting.id = source.Id;
        mappedSetting.application = source.Application;
        mappedSetting.created = source.Created;
        mappedSetting.environment = source.Environment;
        mappedSetting.fullpath = source.Fullpath;
        mappedSetting.updated = source.Updated;  
        mappedSetting.documentation = source.Documentation;
        mappedSetting.jsonvalue = source.JSONValue;
        return mappedSetting;
    }

    getSettings(app: string, env: string, fullVersion: boolean = true): Promise<BaseSetting[]> {
        let resource = '';

        if (app == null && env == null) {
            resource = 'settings';
        } else if (env != null) {
            resource = 'applications/' + app + '/environments/' + env + '/settings';
        } else {
            resource = 'applications/' + app + '/settings';
        }

        resource += '?fullVersion=' + fullVersion;

        return this.http.get(this.baseEndpoint + resource)
                        .map((r: Response) => {
                            if (fullVersion) {
                                return (r.json() as Array<any>).map(e => this.mapSetting(e));
                            } else {
                                return (r.json() as Array<any>).map(e => this.mapBaseSetting(e));
                            }
                        })
                        .toPromise();
    }

    getSetting(id: string): Promise<Setting> {
        let resource = 'settings/' + id;

        return this.http.get(this.baseEndpoint + resource)
                        .map((r: Response) => {
                                return this.mapSetting((r.json() as any));
                        })
                        .toPromise();
    }

    updateSetting(uSetting: Setting): Promise<Response> {
        let resource = 'settings/' + uSetting.id;

        return this.http.put(this.baseEndpoint + resource, {
            JSONValue: uSetting.jsonvalue
        }).toPromise();
    }

    deleteSetting(id: string): Promise<Response> {
        let resource = 'settings/' + id;

        return this.http.delete(this.baseEndpoint + resource).toPromise();
    }

}
