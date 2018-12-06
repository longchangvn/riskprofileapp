
export class RiskAssessmentModel {
  public customerId: string;

  public lastUpdated: string;
  public scales: string;
  public questions: RiskAssessmentQuestion[];
}

export class RiskAssessmentQuestion {
  public questionText: string;
  public questionId: string;
  public helpText: string;
  public Scale: string;
  public Notes: string;
  public Date: string;
}
