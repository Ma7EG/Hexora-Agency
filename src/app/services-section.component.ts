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
            </div>
            <div *ngFor="let item of marqueeServicesAlt; trackBy: trackByService" class="px-5 py-3 rounded-full border border-[#c8f4ff] bg-white text-[#111827] shadow-sm whitespace-nowrap shrink-0 flex items-center gap-2">
              <span class="text-[12px] md:text-sm font-['Stapel'] uppercase tracking-[0.12em] font-medium">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Kill The Ketchup Bottle Canvas Section -->
      <div class="relative flex flex-col items-center justify-center my-10 overflow-hidden min-h-[620px] w-full">
        <div class="text-center mb-2 z-10">
          <span class="text-xs font-['Stapel'] uppercase tracking-widest text-[#5b54fc] font-semibold bg-[#eefcff] px-4 py-1.5 rounded-full border border-[#c8f4ff] shadow-xs">
            Interactive Experience
          </span>
        </div>

        <div class="relative w-full max-w-[600px] h-[460px] flex items-center justify-center">
          <!-- Main Interactive Bottle SVG -->
          <svg id="ketchup-svg" viewBox="0 0 500 500" class="w-[450px] h-[450px] cursor-pointer relative z-20 overflow-visible">
            <g id="ketchup" (click)="explodeBottle()">
              <g id="legs">
                <g id="leg-r">
                  <path class="leg-r" fill="#5b54fc" d="M274.563,342.125c0,0,12.271,42.709,25.604,61.542c0,0-18.167,6.67-19,16.835c0,0,0.833,5.831,9.5,3.331s20.167-11.254,22-13.877s-2-7.956-2-7.956s-11.667-8.833-27.792-59.875H274.563z"/>
                  <path id="leg-r-light" fill="#5b54fc" d="M291.125,410.438c0,0,3.813-0.438,4.125,2.5s-3.563,6.938-7.188,8.875s-6.188-1.875-4.688-4.625S287.313,411.688,291.125,410.438z"/>
                </g>
                <g id="leg-l">
                  <path class="leg-l" fill="#5b54fc" d="M196,327.5c0,0-13.5,55.25-12,70.25c0,0-3.75-1.768-11-1.259s-13.75,1.259-14.75,6.009c0,0-0.5,8.25,20.5,8.5c0,0,14,1,15-3.75s-7.083-22.583,10.583-79.791C204.333,327.459,199.25,326.25,196,327.5z"/>
                  <path id="leg-l-light" fill="#5b54fc" d="M173.999,398.563c0,0-1.874-0.063-3.999,0s-8.313,0.625-8.688,4.313s6.688,3.375,8.813,3.375s8.563-0.584,8.188-3.854S173.999,398.563,173.999,398.563z"/>
                </g>
              </g>

              <!-- Hidden Dead Morph Target Shapes -->
              <g id="dead-shapes" class="hidden">
                <path id="dead-body-base" d="M163.756,336.619c0,0,43.25-51.685,2.75-140.25c-7.566-16.546,7.5-22.667,21.25-30.5c22.75-16,27.25-41,28.25-43s1.5-21.75,2.25-29.25s10.584-6.917,10.584-6.917l9.416-28.333c14-7.25,29,0,29,0c0.5,6.5,7,27.75,7,27.75c10,1.5,10.5,6.5,10.5,6.5l-0.25,11.75c0.75,12.5,5.75,39.75,13.75,50.25s8.887,7.333,24.25,17.75c11.061,7.5,9.5,25.5,9.5,25.5s-55.583,41.464-1.916,135.898c3.214,5.655,0.916,15.102-6.334,24.852s-19.5,8-19.5,8l-127.5-13.556C160.756,349.758,163.756,336.619,163.756,336.619z"/>
                <path id="dead-body-shadow" d="M317.006,198.869c10.28-11.612-15.781-24.924-22.5-29.833c-8.667-6.333-15.667-43.833-15.667-43.833l-4-26.667l-6.333-6.667l-7-30.709l5.75-2.791l7,27.75c11.583,2.249,10.474,7.752,10.474,7.752l-0.156,7.327c-0.103,4.831,1.13,13.884,1.13,13.884c4.447,26.712,8.009,32.686,13.107,40.265c7.862,11.689,12.137,7.195,24.953,17.666c0,0,8.209,5.292,8.242,24.856s-24,14.565-21.5,66.065s20.924,58.033,21.462,73.267c0,0,0.788,11.105-8.712,22.543c-8.807,10.603-24.999,6.237-24.999,6.237s21.748-6.607,17.082-27.327S276.339,244.804,317.006,198.869z"/>
                <path id="dead-mouth" d="M242.412,159.415c-4.996-0.539-24.356-3.04-27.866,3.867c-1.414,2.782,1.86,7.476,4.647,7.96c2.787,0.485,18.394,1.57,29.05,3.732c10.656,2.16,19.219,5.512,20.102,0.048C269.228,169.558,261.003,161.344,242.412,159.415z"/>
                <path id="dead-tongue" d="M238.187,173.356c0,0-5.565,0.272-7.604,2.177c-2.04,1.905-4.603,17.145-6.447,18.523c-2.986,2.23-10.201,2.113-11.67-6.289c-1.467-8.402,3.719-17.182,8.2-19.119c4.479-1.937,8.252,1.112,8.252,1.112S236.392,168.498,238.187,173.356z"/>
                <path id="dead-eye-l" d="M228.004,146.182c1.394-1.028,2.49-1.945,2.523-2.281c0.093-0.931-0.642-1.459-1.195-1.05c-0.047,0.035-1.334,1.052-2.848,2.284c-1.376-0.939-2.475-1.668-2.475-1.668c-0.47-0.314-0.941,0.641-0.73,1.18c0.067,0.173,0.854,0.795,1.9,1.558c-1.82,1.504-3.571,3.015-3.678,3.339c-0.224,0.679,0.193,0.626,0.464,0.634c0.14,0.003,2.434-1.45,4.612-2.973c2.02,1.418,4.253,2.887,4.448,2.902c0.357,0.024,0.773-0.481,0.859-0.917C231.928,148.972,229.976,147.552,228.004,146.182z"/>
                <path id="dead-eye-r" d="M265.199,154.287c-0.091-0.246-1.393-1.702-2.872-3.244c1.424-1.03,2.569-1.91,2.592-2.024c0.058-0.292-1.035-1.166-1.035-1.166c-0.175,0.066-1.454,0.842-2.942,1.771c-1.361-1.361-2.604-2.508-2.922-2.57c-0.781-0.153-0.661,0.78-0.661,0.78c0.056,0.011,1.069,1.18,2.306,2.595c-1.904,1.206-3.746,2.413-3.828,2.572c-0.165,0.322,0.22,1.713,0.938,1.652c0.358-0.03,2.332-1.332,4.247-2.679c1.585,1.794,3.122,3.482,3.298,3.432C264.695,155.301,265.395,154.831,265.199,154.287z"/>
              </g>
