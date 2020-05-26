import { Component } from '@angular/core';
import { DeezerService } from '../service/deezer.service';
import { DataSearchArtist, Artist } from '../../table/artist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  readonly TAG:string = 'HomePage';
  listArtist: Artist[];
  //DataSearchAlbum: any;
  //artistSelected: Artist;

  constructor(public deezerService:DeezerService, public router:Router) {}

  onSearchArtist(event: any){
    console.log(`${this.TAG} onSearchArtist begin`);

    let val:string = event.target.value;
    console.log(`${this.TAG} val ${val}`);

    this.deezerService.getAuthors(val).then( (result :DataSearchArtist ) => {
      console.log(`${this.TAG} data=${JSON.stringify(result)}`);
      this.listArtist = result.data;
    } ).catch( (err) => {
      console.log(`${this.TAG} err=${JSON.stringify(err)}`);
    });
  }

  onClickArtist(artist: string){
    //this.artistSelected.name= artist;
    console.log("onclick nom artist est : " + artist);
    this.router.navigate(['/list-album/' +artist]);//, {queryParams: {artist: this.artistSelected}});   //artist]);
    // this.DataSearchAlbum.artist= artist;
}

}

