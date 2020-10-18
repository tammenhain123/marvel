import { Observable } from 'rxjs';
import { ApiMarvelService } from './../services/api-marvel.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  public allCharacters: Observable<any>;
  public nameStartsWith: string;
  public offset: number = 0;
  public charSelected: any;
  constructor(private apiMarvelService: ApiMarvelService,  public dialog: MatDialog) {

  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CharacterDialog, {
      width: '250px',
      data: {name: this.charSelected.name, stories: this.charSelected.stories.returned, comics: this.charSelected.comics.returned, series: this.charSelected.series.returned}
    });

    dialogRef.afterClosed().subscribe(result => {      
    });
  }
  
  ngOnInit(): void {
    this.getAllCharacters();
  }
  
  showDetail(char){
    this.charSelected = char;
    this.openDialog();
  }
  
  previousPage(){
    if(this.offset > 0){
      this.offset -= 9;
      this.getAllCharacters();
    }
  }
  
  nextPage(){
    this.offset += 9;
    this.getAllCharacters();
  }
  
  getAllCharacters(){
    //parameter offset shows in which position the search will start
    this.allCharacters = this.apiMarvelService.getAllCharacters(this.offset);
  }
  
  findCharacter(nameStartsWith){
    console.log(nameStartsWith)
    if(nameStartsWith == null || nameStartsWith == undefined || nameStartsWith == ''){
      this.getAllCharacters();
    }else{
      this.allCharacters = this.apiMarvelService.findCharacterByName(nameStartsWith);
    }

  }
}


@Component({
  selector: 'character-dialog',
  templateUrl: 'character.dialog.html',
})
export class CharacterDialog {

  constructor(
    public dialogRef: MatDialogRef<CharacterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
