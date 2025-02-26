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

    /**
     * Resolves the route data and returns a promise with the resolved data.
     * The resolved data is an object with two properties: "data" and "item".
     * "data" is an object with the data from the json files specified in the route data.
     * "item" is the item that corresponds to the id or page parameter in the route.
     * If the route has an id parameter, it looks for the item in the "projects" data.
     * If the route has a page parameter, it looks for the item in the "docs" data.
     *
     * @param route - The route to be resolved.
     * @returns a promise with the resolved data.
     */
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
                const page = route.paramMap.get("page");

                if (id) {
                    result.item = data.projects.find((project: ProjectData) => project.code === id);
                }
                if (page) {
                    result.item = data.docs.find((doc: any) => doc.code === page);
                }
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
}
