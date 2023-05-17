import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isHomePage!: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.getCurrentUrl();
  }

  getCurrentUrl() {
    this.isHomePage = this.router.url.includes('home');
  }
}
