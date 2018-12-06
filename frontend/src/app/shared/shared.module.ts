import { NgModule, ModuleWithProviders } from '@angular/core';
import { MenuItems } from './menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './fullscreen';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TextMaskModule } from 'angular2-text-mask';
import { AlertModule, BsDropdownModule, TypeaheadModule, ModalModule, TabsModule, ProgressbarModule, TooltipModule } from 'ngx-bootstrap';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { NotificationService } from '../common/notifications/notification-service';
import { PopupComponentWrapper } from '../common/popup-component-wrapper/popup-component-wrapper';
import { ComponentWrapper } from '../common/component-wrapper/component-wrapper';
import { RenderDynamicComponent } from '../common/dynamic-component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ConfirmComponent } from '../common/confirm-modal/confirm-component';
import { ListComponentWrapper } from '../common/list-component-wrapper/list-component-wrapper';

import { AppService } from '../services/app-service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { HelperService } from './service/helper-services';
import { CommonService } from './service/common.service';
import { NotificationsComponent } from '../common/notifications/notifications.component';
import { DurationDisplayPipe } from './pipe/DurationDisplayFilterPipe';
import { JsonStringFilterPipe } from './pipe/JsonStringFilterPipe';
import { LastArrayFilterPipe } from './pipe/LastArrayFilterPipe';
import { ErrorFilterPipe } from './validation/pipeShowValidation';
import { WindowProvider, DefaultStorageTypeProvider } from 'app/shared/providers';
import { ClientStoreService } from 'app/shared/service/client-storage.service';
import { CheckboxButtonsComponent } from './components/checkbox-buttons/checkbox-buttons.component';
import { ButtonsModule, BsDatepickerDirective } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NumberInputDirective } from './directives/number-input.directive';
import { FormUtility } from './utility/form.utility';
import { FixheaderDirective } from '@app/shared/directives/fixheader.directive';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { Select2Component } from 'angular-select2-component';

import { EventStopPropagationDirective } from './directives/event-stop-propagation.directive';

import { StringUtility } from './utility/string.utility'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective,
    ConfirmComponent,
    RenderDynamicComponent,
    ComponentWrapper,
    PopupComponentWrapper,
    ListComponentWrapper,
    NotificationsComponent,
    DurationDisplayPipe,
    JsonStringFilterPipe,
    LastArrayFilterPipe,
    ErrorFilterPipe,
    CheckboxButtonsComponent,
    NumberInputDirective,
    FixheaderDirective,
    CheckboxComponent,
    Select2Component,
    
    EventStopPropagationDirective,
    
  ],
  imports: [
    TranslateModule.forChild(),
    ToasterModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    CommonModule,
    TabsModule,
    NgxDatatableModule,
    AngularMultiSelectModule,
    TypeaheadModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule,
    MultiselectDropdownModule,
    BsDatepickerModule.forRoot(),
    Ng2SmartTableModule
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // CustomFormsModule,
    // HttpModule,
    // NgbModule,
    NgxDatatableModule,
    TextMaskModule,
    AlertModule,
    ToasterModule,
    BsDropdownModule,
    TypeaheadModule,
    TabsModule,
    TooltipModule,
    ConfirmComponent,
    NotificationsComponent,
    RenderDynamicComponent,
    ComponentWrapper,
    PopupComponentWrapper,
    ListComponentWrapper,
    ModalModule,
    AngularMultiSelectModule,
    CheckboxButtonsComponent,
    ButtonsModule,
    MultiselectDropdownModule,
    NumberInputDirective,
    FixheaderDirective,
    CheckboxComponent,
   
    Select2Component,
    EventStopPropagationDirective,
    Ng2SmartTableModule,
   
  ],
  bootstrap: [
    PopupComponentWrapper,
    ComponentWrapper,
    ListComponentWrapper,
   
    CheckboxButtonsComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MenuItems,
        NotificationService,
        ToasterService,
        TranslateService,
        AppService,
        AppService,
        HelperService,
        CommonService,
        WindowProvider,
        DefaultStorageTypeProvider,
        ClientStoreService,
        FormUtility,
        DatePipe,
        StringUtility
      ]
    };
  }
}
