import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../../shared/services/auth-services/authservice';
import { LoginForm } from '../../shared/models/auth-models/login.model';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(Authservice)
  fb = inject(FormBuilder)


  isLogged = this.authService.isLogged;
  isOpen = signal(false);
  formLogin : FormGroup;




  constructor(){
    this.formLogin = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(7)]]
    })
  }

  onSubmit(){
    if(this.formLogin.valid){

      const loginForm : LoginForm = {
        email : this.formLogin.value["email"],
        password : this.formLogin.value["password"]
      }

      this.authService.login(loginForm)
      this.isOpen.set(false)

    }
  }

  toggleForm(){
    this.isOpen.set(!this.isOpen())
  }

  logout(){
    this.authService.logout()
  }
}
