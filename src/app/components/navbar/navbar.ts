import { Component, inject, signal } from '@angular/core';
import { Authservice } from '../../shared/services/auth-services/authservice';
import { RouterLink } from '@angular/router';
import { Login } from "../login/login";


@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    Login
],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

authService = inject(Authservice)

isAdmin = signal(this.authService.isAdmin())
isLogged = signal(this.authService.isLogged())


}
