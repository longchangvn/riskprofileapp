
export class RiskAssessmentModel {
  public customerId: string;

  public lastUpdated: string;
  public scales: string;
  public questions: RiskAssessmentQuestion[];
}

export class RiskAssessmentQuestion {
  public questionText: string;
  public helpText: string;
  public value: string;
  public note: string;
}
