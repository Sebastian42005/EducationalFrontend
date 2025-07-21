import { Component } from '@angular/core';
import { publicLoginEmitter } from "../../app.component";
import { ApiService } from "../../service/api/api.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  protected readonly publicLoginEmitter = publicLoginEmitter;
  isLoggedIn = false

  constructor(private readonly apiService: ApiService) {
    this.apiService.getOwnUser().subscribe({
      next: () => {
        this.isLoggedIn = true
      },
      error: () => {
        this.isLoggedIn = false
      }
    })
  }
}
