import { Component, signal, computed, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from './language.service';
import { HEXI_SCENARIOS, ScenarioQuestion } from '../data/hexi-scenario';

export interface ChatMessage {
  sender: 'user' | 'hexi';
  text: string;
  time: string;
  showSocialLinks?: boolean;
}

@Component({
  selector: 'app-hexi-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      <!-- Scaled-Down Proportional Floating Badge Button -->
      <div
        *ngIf="!isOpen()"
        (click)="toggleChat()"
        class="group flex items-center gap-2.5 bg-white/95 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-[#5b54fc]/30 shadow-[0_10px_28px_rgba(91,84,252,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none animate-pulse-gentle overflow-visible"
      >
        <span class="text-xs font-bold text-[#5b54fc] tracking-wide pl-1">
          {{ isAr() ? 'تحدث مع هكسي' : 'Talk with Hexi' }}
        </span>
        <div class="relative w-14 h-11 sm:w-16 sm:h-12 flex items-center justify-center shrink-0 translate-y-1">
          <img
            src="/assets/hexi/sitting.png"
            alt="Hexi Mascot"
            class="w-full h-full object-contain scale-130 filter drop-shadow-sm group-hover:scale-140 transition-transform duration-300"
          />
          <div class="absolute bottom-0.5 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-xs z-10"></div>
        </div>
      </div>

      <!-- Main Chatbot Window -->
      <div
        *ngIf="isOpen()"
        class="w-[92vw] sm:w-[400px] h-[580px] max-h-[85vh] bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#5b54fc]/25 shadow-[0_20px_60px_rgba(91,84,252,0.25)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        <!-- Header with Mascot -->
        <div class="bg-gradient-to-r from-[#5b54fc] to-[#4338ca] text-white px-5 py-3.5 flex items-center justify-between shadow-md shrink-0">
          <div class="flex items-center gap-3">
            <div class="relative w-14 h-12 flex items-center justify-center shrink-0 translate-y-0.5">
              <img src="/assets/hexi/sitting.png" alt="Hexi" class="w-full h-full object-contain scale-125 filter drop-shadow-md" />
              <div class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#5b54fc] z-10"></div>
            </div>
            <div>
              <h3 class="font-bold text-sm tracking-wide flex items-center gap-1.5">
                <span>Hexi AI</span>
                <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-normal">Online</span>
              </h3>
              <p class="text-[11px] text-white/80">{{ isAr() ? 'المساعد الذكي لهيكسورا' : 'Hexora AI Assistant' }}</p>
            </div>
          </div>
          <button
            (click)="toggleChat()"
            class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- Category Filters Row -->
        <div class="bg-slate-100/80 p-2 border-b border-gray-200/60 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          <button
            *ngFor="let cat of categories"
            (click)="setCategory(cat.id)"
            [ngClass]="selectedCategory() === cat.id
              ? 'bg-[#5b54fc] text-white text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow-xs'
              : 'bg-white text-gray-600 text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap hover:bg-gray-50 border border-gray-200'"
          >
            {{ isAr() ? cat.labelAr : cat.labelEn }}
          </button>
        </div>

        <!-- Message Stream Area -->
        <div #scrollContainer class="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/40 scroll-smooth">
          <div class="bg-gradient-to-b from-[#eefcff] to-[#f3efff] p-3.5 rounded-2xl border border-[#5b54fc]/15 flex items-center gap-3 shadow-sm">
            <div class="w-16 h-16 shrink-0 flex items-center justify-center p-0">
              <img src="/assets/Frame 1.png" alt="Welcome Hexi" class="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <div class="text-xs text-[#374151] leading-relaxed">
              <p class="font-bold text-[#5b54fc] mb-0.5">{{ isAr() ? 'مرحبا بك في هيكسورا' : 'Welcome to Hexora' }}</p>
              <p>{{ isAr() ? 'أنا هكسي. فريقنا المكون من 6 خبراء جاهز لمساعدتك. اختر من الأسئلة الجاهزة أدناه أو اكتب استفسارك.' : 'I am Hexi. Our team of 6 experts is ready to help you. Choose a question below or type your inquiry.' }}</p>
            </div>
          </div>

          <ng-container *ngFor="let msg of messages()">
            <div [ngClass]="msg.sender === 'user' ? 'flex justify-end' : 'flex flex-col items-start'">
              <div
                [ngClass]="msg.sender === 'user'
                  ? 'bg-[#5b54fc] text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-xs shadow-sm leading-relaxed'
                  : 'bg-white text-[#111827] rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[88%] text-xs shadow-md border border-gray-100 leading-relaxed'"
              >
                <p>{{ msg.text }}</p>
                <span [ngClass]="msg.sender === 'user' ? 'text-[9px] text-white/70 block text-right mt-1' : 'text-[9px] text-gray-400 block text-left mt-1'">
                  {{ msg.time }}
                </span>
              </div>

              <div *ngIf="msg.showSocialLinks" class="mt-2.5 flex flex-wrap gap-1.5 w-full max-w-[90%]">
                <a href="https://www.instagram.com/hexorav" target="_blank" rel="noopener"
                  class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold shadow-sm transition-all">
                  <span class="text-[#5b54fc]">Instagram</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61592904986714" target="_blank" rel="noopener"
                  class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold shadow-sm transition-all">
                  <span class="text-[#5b54fc]">Facebook</span>
                </a>
                <a href="https://www.linkedin.com/company/137403930/" target="_blank" rel="noopener"
                  class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold shadow-sm transition-all">
                  <span class="text-[#5b54fc]">LinkedIn</span>
                </a>
                <a href="https://www.tiktok.com/@hexorav1" target="_blank" rel="noopener"
                  class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold shadow-sm transition-all">
                  <span class="text-[#5b54fc]">TikTok</span>
                </a>
                <a href="mailto:hexorav@gmail.com"
                  class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold shadow-sm transition-all">
                  <span class="text-[#5b54fc]">hexorav&#64;gmail.com</span>
                </a>
              </div>
            </div>
          </ng-container>

          <div *ngIf="isLoading()" class="flex justify-start">
            <div class="bg-white text-gray-500 rounded-2xl rounded-tl-none px-4 py-3 text-xs shadow-md border border-gray-100 flex items-center gap-1.5">
              <div class="w-2 h-2 bg-[#5b54fc] rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-[#5b54fc] rounded-full animate-bounce" style="animation-delay:0.2s"></div>
              <div class="w-2 h-2 bg-[#5b54fc] rounded-full animate-bounce" style="animation-delay:0.4s"></div>
            </div>
          </div>
        </div>

        <!-- Quick Scenario Questions Stream -->
        <div class="p-2.5 bg-slate-100/90 border-t border-gray-200 max-h-36 overflow-y-auto space-y-1.5 shrink-0">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">
            {{ isAr() ? 'أسئلة شائعة وسيناريوهات جاهزة' : 'Quick Questions' }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <button
              *ngFor="let item of visibleScenarios()"
              (click)="selectScenario(item)"
              class="bg-white hover:bg-[#eefcff] text-[#5b54fc] hover:text-[#4338ca] border border-[#5b54fc]/20 text-[11px] font-medium px-3 py-1.5 rounded-xl transition-all text-left cursor-pointer shadow-2xs hover:border-[#5b54fc]/50"
            >
              {{ isAr() ? item.questionAr : item.questionEn }}
            </button>
          </div>
        </div>

        <!-- Text Input Row -->
        <div class="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
          <input
            type="text"
            [(ngModel)]="userInput"
            (keyup.enter)="sendMessage()"
            [placeholder]="isAr() ? 'اكتب استفسارك هنا...' : 'Type your inquiry here...'"
            class="flex-1 bg-gray-50 text-xs text-gray-800 rounded-xl px-3.5 py-2.5 outline-none border border-gray-200 focus:border-[#5b54fc] focus:bg-white transition-all"
            [disabled]="isLoading()"
          />
          <button
            (click)="sendMessage()"
            [disabled]="!userInput.trim() || isLoading()"
            class="w-10 h-10 rounded-xl bg-[#5b54fc] text-[#fff] flex items-center justify-center hover:bg-[#4338ca] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
          >
            <svg class="w-4 h-4 fill-current rotate-90" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class HexiChatbotComponent {
  @ViewChild('scrollContainer') private scrollContainer?: ElementRef<HTMLDivElement>;

  langService = inject(LanguageService);

  isOpen = signal(false);
  isLoading = signal(false);
  userInput = '';
  selectedCategory = signal<string>('all');

  categories = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'services', labelAr: 'الخدمات', labelEn: 'Services' },
    { id: 'pricing', labelAr: 'الأسعار', labelEn: 'Pricing' },
    { id: 'academy', labelAr: 'الأكاديمية', labelEn: 'Academy' },
    { id: 'about', labelAr: 'عن هيكسورا', labelEn: 'About' },
    { id: 'contact', labelAr: 'التواصل', labelEn: 'Contact' },
  ];

  messages = signal<ChatMessage[]>([]);

  isAr = computed(() => this.langService.currentLang() === 'ar');

  visibleScenarios = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return HEXI_SCENARIOS;
    return HEXI_SCENARIOS.filter((s) => s.category === cat);
  });

  setCategory(id: string): void {
    this.selectedCategory.set(id);
  }

  toggleChat(): void {
    const nextState = !this.isOpen();
    this.isOpen.set(nextState);
    if (nextState) {
      this.scrollToBottom(false);
    }
  }

  selectScenario(item: ScenarioQuestion): void {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const ar = this.isAr();
    const userQuestion = ar ? item.questionAr : item.questionEn;
    const hexiAnswer = ar ? item.responseAr : item.responseEn;

    const userMsg: ChatMessage = { sender: 'user', text: userQuestion, time: timeStr };
    const hexiMsg: ChatMessage = {
      sender: 'hexi',
      text: hexiAnswer,
      time: timeStr,
      showSocialLinks: item.showSocialLinks || false,
    };

    this.messages.update((prev) => [...prev, userMsg, hexiMsg]);
    this.scrollToBottom(true);
  }

  async sendMessage(): Promise<void> {
    const text = this.userInput.trim();
    if (!text || this.isLoading()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = { sender: 'user', text, time: timeStr };

    const matched = HEXI_SCENARIOS.find(
      (s) =>
        s.questionAr.includes(text) ||
        s.questionEn.toLowerCase().includes(text.toLowerCase()) ||
        text.includes('\u0633\u0639\u0631') ||
        text.includes('\u0623\u0633\u0639\u0627\u0631') ||
        text.includes('\u062e\u062f\u0645\u0627\u062a') ||
        text.includes('\u062a\u0648\u0627\u0635\u0644') ||
        text.includes('\u0643\u0648\u0631\u0633')
    );

    if (matched) {
      const ar = this.isAr();
      const hexiMsg: ChatMessage = {
        sender: 'hexi',
        text: ar ? matched.responseAr : matched.responseEn,
        time: timeStr,
        showSocialLinks: matched.showSocialLinks || false,
      };
      this.messages.update((prev) => [...prev, userMsg, hexiMsg]);
      this.userInput = '';
      this.scrollToBottom(true);
      return;
    }

    this.messages.update((prev) => [...prev, userMsg]);
    this.userInput = '';
    this.isLoading.set(true);
    this.scrollToBottom(true);

    try {
      const history = this.messages().map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/hexi-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      const replyText = data.reply || (this.isAr() ? 'نسعد بخدمتك دائما' : 'Happy to assist you anytime');
      const hexiMsg: ChatMessage = {
        sender: 'hexi',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      this.messages.update((prev) => [...prev, hexiMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        sender: 'hexi',
        text: this.isAr()
          ? 'فريق هيكسورا المكون من 6 خبراء جاهز لمساعدتك في التسويق والتصميم والبرمجة والموشن جرافيك يمكنك التواصل معنا عبر القنوات الرسمية'
          : 'Hexora team of 6 experts is ready to help you with marketing, design, coding, and motion graphics',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showSocialLinks: true,
      };
      this.messages.update((prev) => [...prev, fallbackMsg]);
    } finally {
      this.isLoading.set(false);
      this.scrollToBottom(true);
    }
  }

  private scrollToBottom(smooth = true): void {
    setTimeout(() => {
      if (this.scrollContainer?.nativeElement) {
        this.scrollContainer.nativeElement.scrollTo({
          top: this.scrollContainer.nativeElement.scrollHeight,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    }, 60);
  }
}
