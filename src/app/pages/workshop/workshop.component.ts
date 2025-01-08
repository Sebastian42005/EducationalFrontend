import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {WorkshopDto, WorkshopState} from "../../service/api/entities/WorkshopDto";
import {ApiService} from "../../service/api/api.service";

@Component({
    selector: 'app-workshop',
    templateUrl: './workshop.component.html',
    styleUrl: './workshop.component.scss'
})
export class WorkshopComponent implements OnInit {
    displayedColumns: string[] = ['subject', 'date', 'school', 'state', 'action'];
    dataSource: MatTableDataSource<WorkshopDto>;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private apiService: ApiService,
                private router: Router) {
    }

    ngOnInit() {
        this.apiService.getOwnWorkshops().subscribe(workshop => {
            this.dataSource = new MatTableDataSource(workshop);
            this.dataSource.sort = this.sort;
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    bookWorkshop() {
        this.router.navigate(['workshop', 'book']).then();
    }

    cancelWorkshop(id: number) {

    }

    displayWorkshop(workshop: WorkshopDto) {
        this.router.navigate(['workshop', workshop.id]).then()
    }

    getStateColor(state: WorkshopState) {
        switch (state) {
            case WorkshopState.PENDING:
                return 'blue';
            case WorkshopState.ACCEPTED:
                return 'green';
            case WorkshopState.REJECTED:
                return 'red';
            default:
                return 'grey';
        }
    }
}
