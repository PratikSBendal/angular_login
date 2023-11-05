import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup,Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "@app/__service/account.service";
import { first } from 'rxjs/operators';

@Component ({templateUrl:'register.component.html'})

export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    error?: string;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) {
        
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alert on submit
        this.error = '';

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register1(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/account/login'], { queryParams: { registered: true }});
                },
                error: error => {
                 

   this.error = error;
                    this.loading = false;
                }
            });
    }

}