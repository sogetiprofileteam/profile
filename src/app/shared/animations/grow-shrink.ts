import {
    transition,
    animate, style, trigger,
} from '@angular/animations';
import { bezierCurve } from './bezier-curve';

export const growShrink = trigger('growShrinkOnEnterLeave', [
    transition(':enter', [
        style({
            transform: 'scale(0)',
            opacity: 0,
        }),
        animate(`150ms ${bezierCurve}`,
            style({
                transform: 'scale(1.1)',
                opacity: 1,
            }),
        ),
        animate(`100ms ${bezierCurve}`,
            style({
                transform: 'none',
            })
        )
    ]),
    transition(':leave', [
        animate(`150ms ${bezierCurve}`,
            style({
                transform: 'scale(1.1)',
                opacity: 1,
            }),
        ),
        animate(`100ms ${bezierCurve}`,
            style({
                transform: 'scale(0)',
                opacity: 0
            }),
        )
    ])
]);