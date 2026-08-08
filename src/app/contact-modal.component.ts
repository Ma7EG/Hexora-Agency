import { Component, Input, Output, EventEmitter, inject, ViewChild, ElementRef, OnDestroy, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './language.service';

export interface FrameConfig {
  src: string;
  duration: number;
}

export class MascotAnimationController {
  private frames: FrameConfig[] = [
    { src: '/assets/Frame 1.png', duration: 700 },
    { src: '/assets/Frame 2.png', duration: 700 },
    { src: '/assets/Frame 3.png', duration: 700 },
    { src: '/assets/Frame 4.png', duration: 700 },
    { src: '/assets/Frame 5.png', duration: 700 },
  ];

  private preloadedImages: HTMLImageElement[] = [];
  private currentFrameIndex = 0;
  private isPlaying = false;
  private speedMultiplier = 1.0;
  private animationFrameId: number | null = null;
  private lastFrameTimestamp: number | null = null;
  private frameTimeAccumulator = 0;
  private imgElement: HTMLImageElement | null = null;

  constructor(customFrames?: FrameConfig[]) {
    if (customFrames && customFrames.length > 0) {
      this.frames = customFrames;
    }
  }

  public preload(): Promise<void[]> {
    const promises = this.frames.map((frame) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = frame.src;
        this.preloadedImages.push(img);
      });
    });
    return Promise.all(promises);
  }

  public attach(element: HTMLImageElement): void {
    this.imgElement = element;
    if (this.frames.length > 0 && this.imgElement) {
      this.imgElement.src = this.frames[this.currentFrameIndex].src;
    }
  }

  public play(): void {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.lastFrameTimestamp = null;
    const tick = (timestamp: number) => {
      if (!this.isPlaying) return;
      if (this.lastFrameTimestamp === null) {
        this.lastFrameTimestamp = timestamp;
      }
      const delta = timestamp - this.lastFrameTimestamp;
      this.lastFrameTimestamp = timestamp;
      this.frameTimeAccumulator += delta * this.speedMultiplier;

      const currentDuration = this.frames[this.currentFrameIndex].duration;
      if (this.frameTimeAccumulator >= currentDuration) {
        this.frameTimeAccumulator %= currentDuration;
        this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
        if (this.imgElement) {
          this.imgElement.src = this.frames[this.currentFrameIndex].src;
        }
      }
      this.animationFrameId = requestAnimationFrame(tick);
    };
    this.animationFrameId = requestAnimationFrame(tick);
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public restart(): void {
    this.currentFrameIndex = 0;
    this.frameTimeAccumulator = 0;
    this.lastFrameTimestamp = null;
    if (this.imgElement && this.frames.length > 0) {
      this.imgElement.src = this.frames[0].src;
    }
    if (!this.isPlaying) {
      this.play();
    }
  }

  public setSpeed(multiplier: number): void {
    if (multiplier > 0) {
      this.speedMultiplier = multiplier;
    }
  }

  public destroy(): void {
    this.pause();
    this.imgElement = null;
  }
}

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div class="glass-card rounded-[2.5rem] max-w-2xl w-full p-6 md:p-10 border border-[#5b54fc]/30 shadow-[0_25px_80px_rgba(91, 84, 252,0.2)] relative my-8 bg-white/95 overflow-visible text-center">

        <button
          (click)="closeModal()"
          class="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#f3f4f6] text-[#111827] hover:bg-[#5b54fc] hover:text-white transition-all duration-300 flex items-center justify-center font-bold text-sm shadow-sm z-20 cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div class="mb-2 z-10 relative flex flex-col items-center">
          <div class="hidden sm:block absolute -top-8 left-2 w-28 md:w-36 h-auto pointer-events-none hover:scale-105 transition-transform duration-500">
            <img src="/assets/hexi/sitting.png" alt="Hexi Sitting" class="w-full h-auto object-contain filter drop-shadow-xl" />
          </div>

          <span class="font-['Stapel'] text-xs text-[#5b54fc] uppercase tracking-[0.2em] font-semibold bg-[#eefcff] px-4 py-1.5 rounded-full border border-[#5b54fc]/20 shadow-xs mb-3 inline-block">
            HEXORA CONNECT
          </span>
          <h2 class="text-2xl md:text-3xl font-headline font-bold text-[#111827]">
            {{ isAr ? 'تواصل مع فريق هيكسورا' : 'Connect with Hexora Team' }}
          </h2>
        </div>

        <div class="mascot-modal-viewport my-4 flex flex-col items-center justify-center relative overflow-visible">
          <div class="mascot-crescent-container relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <div class="crescent-moon-backdrop"></div>
            <div class="crescent-ambient-shadow"></div>
            <img
              #mascotImg
              src="/assets/Frame 1.png"
              alt="Hexora Mascot Frame Animation"
              class="mascot-frame-image relative z-10 w-full h-full object-contain pointer-events-none select-none transition-none filter drop-shadow-[0_10px_20px_rgba(91,84,252,0.25)]"
            />
          </div>
        </div>

        <p class="text-xs md:text-sm text-[#4b5563] font-light max-w-md mx-auto mb-6">
          {{ isAr ? 'اضغط على أي قناة من القنوات التالية للتواصل المباشر معنا' : 'Click on any of the official channels below to connect with us directly' }}
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <a
            href="https://www.instagram.com/hexorav"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-[#e5e7eb] bg-white hover:border-[#5b54fc] hover:shadow-lg hover:shadow-[#5b54fc]/15 transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-full bg-[#f3efff] text-[#5b54fc] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </div>
            <span class="text-xs font-['Stapel'] font-semibold text-[#111827]">Instagram</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61592904986714"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-[#e5e7eb] bg-white hover:border-[#5b54fc] hover:shadow-lg hover:shadow-[#5b54fc]/15 transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-full bg-[#eefcff] text-[#5b54fc] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </div>
            <span class="text-xs font-['Stapel'] font-semibold text-[#111827]">Facebook</span>
          </a>

          <a
            href="https://www.linkedin.com/company/137403930/"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-[#e5e7eb] bg-white hover:border-[#5b54fc] hover:shadow-lg hover:shadow-[#5b54fc]/15 transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-full bg-[#f3efff] text-[#5b54fc] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </div>
            <span class="text-xs font-['Stapel'] font-semibold text-[#111827]">LinkedIn</span>
          </a>

          <a
            href="https://www.tiktok.com/@hexorav1"
            target="_blank"
            rel="noopener"
            class="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-[#e5e7eb] bg-white hover:border-[#5b54fc] hover:shadow-lg hover:shadow-[#5b54fc]/15 transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-full bg-[#eefcff] text-[#5b54fc] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.58a6.34 6.34 0 0 0-4.66 6.13 6.34 6.34 0 1 0 11.05-4.26 8.35 8.35 0 0 0 4.22 1.25V6.69z"/></svg>
            </div>
            <span class="text-xs font-['Stapel'] font-semibold text-[#111827]">TikTok</span>
          </a>

          <a
            href="mailto:hexorav@gmail.com"
            class="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-[#e5e7eb] bg-white hover:border-[#5b54fc] hover:shadow-lg hover:shadow-[#5b54fc]/15 transition-all duration-300 group col-span-2 sm:col-span-1"
          >
            <div class="w-10 h-10 rounded-full bg-[#eefcff] text-[#5b54fc] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 5.457v13.086c0 .728-.592 1.314-1.324 1.314H1.324C.592 19.857 0 19.271 0 18.543V5.457c0-.728.592-1.314 1.324-1.314h21.352C23.408 4.143 24 4.729 24 5.457zm-2.4 0L12 12.343 2.4 5.457v13.086h19.2V5.457z"/></svg>
            </div>
            <span class="text-xs font-['Stapel'] font-semibold text-[#111827]">Gmail</span>
          </a>
        </div>

      </div>
    </div>
  `,
})
export class ContactModalComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() isOpen = false;
  @Input() prefilledService = '';
  @Output() close = new EventEmitter<void>();

  @ViewChild('mascotImg') mascotImgRef?: ElementRef<HTMLImageElement>;

  langService = inject(LanguageService);
  mascotController = new MascotAnimationController();

  constructor() {
    this.mascotController.preload();
    (window as any).mascot = this.mascotController;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        setTimeout(() => this.startMascot(), 50);
      } else {
        this.mascotController.pause();
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.isOpen) {
      this.startMascot();
    }
  }

  private startMascot(): void {
    if (this.mascotImgRef?.nativeElement) {
      this.mascotController.attach(this.mascotImgRef.nativeElement);
      this.mascotController.play();
    }
  }

  closeModal(): void {
    this.mascotController.pause();
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.mascotController.destroy();
  }

  get isAr() {
    return this.langService.currentLang() === 'ar';
  }
}

