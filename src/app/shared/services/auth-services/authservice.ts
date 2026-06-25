import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginForm } from '../../models/auth-models/login.model';
import { RegisterForm } from '../../models/auth-models/register.model';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  httpClient = inject(HttpClient)

  API_URL = "https://localhost:7022/api/"

  isLogged = signal(false)
  isAdmin = signal(false)

  userId = signal(0)
  name = signal('')
  email = signal('')
  role = signal('none')

  errorMessage = signal('')

  constructor(){
    const token = localStorage.getItem("token")

    if(token){
      this.setUserState(token)
    }
  }


  login(loginForm : LoginForm){
    this.httpClient.post<{token : string}>(`${this.API_URL}Auth/login`,loginForm).subscribe({
      next: (res) => {
          this.setUserState(res.token)
      },
      error : (err) => {
        // console.log(err)
        this.errorMessage.set(err.message)
      }
    })
  }

  register(registerForm : RegisterForm){
    this.httpClient.post<{token : string}>(`${this.API_URL}Auth/register`,registerForm).subscribe({
      next : (res) => {
        this.setUserState(res.token)
      },
      error : (error) => {
        this.errorMessage.set(error.message)
      }
    })
  }

  logout(){
    this.clearUserState();
  }

  // Tools Token

  getIdToken(token : string){
    const payload = JSON.parse(atob(token.split('.')[1]));

    const userId = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']

    return userId;
  }

  getRoleToken(token : string){
    const payload = JSON.parse(atob(token.split('.')[1]));

    const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return role;
  }

  getExpToken(token : string){
    const payload = JSON.parse(atob(token.split('.')[1]));

    const exp = payload['exp']

    return exp;
  }

  getEmailToken(token : string){
    const payload = JSON.parse(atob(token.split('.')[1]));

    const email = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']

    return email;
  }

  getNameToken(token : string){
    const payload = JSON.parse(atob(token.split('.')[1]));

    const name = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']

    return name;
  }

  // State Verification

  isTokenValid(){
    const token = localStorage.getItem("token");

    if(token){

      const exp = this.getExpToken(token);

      return exp * 1000 > Date.now();
    }

    return false;
  }
  
  setUserState(token : string){
    const id = this.getIdToken(token);
    const name = this.getNameToken(token);
    const email = this.getEmailToken(token);
    const role = this.getRoleToken(token);

    // localstorage
    localStorage.setItem("token",token)

    // signals
    this.userId.set(id)
    this.name.set(name)
    this.email.set(email)
    this.role.set(role)

    // State User

    this.isAdmin.set(role == 'Admin' ? true : false)
    this.isLogged.set(true)
  }

    clearUserState(){

    // localstorage
    localStorage.removeItem("token") // supprime uniquement un élément du localstorage
    localStorage.clear() // supprime tout le localstorage

    // signals
    this.userId.set(0)
    this.name.set('')
    this.email.set('')
    this.role.set('')

    // State User
    this.isAdmin.set(false)
    this.isLogged.set(false)
  }
}
