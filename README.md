# 🏠 Seren Residential Dashboard

**Security Control Center & Estate Management Dashboard**

A modern, responsive dashboard application built with Next.js 14 for managing residential estate operations, security monitoring, and resident management.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC)
![React](https://img.shields.io/badge/React-18-61DAFB)

## ✨ Features

### 🔐 Authentication System
- Secure email/password authentication
- Protected routes and session management
- Logout functionality with proper state cleanup

### 📊 Dashboard Overview
- **Real-time Statistics**: Residents, security guards, properties, incidents
- **Activity Feed**: Live updates of security patrols, registrations, maintenance
- **Quick Actions**: Add residents, schedule patrols, generate reports

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark Mode Ready**: Tailwind CSS theming support
- **Accessible**: WCAG compliant components
- **Modern Icons**: Heroicons integration

### 🏗️ Architecture
- **Component-Based**: Modular React components
- **TypeScript**: Full type safety
- **Path Aliases**: Clean import statements (`@/components`, `@/screens`)
- **Production Ready**: Optimized build process

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lwando8/Seren-Residential-DashBoard.git
   cd Seren-Residential-DashBoard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Credentials
```
Email: admin@seren.com
Password: admin123
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   └── layout/
│       └── DashboardLayout.tsx  # Main dashboard layout
├── screens/
│   ├── auth/
│   │   └── LoginScreen.tsx      # Authentication screen
│   └── dashboard/
│       └── DashboardOverview.tsx # Dashboard overview
```

## 🎯 Key Components

### LoginScreen
- Email/password authentication
- Loading states and error handling
- Password visibility toggle
- Responsive form design

### DashboardLayout
- Responsive sidebar navigation
- Mobile hamburger menu
- Navigation items: Dashboard, Residents, Security, Reports, Settings
- Logout functionality

### DashboardOverview
- Key metrics display (residents, security, properties, incidents)
- Real-time activity feed with status indicators
- Quick action buttons for common tasks

## 🔧 Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.3
- **Icons**: Heroicons 2.0
- **Animation**: Framer Motion (ready)
- **Charts**: Chart.js & React-Chart.js-2 (ready)
- **Backend**: Firebase integration (ready)

## 🚦 Status

✅ **Completed Features**
- Authentication system
- Dashboard layout and navigation
- Overview page with statistics
- Responsive design
- TypeScript configuration
- Production build

🚧 **In Development**
- Individual page routes (/residents, /security, /reports, /settings)
- Charts and data visualization
- Firebase backend integration
- User management system

## 📱 Screenshots

*Dashboard will be accessible at http://localhost:3000 after starting the development server*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Seren Residential.

## 📞 Contact

**Project Owner**: Lwando Kelembe  
**Repository**: [Seren-Residential-DashBoard](https://github.com/Lwando8/Seren-Residential-DashBoard)

---

*Built with ❤️ for Seren Residential Estate Management* 