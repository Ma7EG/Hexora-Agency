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
    <section id="academy" class="py-20 px-5 md:px-8 max-w-[1440px] mx-auto scroll-mt-20">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#5b54fc]/25 bg-[#eefcff]/80 text-[#5b54fc] font-['Stapel'] text-xs uppercase tracking-[0.2em] mb-4 shadow-sm">
          <span>Hexora Academy</span>
        </div>
        <h2 class="fluid-headline text-[#111827] font-bold uppercase tracking-tight mb-3 font-headline">Technical Education</h2>
        <div class="max-w-xs mx-auto mb-4">
          <om-neon-underline middleColor="#5b54fc" sideColor="#5b54fc" width="100%"></om-neon-underline>
        </div>
      </div>

      <!-- SVG Gooey Morphing Blob Buttons Grid for Technical Education -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-center justify-items-center">
        <div *ngFor="let course of courses; let idx = index" class="flex justify-center items-center w-full">
          <button class="gooey-blob-btn group relative w-[260px] h-[260px] md:w-[280px] md:h-[280px] border-none bg-none cursor-pointer transition-all duration-500 hover:scale-105 focus:outline-none flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 1490.01 1111.6" class="w-full h-full drop-shadow-xl overflow-visible">
              <defs>
                <linearGradient [id]="'hexoraGrad_' + idx" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#5b54fc" />
