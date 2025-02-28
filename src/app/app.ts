// Module imports
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CoreService } from "ngx-ute-core";

// Project imports
import { fadeInOutPage } from "./animations";

@Component({
    selector: "app-root",
    imports: [RouterOutlet],
    templateUrl: "./app.html",
    styleUrl: "./app.scss",
    standalone: true,
    animations: [fadeInOutPage],
})
export class AppComponent {
    constructor(public coreService: CoreService) {}
}

// Згенеруй мені дані по даній структурі:

// 1. Назва проекту
// 2. Опис проекту
// 3. СЕО заголовок
// 4. СЕО опис
// 5. СЕО ключові слова
// 6. Ціль проекту
// 7. Реалізовані рішення (заголовок та опис)
