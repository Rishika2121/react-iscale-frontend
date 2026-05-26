# iSCALE Website - React Frontend Replica

A complete frontend replica of theiscale.com built with React.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation & Run

```bash
# Navigate to the folder
cd iscale-website

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at **http://localhost:3000**

## 📄 Pages Included

| Page | Route/State | Description |
|------|-------------|-------------|
| **Home** | `home` | Full homepage with hero, testimonials, courses, experts, companies |
| **Courses** | `explore-courses` | Course listing with search & category filter + enrollment modal |
| **Events** | `events` | Upcoming webinars & events with registration |
| **Login** | `login` | Login form with password toggle |
| **Register** | `register` | Full registration form |

## 🎨 Design System

- **Primary color**: `#c0000c` (iScale Red)
- **Display font**: Syne (bold headings)
- **Body font**: DM Sans (clean readability)
- **Gradient background**: Blue-purple-pink (matching original)

## ⚙️ Features

- ✅ Responsive navigation with sticky header
- ✅ Hero section with live class booking form
- ✅ Student testimonials carousel
- ✅ Job updates with interactive cards
- ✅ Popular courses grid with enrollment modal
- ✅ Industry experts section
- ✅ Company logos marquee animation
- ✅ Success stories section
- ✅ Events page with registration tracking
- ✅ Course search & category filtering
- ✅ Login & Register forms with validation
- ✅ Hover animations & smooth transitions
- ✅ Footer with all links

## 🔌 Backend Integration

This is a **frontend-only** project. To make it fully functional:
- Connect to a REST API / Firebase / Supabase for auth
- Add a backend for form submissions
- Integrate payment gateway for course enrollment

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar.js
│   └── Footer.js
├── pages/
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── CoursesPage.js
│   └── EventsPage.js
├── App.js
├── index.js
└── index.css
```
