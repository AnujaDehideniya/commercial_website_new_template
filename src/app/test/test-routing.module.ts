import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutusPageComponent } from './components/aboutus-page/aboutus-page.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';
import { SinglePortfolioComponent } from './components/single-portfolio/single-portfolio.component';
import { OurPortfolioComponent } from './components/our-portfolio/our-portfolio.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [

  {
    path: 'test', component: TestComponent,
  },
  {
    path: '', component: HomePageComponent,
  },
  {
    path: 'about-us', component:AboutusPageComponent,
  },
  {
    path: 'contact_us', component:ContactUsComponent,

  },
  {
    path: 'single_article', component:SingleArticleComponent,
  },
  {
    path: 'single_portfolio', component:SinglePortfolioComponent,
  },
  {
    path: 'our_portfolio', component:OurPortfolioComponent,
  },
  {
    path: 'blogs', component:BlogsComponent,
  },
  {
    path: 'services', component:ServicesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
