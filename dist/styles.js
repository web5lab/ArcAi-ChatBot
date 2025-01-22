export const defaultStyles = `
/* Dark mode support */
.arcai-widget[data-theme="dark"] {
  --arcai-bg: #1a1a1a;
  --arcai-text: #ffffff;
  --arcai-border: #333333;
}

.arcai-widget[data-theme="light"] {
  --arcai-bg: #ffffff;
  --arcai-text: #1a1a1a;
  --arcai-border: #e5e5e5;
}

.arcai-widget {
  position: fixed;
  z-index: 9999;
  transform: none;
  font-family: system-ui, -apple-system, sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.arcai-widget.bottom-right {
  bottom: 20px;
  right: 20px;
  transform-origin: bottom right;
}

.arcai-widget.bottom-left {
  bottom: 20px;
  left: 20px;
  transform-origin: bottom left;
}

.arcai-widget.top-right {
  top: 20px;
  right: 20px;
  transform-origin: top right;
}

.arcai-widget.top-left {
  top: 20px;
  left: 20px;
  transform-origin: top left;
}

.arcai-widget.outside-left {
  left: -28px; /* Half of launcher width */
  top: 50%;
  transform: translateY(-50%);
  transform-origin: center left;
}

.arcai-widget.outside-left:hover {
  left: 20px;
}

.arcai-widget.outside-left .arcai-chat {
  left: 80px;
  bottom: auto;
  top: 50%;
  transform: translateY(-50%);
}

.arcai-widget.outside-right {
  right: -28px;
  top: 50%;
  transform: translateY(-50%);
  transform-origin: center right;
}

.arcai-widget.outside-right:hover {
  right: 20px;
}

.arcai-widget.outside-right .arcai-chat {
  right: 80px;
  bottom: auto;
  top: 50%;
  transform: translateY(-50%);
}

.arcai-launcher {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--arcai-primary-color, #2563eb);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.arcai-launcher:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.arcai-launcher.float-up-down {
  animation: arcaiFloatUpDown 3s ease-in-out infinite;
}

.arcai-launcher.float-left-right {
  animation: arcaiFloatLeftRight 3s ease-in-out infinite;
}

.arcai-launcher.float-diagonal {
  animation: arcaiFloatDiagonal 4s ease-in-out infinite;
}

.arcai-launcher.float-circle {
  animation: arcaiFloatCircle 5s ease-in-out infinite;
}

/* Sound effect animations */
@keyframes arcaiSoundWave {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
}

.arcai-sound-wave {
  position: absolute;
  border: 2px solid var(--arcai-primary-color);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: arcaiSoundWave 1s ease-out infinite;
}

/* Typing indicator */
.arcai-typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: var(--arcai-bg);
  border-radius: 12px;
  margin-bottom: 8px;
}

.arcai-typing-dot {
  width: 6px;
  height: 6px;
  background: var(--arcai-primary-color);
  border-radius: 50%;
  animation: arcaiDotPulse 1.4s infinite;
}

.arcai-typing-dot:nth-child(2) { animation-delay: 0.2s; }
.arcai-typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes arcaiDotPulse {
  0%, 60%, 100% { transform: scale(1); opacity: 1; }
  30% { transform: scale(1.2); opacity: 0.4; }
}

/* Suggested messages */
.arcai-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.arcai-suggestion {
  padding: 6px 12px;
  background: var(--arcai-primary-color);
  color: white;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.arcai-suggestion:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
}

/* Attachment handling */
.arcai-attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.arcai-attachment {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: var(--arcai-bg);
  border-radius: 4px;
  font-size: 12px;
}

.arcai-attachment-remove {
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.arcai-attachment-remove:hover {
  opacity: 1;
}

.arcai-chat {
  position: fixed;
  width: 380px;
  height: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s, transform 0.3s;
  z-index: 1;
}

.arcai-chat.open {
  opacity: 1;
  transform: translateY(0);
}

.arcai-header {
  padding: 16px;
  background: var(--arcai-primary-color, #2563eb);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arcai-header.glassmorphism {
  backdrop-filter: blur(8px);
  background: rgba(37, 99, 235, 0.8);
}

.arcai-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.arcai-close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arcai-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.arcai-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #f8fafc;
}

.arcai-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
  opacity: 0;
  transform: translateY(10px);
  animation: arcaiMessageSlideUp 0.3s forwards;
}

.arcai-message.user {
  flex-direction: row-reverse;
}

.arcai-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.arcai-bubble {
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 70%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.arcai-message.user .arcai-bubble {
  background: var(--arcai-primary-color, #2563eb);
  color: white;
}

.arcai-input {
  padding: 16px;
  background: white;
  border-top: 1px solid #e2e8f0;
}

.arcai-input-form {
  display: flex;
  gap: 8px;
}

.arcai-input-field {
  flex: 1;
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  outline: none;
  font-size: 14px;
}

.arcai-input-field:focus {
  border-color: var(--arcai-primary-color, #2563eb);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.arcai-send {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--arcai-primary-color, #2563eb);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.arcai-send:hover {
  background: var(--arcai-primary-color-dark, #1d4ed8);
}

.arcai-thought {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 12px;
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 240px;
  opacity: 0;
  transform: translateY(10px);
  animation: arcaiThoughtBubble 4s ease-in-out forwards;
}

.arcai-thought::after {
  content: '';
  position: absolute;
  bottom: -6px;
  right: 24px;
  width: 12px;
  height: 12px;
  background: white;
  transform: rotate(45deg);
}

@keyframes arcaiFloatUpDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes arcaiFloatLeftRight {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

@keyframes arcaiFloatDiagonal {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(5px, -5px); }
}

@keyframes arcaiFloatCircle {
  0% { transform: translate(0, 0); }
  25% { transform: translate(5px, -5px); }
  50% { transform: translate(10px, 0); }
  75% { transform: translate(5px, 5px); }
  100% { transform: translate(0, 0); }
}

@keyframes arcaiMessageSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes arcaiThoughtBubble {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(10px);
  }
  10% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  90% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) translateY(-10px);
  }
}`;
