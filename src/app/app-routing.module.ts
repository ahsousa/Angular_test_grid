import { NgModule, Component }                from '@angular/core';
import { RouterModule, Routes }               from '@angular/router';
import { PaymentsComponent }                  from './payments/payments.component';
import { GeneratorComponent }                 from './gener/generator.component';

const routes: Routes = [
  { path: '', component: GeneratorComponent},
  { path: 'payments' , component: PaymentsComponent },
  { path: 'generator', component: GeneratorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
