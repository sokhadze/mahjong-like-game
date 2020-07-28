import {Component, OnInit} from '@angular/core';
import {CardModel} from './models/card-model';
import {CardService} from './services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mahjong-like-game';
  numbers: CardModel[] = [];

  constructor(private cardService: CardService) {
    setTimeout(
      () => {
        this.cardService.hideAllCard();
      }, 4000);
  }

  ngOnInit(): void {
    this.numbers = this.cardService.getCards;
  }
}
