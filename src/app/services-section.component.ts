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

              <g id="body">
                <g id="body_1_">
                  <path id="body-base" fill="#5b54fc" d="M176.75,353.194l127.5,13.556c0,0,12.25,1.75,19.5-8s8-15.75,8.25-22.25s0-138.5,0-138.5s1.561-18-9.5-25.5c-15.363-10.417-16.25-7.25-24.25-17.75s-13-37.75-13.75-50.25l0.25-11.75c0,0-0.5-5-10.5-6.5c0,0-6.5-21.25-7-27.75c0,0-15-7.25-29,0l-9.417,28.333c0,0-9.833-0.583-10.583,6.917S217,121,216,123s-5.5,27-28.25,43c-13.75,7.833-20.25,12.333-21.25,30.5s-2.75,140.25-2.75,140.25S160.75,349.889,176.75,353.194z"/>
                  <path id="body-shadow" fill="#5b54fc" opacity="0.6" d="M317,199c0.5-15.5-15.781-24.924-22.5-29.833c-8.667-6.333-15.667-43.833-15.667-43.833l-4-26.667L268.5,92l-7-30.709l5.75-2.791l7,27.75c11.583,2.249,10.474,7.752,10.474,7.752l-0.156,7.327c-0.103,4.831,1.13,13.884,1.13,13.884c4.447,26.712,8.009,32.686,13.107,40.265c7.862,11.689,12.137,7.195,24.953,17.666C333.375,181,332,198,332,198l-0.038,139.332c0,0,0.788,11.105-8.712,22.543c-8.807,10.603-24.999,6.237-24.999,6.237s17.749-1.001,18.499-28.307S317,199,317,199z"/>
                </g>

                <g id="label">
                  <path id="label-wrapper-r" fill="#FFFFFF" d="M235.666,337.525c0,0,16.203,2.664,26.089-10.448c9.884-13.113,32.957-23.692,32.957-23.692s6.905-0.002,7.411-11.827c0.507-11.825,1.746-40.804,1.746-40.804s1.506-6.936-6.694-8.998c-8.199-2.062-21.951-7.56-30.922-19.838c-6.729-8.166-25.696-9.043-25.696-9.043L235.666,337.525z"/>
                  <path id="label-wrapper-l" fill="#FFFFFF" d="M237.917,337.781c0,0-15.819,1.171-24.195-12.791s-29.659-26.606-29.659-26.606s-6.644-0.633-6.108-12.455c0.536-11.821,1.851-40.793,1.851-40.793s-0.849-7.044,7.218-8.347c8.068-1.303,21.774-5.521,31.467-16.926c7.853-8.788,24.384-6.803,24.384-6.803L237.917,337.781z"/>
                  
                  <image
                    href="/assets/hexora-logo.png"
                    x="135" y="200" width="200" height="140" preserveAspectRatio="xMidYMid meet"
                  />
                </g>

                <g id="face">
                  <path id="mouth" class="mouth" fill="#111827" d="M258.547,161.183c-13.022,1.99-27.43-1.517-33.872-4.161c-6.443-2.642-8.7-0.435-9.164,2.549c-1.807,11.615,12.971,18.238,23.806,20.526c10.834,2.286,20.868-1.303,25.491-4.972C270.75,170.41,271.567,159.194,258.547,161.183z"/>
                  <path class="tongue" fill="#5b54fc" d="M241.656,168.512c-14.022-2.083-17.315,5.883-17.315,5.883s6.646,4.55,17.237,6.136c10.262,1.537,17.922-2.267,17.922-2.267S255.678,170.595,241.656,168.512z"/>
                  <g id="eyes">
                    <path id="eye-l" fill="#111827" d="M227.69,144.21c-2.843-0.625-5.665,1.239-6.288,4.157c-0.007,0.035-0.012,0.068-0.019,0.122c-0.063,0.335,0.146,0.657,0.47,0.728c0.004,0.002,0.01,0.002,0.014,0.003c0.334,0.063,0.653-0.161,0.717-0.499c0.005-0.026,0.009-0.052,0.013-0.093c0.479-2.24,2.648-3.674,4.833-3.193c2.185,0.481,3.574,2.695,3.09,4.953c-0.007,0.023-0.013,0.048-0.019,0.073c-0.08,0.335,0.124,0.666,0.451,0.747c0.326,0.076,0.662-0.135,0.744-0.471c0.008-0.034,0.017-0.067,0.024-0.102C232.344,147.719,230.536,144.837,227.69,144.21z"/>
                    <path id="eye-r" fill="#111827" d="M260.763,149.024c-2.884-0.393-5.553,1.692-5.949,4.649c-0.005,0.035-0.007,0.069-0.012,0.122c-0.036,0.321,0.174,0.615,0.478,0.682c0.019,0.004,0.039,0.007,0.061,0.009c0.337,0.039,0.638-0.21,0.678-0.554c0.002-0.024,0.003-0.051,0.008-0.092c0.147-1.102,0.703-2.08,1.567-2.755c0.862-0.674,1.931-0.966,3.005-0.82c1.073,0.147,2.023,0.714,2.68,1.596c0.654,0.881,0.934,1.973,0.783,3.089c-0.005,0.025-0.009,0.049-0.013,0.076c-0.055,0.343,0.175,0.655,0.505,0.707c0.335,0.055,0.648-0.188,0.705-0.53c0.006-0.035,0.013-0.069,0.016-0.103C265.673,152.144,263.649,149.418,260.763,149.024z"/>
                  </g>
                </g>
              </g>
            </g>
          </svg>

          <!-- Sauce Burst Liquid SVG -->
          <svg id="ketchup-sauce" viewBox="0 0 514.312 1089.044" class="absolute w-[500px] h-[700px] pointer-events-none opacity-0 z-10 -mt-60">
            <path fill="#5b54fc" opacity="0.9" d="M314.361,1029.953c0,0-21.16-20.473,9.992-162.625c11.344-51.77,29.003-56.623,36.889-109.186c22.438-149.551-53.896-126.318-38.976-173.014c12.489-39.085,52.381-79.808,56.806-112.166c6.314-46.18-44.031-38.696-42.758-69c7.241-11.735,14.78-24.606,21.838-39.365c27.9-58.325,43.537-120.083,12.321-108.98c-16.658,5.924-45.288-26.572-49.167-47.293c3.278-14.375,6.416-30.689,8.152-48.476c5.741-58.776-9.945-142.267-39.706-132.676c-7.99,2.575-35.426,0.805-46.262-7.992c-53.891-43.744-95.427-13.484-35.483,99.194c59.944,112.674,54.06,129.763,39.754,263.545c-14.301,133.778-63.284,107.942-9.393,179.242c53.891,71.303-11.065,127.563,37.299,213.256c48.365,85.695-17.083,131.9,10.805,193.717C314.361,1029.953,305.189,1073.136,314.361,1029.953z"/>
          </svg>

          <!-- Transition Splatter Screen Overlay -->
          <svg id="transition" viewBox="0 0 1920 3000" class="fixed top-[-3050px] left-0 w-full h-[3000px] pointer-events-none z-40 opacity-0">
            <path fill="#5b54fc" d="M1937.556,2701.909c-17.075-26.01-40.905-50.952-69.831-74.316c-103.425-83.59-268.081-144.867-453.144-178.365c-105.019-19.006-220.231-31.406-331.606-36.725c-167.085-7.978-338.001-5.487-500.592,16.512c-172.375,23.322-339.834,67.907-463.911,132.021c-34.713,17.939-65.662,37.43-91.563,58.729c-64.733,53.239-108.154,114.115-100.716,176.96c2.549,21.525,46.608,60.653,93.744,37.477c19.999-9.83,52.608-51.112,90.753-42.115c17.997,4.246,12.22,31.136,25.725,39.098c22.999,13.553,54.644,3.32,79.763-4.158c-9.525,33.166-4.958,65.285,15.396,97.384c15.389,24.276,56.586,80.791,126.985,72.963c71.376-7.933,100.683-71.239,120.788-99.466c9.17-12.854,19.914-45.9,55.045-38.086c35.223,7.837,45.73,44.835,56.347,60.406c12.869,18.858,28.231,45.081,64.717,55.661c39.441,11.438,83.049-6.233,98.896-24.345c24.672-28.181,16.626-54.252,77.881-71.86c129.46-37.222,117.089,75.415,224.423,65.349c75.844-7.111,98.706-75.016,182.338-71.859c55.8,2.102,71.318,39.908,99.174,58.126c36.726,24.019,74.845,44.273,140.426,32.014c55.431-10.364,65.488-38.853,74.663-64.352c9.019-25.053,29.812-59.186,72.975-75.232c36.493-13.569,86.081-4.038,108.237,16.086c28.425,25.819,29.294,57.664,74.456,79.507c50.206,24.277,107.15,5.697,132.413-19.328c36.024-35.697,31.031-100.803,22.218-139.344C1958.969,2740.628,1950.081,2720.983,1937.556,2701.909z"/>
            <path fill="#5b54fc" d="M1722.725,2546.708c-244.787-123.524-617.412-192.628-949.392-164.446c-281.397,23.89-580.301,100.012-731.872,237.994c-37.438,34.083-85.05,96.511-74.508,137.17c12.099,46.722,75.902-3.55,117.722-4.103c57.841-0.76,70.031,109.774,138.569,34.455c-3,3.29,20.092,42.477,21.953,51.132c3.061,14.188,5.204,28.548,11.786,42.431c17.306,36.565,69.952,60.646,125.469,25.518c20.47-12.949,37.47-24.51,47.09-40.818c11.286-19.106,8.571-47.131,47.98-56.974c121.969-30.448,114.679,135.201,226.105,88.421c58.412-24.523,141.695-73.191,223.779-51.841c42.2,10.974,60.594,37.845,102.244,48.501c86.986,22.245,121.78-47.814,201.043-46.952c48.332,0.526,85.307,24.431,114.157,42.8c80.075,50.988,153.111,3.485,179.505-41.286c21.014-35.648,99.238-71.037,170.676-62.5c94.824,11.331,59.431,81.433,137.551,97.274c128.124,25.983,105.843-121.054,90.898-155.597C1891.544,2654.063,1818.175,2594.874,1722.725,2546.708z"/>
            <rect fill="#5b54fc" width="1920" height="2710.882"/>
          </svg>
        </div>

        <!-- Enlarged Warning Callout with Identity Colors (#5b54fc) & Pointer Arrow Below Bottle -->
        <div class="flex flex-col items-center justify-center mt-2 z-30 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" class="w-14 h-14 text-[#5b54fc] fill-none stroke-current stroke-[3]">
            <path d="M 20 50 Q 50 10 75 15 M 75 15 L 65 10 M 75 15 L 68 25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="px-6 py-2.5 rounded-full bg-[#eefcff] border-2 border-[#5b54fc]/60 text-[#5b54fc] font-['Stapel'] text-sm md:text-base font-extrabold tracking-wider shadow-lg shadow-[#5b54fc]/15 flex items-center gap-2">
            <span>{{ t.services.bottleWarning }}</span>
          </div>
        </div>
      </div>

      <!-- Full-Screen Liquid Splatter Overlay & 6 Compact Grouped Services with Neon Borders -->
      <div
        *ngIf="showExplodedServices"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 md:p-12 bg-[#5b54fc]/90 backdrop-blur-3xl overflow-y-auto animate-in fade-in duration-500 text-white"
      >
        <!-- Close Button (X Return to Bottle) -->
        <button
          (click)="reverseBottle()"
          class="absolute top-8 right-8 px-6 py-2.5 rounded-full bg-white text-[#111827] font-['Stapel'] text-xs uppercase tracking-widest font-semibold hover:bg-slate-100 transition-all shadow-xl flex items-center gap-2"
        >
          <span>{{ t.services.closeBtn }}</span>
        </button>

        <div class="max-w-6xl mx-auto text-center z-10 py-10">
          <span class="text-xs font-['Stapel'] uppercase tracking-widest text-white/90 font-semibold bg-white/20 px-5 py-2 rounded-full border border-white/30 mb-4 inline-block">
            {{ t.services.explodedBadge }}
          </span>

          <h2 class="text-3xl md:text-4xl font-headline font-bold mb-8 text-white leading-tight">
            {{ t.services.explodedTitle }}
          </h2>

          <!-- 6 Compact Services Cards Grid with Neon Underline Border (@omnedia lib) -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div
              *ngFor="let item of t.services.items"
              class="p-6 rounded-2xl bg-white/10 border border-white/30 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between hover:bg-white/15 transition-all duration-300"
            >
              <div>
                <span class="text-[10px] font-['Stapel'] uppercase tracking-widest text-[#c8f4ff] font-bold block mb-2">{{ item.category }}</span>
                <h3 class="text-lg font-headline font-bold text-white mb-2 leading-snug">{{ item.title }}</h3>
                <p class="text-white/90 text-xs leading-relaxed font-light mb-4">{{ item.desc }}</p>
              </div>
              <div class="pt-2">
                <om-neon-underline middleColor="#ffffff" sideColor="#c8f4ff" width="100%"></om-neon-underline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ServicesSectionComponent implements AfterViewInit, OnDestroy {
  @Output() selectService = new EventEmitter<ServiceItem>();
  services = HEXORA_SERVICES;
  showExplodedServices = false;

  private bodyTl: any;
  private legsTl: any;
  private faceTl: any;

  langService = inject(LanguageService);

  get t() {
    return TRANSLATIONS[this.langService.currentLang()];
  }

  get marqueeServices() {
    return this.t.services.marqueeLine1 || [];
  }

  get marqueeServicesAlt() {
    return this.t.services.marqueeLine2 || [];
  }

  ngAfterViewInit() {
    this.initBottleAnimations();
  }

  ngOnDestroy() {
    this.stopBottleAnimations();
  }

  private initBottleAnimations() {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    this.bodyTl = gsap.timeline({ repeat: -1 });
    this.bodyTl.to('#body', { duration: 1, rotate: 12, transformOrigin: 'center', ease: 'elastic.out(1, 0.75)' });
    this.bodyTl.to('#body', { duration: 2, delay: -1, y: -12, ease: 'elastic.out(1, 0.15)' });
    this.bodyTl.to('#body', { duration: 2, delay: -1, y: 0, rotate: -12, x: -20, transformOrigin: 'center', ease: 'elastic.out(1, 0.30)' });
