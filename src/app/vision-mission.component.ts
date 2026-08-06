import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './language.service';
import { TRANSLATIONS } from '../data/translations';

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-16 sm:py-20 px-4 sm:px-6 md:px-8 max-w-[1440px] mx-auto scroll-mt-20 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch">
        <div class="glass-card p-6 sm:p-8 md:p-12 rounded-3xl border border-[#e5e7eb] shadow-xl backdrop-blur-xl relative group hover:border-[#5b54fc]/60 hover:shadow-[0_20px_50px_rgba(91, 84, 252,0.15)] transition-all duration-500 bg-white/95 flex flex-col justify-between overflow-hidden min-h-[300px] sm:min-h-[360px]">
          <!-- Double-Sized Main Character Hexi Vision Artwork Overlay -->
          <img
            src="/assets/hexi/happy.png"
            alt="Hexi Happy"
            class="absolute -bottom-6 sm:-bottom-8 w-44 sm:w-64 md:w-80 h-auto object-contain opacity-25 sm:opacity-35 group-hover:opacity-75 transition-all duration-500 pointer-events-none filter drop-shadow-2xl z-0"
            [ngClass]="{ '-right-6 sm:-right-8': !langService.isRtl(), '-left-6 sm:-left-8': langService.isRtl() }"
          />

          <div class="relative z-10">
            <div class="w-12 h-1.5 bg-[#5b54fc] rounded-full mb-4 sm:mb-6 shadow-md shadow-[#5b54fc]/20"></div>
            <h3 class="text-2xl sm:text-3xl md:text-5xl font-headline font-bold text-[#111827] mb-4 sm:mb-6">{{ t.visionMission.visionTitle }}</h3>
            <p class="font-['Stapel'] text-[#4b5563] text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-full sm:max-w-[85%]">
              {{ t.visionMission.visionDesc }}
            </p>
          </div>
        </div>

        <div class="glass-card p-6 sm:p-8 md:p-12 rounded-3xl border border-[#e5e7eb] shadow-xl backdrop-blur-xl relative group hover:border-[#5b54fc]/60 hover:shadow-[0_20px_50px_rgba(91, 84, 252,0.15)] transition-all duration-500 bg-white/95 flex flex-col justify-between overflow-hidden min-h-[300px] sm:min-h-[360px]">
          <!-- Double-Sized Main Character Hexi Mission Artwork Overlay -->
          <img
            src="/assets/hexi/muscle power.png"
            alt="Hexi Power"
            class="absolute -bottom-6 sm:-bottom-8 w-44 sm:w-64 md:w-80 h-auto object-contain opacity-25 sm:opacity-35 group-hover:opacity-75 transition-all duration-500 pointer-events-none filter drop-shadow-2xl z-0"
            [ngClass]="{ '-right-6 sm:-right-8': !langService.isRtl(), '-left-6 sm:-left-8': langService.isRtl() }"
          />

          <div class="relative z-10">
            <div class="w-12 h-1.5 brand-gradient rounded-full mb-4 sm:mb-6 shadow-md shadow-[#5b54fc]/20"></div>
            <h3 class="text-2xl sm:text-3xl md:text-5xl font-headline font-bold text-[#111827] mb-4 sm:mb-6">{{ t.visionMission.missionTitle }}</h3>
            <p class="font-['Stapel'] text-[#4b5563] text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-full sm:max-w-[85%]">
              {{ t.visionMission.missionDesc }}
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class VisionMissionComponent {
  langService = inject(LanguageService);

  get t() {
    return TRANSLATIONS[this.langService.currentLang()];
  }
}


