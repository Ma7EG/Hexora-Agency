import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-white/90 backdrop-blur-2xl w-full pt-20 pb-8 border-t border-[#e5e7eb] relative z-10">
      <div class="px-5 md:px-8 mx-auto max-w-[1440px]">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-2 flex flex-col items-start gap-6">
            <div class="flex items-center gap-6">
              <img src="/assets/hexora-logo-footer.png" alt="Hexora Logo Footer" class="h-[7rem] md:h-[9rem] w-auto object-contain" />
              <!-- Doubled-sized Marketing Hexi Footer Mascot -->
              <div class="w-32 md:w-48 h-auto pointer-events-none hover:scale-105 transition-transform duration-500 shrink-0">
                <img src="/assets/hexi/doing markiting.png" alt="Hexi Marketing" class="w-full h-auto object-contain filter drop-shadow-xl" />
              </div>
            </div>
            <p class="font-['Stapel'] text-[#4b5563] font-light max-w-md text-base leading-relaxed">
              Elevating brands through digital mastery. We are a full-service digital agency and learning platform dedicated to growth and innovation.
            </p>
            <div class="flex items-center gap-3 pt-2">
              <button (click)="openContact.emit()" class="px-4 py-2 rounded-full border border-[#e5e7eb] text-[#4b5563] hover:text-[#5b54fc] hover:border-[#5b54fc] font-mono-label text-xs uppercase transition-colors">EMAIL</button>
              <button (click)="shareSite()" class="px-4 py-2 rounded-full border border-[#e5e7eb] text-[#4b5563] hover:text-[#5b54fc] hover:border-[#5b54fc] font-mono-label text-xs uppercase transition-colors">SHARE</button>
            </div>

            <div class="flex items-center gap-3 pt-3">
              <a href="https://www.facebook.com/profile.php?id=61592904986714" target="_blank" rel="noopener" aria-label="Facebook" class="w-10 h-10 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#4b5563] hover:text-[#5b54fc] hover:border-[#5b54fc] hover:scale-110 transition-all shadow-sm">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/hexorav" target="_blank" rel="noopener" aria-label="Instagram" class="w-10 h-10 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#4b5563] hover:text-[#5b54fc] hover:border-[#5b54fc] hover:scale-110 transition-all shadow-sm">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@hexorav1" target="_blank" rel="noopener" aria-label="TikTok" class="w-10 h-10 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#4b5563] hover:text-[#5b54fc] hover:border-[#5b54fc] hover:scale-110 transition-all shadow-sm">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.58a6.34 6.34 0 0 0-4.66 6.13 6.34 6.34 0 1 0 11.05-4.26 8.35 8.35 0 0 0 4.22 1.25V6.69z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/137403930/" target="_blank" rel="noopener" aria-label="LinkedIn" class="w-10 h-10 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center text-[#4b5563] hover:text-[#5b54fc] hover:border-[#5b54fc] hover:scale-110 transition-all shadow-sm">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-mono-label text-xs text-[#111827] uppercase tracking-widest mb-6 font-bold">Services</h4>
            <ul class="flex flex-col gap-3 font-['Stapel'] text-[#4b5563] text-sm font-light">
              <li><a href="#services" class="hover:text-[#5b54fc] transition-colors">Digital Marketing</a></li>
              <li><a href="#services" class="hover:text-[#5b54fc] transition-colors">Creative Design</a></li>
              <li><a href="#services" class="hover:text-[#5b54fc] transition-colors">Web Development</a></li>
              <li><a href="#academy" class="hover:text-[#5b54fc] transition-colors">Technical Education</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-mono-label text-xs text-[#111827] uppercase tracking-widest mb-6 font-bold">Company</h4>
            <ul class="flex flex-col gap-3 font-['Stapel'] text-[#4b5563] text-sm font-light">
              <li><a href="#about" class="hover:text-[#5b54fc] transition-colors">About Us</a></li>
              <li><a href="#services" class="hover:text-[#5b54fc] transition-colors">Services</a></li>
              <li><button (click)="openContact.emit()" class="hover:text-[#5b54fc] transition-colors text-left">Contact</button></li>
              <li><button (click)="openContact.emit()" class="hover:text-[#5b54fc] transition-colors text-left">Terms</button></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-[#e5e7eb] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="font-mono-label text-xs text-[#6b7280] uppercase tracking-wider">© HEXORA DIGITAL AGENCY. ALL RIGHTS RESERVED.</p>
          <div class="flex items-center gap-6">
            <span class="font-mono-label text-xs text-[#6b7280] uppercase tracking-wider">DESIGNED FOR THE FUTURE.</span>
            <button (click)="scrollToTop()" class="px-4 py-2 rounded-full brand-gradient text-white border border-[#e5e7eb] font-mono-label text-xs uppercase tracking-wider transition-all shadow-md">TOP</button>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  @Output() openContact = new EventEmitter<void>();

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  shareSite() {
    if (navigator.share) {
      navigator.share({ title: 'Hexora Digital Agency', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Hexora URL copied to clipboard!');
    }
  }
}
