import { Component, OnInit, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterModule, Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';

import { environment } from '@Environment';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [MenubarModule, CommonModule, AvatarModule, CardModule, RouterModule],
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private readonly translateService: TranslateService,
    private router: Router,
  ) {
    this.router.events.pipe(filter((e) => e instanceof Scroll)).subscribe((e: any) => {
      if (e.anchor) {
        setTimeout(() => {
          const element = document.getElementById(e.anchor);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang(environment.defaultLanguage);

    this.translateService.use(environment.defaultLanguage);
    this.items = [
      {
        label: 'Work',
        icon: 'pi pi-briefcase',
        routerLink: ['.'],
        fragment: 'work',
      },
      {
        label: 'Blog',
        icon: 'pi pi-pen-to-square',
        routerLink: ['.'],
        fragment: 'blog',
      },
      {
        label: 'Podcast',
        icon: 'pi pi-microphone',
        routerLink: ['.'],
        fragment: 'podcast',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: ['.'],
        fragment: 'contact',
      },
    ];
  }
}
