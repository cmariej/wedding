import { Routes } from '@angular/router';
import { General } from './general/general';
import { Countdown } from './countdown/countdown';
import { Agenda } from './agenda/agenda';
import { Details } from './details/details';
import { Location } from './location/location';
import { Rsvp } from './rsvp/rsvp';
import { PrivatePolicy } from '../footer/private-policy/private-policy';
import { Menu } from './details/menu/menu';
import { Faq } from './details/faq/faq';

export const routes: Routes = [
    { path: '', redirectTo: 'general', pathMatch: 'full' }, // ← das hier
    { path: 'general', component: General },
    { path: 'countdown', component: Countdown },
    { path: 'location', component: Location },
    { path: 'agenda', component: Agenda },
    { path: 'details', component: Details },
    { path: 'rsvp', component: Rsvp },
    { path: 'private-policy', component: PrivatePolicy },
    { path: 'menu', component: Menu },
    { path: 'faq', component: Faq },
];
