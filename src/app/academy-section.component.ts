import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxNeonUnderlineComponent } from '@omnedia/ngx-neon-underline';
import { HEXORA_COURSES } from '../data/hexoraData';
import { AcademyCourse } from '../types';

@Component({
  selector: 'app-academy-section',
  standalone: true,
  imports: [CommonModule, NgxNeonUnderlineComponent],
  template: `
    <section id="academy" class="py-20 px-5 md:px-8 max-w-[1440px] mx-auto scroll-mt-20 relative">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#5b54fc]/25 bg-[#eefcff]/80 text-[#5b54fc] font-['Stapel'] text-xs uppercase tracking-[0.2em] mb-4 shadow-sm">
          <span>Hexora Academy</span>
        </div>
        <h2 class="fluid-headline text-[#111827] font-bold uppercase tracking-tight mb-3 font-headline">Technical Education</h2>
        <div class="max-w-xs mx-auto mb-4">
          <om-neon-underline middleColor="#5b54fc" sideColor="#5b54fc" width="100%"></om-neon-underline>
        </div>
      </div>

      <!-- SVG Gooey Morphing Blob Buttons Grid (2 Per Row on Mobile) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-7xl mx-auto items-center justify-items-center">
        <div *ngFor="let course of courses; let idx = index" class="flex justify-center items-center w-full relative">
          <button (click)="openContact.emit(course.title)" class="gooey-blob-btn group relative w-[155px] h-[155px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] border-none bg-none cursor-pointer transition-all duration-500 hover:scale-105 focus:outline-none flex items-center justify-center">

            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 1490.01 1111.6" class="w-full h-full drop-shadow-xl overflow-visible">
              <defs>
                <linearGradient [id]="'hexoraGrad_' + idx" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#5b54fc" />
                  <stop offset="100%" stop-color="#5b54fc" />
                </linearGradient>
                <filter [id]="'gooey_' + idx" height="150%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                </filter>
                <mask [id]="'mask_' + idx">
                  <g [style.filter]="'url(#gooey_' + idx + ')'">
                    <path class="blob-bg-path transition-all duration-700 ease-out" fill="white" stroke="white" d="M684.62 309.07c77.64-27.55 169.41-56.73 247.52-50.68s142.52 47 152.38 98.64-34.67 114-56.17 166.71-20 95.83-48.4 130.09-86.87 59.79-151.58 97.17c-64.54 37.31-135.3 86.51-193.7 86.17-58.58-.43-104.78-50.3-133.23-94.26s-39.14-82-56.27-119.32-40.66-73.59-36-112.65c4.79-39.19 38-81 86.29-114.87s111.67-59.6 189.16-87z"/>
                    <circle class="circleBottom circle transition-all duration-700 group-hover:-translate-x-12 group-hover:translate-y-12" cx="276.98" cy="628.31" r="23.16" fill="white" stroke="white"/>
                    <circle class="circleBottom circle transition-all duration-700 group-hover:-translate-x-16 group-hover:translate-y-10" cx="528.26" cy="867.81" r="39.52" fill="white" stroke="white"/>
                    <circle class="circleBottom circle transition-all duration-700 group-hover:-translate-x-10 group-hover:translate-y-16" cx="204.98" cy="760.82" r="33.73" fill="white" stroke="white"/>
                    <circle class="circleTop circle transition-all duration-700 group-hover:translate-x-14 group-hover:-translate-y-14" cx="1155.21" cy="286.38" r="33.73" fill="white" stroke="white"/>
                    <circle class="circleTop circle transition-all duration-700 group-hover:translate-x-16 group-hover:-translate-y-10" cx="1044.52" cy="358.74" r="23.16" fill="white" stroke="white"/>
                    <circle class="circleTop circle transition-all duration-700 group-hover:translate-x-10 group-hover:-translate-y-16" cx="965.31" cy="192.59" r="39.52" fill="white" stroke="white"/>
                  </g>
                </mask>
              </defs>
              <rect [attr.mask]="'url(#mask_' + idx + ')'" [attr.fill]="'url(#hexoraGrad_' + idx + ')'" x="0" y="0" width="100%" height="100%" class="opacity-90 group-hover:opacity-100 transition-opacity" />
              <path class="frontBlob fill-white/90 transition-all duration-700 group-hover:scale-105" d="M981.72 372.33c56.87 13.9 100.57 39.75 119.1 69.47 18.69 29.61 12.06 63.19 2.24 95.77s-22.64 64.15-59.94 84.86C1006 643.2 944.56 653 882.26 672.51c-62.48 19.52-126 48.76-198 58.09s-152.7-1.24-215.47-25.14-107.61-61.15-106.2-100.18c1.24-38.93 48.72-79.64 103.82-108.11s117.62-44.86 172-66.51 100.38-48.86 158.5-61.47 127.94-10.75 184.81 3.14z"/>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center p-3 sm:p-6 text-center pointer-events-none">
              <h3 class="text-xs sm:text-base md:text-lg font-headline font-bold text-[#111827] group-hover:text-[#5b54fc] transition-colors max-w-[120px] sm:max-w-[180px] leading-tight">
                {{ course.title }}
              </h3>
            </div>
          </button>
        </div>
      </div>
    </section>
  `,
})
export class AcademySectionComponent {
  @Output() openContact = new EventEmitter<string>();
  courses = HEXORA_COURSES;
}
