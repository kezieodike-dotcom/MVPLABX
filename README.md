# MVPLab X Monorepo

Welcome to the **MVPLab X** ecosystem—a high-performance monorepo housing a suite of AI-driven applications and investment tools.

## 🚀 Repository Structure

This project is organized as a monorepo using **npm workspaces**.

```text
/
├── apps/
│   ├── MVPLAB_WEB/          # Main Landing Page (MVPLABX)
│   ├── MVPLAB_VOICELAB/     # AI Voice Synthesis & Laboratory
│   ├── MVPLAB_COMMUNITY/    # Community Engagement Platform
│   ├── MVPLAB_INVESTMENT/   # AI-Driven Investment Dashboard
│   ├── MVPLAB_MARKETPLACE/  # Talent & Service Marketplace
│   └── MVPLAB_TALENTS/      # Talent Discovery & Management
├── docs/                     # Centralized Documentation
├── packages/                 # Shared logic and UI components
└── package.json              # Root Monorepo Configuration
```

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Variables
- **Icons**: Lucide React
- **Fonts**: Outfit (Headings), Inter (Body)
- **Architecture**: Npm Workspaces (Monorepo)

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) (v9+)

### Installation

Clone the repository and install all dependencies for all workspaces from the root:

```bash
git clone https://github.com/kezieodike-dotcom/MVPLABX.git
cd MVPLABX
npm install
```

### Running Development Servers

To start the development server for a specific app (e.g., the web landing page):

```bash
# Start MVPLAB_WEB
npm run dev -w apps/MVPLAB_WEB
```

Or run development servers for **all** apps that support it:

```bash
npm run dev --workspaces
```

## 📜 Projects Overview

### MVPLABX (MVPLAB_WEB)
The flagship landing page for MVPLab X, showcasing scalable AI applications for forward-thinking businesses.

### VoiceLab (MVPLAB_VOICELAB)
Advanced AI voice processing and synthesis platform.

## 🛡 License

© 2026 MVPLab. All rights reserved.
