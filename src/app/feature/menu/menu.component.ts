import { Component, OnInit } from '@angular/core';

import { PackageType } from 'src/app/shared/interfaces/category.interface';
import { Options } from 'src/app/shared/interfaces/init.interface';
import { APIService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public menu: PackageType[];
  public options: Options;

  constructor(private api: APIService) {
    this.menu = this.api.initData.topMenu;
    this.options = this.api.initData.options;
  }

  ngOnInit(): void {}
}
