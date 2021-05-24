import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from '../curd.service';
import { Event } from '../event';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  imageUrl: string = "/assets/img/default-image.jpeg";

  eventForm: FormGroup;

  

  constructor(public fb: FormBuilder,
    private router: Router,
    public crudService: CurdService) { 
      this.eventForm = this.fb.group({
        Tittle: [''],
        Location: [''],
        Price: [''],
        Date: [''],
        About: [''],
        Learn: [''],
        Imagename: [''],
        Imagesrc: [''],
        Imagefile: null  
      })
    }

    onFileSelect(eve: any) {
      if (eve.target.files.length > 0) {
        const file = eve.target.files[0];
        this.eventForm.get('Imagefile')?.setValue(file);
      }
    }

    submitForm() {

      const formData = new FormData();
      formData.append('Tittle', this.eventForm.get('Tittle')?.value);
      formData.append('Location', this.eventForm.get('Location')?.value);
      formData.append('Price', this.eventForm.get('Price')?.value);
      formData.append('Date', this.eventForm.get('Date')?.value);
      formData.append('About', this.eventForm.get('About')?.value);
      formData.append('Imagefile', this.eventForm.get('Imagefile')?.value);
      formData.append('Learn', this.eventForm.get('Learn')?.value);
      formData.append('Imagename', this.eventForm.get('Imagefile')?.value.name);
      formData.append('Imagesrc', "");

      this.crudService.create(formData).subscribe(res => {
        console.log('Product created!')
        this.router.navigateByUrl('/home')})
    }

  ngOnInit(): void {
  }

}
