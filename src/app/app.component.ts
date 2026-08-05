import { Component, signal, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { HeroComponent } from './hero.component';
import { ServicesSectionComponent } from './services-section.component';
import { VisionMissionComponent } from './vision-mission.component';
import { AcademySectionComponent } from './academy-section.component';
import { FooterComponent } from './footer.component';
import { ContactModalComponent } from './contact-modal.component';
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
