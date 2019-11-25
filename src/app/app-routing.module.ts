import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', loadChildren: './login/login.module#LoginPageModule' },
   { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'students', loadChildren: './pages/students/students.module#StudentsPageModule' },
  { path: 'menu-conductor', loadChildren: './menu-conductor/menu-conductor.module#MenuConductorPageModule' },
  { path: 'parents', loadChildren: './pages/parents/parents.module#ParentsPageModule' },
  { path: 'menu-parent', loadChildren: './menu-parent/menu-parent.module#MenuParentPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
