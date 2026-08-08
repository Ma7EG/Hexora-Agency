import { Component, signal, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { HeroComponent } from './hero.component';
import { ServicesSectionComponent } from './services-section.component';
import { VisionMissionComponent } from './vision-mission.component';
import { AcademySectionComponent } from './academy-section.component';
import { FooterComponent } from './footer.component';
import { ContactModalComponent } from './contact-modal.component';
import { HexiChatbotComponent } from './hexi-chatbot.component';
import { NgxLavaLampComponent } from '@omnedia/ngx-lava-lamp';
import { ServiceItem } from '../types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgxLavaLampComponent,
    NavbarComponent,
    HeroComponent,
    ServicesSectionComponent,
    VisionMissionComponent,
    AcademySectionComponent,
    FooterComponent,
    ContactModalComponent,
    HexiChatbotComponent,
  ],
  template: `
    <div class="min-h-screen bg-[#f4fdff] text-[#111827] relative selection:bg-[#5b54fc] selection:text-white overflow-x-hidden">
      <!-- Full Page Background Ambient Glow Fallback & WebGL Lava Lamp -->
      <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-40 -left-40 w-96 h-96 bg-[#5b54fc]/20 rounded-full blur-[120px]"></div>
        <div class="absolute top-1/3 -right-40 w-96 h-96 bg-[#5b54fc]/20 rounded-full blur-[120px]"></div>

        <div *ngIf="isBrowser" class="w-full h-full opacity-40">
          <om-lava-lamp
            [color]="'#5b54fc'"
            [cursorBallColor]="'#5b54fc'"
            [speed]="0.3"
            [ballCount]="14"
            [animationSize]="32"
            [clumpFactor]="1.1"
            [cursorBallSize]="4"
            [enableMouseInteraction]="true"
          ></om-lava-lamp>
        </div>
      </div>

      <div class="relative z-10">
        <app-navbar
          [activeTab]="activeTab()"
          (setActiveTab)="setActiveTab($event)"
          (openContact)="openContact()"
        ></app-navbar>

        <main id="home">
          <app-hero
            (startJourney)="openContact()"
            (contactUs)="openContact()"
          ></app-hero>

          <app-services-section
            (selectService)="openContactWithService($event)"
          ></app-services-section>

          <app-vision-mission></app-vision-mission>
          <app-academy-section (openContact)="openContactWithText($event)"></app-academy-section>
        </main>

        <app-footer (openContact)="openContact()"></app-footer>
        <app-contact-modal
          [isOpen]="contactOpen()"
          [prefilledService]="contactPrefill()"
          (close)="closeContact()"
        ></app-contact-modal>
        <app-hexi-chatbot></app-hexi-chatbot>
      </div>
    </div>
  `,
})
export class AppComponent {
  activeTab = signal('home');
  contactOpen = signal(false);
  contactPrefill = signal('');
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isBrowser || typeof document === 'undefined') return;
    try {
      const canvas = document.querySelector('om-lava-lamp canvas') as HTMLCanvasElement;
      if (canvas) {
        canvas.dispatchEvent(new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true
        }));
      }
    } catch (err) {}
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
    if (!this.isBrowser || typeof document === 'undefined') return;
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openContact() {
    this.contactPrefill.set('');
    this.contactOpen.set(true);
  }

  openContactWithService(service: ServiceItem) {
    this.contactPrefill.set(service.title);
    this.contactOpen.set(true);
  }

  openContactWithText(text?: string) {
    this.contactPrefill.set(text || '');
    this.contactOpen.set(true);
  }

  closeContact() {
    this.contactOpen.set(false);
  }
}

