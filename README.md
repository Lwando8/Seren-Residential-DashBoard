# 🏠 Seren Residential Dashboard

A React-based web dashboard for managing Seren Residential Estate operations and communicating with the mobile app.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📋 Features

- **Real-time Dashboard**: Monitor estate statistics and activity
- **Announcement System**: Send notifications to mobile app users
- **Complaint Management**: Update complaint statuses and add notes
- **Alert Management**: Handle emergency alerts and security incidents
- **Activity Monitoring**: Track recent events and system activity

## 🧪 Testing Features

- Test emergency alerts
- Simulate maintenance notices
- Send welcome messages
- Monitor complaint submissions
- Real-time data refresh

## 🔧 Development

This dashboard is designed to work alongside the Seren Residential mobile app. It provides:

- **Firebase Integration**: Real-time data synchronization
- **Mobile App Communication**: Send announcements and updates
- **Responsive Design**: Works on desktop and tablet devices
- **TypeScript**: Full type safety and better development experience

## 📁 Project Structure

```
seren-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx          # Main dashboard component
│   ├── App.css          # Dashboard styles
│   └── index.tsx        # React entry point
├── package.json
└── tsconfig.json
```

## 🔗 Integration

This dashboard communicates with:
- **Seren Mobile App**: Send announcements and receive updates
- **Firebase Backend**: Real-time data and notifications
- **Estate Management System**: Complaint and alert handling

## 🎯 Testing Workflow

1. Start the dashboard: `npm start`
2. Start the mobile app: `cd ../seren-residential-fresh && npm start`
3. Test communication between both applications
4. Monitor real-time updates and notifications

---

**Note**: This dashboard is designed to run independently from the mobile app while maintaining communication through Firebase. 