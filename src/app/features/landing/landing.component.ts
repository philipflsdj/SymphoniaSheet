import { Component } from '@angular/core';
import { NavbarPublicComponent } from './components/navbar-public.component';
import { HeroComponent } from './components/hero.component';
import { FeaturesComponent } from './components/features.component';
import { DemoComponent } from './components/demo.component';
import { PricingComponent } from './components/pricing.component';
import { TestimonialsComponent } from './components/testimonials.component';
import { FaqComponent } from './components/faq.component';
import { CtaComponent } from './components/cta.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarPublicComponent,
    HeroComponent,
    FeaturesComponent,
    DemoComponent,
    PricingComponent,
    TestimonialsComponent,
    FaqComponent,
    CtaComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen bg-surface-50 font-sans text-surface-900 selection:bg-[#6C5CE7] selection:text-white">
      <app-navbar-public></app-navbar-public>
      <main>
        <app-hero></app-hero>
        <app-features></app-features>
        <app-demo></app-demo>
        <app-pricing></app-pricing>
        <app-testimonials></app-testimonials>
        <app-faq></app-faq>
        <app-cta></app-cta>
      </main>
      <app-footer></app-footer>
    </div>
  `
})
export class LandingComponent {}
