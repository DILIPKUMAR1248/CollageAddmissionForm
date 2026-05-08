# College Admission System - React Frontend

A modern, responsive React frontend for the College Admission Form System with full CRUD operations for Applicants, Courses, and Education records.

## 🚀 Features

### **Applicant Management**
- ✅ View all applicants with status badges
- ✅ Create new applicants with comprehensive form
- ✅ Edit existing applicant information
- ✅ View detailed applicant profiles
- ✅ Update applicant status (PENDING, APPROVED, REJECTED)
- ✅ Delete applicants with confirmation

### **Course Management**
- ✅ List all courses with priority and mode badges
- ✅ Add new courses with applicant assignment
- ✅ Edit course details
- ✅ View course information with linked applicant data
- ✅ Delete courses

### **Education Management**
- ✅ Display all education records with timeline
- ✅ Add new education records with date validation
- ✅ Edit education information
- ✅ View detailed education profiles
- ✅ Delete education records

### **UI/UX Features**
- 🎨 Modern, responsive design
- 📱 Mobile-friendly navigation
- 🔄 Loading states and error handling
- ✨ Smooth animations and transitions
- 🎯 Status badges and visual indicators
- 🔍 Search and filter capabilities
- 🖨️ Print-friendly layouts

## 🛠️ Technology Stack

- **React 18** - Frontend framework
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with modern features
- **JavaScript ES6+** - Modern JavaScript features

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Applicant/
│   │   │   ├── ApplicantList.js
│   │   │   ├── ApplicantList.css
│   │   │   ├── ApplicantForm.js
│   │   │   ├── ApplicantForm.css
│   │   │   ├── ApplicantDetail.js
│   │   │   └── ApplicantDetail.css
│   │   ├── Course/
│   │   │   ├── CourseList.js
│   │   │   ├── CourseList.css
│   │   │   ├── CourseForm.js
│   │   │   ├── CourseForm.css
│   │   │   ├── CourseDetail.js
│   │   │   └── CourseDetail.css
│   │   ├── Education/
│   │   │   ├── EducationList.js
│   │   │   ├── EducationList.css
│   │   │   ├── EducationForm.js
│   │   │   ├── EducationForm.css
│   │   │   ├── EducationDetail.js
│   │   │   └── EducationDetail.css
│   │   └── Navigation/
│   │       ├── Navigation.js
│   │       └── Navigation.css
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 8080

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Environment Configuration

The application is configured to proxy API requests to the backend server running on port 8080. Make sure your Spring Boot backend is running before starting the React application.

## 📡 API Integration

The frontend integrates with the following backend endpoints:

### Applicants
- `GET /api/8080/applicant/get/all` - Get all applicants
- `GET /api/8080/applicant/get/{id}` - Get applicant by ID
- `POST /api/8080/applicant/save` - Create new applicant
- `PUT /api/8080/applicant/update/{id}` - Update applicant
- `DELETE /api/8080/applicant/delete/{id}` - Delete applicant
- `PATCH /api/8080/applicant/status/{id}` - Update applicant status

### Courses
- `GET /api/8080/course/getAll` - Get all courses
- `GET /api/8080/course/get/{id}` - Get course by ID
- `POST /api/8080/course/save` - Create new course
- `PUT /api/8080/course/update/{id}` - Update course
- `DELETE /api/8080/course/delete/{id}` - Delete course

### Education
- `GET /api/8080/education/getAll` - Get all education records
- `GET /api/8080/education/get/{id}` - Get education by ID
- `POST /api/8080/education/save` - Create new education record
- `PUT /api/8080/education/update/{id}` - Update education
- `DELETE /api/8080/education/delete/{id}` - Delete education

## 🎨 Design Features

### **Responsive Design**
- Mobile-first approach
- Breakpoints for tablets and phones
- Collapsible navigation menu

### **Visual Feedback**
- Loading states for all async operations
- Error messages with user-friendly text
- Success confirmations
- Hover effects and transitions

### **Accessibility**
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- High contrast mode support

### **Status Indicators**
- Color-coded badges for applicant status
- Priority indicators for courses
- Grade visualization for education records

## 🔧 Customization

### **Styling**
All components use CSS modules with BEM-like naming conventions. Colors and spacing can be easily modified in the respective CSS files.

### **API Configuration**
Update the base URL in `src/services/api.js` if your backend runs on a different port or domain.

### **Routing**
Routes are defined in `src/App.js`. Add new routes following the existing pattern.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Production Build

Create an optimized production build:

```bash
npm run build
```

The build files will be generated in the `build` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 Notes

- The application uses React 18 with strict mode enabled
- All forms include validation
- API calls include error handling
- The navigation is responsive with mobile menu
- Components are modular and reusable
- CSS includes print styles for reports

## 🐛 Troubleshooting

### **Common Issues**

1. **API Connection Error**
   - Ensure backend is running on port 8080
   - Check CORS configuration in backend

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

3. **Routing Issues**
   - Ensure React Router is properly configured
   - Check for conflicting routes

## 📞 Support

For support and questions, please refer to the project documentation or create an issue in the repository.
