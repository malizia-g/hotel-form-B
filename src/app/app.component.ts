import { Component } from '@angular/core';
import { RoomList } from './roomLsit.model';
import { Room } from './room.model';
import { Booking } from './booking.model';
import {  //Importa FormBuilder e FormGroup
  FormBuilder,
  FormGroup
} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = "Benvenuti all'hotel degli alberi";
  rooms = RoomList;
  selectedRoom: Room;
  bookingList: Booking[];
  bookingForm: FormGroup;

  constructor(public fb: FormBuilder) { }
  ngOnInit() {
    this.bookingForm = this.fb.group({
      roomControl: [RoomList[0]],
      nameControl: [''],
      surnameControl: [''],
      fromControl: [''],
      toControl: ['']
    });

    this.bookingList = new Array <Booking>();
  }


  onChange() {
    //In questo modo ottengo l'oggetto selezionato
    this.selectedRoom = this.bookingForm.controls['roomControl'].value;
  }

  onSubmit(): boolean {
    let room = this.bookingForm.controls['roomControl'].value;
    let name = this.bookingForm.controls['nameControl'].value;
    let surname = this.bookingForm.controls['surnameControl'].value;
    let from =  this.bookingForm.controls['fromControl'].value;
    let to =  this.bookingForm.controls['toControl'].value;
    this.bookingList.push(new Booking(room, new Date(from), new Date(to), name, surname));
    return false;
  }
}
