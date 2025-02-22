// Module imports
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { HttpService } from "ngx-ute-core";

// Project imports
import { ProjectData } from "@interfaces/projects";

@Injectable({
    providedIn: "root",
})
export class ResolveService {
    constructor(private httpService: HttpService) {}

    public resolve(route: ActivatedRouteSnapshot): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const jsons: any = route.data["jsons"];
                const data: any = {};

                for (const json of jsons) {
                    data[json] = await this.httpService.httpLocal(`assets/data/${json}.json`);
                }

                let result = {
                    data: data,
                    item: null,
                };

                const id = route.paramMap.get("id");

                if (id) {
                    result.item = data.projects.find((project: ProjectData) => project.code === id);
                }
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
}
