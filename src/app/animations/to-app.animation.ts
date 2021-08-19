import {animate, group, query, state, style, transition, trigger} from '@angular/animations';

export const otherTrigger = trigger('otherTrigger', [
    state('AppPage', style({
        opacity: 0
    })),
    transition('* => AppPage', [
        animate('.3s')
    ]),
    transition('* => HomePage', [
        group([
            style({
                opacity: 0
            }),
            animate('.3s', style({
                opacity: 1
            }))
        ])
    ]),
    state('HomePage', style({
        opacity: 1
    }))
]);

export const leDiv = trigger('leaveEnterDiv', [
        state('AppPage', style({
            width: '0',
        })),
        state('HomePage', style({
            width: '55%',
        })),
        transition('* => AppPage', animate('.3s')),
        transition('* => HomePage', [
            animate('.3s'),
        ])
    ]
);

export const heroAnimation = trigger('heroAnimation', [
    state('AppPage', style({
        position: 'absolute',
        right: '-40rem',
    })),
    state('HomePage', style({
        position: 'absolute',
        right: '0'
    })),
    transition('AppPage => HomePage', group([
        style({right: '-40rem'}),
        animate('.3s', style({right: '0'}))
    ])),
    transition('HomePage => AppPage', group([
        style({right: '0'}),
        animate('.3s', style({right: '-40rem'}))
    ]))
]);

export const bottomMenuAnim = trigger('menuAnim', [
    state('AppPage', style({
        position: 'absolute',
        bottom: '-4rem'
    })),
    state('HomePage', style({
        position: 'absolute',
        bottom: '0'
    })),
    transition('AppPage <=> HomePage', [
        animate('.3s'),
    ]),
]);

export const childrenAnimFromParent = trigger('animChildrenApp', [
    transition('AppPage => HomePage',
        query('#localoca', [animate('.3s', style({opacity: 0}))], {optional: true})
    )
]);

export const descriptionAnim = trigger('descriptionHBAnim', [
    transition('* => *', group([
        style({opacity: 0}),
        animate('.5s', style({opacity: 1}))
    ]))
]);
