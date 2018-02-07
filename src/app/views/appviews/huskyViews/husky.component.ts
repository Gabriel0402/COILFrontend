import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import 'rxjs/Rx';

import { Emotions } from '../../../models/emotions.enum';
import { EmotionDetectorService } from "../../../services/emotionDetector.service";

@Component({
  selector: 'husky',
  templateUrl: './husky.component.html',
  styleUrls: ['./husky.component.css']

})

export class HuskyComponent implements OnDestroy, OnInit {
  @Input() userScore: number;
  private defaultScore: number = 0.9;
  protected huskyEmotions = Emotions;
  emotion;

  ngOnInit() {
    let score = this.userScore ? this.userScore : this.defaultScore;
    this.emotion = this.emotionDetectorService.processWith(score);
  }

  ngOnDestroy() {
    this.emotion = null;
  }

  public constructor(private emotionDetectorService: EmotionDetectorService) {
  }
}
