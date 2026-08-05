import { Component, EventEmitter, Output, Input, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './language.service';
import { TRANSLATIONS } from '../data/translations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header [class]="headerClasses">
      <div class="max-w-[1440px] mx-auto px-5 md:px-8 flex items-center justify-between">
        <button (click)="handleNavClick('home')" class="flex items-center gap-2 focus:outline-none group text-left">
          <img src="/assets/hexora-logo.png"
            alt="Hexora Logo"
            class="h-[4.25rem] md:h-[4.75rem] w-auto object-contain transition-transform group-hover:scale-105"
          />
        </button>

        <nav class="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            *ngFor="let link of navLinks"
            (click)="handleNavClick(link.id)"
            [class]="getLinkClasses(link.id)"
          >
            {{ getNavLabel(link.id) }}
          </button>
        </nav>

        <div class="hidden md:flex items-center gap-4">
          <button
            (click)="langService.toggleLanguage()"
            class="px-3.5 py-1.5 rounded-full border border-[#5b54fc]/40 bg-[#eefcff] text-[#5b54fc] font-['Stapel'] text-xs font-bold tracking-widest hover:bg-[#5b54fc] hover:text-white transition-all shadow-sm flex items-center gap-1.5"
            [title]="langService.currentLang() === 'ar' ? 'Switch to English' : 'التحويل للعربية'"
          >
            <span class="text-sm">🌐</span>
            <span>{{ langService.currentLang() === 'ar' ? 'EN' : 'العربية' }}</span>
          </button>

          <div class="flex items-center gap-2 border-r border-l border-[#e5e7eb] px-3">
            <a href="https://www.facebook.com/profile.php?id=61592904986714" target="_blank" rel="noopener" aria-label="Facebook" class="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#4b5563] hover:text-[#5b54fc] hover:bg-[#eefcff] transition-all">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/hexorav" target="_blank" rel="noopener" aria-label="Instagram" class="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#4b5563] hover:text-[#5b54fc] hover:bg-[#f3efff] transition-all">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@hexorav1" target="_blank" rel="noopener" aria-label="TikTok" class="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#4b5563] hover:text-[#5b54fc] hover:bg-[#eefcff] transition-all">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.58a6.34 6.34 0 0 0-4.66 6.13 6.34 6.34 0 1 0 11.05-4.26 8.35 8.35 0 0 0 4.22 1.25V6.69z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/137403930/" target="_blank" rel="noopener" aria-label="LinkedIn" class="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#4b5563] hover:text-[#5b54fc] hover:bg-[#f3efff] transition-all">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <button
            (click)="openContact.emit()"
            class="brand-gradient text-white px-6 py-2.5 rounded-full font-mono-label text-[12px] tracking-widest uppercase transition-all shadow-lg shadow-[#5b54fc]/25 hover:shadow-[#5b54fc]/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 font-semibold"
          >
            <span>{{ langService.currentLang() === 'ar' ? 'تواصل معنا' : 'CONTACT US' }}</span>
          </button>
        </div>

        <div class="flex md:hidden items-center gap-2">
          <button
            (click)="langService.toggleLanguage()"
            class="px-3 py-1 rounded-full border border-[#5b54fc]/40 bg-[#eefcff] text-[#5b54fc] font-['Stapel'] text-xs font-bold"
          >
            {{ langService.currentLang() === 'ar' ? 'EN' : 'العربية' }}
          </button>

          <button
            class="text-[#111827] px-3 py-1 font-mono-label text-xs uppercase hover:bg-[#f3efff] rounded-lg transition-colors"
            (click)="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Toggle Navigation"
          >
            <span *ngIf="!mobileMenuOpen">MENU</span>
            <span *ngIf="mobileMenuOpen">CLOSE</span>
          </button>
        </div>
      </div>

      <div *ngIf="mobileMenuOpen" class="md:hidden glass-card border-b border-[#e5e7eb] px-6 py-6 mt-2 space-y-4 animate-in fade-in slide-in-from-top-2">
        <nav class="flex flex-col gap-4">
          <button
            *ngFor="let link of navLinks"
            (click)="handleNavClick(link.id)"
            [class]="mobileLinkClasses(link.id)"
          >
            {{ getNavLabel(link.id) }}
          </button>
        </nav>
        <div class="pt-4 flex flex-col gap-3 border-t border-white/10">
          <button
            (click)="handleContactFromMobile()"
            class="w-full py-3 rounded-full brand-gradient text-white font-mono-label text-[12px] tracking-widest uppercase text-center shadow-md font-semibold"
          >
            {{ langService.currentLang() === 'ar' ? 'تواصل معنا' : 'CONTACT US' }}
          </button>
        </div>
      </div>
    </header>
  `,
})
export class NavbarComponent {
  @Input() activeTab = 'home';
  @Output() setActiveTab = new EventEmitter<string>();
  @Output() openContact = new EventEmitter<void>();
  mobileMenuOpen = false;
  isScrolled = false;

  langService = inject(LanguageService);

  get t() {
    return TRANSLATIONS[this.langService.currentLang()];
  }

  navLinks = [
    { id: 'home', key: 'services' },
    { id: 'services', key: 'services' },
    { id: 'about', key: 'vision' },
