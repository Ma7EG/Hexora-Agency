import { Component, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChatMessage {
  sender: 'user' | 'hexi';
  text: string;
  time: string;
}

@Component({
  selector: 'app-hexi-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        *ngIf="!isOpen()"
        (click)="toggleChat()"
        class="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#5b54fc] to-[#70bee0] p-1 shadow-[0_12px_35px_rgba(91,84,252,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Open Hexi Chat"
      >
        <div class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
        <img
          src="/assets/hexi/sitting.png"
          alt="Hexi Mascot"
          class="w-full h-full object-contain filter drop-shadow-md group-hover:rotate-6 transition-transform"
        />
      </button>

      <div
        *ngIf="isOpen()"
        class="w-[90vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#5b54fc]/25 shadow-[0_20px_60px_rgba(91,84,252,0.25)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300"
      >
        <div class="bg-gradient-to-r from-[#5b54fc] to-[#4338ca] text-white px-5 py-3.5 flex items-center justify-between shadow-md">
          <div class="flex items-center gap-3">
            <div class="relative w-10 h-10 rounded-full bg-white/15 p-1 border border-white/20">
              <img src="/assets/hexi/sitting.png" alt="Hexi" class="w-full h-full object-contain" />
              <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white"></div>
            </div>
            <div>
              <h3 class="font-bold text-sm tracking-wide flex items-center gap-1.5">
                <span>Hexi AI</span>
                <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-normal">Online</span>
              </h3>
              <p class="text-[11px] text-white/80">المساعد الذكي لهيكسورا</p>
            </div>
          </div>
          <button
            (click)="toggleChat()"
            class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div #scrollContainer class="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          <div class="bg-gradient-to-b from-[#eefcff] to-[#f3efff] p-3.5 rounded-2xl border border-[#5b54fc]/15 flex items-center gap-3 shadow-sm">
            <div class="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white/80 p-1 border border-[#5b54fc]/20 flex items-center justify-center">
              <img src="/assets/Frame 1.png" alt="Welcome Hexi" class="w-full h-full object-contain" />
            </div>
            <div class="text-xs text-[#374151] leading-relaxed">
              <p class="font-bold text-[#5b54fc] mb-0.5">مرحباً بك!</p>
              <p>أنا هكسي (Hexi). كيف يمكنني مساعدتك اليوم في خدماتنا وتصميماتنا وتطوير موقعك؟</p>
            </div>
          </div>

          <div *ngFor="let msg of messages()" [class]="msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'">
            <div
              [class]="msg.sender === 'user'
                ? 'bg-[#5b54fc] text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[82%] text-xs shadow-sm leading-relaxed'
                : 'bg-white text-[#111827] rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[82%] text-xs shadow-md border border-gray-100 leading-relaxed'"
            >
              <p>{{ msg.text }}</p>
              <span [class]="msg.sender === 'user' ? 'text-[9px] text-white/70 block text-right mt-1' : 'text-[9px] text-gray-400 block text-left mt-1'">
                {{ msg.time }}
              </span>
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

        <div class="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            [(ngModel)]="userInput"
            (keyup.enter)="sendMessage()"
            placeholder="اكتب رسالتك هنا..."
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

  isOpen = signal(false);
  isLoading = signal(false);
  userInput = '';

  messages = signal<ChatMessage[]>([]);

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isOpen.update((v) => !v);
  }

  async sendMessage(): Promise<void> {
    const text = this.userInput.trim();
    if (!text || this.isLoading()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = { sender: 'user', text, time: timeStr };

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
      const replyText = data.reply || 'أهلاً بك! نسعد بخدمتك دائماً.';
      const hexiMsg: ChatMessage = {
        sender: 'hexi',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      this.messages.update((prev) => [...prev, hexiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        sender: 'hexi',
        text: 'أهلاً بك! نسعد بتقديم كافة استشارات التسويق والموشن جرافيك وتطوير البرمجيات. يسعدنا تواصلك معنا مباشرة عبر الواتساب أو البريد الإلكتروني!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
