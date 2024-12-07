import { Component, OnInit, Input } from '@angular/core';

import { ProductType, Product, Channel } from 'src/app/shared/interfaces/models.interface';
import { MatDialog } from '@angular/material/dialog';
import { ChannelModalComponent } from 'src/app/shared/components/modals/channel-modal/channel-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() data: Product;

  public types = ProductType;
  public storage = environment.storage + 'images/';

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
