import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonItem, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { arrowDownCircleOutline, arrowUpCircleOutline, chevronForwardOutline, arrowDownOutline, arrowUpOutline } from 'ionicons/icons';
import { ForDirective } from '../shared/for.directive';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [ IonItem, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonLabel, IonList, ForDirective, IonFab, IonFabButton, IonIcon]
})
export class NewPage implements OnInit {

  items: string[] = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

  @ViewChild(IonContent) content?: IonContent; //Referencia al IonContent del template (contenido de la página)

  arrowDown = arrowDownCircleOutline;
  arrowUp = arrowUpCircleOutline;
  chevron = chevronForwardOutline;

  scrollToBottom() {
    // scroll to bottom in 300ms
    this.content?.scrollToBottom(300);
    //El content? es una referencia al IonContent del template (contenido de la página)
  }
  
  scrollToTop() {
    this.content?.scrollToTop(300);
  }

  constructor() {
    addIcons({arrowDownOutline,arrowUpOutline,chevronForwardOutline}); 

  }

  ngOnInit() {
  }


}


