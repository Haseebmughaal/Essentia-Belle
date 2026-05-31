# Essentia Belle | Luxury Fragrance Boutique

Essentia Belle is a refined, high-end e-commerce platform designed for premium fragrance enthusiasts. Combining a minimalist aesthetic with powerful technology, it offers a sophisticated shopping experience, interactive scent discovery, and a personalized AI fragrance consultant.

![Preview](https://images.unsplash.com/photo-1541604193435-2200878e06c4?auto=format&fit=crop&q=80&w=2000)

## ✨ Features

- **Personalized AI Consultant (Essentia):** Powered by Google Gemini, our digital sommelier provides point-to-point fragrance recommendations based on your mood, occasion, and favorite notes.
- **Minimalist Luxury UI:** A buttery-smooth, responsive interface built with React 19 and Tailwind CSS, focused on typography and negative space.
- **Dynamic Inventory Management:** Full-stack Admin dashboard to manage scents, brands, pricing, and olfactory notes.
- **Custom Snapshot System:** Innovative "Save as Default" technology allows administrators to create permanent restoration points for the entire boutique inventory.
- **Bespoke Laboratory Mode:** Integrated tools for custom scent requests and laboratory blending services.
- **Performance-First Architecture:** Uses SQLite with transactional integrity for lightning-fast data operations and 100% data persistence.

## 🚀 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Motion (for animations), Lucide React.
- **Backend:** Node.js, Express, Better-SQLite3.
- **AI:** Google Generative AI (Gemini 2.0 Flash).
- **Icons:** Lucide React.
- **Deployment Ready:** Configured for high-performance production builds.

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- A [Gemini API Key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/essentia-belle.git
cd essentia-belle
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_api_key_here
VITE_ADMIN_PASSWORD=your_secure_password
```

### 4. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## 📦 Build for Production
```bash
npm run build
npm start
```

## 📜 License
Personal Use License - Created with [Google AI Studio Build](https://ai.studio/build).
