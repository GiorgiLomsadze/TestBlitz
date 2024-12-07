import { Component, OnInit, Input } from '@angular/core';

import { Product, ProductType, Channel } from 'src/app/shared/interfaces/models.interface';
import { ChannelModalComponent } from 'src/app/shared/components/modals/channel-modal/channel-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  @Input() data: Product = null;
  @Input() isCabinet = true;
  @Input() isActive = false;

  public productTypes = ProductType;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.dialog.open<ChannelModalComponent, Channel[]>(ChannelModalComponent, {
      data: this.data.channels,
      panelClass: 'channel-dialog',
    });
  }

}
