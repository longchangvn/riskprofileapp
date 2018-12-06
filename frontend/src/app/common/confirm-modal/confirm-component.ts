import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Injector, Input, ViewChild, ElementRef, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Subject, Observable } from 'rxjs';
import { AppComponentBase } from '../base/app-component-base';


@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent extends AppComponentBase {

    @ViewChild("template") template: TemplateRef<any>;
    @Output() Ok: EventEmitter<any> = new EventEmitter<any>();
    @Output() Cancel: EventEmitter<any> = new EventEmitter<any>();
    @Input() DisplayMessage: string;
    @Input() OkCallback: Function;
    @Input() CancelCallback: Function;
    _subject: Subject<any> = new Subject<any>();
    modalref: BsModalRef;
    constructor(
        private modelService: BsModalService,
        injector: Injector
    ) {
        super();
    }


    show(okResultCallBack?: Function, cancelResultCallback?: Function, option?: any): Observable<any> {
        let opt = option || { backdrop: false, class: 'modal-sm', windowClass: 'modal-dialog-centered', size: "dialog-centered" };
        if (okResultCallBack)
            this.OkCallback = okResultCallBack;
        if (cancelResultCallback)
            this.CancelCallback = cancelResultCallback;
        this.modalref = this.modelService.show(this.template, opt);
        return this._subject.asObservable()
    }

    hide() {
        if (this.modalref)
            this.modalref.hide();
        this.modalref = null;
    }

    confirm() {
        if (this.OkCallback && typeof this.OkCallback === typeof Function)
         {
            this.OkCallback();
            this.hide();
         }   
        this._subject.next(true);
    }

    decline() {
        if (this.CancelCallback && typeof this.CancelCallback === typeof Function)
            this.CancelCallback();
        this._subject.next(false);
        this.hide();
    }
}
