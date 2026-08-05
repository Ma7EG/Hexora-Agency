import { Component, EventEmitter, Output, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNeonUnderlineComponent } from '@omnedia/ngx-neon-underline';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { HEXORA_SERVICES } from '../data/hexoraData';
import { ServiceItem } from '../types';
import { LanguageService } from './language.service';
import { TRANSLATIONS } from '../data/translations';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, NgxNeonUnderlineComponent, NgxMarqueeComponent],
  template: `
    <section id="services" class="py-24 px-5 md:px-8 max-w-[1440px] mx-auto scroll-mt-20">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#5b54fc]/25 bg-[#eefcff]/80 text-[#5b54fc] font-['Stapel'] text-xs uppercase tracking-[0.2em] mb-4 shadow-sm">
          <span>{{ t.services.badge }}</span>
        </div>
        <h2 class="fluid-headline text-[#111827] font-bold uppercase tracking-tight mb-3 font-headline">{{ t.services.title }}</h2>
        <div class="max-w-xs mx-auto mb-5">
          <om-neon-underline middleColor="#5b54fc" sideColor="#5b54fc" width="100%"></om-neon-underline>
        </div>
        <p class="text-[#4b5563] font-light max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          {{ t.services.desc }}
        </p>
      </div>

      <!-- Brand Marquee Feature Effect -->
      <div class="relative overflow-hidden rounded-[2rem] border border-[#5b54fc]/20 bg-white/80 shadow-[0_20px_70px_rgba(91, 84, 252,0.08)] px-3 py-6 md:px-6 md:py-8 mb-14 backdrop-blur-md flex flex-col gap-5">
        <div class="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#f4fdff] to-transparent z-10"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#f4fdff] to-transparent z-10"></div>

        <!-- Track 1: Brand Gradient Pills -->
        <div class="w-full overflow-hidden">
          <div class="animate-marquee-track1 flex gap-4 items-center">
            <div *ngFor="let item of marqueeServices; trackBy: trackByService" class="px-5 py-3 rounded-full brand-gradient text-white border border-white/60 shadow-md whitespace-nowrap shrink-0 flex items-center gap-2">
              <span class="text-[12px] md:text-sm font-['Stapel'] uppercase tracking-[0.12em] font-medium">{{ item }}</span>
            </div>
            <div *ngFor="let item of marqueeServices; trackBy: trackByService" class="px-5 py-3 rounded-full brand-gradient text-white border border-white/60 shadow-md whitespace-nowrap shrink-0 flex items-center gap-2">
              <span class="text-[12px] md:text-sm font-['Stapel'] uppercase tracking-[0.12em] font-medium">{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- Track 2: White/Cyan Contrast Pills -->
        <div class="w-full overflow-hidden">
          <div class="animate-marquee-track2 flex gap-4 items-center">
            <div *ngFor="let item of marqueeServicesAlt; trackBy: trackByService" class="px-5 py-3 rounded-full border border-[#c8f4ff] bg-white text-[#111827] shadow-sm whitespace-nowrap shrink-0 flex items-center gap-2">
              <span class="text-[12px] md:text-sm font-['Stapel'] uppercase tracking-[0.12em] font-medium">{{ item }}</span>
