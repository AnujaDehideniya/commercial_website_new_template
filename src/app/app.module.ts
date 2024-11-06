import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './common/components/app-component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from './common/common.module';
import { SwiperModule } from "swiper/angular";
import { SwiperComponent } from 'swiper/angular';
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
import { SpinnerComponent } from './spinner/spinner.component';
import { CommonModule as NgCommonModule} from '@angular/common';
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
    AppComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    SwiperModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgCommonModule
],
  providers: [
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
