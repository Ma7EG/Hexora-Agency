import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div class="glass-card rounded-[2.5rem] max-w-2xl w-full p-6 md:p-10 border border-[#5b54fc]/30 shadow-[0_25px_80px_rgba(91, 84, 252,0.2)] relative my-8 bg-white/95 overflow-visible text-center">

        <!-- Close Button (X) -->
        <button
          (click)="close.emit()"
          class="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#f3f4f6] text-[#111827] hover:bg-[#5b54fc] hover:text-white transition-all duration-300 flex items-center justify-center font-bold text-sm shadow-sm z-20"
          aria-label="Close modal"
        >
          ✕
        </button>

        <!-- Header -->
        <div class="mb-2 z-10 relative">
          <span class="font-['Stapel'] text-xs text-[#5b54fc] uppercase tracking-[0.2em] font-semibold bg-[#eefcff] px-4 py-1.5 rounded-full border border-[#5b54fc]/20 shadow-xs inline-block mb-3">
            HEXORA CONNECT
          </span>
          <h2 class="text-2xl md:text-3xl font-headline font-bold text-[#111827]">
            {{ isAr ? 'تواصل مع فريق هيكسورا' : 'Connect with Hexora Team' }}
          </h2>
        </div>

        <!-- Interactive Animated CSS Parrot Section -->
        <div class="parrot-modal-viewport">
          <div class="canvas">
            <div class="parrot">
              <div class="head"></div>
              <div class="back"></div>
              <div class="pbody">
                <div class="shadesection"></div>
                <div class="eye">
                  <div class="eyemiddle"></div>
                  <div class="eyeshadow"></div>
                </div>
              </div>
              <div class="foot"></div>
              <div class="wing"></div>
              <div class="beak">
                <div class="mouth"></div>
              </div>
              <div class="lowerbeak"></div>

              <!-- Parrot Spoken Channels -->
              <div class="cursewords">
                <div class="words words1">Instagram</div>
                <div class="words words2">Facebook</div>
                <div class="words words3">LinkedIn</div>
                <div class="words words4">TikTok</div>
                <div class="words words5">Gmail</div>
              </div>
            </div>
            <div class="trim"></div>
            <div class="circle"></div>
          </div>
        </div>

        <p class="text-xs md:text-sm text-[#4b5563] font-light max-w-md mx-auto mb-6">
          {{ isAr ? 'اضغط على أي قناة من القنوات التالية للتواصل المباشر معنا' : 'Click on any of the official channels below to connect with us directly' }}
        </p>

        <!-- Clickable Social & Contact Icon Buttons Row -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <!-- Instagram -->
          <a
            href="https://www.instagram.com/hexorav"
            target="_blank"
