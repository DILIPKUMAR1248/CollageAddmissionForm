# College Admission Form System

A comprehensive Spring Boot web application for managing college admission forms with integrated payment processing.

## Overview

This system provides a complete solution for handling college admission applications, including:
- Student registration and personal information management
- Educational background tracking
- Course selection and management
- Payment processing for application fees

## Technology Stack

- **Framework**: Spring Boot 4.0.6
- **Java Version**: 21
- **Database**: MySQL with JPA/Hibernate
- **Template Engine**: Thymeleaf
- **Build Tool**: Maven
- **Additional Libraries**: Lombok for boilerplate code reduction

## Project Structure

```
src/main/java/com/DilipMandal/collageFormFillup/
├── controller/          # REST controllers for handling HTTP requests
│   ├── ApplicantController.java
│   ├── CourseController.java
│   ├── EducationController.java
│   └── PaymentController.java
├── service/            # Business logic layer
│   ├── ApplicantLogic.java
│   ├── CourseLogic.java
│   ├── EducationLogic.java
│   └── PaymentLogic.java
├── repository/         # Data access layer
│   ├── ApplicantRepository.java
│   ├── CourseRepository.java
│   ├── EducationRepository.java
│   └── PaymentRepository.java
├── entity/             # JPA entities
│   ├── Applicant.java
│   ├── Course.java
│   ├── Education.java
│   └── Payment.java
├── dto/                # Data Transfer Objects
│   ├── ApplicantDto.java
│   ├── CourseDto.java
│   ├── EducationDto.java
│   └── PaymentDto.java
└── utility/            # Utility classes
    └── MappingUtility.java
```

## Key Features

### Applicant Management
- Complete student profile management
- Personal information storage (name, contact, address)
- Demographic data tracking (gender, nationality)
- Date of birth management

### Educational Records
- Academic history tracking
- Previous qualifications management
- Educational background validation

### Course Management
- Available course catalog
- Course selection functionality
- Course capacity management

### Payment Processing
- Application fee processing
- Payment status tracking
- Transaction history

## Database Schema

The application uses the following main entities:
- **applicant**: Stores student personal information
- **education**: Tracks educational background
- **course**: Manages available courses
- **payment**: Handles payment transactions

## Getting Started

### Prerequisites
- Java 21 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd collageFormFillup
```

2. Configure the database:
   - Create a MySQL database
   - Update database connection properties in `application.properties`

3. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run
```

The application will start on the default port (8080).

### Configuration

Database configuration should be set in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## API Endpoints

The application provides RESTful endpoints for:
- `/applicants` - Applicant management
- `/courses` - Course operations
- `/education` - Educational records
- `/payments` - Payment processing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For any queries or support, please contact the development team.

---

**Note**: This application is designed to handle sensitive personal information. Ensure proper security measures are in place when deploying to production environments.
