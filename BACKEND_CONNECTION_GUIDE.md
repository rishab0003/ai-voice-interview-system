# Backend Connection Setup Guide

## Overview
Your frontend is now properly connected to your backend database! The authentication system has been enhanced with better error handling, toast notifications, and proper data storage.

## What Was Updated

### Frontend Authentication (`js/auth.js`)
- ✅ **Async/Await**: Modernized with async/await for better error handling
- ✅ **Toast Notifications**: Replaced alerts with professional toast messages
- ✅ **Loading States**: Buttons show loading animation during API calls
- ✅ **Error Handling**: Network errors and API errors are properly caught and displayed
- ✅ **User Data Storage**: Stores complete user object (name, email, ID) in localStorage
- ✅ **Authentication Check**: Added `checkAuth()` function for protected pages
- ✅ **Better Validation**: Client-side validation before API calls

## How to Test the Connection

### 1. Start the Backend Server

```bash
cd /home/rishab/ai-voice-interview-system/backend
node server.js
```

You should see: `Server running on port 5000`

### 2. Open the Frontend

Open in your browser:
```
file:///home/rishab/ai-voice-interview-system/frontend/landing.html
```

### 3. Test Registration

1. Click "Get Started" → "Create one"
2. Fill in the registration form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123 (watch the strength meter!)
   - Confirm Password: password123
3. Click "Create Account"
4. You should see a success toast notification
5. Check your MySQL database to verify the user was created

### 4. Test Login

1. Go to the login page
2. Enter the credentials you just registered
3. Click "Sign In"
4. You should see "Login successful! Redirecting..." toast
5. You'll be redirected to the dashboard with your name displayed

### 5. Verify Database Connection

Check that the user data is stored correctly:

```bash
# Connect to MySQL
mysql -u root -p

# Use your database
USE interview_db;

# Check users table
SELECT * FROM users;
```

## API Endpoints Being Used

### Register
- **URL**: `POST http://localhost:5000/api/auth/register`
- **Body**: `{ full_name, email, password }`
- **Response**: `{ message: "User registered successfully" }`

### Login
- **URL**: `POST http://localhost:5000/api/auth/login`
- **Body**: `{ email, password }`
- **Response**: 
```json
{
  "token": "jwt_token_here",
  "user": {
    "user_id": 1,
    "full_name": "Test User",
    "email": "test@example.com",
    "role": "candidate"
  }
}
```

## Error Messages You Might See

| Message | Cause | Solution |
|---------|-------|----------|
| "Network error. Please check if the backend server is running." | Backend not running | Start the backend with `node server.js` |
| "Email already exists" | User already registered | Use a different email or login instead |
| "Invalid email or password" | Wrong credentials | Check your email and password |
| "Please fill in all fields" | Empty form fields | Fill in all required fields |
| "Passwords do not match" | Confirmation mismatch | Ensure both password fields match |

## What Happens on Login

1. **Frontend** sends email/password to backend
2. **Backend** checks database for user
3. **Backend** verifies password hash with bcrypt
4. **Backend** generates JWT token
5. **Backend** returns token + user data
6. **Frontend** stores token and user data in localStorage
7. **Frontend** redirects to dashboard
8. **Dashboard** displays user's name from localStorage

## Protected Pages

The dashboard and other protected pages now check for authentication. If a user tries to access them without logging in, they'll be redirected to the login page.

To use this in other pages, add at the top of your JavaScript:

```javascript
// Check authentication on page load
window.addEventListener('DOMContentLoaded', function() {
    checkAuth(); // This will redirect if not logged in
});
```

## Next Steps

1. **Test the full flow**: Register → Login → Dashboard
2. **Check database**: Verify users are being created
3. **Test logout**: Click logout and verify you're redirected to login
4. **Test protected pages**: Try accessing dashboard.html without logging in

## Troubleshooting

### Backend won't start
```bash
# Install dependencies if needed
cd backend
npm install
```

### CORS errors
The backend already has CORS enabled, but if you see CORS errors, make sure:
- Backend is running on port 5000
- Frontend is accessing `http://localhost:5000` (not `127.0.0.1`)

### Database connection errors
Check your `backend/db.js` file has correct MySQL credentials:
```javascript
host: "localhost",
user: "root",
password: "your_password",
database: "interview_db"
```

---

**Your frontend is now fully connected to your database!** 🎉
