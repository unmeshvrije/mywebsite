import { Component, OnInit, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
  imports: [MenubarModule, CommonModule, AvatarModule, CardModule],
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private readonly translateService: TranslateService,
    private readonly elementRef: ElementRef
    ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang(environment.defaultLanguage);

    this.translateService.use(environment.defaultLanguage);
    this.items = [
      {
        label: 'Work',
        icon: 'pi pi-briefcase',
        fragment: 'work'
      },
      {
        label: 'Blog',
        icon: 'pi pi-pen-to-square'
      },
      {
        label: 'Podcast',
        icon: 'pi pi-microphone'
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      }
    ];
  }
}
