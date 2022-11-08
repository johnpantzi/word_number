import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  public current_page: number;

  constructor(private route: ActivatedRoute) {
    this.current_page = 1;
  }

  ngOnInit() {
  }

  change_first(){
    this.current_page = 1;
  }

  change_second(){
    this.current_page = 2;
  }

  change_third(){
    this.current_page = 3;
  }

}
