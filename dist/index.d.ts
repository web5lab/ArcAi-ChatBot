import EventEmitter from 'eventemitter3';
import type { ChatbotConfig } from './types';
export declare function Chatbot(config: ChatbotConfig): {
    open: () => void;
    close: () => void;
    toggle: () => void;
    destroy: () => void;
    on: <T extends string | symbol>(event: T, fn: (...args: any[]) => void, context?: any) => EventEmitter<string | symbol, any>;
};
