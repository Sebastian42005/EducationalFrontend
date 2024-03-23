import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {UserDto} from "../../../service/api/entities/UserDto";
import {ConfirmDialogComponent} from "../../../dialogs/confirm-dialog/confirm-dialog.component";
import {showMessageEmitter} from "../../../components/popup-info/popup-info.component";
import {ApiService} from "../../../service/api/api.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'firstname', 'lastname', 'role', 'action'];
  dataSource: MatTableDataSource<UserDto>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService, private matDialog: MatDialog) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteUser(user: UserDto | undefined) {
    if (user) {
      this.matDialog.open(ConfirmDialogComponent, {
        data: {
          text: "Are you sure you want to delete the user " + user.email + "?",
          cancel: "Cancel",
          confirm: "Delete"
        }
      }).afterClosed().subscribe(isConfirm => {
        if (isConfirm) {
          this.apiService.deleteUser(user.id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(current => current.id != user.id)
            showMessageEmitter.emit({
              message: "Successfully deleted user",
              error: false
            })
          });
        }
      })
    }
  }
}
