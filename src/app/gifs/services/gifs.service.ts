import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:  string = 'S4XRkOkxNcH8NsA3yDBpEYnM9CPVOxWX';
  private servicioUrl:  string = 'https:/api.giphy.com/v1/gifs';
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
    
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query );
        
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
    .subscribe( (res) => {
      this.resultados = res.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
        
      })
    
  }
}
