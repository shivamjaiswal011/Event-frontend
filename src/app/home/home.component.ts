import { Component, OnInit } from '@angular/core';
import { CurdService } from '../curd.service';
import { Event } from '../event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  eve: Event[] = [];
  constructor(public crudService: CurdService) { }

  ngOnInit(): void {
    this.crudService.getAll().subscribe((data: Event[])=>{
      debugger; 
      this.eve = data;
    })  
  }

}
