// Modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mat modules
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';

// Locale registry
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeHu from '@angular/common/locales/hu';
import localePl from '@angular/common/locales/pl';
import localePt from '@angular/common/locales/pt';
import localeRo from '@angular/common/locales/ro';
import localeRu from '@angular/common/locales/ru';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeEs, 'es');
registerLocaleData(localeHu, 'hu');
registerLocaleData(localePl, 'pl');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeRo, 'ro');
registerLocaleData(localeRu, 'ru');

// Components
import { AppComponent } from './app.component';
import { BuilderComponent } from './builder/builder.component';
import { WorkManagerComponent } from './work-manager/work-manager.component';
import { CurrencyControlComponent } from './currency-control/currency-control.component';
import { En8CurrencyPipe } from './en8-currency.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent,
    WorkManagerComponent,
    CurrencyControlComponent,
    En8CurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
