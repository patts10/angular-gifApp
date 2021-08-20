import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:  string = 'S4XRkOkxNcH8NsA3yDBpEYnM9CPVOxWX';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if( localStorage.getItem('historial') ) {
    //   this._historial = JSON.parse( localStorage.getItem('historial')!)
    // }
  }
  
  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();   
    if ( !this._historial.includes(query) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,9);

      localStorage.setItem('historial', JSON.stringify(this.historial));
    }
    
    this.http.get<SearchGifsResponse>(`https:/api.giphy.com/v1/gifs/search?api_key=S4XRkOkxNcH8NsA3yDBpEYnM9CPVOxWX&q=${ query }&limit=10`)
    .subscribe( (res) => {
      console.log( res.data);
      this.resultados = res.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
        
      })
    
  }
}
