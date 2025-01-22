# @arcai/chatbot

A customizable chatbot widget for websites with beautiful animations and modern design.

## Features

- 🎨 Fully customizable appearance
- 🌊 Smooth animations
- 💭 Thought bubbles
- 🎯 Multiple positioning options
- 🌓 Glassmorphism effects
- 📱 Responsive design
- 🔌 Easy integration

## Installation

### NPM

```bash
npm install @arcai/chatbot
```

### CDN

Add the script directly to your HTML:

```html
<!-- Using jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@arcai/chatbot/dist/chatbot.min.js"></script>

<!-- OR using UNPKG -->
<script src="https://unpkg.com/@arcai/chatbot/dist/chatbot.min.js"></script>
```

## Usage

### With NPM

```javascript
import { Chatbot } from '@arcai/chatbot';

const chatbot = new Chatbot({
  apiKey: 'your-api-key',
  position: 'bottom-right',
  primaryColor: '#2563eb',
  floatAnimation: 'float-up-down',
  showThoughts: true,
  customThoughts: [
    "Need help?",
    "Have any questions?",
    "I'm here to assist you!"
  ],
  onMessage: async (message) => {
    // Handle incoming messages
    return "Thanks for your message!";
  }
});
```

### With CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@arcai/chatbot/dist/chatbot.min.js"></script>
<script>
  const chatbot = new Arcai.Chatbot({
    apiKey: 'your-api-key',
    position: 'bottom-right',
    primaryColor: '#2563eb',
    floatAnimation: 'float-up-down',
    showThoughts: true,
    customThoughts: [
      "Need help?",
      "Have any questions?",
      "I'm here to assist you!"
    ],
    onMessage: async (message) => {
      return "Thanks for your message!";
    }
  });
</script>
```
## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | - | Your API key (required) |
| `position` | string | 'bottom-right' | Widget position ('bottom-right', 'bottom-left', 'top-right', 'top-left') |
| `primaryColor` | string | '#2563eb' | Primary color for the widget |
| `textColor` | string | '#1e293b' | Text color |
| `bgImage` | string | - | Background image URL |
| `opacity` | number | 100 | Background opacity (0-100) |
| `glassmorphism` | boolean | false | Enable glassmorphism effect |
| `floatAnimation` | string | 'float-up-down' | Animation style for the launcher |
| `showAvatar` | boolean | true | Show bot avatar in messages |
| `showThoughts` | boolean | true | Show thought bubbles |
| `thoughtInterval` | number | 8 | Interval between thoughts (seconds) |
| `customThoughts` | string[] | [...] | Custom thought messages |
| `onMessage` | function | - | Message handler function |

## Methods

- `open()`: Open the chat widget
- `close()`: Close the chat widget
- `toggle()`: Toggle the chat widget
- `destroy()`: Remove the widget from the page

## Events

The chatbot extends EventEmitter and emits the following events:

- `message`: When a message is sent or received
- `open`: When the widget is opened
- `close`: When the widget is closed

## Styling

The widget uses CSS variables for easy customization:

```css
:root {
  --arcai-primary-color: #2563eb;
  --arcai-primary-color-dark: #1d4ed8;
}
```

## License

MIT