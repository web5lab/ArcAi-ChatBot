import EventEmitter from 'eventemitter3';
import type { ChatbotConfig, Message } from './types';
export declare class Chatbot extends EventEmitter {
    private config;
    private container;
    private chat;
    private messages;
    private thoughtTimeout?;
    private isOpen;
    constructor(config: ChatbotConfig);
    private injectStyles;
    private createContainer;
    private createChat;
    private sendMessage;
    private renderMessage;
    private showThought;
    private startThoughtCycle;
    private adjustColor;
    private defaultMessageHandler;
    open(): void;
    close(): void;
    toggle(): void;
    destroy(): void;
}
export type { ChatbotConfig, Message };
