import { Component } from '@angular/core';
import { User } from './__model/user';
import { AccountService } from './__service/account.service';

@Component(
    { selector: 'app-root', templateUrl: 'app.component.html' }
    )
export class AppComponent { 
    user?: User | null;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
}