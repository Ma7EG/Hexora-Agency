import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNeonUnderlineComponent } from '@omnedia/ngx-neon-underline';
import { LanguageService } from './language.service';
import { TRANSLATIONS } from '../data/translations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, NgxNeonUnderlineComponent],
  template: `
    <section class="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-5 md:px-8 max-w-[1440px] mx-auto font-['Stapel']">
      <div class="w-full grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div class="space-y-8 z-10 text-center lg:text-left lg:max-w-xl">
          <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#5b54fc]/20 bg-white/90 text-[#5b54fc] font-['Stapel'] text-[12px] tracking-[0.2em] uppercase shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span>{{ t.hero.badge }}</span>
          </div>

          <div>
            <h1 class="font-['Stapel'] text-[clamp(2.2rem,4.8vw,4.25rem)] text-[#111827] font-medium tracking-tight leading-[1.08] mb-4">
              {{ t.hero.titleLine1 }} <br />
              <span class="brand-gradient-text font-medium">
                {{ t.hero.titleLine2 }}
              </span>
            </h1>
            <om-neon-underline middleColor="#5b54fc" sideColor="#5b54fc" width="100%"></om-neon-underline>
          </div>

          <p class="font-['Stapel'] text-[#4b5563] text-lg md:text-xl font-light leading-relaxed">
            {{ t.hero.subtitle }}
          </p>

          <div class="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start items-center pt-2">
            <button
              (click)="contactUs.emit()"
              class="brand-gradient text-white px-9 py-4 rounded-full font-['Stapel'] text-[13px] uppercase tracking-widest transition-all shadow-xl shadow-[#5b54fc]/25 hover:shadow-[#5b54fc]/40 hover:-translate-y-1 flex items-center gap-3 font-semibold"
            >
              <span>{{ t.hero.ctaSecondary }}</span>
            </button>
          </div>
        </div>

        <div class="relative flex flex-col items-center justify-center w-full min-h-[550px] lg:min-h-[720px] scale-105 lg:scale-110 overflow-visible">
          <!-- Background Brand Orbs / Glowing Shadows (Active when lamp is ON) -->
          <div
            class="absolute w-[90%] h-[90%] max-w-[650px] bg-[#5b54fc]/30 rounded-full blur-[120px] pointer-events-none transition-opacity duration-700"
            [ngClass]="{ 'opacity-100 animate-pulse': isLampOn, 'opacity-10': !isLampOn }"
          ></div>
          <div
            class="absolute w-[70%] h-[70%] max-w-[500px] bg-[#5b54fc]/35 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700"
            [ngClass]="{ 'opacity-100': isLampOn, 'opacity-5': !isLampOn }"
          ></div>

          <!-- Hanging Interactive Hexora Lamp -->
          <div class="hexora-lamp-wrapper z-30">
            <div
              class="bell-container"
              [ngClass]="{ 'off': !isLampOn }"
              (click)="toggleLamp()"
              title="Click lamp to turn ON / OFF"
            >
              <div class="rope"></div>
              <div class="bell-top"></div>
              <div class="bell-base"></div>
              <div class="bell-base"></div>
              <div class="shadow-l1"></div>
              <div class="shadow-l2"></div>
              <div class="left-glow"></div>
              <div class="left-glow2"></div>
              <div class="r-glow"></div>
              <div class="r-glow2"></div>
              <div class="mid-ring"></div>
              <div class="mid-ring small"></div>
              <div class="glow"></div>
              <div class="glow2"></div>
              <div class="bell-buff-t"></div>
              <div class="bell-buff"></div>
              <div class="bell-btm"></div>
              <div class="bell-btm2"></div>
              <div class="bell-ring-container">
