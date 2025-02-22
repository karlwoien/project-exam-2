# Project Exam 2 - Holidaze

![Holidaze](https://github.com/user-attachments/assets/024d297d-6fee-443a-8fd8-9b14e8b726c6)


This project was built as part of the Noroff Frontend Development - Project Exam 2.
The goal was to build an accommodation booking site where users can browse, book, list, and manage venues.

## 🚀 Live demo

Check out the live site here: [Holidaze](https://holidaze-kew.netlify.app/)

## 📖 Description
Holidaze is a modern booking platform that allows users to browse, book, and manage venues. It provides two main roles:
- Traveler (customer): Can search for and book venues.
- Venue Manager: Can list venues and manage them.

### Key features:
The platform includes the following core functionalities for customers and venue managers:  
- **Customer:**
    - View a list of Venues.
    - Search for a specific Venue.
    - View a specific Venue page by id.
    - View a calendar with available dates for a Venue.
    - A stud.noroff.no email may register as a customer.
    - Registered customer may create a booking at a Venue.
    - Registered customer may view their upcoming bookings.
- **Venue Manager:**
    - A stud.noroff.no email may register as a Venue manager.
    - A Venue manager may create, edit or delete a Venue they manage.
    - A Venue manager may view bookings for their venues.
- **General**
    - User authentication: Register/Login/Logout. 
    - Profile management (update avatar).

## 🛠️ Tech Stack
### Frontend
- **React** - UI framework
- **React Router** - Client-side routing
- **React Icons** - UI icons
- **React-hook-form + YUP** – Form validation
- **React-toastify** - Notifications
- **React-datepicker** - Date selection
- **Tailwind CSS** - Styling framework
- **Zustand** - State management

### API & Backend
- **Noroff API** - [API Documentation](https://docs.noroff.dev/)
- **Authentication** - API token-based authentication

### Other tools
- **Vite** - Development build tool
- **Netlify** - Deploy and hosting
- **ESLint & Prettier** - Code quality and formatting


## 📦 Getting started
To run Holidaze locally, follow these steps:
1. Clone the repository
```bash
git clone https://github.com/karlwoien/project-exam-2.git
```
2. Install dependencies
```bash
npm install
```
3. Create a .env file in the root directory and add API key for Noroff API
```bash
VITE_API_KEY=your-api-key-here
```
4. Start the development server
```bash
npm run dev
```
5. Build for production
```bash
npm run build
```

## 📝 Usage
### For Travelers
1. Register or login.
2. Explore or search for venues.
3. Book a venue with selected dates.
4. View your upcoming bookings.

### For Venue Managers
1. Register or login as Venue Manager.
2. Add new venues.
3. Edit or delete your venues.
4. View bookings on your venues.

## 🤝 Contributing
This repository is not open for contributions as it is part of a school project exam. However, feel free to fork the project, leave feedback, or explore it to learn more.
