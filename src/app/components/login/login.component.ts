import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
  }
  onSubmit(): any {
    if (this.loginForm.valid) {
      return this.authService.login(this.loginForm.value).subscribe(
        (res: any) => {
          console.log('res', res);
          this.authService.setToken(res.access_token);
          this.router.navigate(['/admin']);
        },
        (error) => console.log(error.message)
      );
    }
  }
}
