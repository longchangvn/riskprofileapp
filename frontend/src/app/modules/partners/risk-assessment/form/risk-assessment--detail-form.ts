import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Injector, ViewChild, ElementRef, AfterViewInit, Type, ComponentRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { ConfirmComponent } from '../../../../common/confirm-modal/confirm-component';

import { TranslateService } from '@ngx-translate/core';
import { AppComponentBase } from '../../../../common/base/app-component-base';
import { NotificationService } from '../../../../common/notifications/notification-service';
import { IPopupComponentWrapper } from '../../../../interfaces/ipopup-component';
import { PopupComponentWrapper } from '../../../../common/popup-component-wrapper/popup-component-wrapper';
import { ICommonComponent, ValidationResultModel } from '../../../../interfaces/icommon-componnent';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { RiskAssessmentModel, RiskAssessmentQuestion } from '@app/modules/partners/models/risk-assessment.model';
import { CustomerService } from '@app/modules/partners/services/customer-service';
import { Customer } from '@app/modules/partners/models/customer.model';


@Component({
  selector: 'risk-assessment-detail-form',
  templateUrl: './risk-assessment-detail-form.html'
})
export class RiskAssessmentDetailFormComponent extends AppComponentBase
  implements OnInit, AfterViewInit, ICommonComponent {
  pathValue(value: any) {
    this.riskAssessmentForm.patchValue(value);
  }
  gotoCreate() {
    this.router.navigateByUrl("/common/newriskAssessment");
  }
  getFormGroup(): FormGroup {
    return this.riskAssessmentForm;
  }
  save(): Observable<any> {
    return this.onSubmit();
  }
  validateForm(): Observable<ValidationResultModel> {
    return of(new ValidationResultModel(true));
  }
  gotoEdit(itemId: string) {
    this.router.navigate(['/partners/risk', itemId]);
  }
  riskAssessmentForm: FormGroup;
  editingRiskAssessment: RiskAssessmentModel = new RiskAssessmentModel();

  riskAssessmentId: string
  isEditing: boolean = false;
  readonly = false;
  // riskAssessmentTypes: any = [{ code: "Stock", name: "Stock RiskAssessment" }, { code: "Service", name: "Service RiskAssessment" }];

  @ViewChild("confirm") confirmModal: ConfirmComponent;
  createTitle: string;
  editTitle: string;
  customer: Customer = new Customer();
  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private _location: Location,
    private customerService: CustomerService,
    private notify: NotificationService,
    private translate: TranslateService
  ) {
    super();
    this.riskAssessmentForm = this.buildForm();
    this.createTitle = "RISK_ASSESSMENT_TTITLE";
    this.editTitle = "RISK_ASSESSMENT_TTITLE";
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
    });
  }

  ngAfterViewInit(): void {

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.riskAssessmentId = params['id'];
      if (this.riskAssessmentId) {
        this.customerService.getById(this.riskAssessmentId).subscribe(profile => {
          this.customer = profile;
        })
        this.customerService.getSurvey("Qualification").subscribe(result => {
          this.editingRiskAssessment.questions = [];
          this.editingRiskAssessment.scales = result.scales;
          Object.keys(result.survey_questions).forEach((key, index) => {
            let q = new RiskAssessmentQuestion();
            q.questionText = result.survey_questions[key];
            q.questionId = key;
            this.editingRiskAssessment.questions.push(q);
          });
        })
        this.isEditing = true;
      }
      else {
        this.isEditing = false;
        var tenantId = 0;
        var organizationUnitId = 0;
        this.editingRiskAssessment = new RiskAssessmentModel();
      }
    });
  }
  updateNote($event, questionId) {
    this.customer.surveys['Qualification'][questionId][0].Notes = $event.target.value;
  }
  redirectToEditPage() {
    this.router.navigate(['/riskAssessment/edit', this.riskAssessmentId]);
  }
  onSubmit() {
    let response;
    if (this.isEditing)
      response = this.updateRiskAssessment();
    else
      response = this.createRiskAssessment();
    return response;
  }

  createRiskAssessment() {
    let model = Object.assign(this.editingRiskAssessment, this.riskAssessmentForm.value);
    return this.customerService.create(model);
  }
  updateRiskAssessment() {
    // let model = Object.assign(this.customer, this.riskAssessmentForm.value);
    console.log(this.customer);
    return this.customerService.update(this.customer);
  }

  cancel() {
    this.router.navigate(['/partners/list'])
  }

}
