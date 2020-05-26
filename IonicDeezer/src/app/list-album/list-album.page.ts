import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Artist } from 'src/table/artist';
import { Album } from 'src/table/album';
//import { DataSearchAlbum } from 'src/table/data-search-album';
import { DeezerService } from '../service/deezer.service';
import { DataSearchAlbum } from 'src/table/data-search-album';


artist: Artist;

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.page.html',
  styleUrls: ['./list-album.page.scss'],
})
export class ListAlbumPage implements OnInit {



  artist: string;
  listAlbum: Album[];
  readonly TAG:string = 'List-Album';

  ngOnInit() {

      this.artist = this.route.snapshot.paramMap.get('name');
      console.log(`${this.TAG} mon artist est passé : " + this.artist`);
      this.searchAlbums();


    }

  constructor(public deezerService:DeezerService, private route: ActivatedRoute, public router: Router) {

  }

  searchAlbums(){
    console.log(`${this.TAG} onSearchAlbum begin`);

    this.deezerService.getAlbums(this.artist).then( (result :DataSearchAlbum ) => {

      console.log(`${this.TAG} data=${JSON.stringify(result)}`);
      this.listAlbum = result.data;
    } ).catch( (err) => {
      console.log(`${this.TAG} err=${JSON.stringify(err)}`);
    });
  }


    onClickAlbum(album: any){

        console.log("onclick album name is : " + album.name);
        this.router.navigate(['/list-track', album.id]);
    }
}
