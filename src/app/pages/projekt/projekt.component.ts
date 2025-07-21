import { Component } from '@angular/core';
import { publicLoginEmitter } from "../../app.component";
import { ApiService } from "../../service/api/api.service";

@Component({
  selector: 'app-projekt',
  templateUrl: './projekt.component.html',
  styleUrl: './projekt.component.scss'
})
export class ProjektComponent {
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
