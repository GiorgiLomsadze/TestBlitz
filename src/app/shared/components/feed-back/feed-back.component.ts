import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.scss']
})
export class FeedBackComponent implements OnInit {

  @Input() type: 'success' | 'failure' = 'success';

  constructor() { }

  ngOnInit(): void {
  }

}
