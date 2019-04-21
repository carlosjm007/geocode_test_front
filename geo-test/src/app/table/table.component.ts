import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

	public Url = 'http://l-lin.github.io/angular-datatables/archives/data.json';
	dataSource = [];
	dataShowed = [];
	displayedColumns = ["id", "firstName", "lastName", "actions"];

	length = 200;
	pageSize = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	pageIndex = 0;
	pageEvent: PageEvent;
	constructor(
		public http: HttpClient,
		public dialog: MatDialog,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.dataMap();
	}

	dataMap(): Observable<User[]>{
		var data;
		this.http.get(this.Url)
			.pipe(
				map((data: any[]) => data.map((item: any, index) => new User(
					item.id,
					item.firstName,
					item.lastName,
					false,
				))),
			).subscribe((res : any[])=>{
				this.dataSource = res;
				data = res;
				this.length = res.length;
				this.showData(this.pageIndex, this.pageSize);
			});
		return data;
	}

	onPaginateChange(event){
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;
		this.showData(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
	}

	showData(first, last){
		//console.log(this.dataSource[0]);
		this.dataShowed = this.dataSource.slice(first , last);
	}

	favoriteElement(row){
		this.dataSource[row].favorite = !this.dataSource[row].favorite;
		this.showData(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
		this.snackBar.open("Marcaste como favorito", "", {
			duration: 2000,
		});
	}

	openEditForm(row): void{
		
		const dialogRef = this.dialog.open(TableComponentEditForm, {
			width: '250px',
			data: {row : row, id : this.dataSource[row].id, firstName : this.dataSource[row].firstName, lastName : this.dataSource[row].lastName, favorite : this.dataSource[row].favorite}
		});

        dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			//this.animal = result;
			console.log(result);
			this.dataSource[result.row] = result;
			this.showData(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
		});
	}

	deleteElement(row){
		this.dataSource.splice(row,1);
		this.showData(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
		this.length = this.dataSource.length;
 		this.snackBar.open("Eliminaste un usuario", "", {
			duration: 2000,
		});
	}
}

@Component({
	selector: 'table.component.editform',
	templateUrl: './table.component.editform.html',
})
export class TableComponentEditForm {
	constructor(public dialogRef: MatDialogRef<TableComponentEditForm>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export class User {
	constructor(
		public id: number,
		public firstName: string,
		public lastName: string,
		public favorite: boolean
	){}
}