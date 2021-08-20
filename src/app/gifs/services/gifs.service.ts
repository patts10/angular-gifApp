import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:  string = 'S4XRkOkxNcH8NsA3yDBpEYnM9CPVOxWX';
  private _historial: string[] = [];

  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient){}
  
  buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase();   
    if ( !this._historial.includes(query) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,9);
    }
    
    this.http.get(`https:/api.giphy.com/v1/gifs/search?api_key=S4XRkOkxNcH8NsA3yDBpEYnM9CPVOxWX&q=${ query }&limit=10`)
      .subscribe( (res: any) => {
        console.log( res.data);
        this.resultados = res.data;
        
      })
    
  }
}
