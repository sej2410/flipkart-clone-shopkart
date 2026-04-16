# ShopKart: A Flipkart Clone 🛒💎

ShopKart is a state-of-the-art e-commerce web application inspired by the latest minimalist "Infinity Design" language of Flipkart. This project features a clean, white-themed UI, a high-fidelity product catalog, and several premium bonus features including mock authentication and a responsive grid layout.

## 🚀 Live Demo

Frontend: https://flipkart-clone-shopkart.vercel.app  
Backend API: https://flipkart-clone-shopkart-1.onrender.com

## 🌟 Key Features
- **Modern Minimalist UI**: Rebranded with a sleek white header, rounded search bar, and pastel-themed product sections.
- **High-Fidelity Media**: 100% verified, stable, and accurate product imagery across 7 categories.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile viewing.
- **Order History**: Real-time tracking of past orders with detailed purchase histories.
- **Wishlist UI**: Interactive "Heart" icons on every product for a premium discovery experience.
- **Robust Tech Stack**: Powered by React 19, Node.js, and Supabase (PostgreSQL).

## 🛠️ Technology Stack
- **Frontend**: React (Vite), Axios, Lucide Icons, Vanilla CSS (Modern v3).
- **Backend**: Express.js, Node.js.
- **Database**: PostgreSQL (Managed on Supabase).
- **State Management**: React Context API (Cart & Order state).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (Supabase recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sej2410/flipkart-clone-shopkart.git
   ```
2. Install dependencies:
   ```bash
   # Root
   npm install
   # Client
   cd client && npm install
   # Server
   cd server && npm install
   ```
3. Setup Environment Variables:
   Create a `.env` file in the `server` directory with your `DATABASE_URL`.

4. Seed the Database:
   ```bash
   cd server
   node seed.js
   ```

5. Run Locally:
   ```bash
   # Server
   npm run dev
   # Client
   npm run dev
   ```

---
**Developed by Sejal (sej2410)**
