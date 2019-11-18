import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   //{ path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: '', loadChildren: './login/login.module#LoginPageModule' },
   { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'users', loadChildren: './pages/users/users.module#UsersPageModule' },
  { path: 'students', loadChildren: './pages/students/students.module#StudentsPageModule' },
  { path: 'menu-conductor', loadChildren: './menu-conductor/menu-conductor.module#MenuConductorPageModule' },
  { path: 'parents', loadChildren: './pages/parents/parents.module#ParentsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
