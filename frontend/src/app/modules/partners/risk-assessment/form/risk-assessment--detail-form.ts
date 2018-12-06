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
import { PopupConfig } from '@app/common/popup-component-wrapper/popup-object-result-model';
import { ConvertPDFPopupComponent } from '@app/modules/partners/risk-assessment/popups/convert-pdf-popup/convert-to-pdf.component';
import { EmailSharingPopupComponent } from '@app/modules/partners/risk-assessment/popups/share-popup/email-sharing.component';


@Component({
  selector: 'risk-assessment-detail-form',
  templateUrl: './risk-assessment-detail-form.html',
  styleUrls:['./risk-assessment-detail.scss']
})
export class RiskAssessmentDetailFormComponent extends AppComponentBase
  implements OnInit, AfterViewInit, ICommonComponent {
  pathValue(value: any) {
    this.profileForm.patchValue(value);
  }
  gotoCreate() {
    this.router.navigateByUrl("/common/newriskAssessment");
  }
  getFormGroup(): FormGroup {
    return this.profileForm;
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
  profileForm: FormGroup;
  editingRiskAssessment: RiskAssessmentModel = new RiskAssessmentModel();

  riskAssessmentId: string
  isEditing: boolean = false;
  readonly = false;
  // riskAssessmentTypes: any = [{ code: "Stock", name: "Stock RiskAssessment" }, { code: "Service", name: "Service RiskAssessment" }];

  @ViewChild("confirm") confirmModal: ConfirmComponent;
  @ViewChild("convertPdf") pdfPopup: PopupComponentWrapper;
  @ViewChild("emailPopup") emailPopup: PopupComponentWrapper;
  createTitle: string;
  editTitle: string;
  customer: Customer = new Customer();
  pdfPopConfig: PopupConfig = new PopupConfig();
  emailPopConfig: PopupConfig = new PopupConfig();
  pdfPopupComponent: Type<any> = ConvertPDFPopupComponent;
  emailPopupComponent: Type<any> = EmailSharingPopupComponent;
  questions: RiskAssessmentQuestion[] = [];
  surveyName: string = "Qualification";
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
    this.profileForm = this.buildForm();
    this.createTitle = "RISK_ASSESSMENT_TTITLE";
    this.editTitle = "RISK_ASSESSMENT_TTITLE";
    this.pdfPopConfig.showFooter = false;
    this.emailPopConfig.showFooter = false;
    this.customerService.pdfDownloaded.subscribe(result => {
      this.pdfPopup.cancelHandler();
    })

    this.customerService.emailClosed.subscribe(result => {
      this.emailPopup.cancelHandler();
    })
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      first_name: [null, [Validators.required, Validators.maxLength(100)]],
      last_name: [null, []],
      last_updated: [new Date(), []],
      ndis_id: [null, [Validators.required]],
      surveys: [{}, []]
    });
  }

  ngAfterViewInit(): void {

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.riskAssessmentId = params['id'];

      this.customerService.getSurvey(this.surveyName).subscribe(result => {
        this.editingRiskAssessment.questions = [];
        this.editingRiskAssessment.scales = result.scales;
        Object.keys(result.survey_questions).forEach((key, index) => {
          let q = new RiskAssessmentQuestion();
          q.questionText = result.survey_questions[key];
          q.questionId = key;
          this.questions.push(q);
        });
        this.editingRiskAssessment.questions = this.questions;
      })


      if (this.riskAssessmentId && this.riskAssessmentId != "0") {
        this.customerService.getById(this.riskAssessmentId).subscribe(profile => {

          this.customer = profile;
          this.questions.forEach((q) => {
            let latestresult = this.customer.surveys[this.surveyName][q.questionId];

            q.Date = latestresult[latestresult.length - 1].Date;
            q.Notes = latestresult[latestresult.length - 1].Notes;
            q.Scale = latestresult[latestresult.length - 1].Scale;
          })

          this.profileForm.patchValue(this.customer);
          this.profileForm.markAsPristine();
          this.isEditing = true;
        },
          error => {
            this.isEditing = false;
          })

      }
      // else {
      //   this.isEditing = false;
      //   var tenantId = 0;
      //   var organizationUnitId = 0;
      //   this.editingRiskAssessment = new RiskAssessmentModel();
      // }
    });
  }
  updateNote($event, question) {
    question.Notes = $event.target.value;
  }
  redirectToEditPage() {
    this.router.navigate(['/profiles/risk/', this.riskAssessmentId]);
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
    let model = Object.assign(this.customer, this.profileForm.value);
    this.customer.surveys[this.surveyName] = {};
    this.questions.forEach((q, index) => {
      this.customer.surveys[this.surveyName][q.questionId] = [{ Scale: q.Scale, Date: new Date(), Notes: q.Notes }]
    });

    return this.customerService.update(model);
  }
  updateRiskAssessment() {
    let model = Object.assign(this.customer, this.profileForm.value);
    this.questions.forEach((q, index) => {
      this.customer.surveys[this.surveyName][q.questionId].push({ Scale: q.Scale, Date: new Date(), Notes: q.Notes });
    });
    return this.customerService.update(this.customer);
  }

  cancel() {
    this.router.navigate(['/profiles/list'])
  }
  convertToPDF() {
    this.pdfPopup.showCreate();
  }

  showEmailSharing() {
    this.emailPopup.showCreate();
  }

  loadVersionHistory($event, date) {
    $event.preventDefault();
    this.questions.forEach((q) => {
      let value = this.customer.surveys[this.surveyName][q.questionId].find((e) => {
        return e.Date == date;
      })

      q.Date = value.Date;
      q.Notes = value.Notes;
      q.Scale = value.Scale;
    });
  }
}
