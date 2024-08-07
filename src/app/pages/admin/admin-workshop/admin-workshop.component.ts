import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../../service/api/api.service";
import {WorkshopDto} from "../../../service/api/entities/WorkshopDto";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-workshop',
  templateUrl: './admin-workshop.component.html',
  styleUrl: './admin-workshop.component.scss'
})
export class AdminWorkshopComponent implements OnInit {
  dataSource: MatTableDataSource<WorkshopDto>;
  displayedColumns: string[] = ['id', 'school', 'message', 'subject', 'date', 'state', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService,
              private matDialog: MatDialog,
              private router: Router) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.apiService.getAllWorkshops().subscribe(workshops => {
      this.dataSource = new MatTableDataSource(workshops);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
