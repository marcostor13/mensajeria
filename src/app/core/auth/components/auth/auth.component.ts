import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  passwordVisible = false
  password: string = ''
  email: string = ''

  constructor(
    private authService: AuthService
  ){}

  login(){
    const payload = {
      email: this.email,
      password: this.password
    }
    
    this.authService.login(payload).subscribe((session)=>{
      console.log(session)
    })
  }

}
