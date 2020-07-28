import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from '../models/card-model';
import {CardService} from '../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data: CardModel;

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
  }

  compareNumbers($event: MouseEvent): any {
    this.cardService.compareNumbers(this.data);
  }
}
