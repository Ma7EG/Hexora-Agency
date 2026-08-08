import { Component, signal, ElementRef, ViewChild, AfterViewChecked, inject } from '@angular/core';
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
      <!-- Merged Unified Floating Badge Button -->
      <div
        *ngIf="!isOpen()"
        (click)="toggleChat()"
        class="group flex items-center gap-3 bg-white/95 backdrop-blur-xl px-4 py-2 rounded-full border border-[#5b54fc]/30 shadow-[0_12px_35px_rgba(91,84,252,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none animate-pulse-gentle"
      >
        <span class="text-xs font-bold text-[#5b54fc] tracking-wide">
          {{ isAr ? 'تحدث مع هكسي' : 'Talk with Hexi' }}
        </span>

        <div class="relative w-12 h-12 flex items-center justify-center shrink-0">
          <img
            src="/assets/hexi/sitting.png"
            alt="Hexi Mascot"
            class="w-full h-full object-contain filter drop-shadow-md group-hover:rotate-6 transition-transform"
          />
          <div class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white shadow-xs"></div>
        </div>
      </div>

      <!-- Main Chatbot Window -->
      <div
        *ngIf="isOpen()"
        class="w-[92vw] sm:w-[400px] h-[580px] max-h-[85vh] bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#5b54fc]/25 shadow-[0_20px_60px_rgba(91,84,252,0.25)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        <!-- Chat Header -->
        <div class="bg-gradient-to-r from-[#5b54fc] to-[#4338ca] text-white px-5 py-3.5 flex items-center justify-between shadow-md shrink-0">
          <div class="flex items-center gap-3">
            <div class="relative w-11 h-11 flex items-center justify-center p-0">
              <img src="/assets/hexi/sitting.png" alt="Hexi" class="w-full h-full object-contain filter drop-shadow-md" />
              <div class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#5b54fc]"></div>
            </div>
            <div>
              <h3 class="font-bold text-sm tracking-wide flex items-center gap-1.5">
                <span>Hexi AI</span>
                <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-normal">Online</span>
              </h3>
              <p class="text-[11px] text-white/80">{{ isAr ? 'المساعد الذكي لهيكسورا' : 'Hexora AI Assistant' }}</p>
            </div>
          </div>
          <button
            (click)="toggleChat()"
            class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- Category Filters Filter Row -->
        <div class="bg-slate-100/80 p-2 border-b border-gray-200/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <button
            *ngFor="let cat of categories"
            (click)="selectedCategory.set(cat.id)"
            [class]="selectedCategory() === cat.id
              ? 'bg-[#5b54fc] text-white text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow-xs'
              : 'bg-white text-gray-600 text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap hover:bg-gray-50 border border-gray-200'"
          >
            {{ isAr ? cat.labelAr : cat.labelEn }}
          </button>
        </div>

        <!-- Message Stream Area -->
        <div #scrollContainer class="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/40">
          <!-- Top Welcome Banner -->
          <div class="bg-gradient-to-b from-[#eefcff] to-[#f3efff] p-3.5 rounded-2xl border border-[#5b54fc]/15 flex items-center gap-3 shadow-sm">
            <div class="w-16 h-16 shrink-0 flex items-center justify-center p-0">
              <img src="/assets/Frame 1.png" alt="Welcome Hexi" class="w-full h-full object-contain filter drop-shadow-md" />
            </div>
            <div class="text-xs text-[#374151] leading-relaxed">
              <p class="font-bold text-[#5b54fc] mb-0.5">{{ isAr ? 'مرحباً بك في هيكسورا' : 'Welcome to Hexora' }}</p>
              <p>{{ isAr ? 'أنا هكسي. فريقنا المكون من 6 خبراء جاهز لمساعدتك. اختر من الأسئلة الجاهزة أدناه أو اكتب استفسارك.' : 'I am Hexi. Our team of 6 experts is ready to help you. Choose a question below or type your inquiry.' }}</p>
            </div>
          </div>

          <!-- Chat Messages List -->
          <div *ngFor="let msg of messages()" [class]="msg.sender === 'user' ? 'flex justify-end' : 'flex flex-col items-start'">
            <div
              [class]="msg.sender === 'user'
                ? 'bg-[#5b54fc] text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-xs shadow-sm leading-relaxed'
                : 'bg-white text-[#111827] rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[88%] text-xs shadow-md border border-gray-100 leading-relaxed'"
            >
              <p>{{ msg.text }}</p>
              <span [class]="msg.sender === 'user' ? 'text-[9px] text-white/70 block text-right mt-1' : 'text-[9px] text-gray-400 block text-left mt-1'">
                {{ msg.time }}
              </span>
            </div>

            <!-- Embedded Interactive Social Channel Buttons -->
            <div *ngIf="msg.showSocialLinks" class="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-1.5 w-full max-w-[90%]">
              <a
                href="https://www.instagram.com/hexorav"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold text-[#111827] shadow-xs transition-all"
              >
                <span class="text-[#5b54fc]">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61592904986714"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold text-[#111827] shadow-xs transition-all"
              >
                <span class="text-[#5b54fc]">Facebook</span>
              </a>
              <a
                href="https://www.linkedin.com/company/137403930/"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold text-[#111827] shadow-xs transition-all"
              >
                <span class="text-[#5b54fc]">LinkedIn</span>
              </a>
              <a
                href="https://www.tiktok.com/@hexorav1"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold text-[#111827] shadow-xs transition-all"
              >
                <span class="text-[#5b54fc]">TikTok</span>
              </a>
              <a
                href="mailto:hexorav@gmail.com"
                class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 bg-white hover:border-[#5b54fc] text-[11px] font-semibold text-[#111827] shadow-xs transition-all col-span-2 sm:col-span-2"
              >
                <span class="text-[#5b54fc]">Gmail: hexorav@gmail.com</span>
              </a>
            </div>
          </div>

          <div *ngIf="isLoading()" class="flex justify-start">
            <div class="bg-white text-gray-500 rounded-2xl rounded-tl-none px-4 py-3 text-xs shadow-md border border-gray-100 flex items-center gap-1.5">
              <div class="w-2 h-2 bg-[#5b54fc] rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-[#5b54fc] rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div class="w-2 h-2 bg-[#5b54fc] rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>

        <!-- Interactive Preset Scenario Quick Buttons Stream -->
        <div class="p-2.5 bg-slate-100/90 border-t border-gray-200 max-h-36 overflow-y-auto space-y-1.5 shrink-0">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">
            {{ isAr ? 'أسئلة شائعة وسيناريوهات جاهزة' : 'Quick Scenario Questions' }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <button
              *ngFor="let item of filteredScenarios()"
              (click)="selectScenario(item)"
              class="bg-white hover:bg-[#eefcff] text-[#5b54fc] hover:text-[#4338ca] border border-[#5b54fc]/20 text-[11px] font-medium px-3 py-1.5 rounded-xl transition-all text-left shadow-2xs hover:border-[#5b54fc]/50 cursor-pointer"
            >
              {{ isAr ? item.questionAr : item.questionEn }}
            </button>
          </div>
        </div>

        <!-- Text Input Row -->
        <div class="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
          <input
            type="text"
            [(ngModel)]="userInput"
            (keyup.enter)="sendMessage()"
            [placeholder]="isAr ? 'اكتب استفسارك هنا...' : 'Type your inquiry here...'"
            class="flex-1 bg-gray-50 text-xs text-gray-800 rounded-xl px-3.5 py-2.5 outline-none border border-gray-200 focus:border-[#5b54fc] focus:bg-white transition-all"
            [disabled]="isLoading()"
          />
          <button
            (click)="sendMessage()"
            [disabled]="!userInput.trim() || isLoading()"
            class="w-10 h-10 rounded-xl bg-[#5b54fc] text-white flex items-center justify-center hover:bg-[#4338ca] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
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
export class HexiChatbotComponent implements AfterViewChecked {
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

  get isAr() {
    return this.langService.currentLang() === 'ar';
  }

  filteredScenarios(): ScenarioQuestion[] {
    const cat = this.selectedCategory();
    if (cat === 'all') return HEXI_SCENARIOS;
    return HEXI_SCENARIOS.filter((s) => s.category === cat);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isOpen.update((v) => !v);
  }

  selectScenario(item: ScenarioQuestion): void {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userQuestion = this.isAr ? item.questionAr : item.questionEn;
    const hexiAnswer = this.isAr ? item.responseAr : item.responseEn;

    const userMsg: ChatMessage = { sender: 'user', text: userQuestion, time: timeStr };
    const hexiMsg: ChatMessage = {
      sender: 'hexi',
      text: hexiAnswer,
      time: timeStr,
      showSocialLinks: item.showSocialLinks || false,
    };

    this.messages.update((prev) => [...prev, userMsg, hexiMsg]);
  }

  async sendMessage(): Promise<void> {
    const text = this.userInput.trim();
    if (!text || this.isLoading()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = { sender: 'user', text, time: timeStr };

    // Check if user input matches any preset question directly
    const matched = HEXI_SCENARIOS.find(
      (s) =>
        s.questionAr.includes(text) ||
        s.questionEn.toLowerCase().includes(text.toLowerCase()) ||
        text.includes('سعر') ||
        text.includes('أسعار') ||
        text.includes('خدمات') ||
        text.includes('تواصل') ||
        text.includes('كورس')
    );

    if (matched) {
      const hexiMsg: ChatMessage = {
        sender: 'hexi',
        text: this.isAr ? matched.responseAr : matched.responseEn,
        time: timeStr,
        showSocialLinks: matched.showSocialLinks || false,
      };
      this.messages.update((prev) => [...prev, userMsg, hexiMsg]);
      this.userInput = '';
      return;
    }

    this.messages.update((prev) => [...prev, userMsg]);
    this.userInput = '';
    this.isLoading.set(true);

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

      if (!res.ok) {
        throw new Error('API Error');
      }

      const data = await res.json();
      const replyText = data.reply || (this.isAr ? 'أهلاً بك نسعد بخدمتك دائماً' : 'Welcome Happy to assist you anytime');
      const hexiMsg: ChatMessage = {
        sender: 'hexi',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      this.messages.update((prev) => [...prev, hexiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        sender: 'hexi',
        text: this.isAr
          ? 'أهلاً بك فريق هيكسورا المكون من 6 خبراء جاهز لمساعدتك في التسويق والتصميم والبرمجة والموشن جرافيك يمكنك التواصل معنا عبر القنوات الرسمية'
          : 'Welcome Hexora team of 6 experts is ready to help you with marketing, design, coding, and motion graphics',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showSocialLinks: true,
      };
      this.messages.update((prev) => [...prev, fallbackMsg]);
    } finally {
      this.isLoading.set(false);
    }
  }

  private scrollToBottom(): void {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
