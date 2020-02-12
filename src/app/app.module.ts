import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { AppComponent }           from './app.component';
import { GeneratorComponent }     from './gener/generator.component';
import { PaymentsComponent }      from './payments/payments.component';
import { AppRoutingModule }       from './app-routing.module';
import { RouterModule }               from '@angular/router';
import { NavBarComponent }            from './shared/nav-bar/nav-bar.component';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';
import {MatButtonModule}              from '@angular/material/button';
import { FormsModule }                from '@angular/forms';
import { ScoreComponent } from './shared/score.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PaymentsComponent,
    NavBarComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
