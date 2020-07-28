import { Injectable } from '@angular/core';
import {CardModel} from '../models/card-model';
import {Observable} from 'rxjs';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cards: CardModel[] = [];
  getCards = this.cards;
  private count = 0;

  private compareCards: CardModel[] = [];
  getComparedCards = this.compareCards;
  private selectedCardCount = 0;

  constructor(private utilsService: UtilsService) {
    for (let i = 0; i < 15; i++) {
      this.generateCard();
    }
    this.utilsService.shuffle(this.cards);
  }

  public hideAllCard(): any {
    this.cards.forEach(
      (r: CardModel) => {
        r.hide = true;
      }
    );
  }

  public compareNumbers(card: CardModel): Observable<any> {
    let compared = false;
    if (this.selectedCardCount > 1) {
      return;
    }
    this.cards.find(r => r.id === card.id).selected = true;
    this.cards.find(r => r.id === card.id).hide = false;
    this.compareCards.push(card);
    this.selectedCardCount++;
    if (this.getComparedCards.length === 2) {
      compared = this.compareCards.filter(r => r.value === card.value).length > 1;
      if (compared) {
        if (this.compareCards.find(r => r.value === card.value)) {
          this.unlockCards(card);
        }
      } else {
        this.cleanSelectedCards(card);
      }
    }
    return;
  }

  public generateRandom(from: number, to: number): number {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  public generateCard(): any {
    let generatedValue = 0;
    while (true) {
      generatedValue = this.generateRandom(1, 50);
      if (!this.cards.find(r => r.value === generatedValue)) {
        break;
      }
    }

    this.pushCard(generatedValue);
    this.pushCard(generatedValue);
  }

  private pushCard(generatedValue: number): any {
    this.count++;
    const card: CardModel = {id: this.count, value: generatedValue, view: false};
    this.cards.push(card);
  }

  private cleanSelectedCards(card: CardModel): void {
    setTimeout(
      () => {
        this.cards.forEach(r => {
          if (r.value === card.value || r.id === this.compareCards[0].id) {
            r.selected = false;
            r.view = false;
            r.hide = true;
          }
        });
        this.compareCards.length = 0;
        this.selectedCardCount = 0;
      }, 2000);
  }

  private unlockCards(card: CardModel): void {
    this.cards.forEach(r => {
      if (r.value === card.value) {
        r.selected = false;
        r.view = true;
        r.hide = false;
        this.compareCards.length = 0;
        this.selectedCardCount = 0;
      }
    });
  }
}
