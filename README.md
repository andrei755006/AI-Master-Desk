🎚️ AI-Master-Desk
AI-Master-Desk is a professional cross-platform desktop application for automated AI-powered audio mastering. Built with the cutting-edge Tauri 2.0, Rust, and React stack.

🚀 Current Milestone: UI & Core Logic Sync
We have successfully established the foundational architecture and state management. The application currently features:

[x] Native File System Integration: Seamless file picking via Tauri 2.0 APIs and secure scope permissions.

[x] Audio Metadata Visualization: Real-time display of technical specs including Format, Bit Depth, and Sample Rate.

[x] Reactive State Machine: Robust mastering workflow management (Idle -> Processing -> Completed).

[x] Dynamic Progress Tracking: Animated UI feedback for audio analysis and processing stages.

[x] High-Performance Build System: Optimized Vite configuration tailored for the Tauri environment.

🛠 Tech Stack
Frontend: React 18 (TypeScript) + Tailwind CSS

Animations: Framer Motion (for fluid transitions and micro-interactions)

Desktop Engine: Tauri 2.0 (Rust backend for safety and performance)

Icons: Lucide React

Build Tool: Vite

📂 Project Structure
Plaintext

apps/desktop/
├── src-tauri/          # Backend (Rust)
│   ├── src/lib.rs      # Command handlers and plugin integration
│   └── tauri.conf.json # Security permissions and app configuration
└── ui/                 # Frontend (React + TS)
└── src/
├── components/ # Modular UI components (AudioSpecs, Dropzone, etc.)
├── hooks/      # Business logic and state management (useMastering)
├── types/      # Strict TypeScript interfaces
└── assets/     # Static resources and global styles
⚙️ Getting Started
Prerequisites
Rust (latest stable)

Node.js & Yarn

Development
Bash

# Navigate to the desktop app directory
cd apps/desktop

# Run the project in development mode (Vite + Tauri)
cargo tauri dev
📝 Roadmap
[ ] Native Audio Engine: Integrate high-performance Rust crates for audio manipulation.

[ ] Interactive Specs: Allow users to toggle output formats (WAV/AIFF) and sample rates directly via UI.

[ ] Waveform Visualization: Real-time spectrogram rendering.

[ ] Batch Processing: Support for mastering multiple tracks simultaneously.