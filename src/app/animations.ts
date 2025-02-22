import { animate, animation, group, query, style, transition, trigger, useAnimation } from "@angular/animations";

export const fadeInOutPage = trigger("fadeInOutPage", [
    transition(
        "* <=> *",
        useAnimation(
            animation([
                query(
                    ":enter, :leave",
                    style({
                        opacity: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        position: "absolute",
                    }),
                    { optional: true }
                ),
                group([
                    query(
                        ":enter",
                        [
                            style({
                                opacity: 0,
                            }),
                            animate(
                                "0.6s ease-in-out",
                                style({
                                    opacity: 1,
                                })
                            ),
                        ],
                        { optional: true }
                    ),
                    query(
                        ":leave",
                        [
                            style({
                                opacity: 1,
                            }),
                            animate(
                                "0.6s ease-in-out",
                                style({
                                    opacity: 0,
                                })
                            ),
                        ],
                        { optional: true }
                    ),
                ]),
            ])
        )
    ),
]);
