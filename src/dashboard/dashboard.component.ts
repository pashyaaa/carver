import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Event, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  opened:boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  selectedPath: string = "";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router:Router,
    ) {
      if(JSON.parse(<string>localStorage.getItem('sidebar-opened')) == undefined){
        this.opened = true
        localStorage.setItem('sidebar-opened', 'true')
      }else{
        if(localStorage.getItem('sidebar-opened') == 'true'){
          this.opened = true;
        }else{
          this.opened = false;
        }
      }
    }

  ngOnInit(): void {
  }

  onToggle(){
    this.opened = !this.opened
    if(this.opened){
      localStorage.setItem('sidebar-opened', 'true')
    }else{
      localStorage.setItem('sidebar-opened', 'false')
    }
  }

  onPathChanged(e:any){
    this.selectedPath = e;
  }

}
