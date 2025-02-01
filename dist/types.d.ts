export interface ChatbotConfig {
    botIcon: string;
    apiKey: string;
    icon: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'outside-left' | 'outside-right';
    theme?: Partial<{
        mode: 'light' | 'dark';
        accentColor: string;
        fontFamily: string;
        borderRadius: string;
        messageSpacing: string;
    }>;
    primaryColor?: string;
    textColor?: string;
    bgImage?: string;
    opacity?: number;
    glassmorphism?: boolean;
    blur?: number;
    floatAnimation?: 'float-up-down' | 'float-left-right' | 'float-diagonal' | 'float-circle' | 'none';
    showAvatar?: boolean;
    showThoughts?: boolean;
    thoughtInterval?: number;
    customThoughts?: string[];
    initialMessages?: string[];
    suggestedMessages?: string[];
    typingIndicator?: boolean;
    typingSpeed?: number;
    soundEffects?: boolean;
    persistConversation?: boolean;
    maxMessages?: number;
    attachments?: Partial<{
        enabled: boolean;
        maxSize: number;
        allowedTypes: string[];
    }>;
    translations?: Partial<{
        placeholder: string;
        welcomeMessage: string;
        errorMessage: string;
        typingText: string;
    }>;
    onMessage?: (message: string) => Promise<string>;
    onOpen?: () => void;
    onClose?: () => void;
    onAttachment?: (file: File) => Promise<string>;
    onError?: (error: Error) => void;
}
export interface WalletState {
    address: string | null;
    isConnecting: boolean;
    isConnected: boolean;
    error: Error | null;
}
export interface WalletHandlers {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    getBalance: () => Promise<string>;
    sendTransaction: (to: string, amount: string) => Promise<string>;
}
export interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
    status?: 'sent' | 'delivered' | 'error';
    attachments?: Array<{
        type: string;
        url: string;
        name: string;
        size: number;
    }>;
}
