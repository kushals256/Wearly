# Wearly
- A revolutionary fashion-sharing platform empowering college students to rent, swap, and share outfits within their campus community.

## 🌟 Overview

Wearly revolutionizes campus fashion by creating a sustainable, community-driven platform where students can share their wardrobes. Whether it's a formal event, themed party, or just trying out a new style, Wearly makes fashion accessible and affordable for everyone.

### Why Wearly?
- Save money on occasional wear items
- Promote sustainable fashion
- Build community through shared fashion
- Express yourself with diverse style options
- Access premium fashion at fraction of the cost

## Key Features

### User Experience
- **Smart Authentication**
  - Seamless Google Sign-in/Sign-up
  - College email verification
  - Secure user sessions

- **Interactive Product Catalog**
  - Advanced filtering and search
  - Category-based browsing
  - Detailed product views with high-quality images
  - Real-time availability status

- **Profile Management**
  - Customizable user profiles
  - Transaction history
  - Wishlist management
  - Rating and review system

### Core Functionality
- **Sophisticated Rental System**
  - Flexible rental durations
  - Transparent pricing
  - Secure payment integration
  - Booking calendar

- **Item Management**
  - Easy item upload process
  - Multiple image support
  - Detailed item descriptions
  - Size and condition specifications

- **Cart & Checkout**
  - Multi-item cart system
  - Save for later functionality
  - Streamlined checkout process
  - Order confirmation

## Tech Stack

### Frontend
- **React.js 19.1.0** - Core framework
- **Vite 6.3.5** - Build tool
- **TailwindCSS 4.1.7** - Styling
- **React Router DOM 7.6.0** - Routing
- **Shadcn/UI** - UI Components
- **Lucide React** - Icons

### Backend & Services
- **Firebase**
  - Authentication
  - Cloud Storage
  - Real-time Database
- **Express.js** - Server framework
- **Node.js** - Runtime environment

### Development Tools
- **ESLint** - Code quality
- **Git** - Version control
- **npm/yarn** - Package management

## 🏁 Getting Started

### System Requirements
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git

### Prerequisites
```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 8.0.0
```

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Wearly.git
cd Wearly
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:

Create `.env` in root directory:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# API Configuration
VITE_API_URL=your_api_url
VITE_API_KEY=your_api_key

# Other Configuration
VITE_APP_ENV=development
```

## 🎮 Usage

### Development
```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

### Production
```bash
# Create production build
npm run build

# Serve production build
npm run serve
```

### Environment Variables
- `VITE_APP_ENV`: Application environment (development/production)
- `VITE_API_URL`: Backend API URL
- `VITE_API_KEY`: API authentication key
- Firebase configuration variables (as shown in installation)

## 📁 Project Structure

```
wearly/
├── src/                      # Source files
│   ├── components/           # React components
│   │   ├── common/          # Shared components
│   │   │   ├── Button/
│   │   │   ├── Header/
│   │   │   └── Footer/
│   │   ├── products/        # Product-related components
│   │   └── profile/         # Profile components
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   ├── Explore/
│   │   ├── Upload/
│   │   └── Profile/
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── services/            # API services
│   ├── styles/              # Global styles
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
├── public/                  # Static files
├── server/                  # Backend server
├── tests/                   # Test files
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes:
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch:
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

### Contribution Guidelines
- Write clear, descriptive commit messages
- Update documentation as needed
- Follow the existing code style
- Add appropriate tests
- Ensure all tests pass

## Troubleshooting

### Common Issues

1. **Installation Errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall: `npm install`

2. **Firebase Configuration**
   - Ensure all environment variables are set
   - Check Firebase console for correct credentials
   - Verify authentication settings

3. **Build Issues**
   - Update dependencies: `npm update`
   - Clear build cache: `npm run clean`
   - Check for conflicting dependencies

## 📄 License

This project is licensed under the MIT License

## 👥 Authors

- Kushal S
- Tanishq Gangatkar
- Mayank Soni
- Aditya Sharma

## Acknowledgments

- Thanks to my team who have helped shape Wearly
