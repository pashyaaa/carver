import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Event, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() toggle: any;
  @Output() toggled = new EventEmitter<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    Dashboard = {
    title: 'Dashboard',
    url: '/home/dashboard',
    icon: 'assessment',
  }
  Display ={
    title: 'Display',
    url: '/home/displays',
    icon: 'desktop_windows',
  }
  Schedules = {
    title: 'Schedules',
    url: '/home/schedules',
    icon: 'schedule',
  }
  Playlists = {
    title: 'Playlists',
    url: '/home/playlists',
    icon: 'playlist_play',
  }
  MediaLibrary = {
    title: 'Media Library',
    url: '/home/media-library',
    icon: 'storage',
  }
  Apps = {
    title: 'Apps',
    url: '/home/apps',
    icon: 'grid_view',
  }
  Layout = {
    title: 'Layout',
    url: '/home/layout',
    icon: 'view_quilt',
  }
  pages =
    [
      this.Dashboard,
      this.Display,
      this.Schedules,
      this.Playlists,
      this.MediaLibrary,
      this.Apps,
      this.Layout
    ]
  selectedPath:any = this.pages[0].title;
  @Output() pathChanged = new EventEmitter<string>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      this.selectedPath = this.pages.find(x => x.url == e.url)?.title;
      this.pathChanged.emit(this.selectedPath)
    });
  }

  ngOnInit(): void {

  }

  onToggle() {
    this.toggle = !this.toggle;
    this.toggled.emit(this.toggle)
  }

}
