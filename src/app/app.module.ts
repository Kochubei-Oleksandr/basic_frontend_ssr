import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {I18nModule} from "../shared/ssr-services/i18n/i18n.module";

//landing modules
import { LandingComponent } from '../components/landing/landing.component';
import {FirstSectionComponent} from "../components/landing/first-section/first-section.component";

//angular material modules
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";

//app modules
import { AppComponent } from './app.component';
import {LoginComponent} from "../components/auth/login/login.component";
import {RegistrationComponent} from "../components/auth/registration/registration.component";
import {NavbarComponent} from "../shared-components/navbar/navbar.component";
import {PdfModalDialogComponent} from "../shared-components/pdf-modal-dialog/pdf-modal-dialog.component";
import {LanguageSwitchingComponent} from "../shared-components/navbar/language-switching/language-switching.component";
import {ProgressSpinnerComponent} from "../shared-components/progress-spinner/progress-spinner.component";
import {TokenInterceptor} from "../shared/interceptors/token.interceptor";
import {ApiConfigInterceptor} from "../shared/interceptors/api-config.interceptor";
import {LanguageService} from "../shared/services/language.service";
import {InitialRequestsService} from "../shared/services/initial-requests.service";
import {LogNotificationService} from "../shared/services/log-notification.service";
import {ServerValidationFormService} from "../shared/services/server-validation-form.service";
import {ReviewDialog} from "../shared-components/review-dialog/review-dialog.component";

const LANDING_MODULES = [
  LandingComponent,
  FirstSectionComponent
];
const MAIN_COMPONENTS = [
  AppComponent,
  LoginComponent,
  RegistrationComponent,

];
const SHARED_COMPONENTS = [
  NavbarComponent,
  PdfModalDialogComponent,
  LanguageSwitchingComponent,
  ProgressSpinnerComponent,
  ReviewDialog
];
const SHARED_PIPES = [

];
const SHARED_SERVICES = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiConfigInterceptor,
    multi : true
  },
  LanguageService,
  InitialRequestsService,
  LogNotificationService,
  ServerValidationFormService,
];
const ANGULAR_MATERIAL_MODULES = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatCardModule,
  MatTooltipModule,
  MatRadioModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    ...LANDING_MODULES,
    ...MAIN_COMPONENTS,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    I18nModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...ANGULAR_MATERIAL_MODULES
  ],
  providers: [
    ...SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
