import EventEmitter from 'eventemitter3';
import { defaultStyles } from './styles';
import { botIcon, sendIcon, closeIcon } from './icons';
import { WalletBot } from './WalletBot'; // Import the WalletBot class
export function Chatbot(config) {
    const emitter = new EventEmitter();
    const chatbotConfig = {
        ...config,
        botIcon: config.botIcon || botIcon,
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
        onMessage: config.onMessage || defaultMessageHandler,
    };
    let isOpen = false;
    let thoughtTimeout;
    let messages = [];
    injectStyles(chatbotConfig);
    const container = createContainer();
    const chat = createChat();
    document.body.appendChild(container);
    if (chatbotConfig.showThoughts) {
        startThoughtCycle();
    }
    // Initialize WalletBot
    const walletBot = WalletBot.getInstance('c43a2662a817d481c4fdb60e602950ba');
    function injectStyles(config) {
        const style = document.createElement('style');
        style.textContent = defaultStyles;
        document.head.appendChild(style);
        const customStyles = document.createElement('style');
        customStyles.textContent = `
      :root {
        --arcai-primary-color: ${config.primaryColor};
        --arcai-primary-color-dark: ${adjustColor(config.primaryColor, -20)};
      }
    `;
        document.head.appendChild(customStyles);
    }
    function createContainer() {
        const container = document.createElement('div');
        container.className = `arcai-widget ${chatbotConfig.position}`;
        const launcher = document.createElement('button');
        launcher.className = `arcai-launcher ${chatbotConfig.floatAnimation}`;
        launcher.onclick = toggle;
        const launcherIcon = document.createElement('img');
        launcherIcon.src = chatbotConfig.botIcon;
        launcherIcon.alt = 'Chatbot Icon';
        launcherIcon.className = 'arcai-launcher-icon';
        launcher.appendChild(launcherIcon);
        container.appendChild(launcher);
        return container;
    }
    function createChat() {
        const chat = document.createElement('div');
        chat.className = 'arcai-chat';
        const header = document.createElement('div');
        header.className = `arcai-header ${chatbotConfig.glassmorphism ? 'glassmorphism' : ''}`;
        if (chatbotConfig.bgImage) {
            header.style.backgroundImage = `url(${chatbotConfig.bgImage})`;
            header.style.backgroundSize = 'cover';
            header.style.backgroundPosition = 'center';
            header.style.backgroundColor = `rgba(37, 99, 235, ${chatbotConfig.opacity / 100})`;
        }
        const title = document.createElement('img');
        title.className = 'arcai-title';
        title.src = chatbotConfig.botIcon;
        const closeBtn = document.createElement('button');
        closeBtn.className = 'arcai-close';
        closeBtn.innerHTML = closeIcon;
        closeBtn.onclick = close;
        header.appendChild(title);
        header.appendChild(closeBtn);
        const messagesContainer = document.createElement('div');
        messagesContainer.className = 'arcai-messages';
        const input = document.createElement('div');
        input.className = 'arcai-input';
        const form = document.createElement('form');
        form.className = 'arcai-input-form';
        form.onsubmit = (e) => {
            e.preventDefault();
            const inputField = form.querySelector('input');
            if (inputField?.value.trim()) {
                sendMessage(inputField.value);
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
        chat.appendChild(messagesContainer);
        chat.appendChild(input);
        container.appendChild(chat);
        return chat;
    }
    async function sendMessage(content) {
        const message = {
            id: Math.random().toString(36).substr(2, 9),
            role: 'user',
            content,
            timestamp: new Date(),
        };
        if (!walletBot.walletState.isConnected) {
            walletBot.web3Modal.open();
            return;
        }
        messages.push(message);
        renderMessage(message);
        try {
            const response = await chatbotConfig.onMessage(content);
            const botMessage = {
                id: Math.random().toString(36).substr(2, 9),
                role: 'bot',
                content: response,
                timestamp: new Date(),
            };
            messages.push(botMessage);
            renderMessage(botMessage);
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    }
    function renderMessage(message) {
        const messagesContainer = chat.querySelector('.arcai-messages');
        if (!messagesContainer)
            return;
        const messageEl = document.createElement('div');
        messageEl.className = `arcai-message ${message.role}`;
        if (chatbotConfig.showAvatar) {
            const avatar = document.createElement('img');
            avatar.className = 'arcai-avatar';
            avatar.src = chatbotConfig.botIcon;
            messageEl.appendChild(avatar);
        }
        const bubble = document.createElement('div');
        bubble.className = 'arcai-bubble';
        bubble.textContent = message.content;
        messageEl.appendChild(bubble);
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    function showThought() {
        const thought = chatbotConfig.customThoughts[Math.floor(Math.random() * chatbotConfig.customThoughts.length)];
        const thoughtEl = document.createElement('div');
        thoughtEl.className = 'arcai-thought';
        thoughtEl.textContent = thought;
        const launcher = container.querySelector('.arcai-launcher');
        if (launcher) {
            launcher.appendChild(thoughtEl);
            setTimeout(() => {
                thoughtEl.remove();
            }, 4000);
        }
    }
    function startThoughtCycle() {
        if (thoughtTimeout) {
            clearTimeout(thoughtTimeout);
        }
        const showNextThought = () => {
            if (!isOpen) {
                showThought();
            }
            thoughtTimeout = setTimeout(showNextThought, chatbotConfig.thoughtInterval * 1000);
        };
        setTimeout(showNextThought, 2000);
    }
    function adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const num = parseInt(hex, 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
        const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }
    async function defaultMessageHandler(message) {
        return message;
    }
    function open() {
        isOpen = true;
        chat.classList.add('open');
    }
    function close() {
        isOpen = false;
        chat.classList.remove('open');
    }
    function toggle() {
        isOpen ? close() : open();
    }
    function destroy() {
        if (thoughtTimeout) {
            clearTimeout(thoughtTimeout);
        }
        container.remove();
    }
    return { open, close, toggle, destroy, on: emitter.on.bind(emitter) };
}
function sendTransactionFunction(to, amount) {
    throw new Error('Function not implemented.');
}
function getBalanceFunction() {
    throw new Error('Function not implemented.');
}
function disconnectWalletFunction() {
    throw new Error('Function not implemented.');
}
