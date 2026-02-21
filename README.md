# SPYN: Smart People You Need

<div align="center">
<img width="1200" height="475" alt="SPYN Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

**SPYN** is an AI-powered networking prototype designed for the Hurricane Pitch competition. It leverages large language models to match users with the specialized talent they need for their projects.

## 🚀 Live Prototype

The latest version of the SPYN prototype is available online:
[SPYN Live Prototype](https://spyn-smart-people-you-need-prototype-448474372841.us-west1.run.app/)

## 🚀 Key Features

- **AI-Powered Matching:** Utilizes Google Gemini (`@google/genai`) to understand user needs and provide intelligent referrals.
- **Smart Discovery:** Analyzes complex queries to identify specific skill sets and expertise.
- **Vibe-Code Design:** Rapidly prototyped using Perplexity to iterate on the user experience.

## 🛠️ Technical Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **AI Integration:** Google Generative AI (Gemini)
- **CI/CD:** GitHub Actions (Automated Deployment to GitHub Pages)
- **Code Quality:** ESLint & Prettier
- **Testing:** Vitest

## 📖 Getting Started

### Prerequisites

- Node.js (v20+)
- A Google Gemini API Key

### Local Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/wellytg/SPYN.git
    cd SPYN
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env.local` file in the root directory and add your API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 🧪 Testing & Quality

- **Run Tests:** `npm run test`
- **Lint Code:** `npm run lint`
- **Format Code:** `npm run format`

---
*Created by Wellington Tatenda Gwavava*
