# 📱 EasySplit Mobile App

A modern expense splitting mobile application built with React Native and Expo.  
Designed to make managing shared expenses simple, fast, and intuitive.

Work in progress
---

## 🚀 Tech Stack

- ⚛️ React Native
- 🚀 Expo
- 🎨 NativeWind (TailwindCSS for React Native)
- 🔐 Supabase Authentication
- 🗄 Supabase Database & Storage
- 🟦 TypeScript

---

## 🎯 Goals of This Project

- Practice full mobile app architecture

- Implement secure authentication flow

- Manage real-time cloud-based data

- Build scalable and maintainable React Native code

- Strengthen fullstack integration skills

## ✨ Features

- 🔐 User authentication (Sign up / Login)
- 👥 Create and manage shared expense groups
- 💸 Add and split expenses
- 📊 Real-time data syncing with Supabase
- ☁️ Secure cloud data storage
- 🎨 Clean and responsive mobile UI

---

## 📸 Screenshots

(Add screenshots here once UI is complete)

---

## 🧠 Architecture Overview

The app follows a clean and scalable structure:

- Component-based UI architecture
- Centralized Supabase client configuration
- Modular service layer for API interactions
- Typed models and interfaces for type safety
- Styled using NativeWind utility classes

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/easysplit-mobile-app.git
cd easysplit-mobile-app

npm install

Create a .env file in the root of your project:

EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

npx expo start