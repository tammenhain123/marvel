import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Inject} from '@angular/core';
import { Observable } from 'rxjs';
import { ApiMarvelService } from './../services/api-marvel.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {
  public allComics: Observable<any>;
  constructor(public datepipe: DatePipe, private apiMarvelService: ApiMarvelService, public dialog: MatDialog) { }
  public offset: number = 0;
  public comicSelected: any;
  public totalCharacters: any;
  public saleDate: string;
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CharacterDialog, {
      width: '250px',
      data: {title: this.comicSelected.title, description: this.comicSelected.description, onsaleDate: this.saleDate}
    });

    dialogRef.afterClosed().subscribe(result => {      
    });
  }
  
  ngOnInit(): void {
    this.getAllComics();
  }
  
  showDetail(comic){
    this.comicSelected = comic;
    //turns a date into a string 
    this.saleDate = this.datepipe.transform(this.comicSelected.dates[0].date, 'dd-MM-yyyy');
    this.openDialog();
  }
  
  getAllComics(){
    //parameter offset shows in which position the search will start
    this.allComics = this.apiMarvelService.getAllComics(this.offset);
  }
  
  previousPage(){
    if(this.offset > 0){
      this.offset -= 9;
      this.getAllComics();
    }
  }
  
  nextPage(){
    this.offset += 9;
    this.getAllComics();
  }
}

@Component({
  selector: 'comic-dialog',
  templateUrl: 'comic.dialog.html',
})
export class CharacterDialog {

  constructor(
    public dialogRef: MatDialogRef<CharacterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
