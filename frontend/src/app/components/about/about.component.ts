import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
	public title: string;
	public subtitle: string;
	public web: string;

  constructor() { 
  	this.title = "Álvaro Núñez";
  	this.subtitle = "Desarrollador Web";
  	this.web = "www.anunde.es";
  }

  ngOnInit(): void {
  }

}
