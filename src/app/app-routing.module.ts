import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      loadChildren: () =>
        import('../app/profile/profile.module').then(m => m.ProfileModule)
    },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
