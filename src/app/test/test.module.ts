import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule} from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './components/test/test.component';


import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutusPageComponent } from './components/aboutus-page/aboutus-page.component';
import { CommonModule } from "../common/common.module";
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { OurPortfolioComponent } from './components/our-portfolio/our-portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';
import { SinglePortfolioComponent } from './components/single-portfolio/single-portfolio.component';

@NgModule({
  declarations: [
    TestComponent,
    HomePageComponent,
    AboutusPageComponent,
    BlogsComponent,
    ContactUsComponent,
    OurPortfolioComponent,
    ServicesComponent,
    SingleArticleComponent,
    SinglePortfolioComponent,
    
  ],
  imports: [
    NgCommonModule,
    TestRoutingModule,
    MatInputModule,
    FormsModule,
    CommonModule
]
})
export class TestModule { }
