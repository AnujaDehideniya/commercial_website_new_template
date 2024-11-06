import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CommonRoutingModule } from './common-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule as NgCommonModule }  from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DoneDialogComponent } from './components/dialogs/done-dialog/done-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatNativeDateModule } from '@angular/material/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './components/app-component/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
import { DatePipe } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { CardComponent } from './components/card/card.component';
import { ImgSlideComponent } from './components/img-slide/img-slide.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsSlideComponent } from './components/projects-slide/projects-slide.component';
import { AuthModule } from "../auth/auth.module";
import { FooterComponent } from './components/footer/footer.component';
import { TeamcardsComponent } from './components/teamcards/teamcards.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);
@NgModule({
  declarations: [
    NotFoundComponent,
    ConfirmationDialogComponent,
    DoneDialogComponent,
    SliderComponent, 
    ArticlesComponent,
    BlogCardComponent,
    CardComponent,
    ImgSlideComponent,
    NavbarComponent,
    ProjectsSlideComponent,
    FooterComponent,
    TeamcardsComponent,
    ProjectsSlideComponent,
    ProjectCardComponent

  ],
  imports: [
    NgCommonModule,
    CommonRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SwiperModule,
    EditorModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    AuthModule
],
  exports: [SliderComponent,ArticlesComponent,CardComponent,ImgSlideComponent,NavbarComponent,FooterComponent,TeamcardsComponent,ProjectsSlideComponent,ProjectCardComponent,BlogCardComponent]
})
export class CommonModule { }
