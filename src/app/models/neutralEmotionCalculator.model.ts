import { EmotionCalculator } from "./emotionCalculator.model";

export class NeutralEmotionCalculator extends EmotionCalculator {
  public constructor(minWeight: number, maxWeight: number) {
    super(minWeight, maxWeight);
  }

  public setEmotionBasedOnUserScoreOf(userScore: number) {
    if ( super.isWithinRangeBasedOn(userScore) ) {
      return this.emotions.NEUTRAL;
    }
  }
}
