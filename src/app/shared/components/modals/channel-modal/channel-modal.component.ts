import { Component, Inject, ViewChild, AfterViewChecked } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Channel, ChannelCategory } from 'src/app/shared/interfaces/models.interface';
import { NgScrollbar } from 'ngx-scrollbar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-channel-modal',
  templateUrl: './channel-modal.component.html',
  styleUrls: ['./channel-modal.component.scss']
})
export class ChannelModalComponent implements AfterViewChecked {

  @ViewChild(NgScrollbar) scrollBar: NgScrollbar;

  public storage = environment.storage + 'images/';

  public categories: ChannelCategory[] = [
    { id: 0, name: 'ყველა არხი' }
  ];
  public activeCategory: ChannelCategory = this.categories[0];
  public isOpen = false;

  constructor(
    public dialogRef: MatDialogRef<ChannelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Channel[]
  ) {
    this.data.forEach(i => {
      if (!this.categories.find(a => i.category.id === a.id)) {
        this.categories.push(i.category);
      }
    });
  }

  get channels(): Channel[] {
    return this.activeCategory.id ?
      this.data.filter(i => i.category.id === this.activeCategory.id) :
      this.data;
  }

  close(): void {
    this.dialogRef.close();
  }

  ngAfterViewChecked(): void {
    this.scrollBar.update();
  }

  setActive(category: ChannelCategory): void {
    this.activeCategory = category;
    this.closeSelect();
  }

  openSelect(): void {
    this.isOpen = true;
  }

  closeSelect(): void {
    this.isOpen = false;
  }

  toggleSelect(): void {
    this.isOpen = !this.isOpen;
  }

}
