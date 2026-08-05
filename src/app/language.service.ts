import { Injectable, signal } from '@angular/core';

export type Language = 'ar' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  readonly currentLang = signal<Language>('ar');

  constructor() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem('hexora_lang') as Language;
        if (saved === 'ar' || saved === 'en') {
          this.currentLang.set(saved);
          this.updateDocumentAttributes(saved);
        } else {
          this.updateDocumentAttributes('ar');
        }
      } catch (e) {
        this.updateDocumentAttributes('ar');
      }
    }
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
    if (typeof window !== 'undefined') {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('hexora_lang', lang);
        }
        this.updateDocumentAttributes(lang);
      } catch (e) {}
    }
  }

  private updateDocumentAttributes(lang: Language) {
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage() {
    this.setLanguage(this.currentLang() === 'ar' ? 'en' : 'ar');
  }

  isRtl() {
    return this.currentLang() === 'ar';
  }
}


