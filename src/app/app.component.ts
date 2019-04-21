import { Component } from '@angular/core';
import { RoomList } from './roomLsit.model';
import { Room } from './room.model';
import { Booking } from './booking.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //countryForm: FormGroup;
  title = "Benvenuti all'hotel degli alberi";
  rooms = RoomList;
  selectedRoom: Room = RoomList[0];
  bookingList : Booking[];
  obsList : Observable<Booking[]>;

  constructor(public http: HttpClient) { }
  ngOnInit() {
    //this.bookingList = new Array<Booking>();
    this.makeTypedRequest()
  }

  makeTypedRequest() : void
 {
   //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
   this.obsList = this.http.get<Booking[]>('http://localhost:3000/booking');
   this.obsList.subscribe(data => {this.bookingList = data;});
 }


  //Controllo se l'id della stanza selezionata è nell'elenco.
  //In questo caso imposto la variabile selectedRoom
  onChange(r_id: number) {
    RoomList.forEach(
      (room: Room) => {
        if (room.id == r_id) this.selectedRoom = room;
      }
    )
  }

  onClick(n: HTMLInputElement ,c : HTMLInputElement ,d : HTMLInputElement, e :HTMLInputElement ) : boolean
  {
    this.bookingList.push(new Booking(this.selectedRoom,new Date(d.value), new Date(e.value) ,n.value,c.value));
    return false;
  }
}
