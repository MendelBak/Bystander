import {makeAutoObservable} from 'mobx';

export default class SymptomModel {
  bluntTrauma: boolean = false;
  choking: boolean = false;
  drowning: boolean = false;
  hemmoraging: boolean = false;
  other: boolean = false;

  constructor(symptomModel?: SymptomModel) {
    makeAutoObservable(this);
    if (symptomModel) {
      this.bluntTrauma = symptomModel.bluntTrauma;
      this.choking = symptomModel.choking;
      this.drowning = symptomModel.drowning;
      this.hemmoraging = symptomModel.hemmoraging;
      this.other = symptomModel.other;
    }
  }
}
