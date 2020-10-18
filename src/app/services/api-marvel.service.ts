import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiMarvelService {
  PUBLIC_KEY='46555b60627dd5a072a821ca9493b300';
  SECRET_KEY='9c5201be98fd70d3f1a37ff70280300c';
  URL_CHARACTER=`https:gateway.marvel.com/v1/public/characters?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.SECRET_KEY}&limit=9`;
  URL_COMIC=`https:gateway.marvel.com/v1/public/comics?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.SECRET_KEY}&limit=9`;
  constructor(private http: HttpClient) { }

  getAllCharacters(offset) : Observable<any>{
    return this.http.get<any>(this.URL_CHARACTER+'&offset='+offset)
      .pipe(map((data: any) => data.data.results ))
  }
  getAllComics(offset) : Observable<any>{
    return this.http.get<any>(this.URL_COMIC+'&offset='+offset)
      .pipe(map((data: any) => data.data.results ))
  }
  findCharacterByName(nameStartWith: string){
    return this.http.get<any>(this.URL_CHARACTER+'&name='+nameStartWith)
      .pipe(map((data: any) => data.data.results ))
  }

}
