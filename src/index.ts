import EventEmitter from 'eventemitter3';
import { defaultStyles } from './styles';
import { botIcon, sendIcon, closeIcon } from './icons';
import type { ChatbotConfig, Message } from './types';

export class Chatbot extends EventEmitter {
  private config: ChatbotConfig & {
    position: string;
    primaryColor: string;
    textColor: string;
    bgImage: string;
    opacity: number;
    glassmorphism: boolean;
    floatAnimation: string;
    showAvatar: boolean;
    showThoughts: boolean;
    thoughtInterval: number;
    customThoughts: string[];
    onMessage: (message: string) => Promise<string>;
  };
  private container: HTMLDivElement;
  private chat: HTMLDivElement;
  private messages: Message[] = [];
  private thoughtTimeout?: NodeJS.Timeout;
  private isOpen = false;

  constructor(config: ChatbotConfig) {
    super();
    this.config = {
      ...config,
      position: config.position || 'bottom-right',
      primaryColor: config.primaryColor || '#2563eb',
      textColor: config.textColor || '#1e293b',
      bgImage: config.bgImage || '',
      opacity: config.opacity || 100,
      glassmorphism: config.glassmorphism || false,
      floatAnimation: config.floatAnimation || 'float-up-down',
      showAvatar: config.showAvatar ?? true,
      showThoughts: config.showThoughts ?? true,
      thoughtInterval: config.thoughtInterval || 8,
      customThoughts: config.customThoughts || [
        "I'm here to help!",
        "Have any questions?", 
        "Need assistance?",
      ],
      onMessage: config.onMessage || this.defaultMessageHandler,
    };

    this.injectStyles();
    this.container = this.createContainer();
    this.chat = this.createChat();
    document.body.appendChild(this.container);
    
    if (this.config.showThoughts) {
      this.startThoughtCycle();
    }
  }

  private injectStyles() {
    const style = document.createElement('style');
    style.textContent = defaultStyles;
    document.head.appendChild(style);

    // Inject custom CSS variables
    const customStyles = document.createElement('style');
    customStyles.textContent = `
      :root {
        --arcai-primary-color: ${this.config.primaryColor};
        --arcai-primary-color-dark: ${this.adjustColor(this.config.primaryColor, -20)};
      }
    `;
    document.head.appendChild(customStyles);
  }

  private createContainer() {
    const container = document.createElement('div');
    container.className = `arcai-widget ${this.config.position}`;
    
    const launcher = document.createElement('button');
    launcher.className = `arcai-launcher ${this.config.floatAnimation}`;
    launcher.innerHTML = botIcon;
    launcher.onclick = () => this.toggle();
    
    container.appendChild(launcher);
    return container;
  }

  private createChat() {
    const chat = document.createElement('div');
    chat.className = 'arcai-chat';
    
    // Header
    const header = document.createElement('div');
    header.className = `arcai-header ${this.config.glassmorphism ? 'glassmorphism' : ''}`;
    if (this.config.bgImage) {
      header.style.backgroundImage = `url(${this.config.bgImage})`;
      header.style.backgroundSize = 'cover';
      header.style.backgroundPosition = 'center';
      header.style.backgroundColor = `rgba(37, 99, 235, ${this.config.opacity / 100})`;
    }
    
    const title = document.createElement('div');
    title.className = 'arcai-title';
    title.innerHTML = `${botIcon} <span>Chat Assistant</span>`;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'arcai-close';
    closeBtn.innerHTML = closeIcon;
    closeBtn.onclick = () => this.close();
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    
    // Messages
    const messages = document.createElement('div');
    messages.className = 'arcai-messages';
    
    // Input
    const input = document.createElement('div');
    input.className = 'arcai-input';
    
    const form = document.createElement('form');
    form.className = 'arcai-input-form';
    form.onsubmit = (e) => {
      e.preventDefault();
      const inputField = form.querySelector('input');
      if (inputField?.value.trim()) {
        this.sendMessage(inputField.value);
        inputField.value = '';
      }
    };
    
    const inputField = document.createElement('input');
    inputField.className = 'arcai-input-field';
    inputField.placeholder = 'Type your message...';
    
    const sendBtn = document.createElement('button');
    sendBtn.className = 'arcai-send';
    sendBtn.type = 'submit';
    sendBtn.innerHTML = sendIcon;
    
    form.appendChild(inputField);
    form.appendChild(sendBtn);
    input.appendChild(form);
    
    chat.appendChild(header);
    chat.appendChild(messages);
    chat.appendChild(input);
    
    this.container.appendChild(chat);
    return chat;
  }

  private async sendMessage(content: string) {
    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    this.messages.push(message);
    this.renderMessage(message);
    
    try {
      const response = await this.config.onMessage(content);
      const botMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'bot',
        content: response,
        timestamp: new Date(),
      };
      
      this.messages.push(botMessage);
      this.renderMessage(botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  private renderMessage(message: Message) {
    const messagesContainer = this.chat.querySelector('.arcai-messages');
    if (!messagesContainer) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = `arcai-message ${message.role}`;
    
    if (this.config.showAvatar) {
      const avatar = document.createElement('div');
      avatar.className = 'arcai-avatar';
      avatar.innerHTML = botIcon;
      messageEl.appendChild(avatar);
    }
    
    const bubble = document.createElement('div');
    bubble.className = 'arcai-bubble';
    bubble.textContent = message.content;
    messageEl.appendChild(bubble);
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  private showThought() {
    const thought = this.config.customThoughts[
      Math.floor(Math.random() * this.config.customThoughts.length)
    ];
    
    const thoughtEl = document.createElement('div');
    thoughtEl.className = 'arcai-thought';
    thoughtEl.textContent = thought;
    
    const launcher = this.container.querySelector('.arcai-launcher');
    if (launcher) {
      launcher.appendChild(thoughtEl);
      
      setTimeout(() => {
        thoughtEl.remove();
      }, 4000);
    }
  }

  private startThoughtCycle() {
    if (this.thoughtTimeout) {
      clearTimeout(this.thoughtTimeout);
    }
    
    const showNextThought = () => {
      if (!this.isOpen) {
        this.showThought();
      }
      this.thoughtTimeout = setTimeout(showNextThought, this.config.thoughtInterval * 1000);
    };
    
    setTimeout(showNextThought, 2000);
  }

  private adjustColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }

  private async defaultMessageHandler(message: string): Promise<string> {
    return `I received your message: "${message}". This is a default response. Please configure a custom message handler for more meaningful interactions.`;
  }

  public open() {
    this.isOpen = true;
    this.chat.classList.add('open');
  }

  public close() {
    this.isOpen = false;
    this.chat.classList.remove('open');
  }

  public toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  public destroy() {
    if (this.thoughtTimeout) {
      clearTimeout(this.thoughtTimeout);
    }
    this.container.remove();
  }
}

export type { ChatbotConfig, Message };