# CURA Healthcare Service - Login and Appointment Test Plan

## Application Overview

CURA Healthcare Service is a demo healthcare application that allows users to login and make appointment bookings. The application includes a home page, login page, appointment booking form, appointment history, and user profile management. The test plan covers both positive and negative scenarios for the login functionality and appointment booking workflow.

## Test Scenarios

### 1. Login Page Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC001: Successful Login with Valid Credentials

**File:** `tests/login/valid-login.spec.ts`

**Steps:**
  1. Navigate to https://katalon-demo-cura.herokuapp.com/
    - expect: Home page is displayed successfully with 'Make Appointment' button visible
  2. Click on 'Make Appointment' button or navigate to Login page
    - expect: Login page is displayed with username and password input fields
    - expect: Demo account credentials are shown (John Doe / ThisIsNotAPassword)
  3. Enter username: John Doe
    - expect: Username field is populated with 'John Doe'
  4. Enter password: ThisIsNotAPassword
    - expect: Password field is populated (masked)
  5. Click on 'Login' button
    - expect: User is successfully logged in
    - expect: Page redirects to appointment booking page (#appointment)
    - expect: Navigation menu changes to show: Home, History, Profile, Logout

#### 1.2. TC002: Login with Empty Username Field

**File:** `tests/login/empty-username.spec.ts`

**Steps:**
  1. Navigate to login page at https://katalon-demo-cura.herokuapp.com/profile.php#login
    - expect: Login page is displayed
  2. Leave username field empty
    - expect: Username field remains empty
  3. Enter password: ThisIsNotAPassword
    - expect: Password field is populated
  4. Click on 'Login' button
    - expect: Login fails
    - expect: User remains on login page
    - expect: Error message is displayed indicating username is required

#### 1.3. TC003: Login with Empty Password Field

**File:** `tests/login/empty-password.spec.ts`

**Steps:**
  1. Navigate to login page at https://katalon-demo-cura.herokuapp.com/profile.php#login
    - expect: Login page is displayed
  2. Enter username: John Doe
    - expect: Username field is populated
  3. Leave password field empty
    - expect: Password field remains empty
  4. Click on 'Login' button
    - expect: Login fails
    - expect: User remains on login page
    - expect: Error message is displayed indicating password is required

#### 1.4. TC004: Login with Both Fields Empty

**File:** `tests/login/both-fields-empty.spec.ts`

**Steps:**
  1. Navigate to login page at https://katalon-demo-cura.herokuapp.com/profile.php#login
    - expect: Login page is displayed
  2. Leave both username and password fields empty
    - expect: Both fields remain empty
  3. Click on 'Login' button
    - expect: Login fails
    - expect: User remains on login page
    - expect: Error messages are displayed for both fields

#### 1.5. TC005: Login with Invalid Username

**File:** `tests/login/invalid-username.spec.ts`

**Steps:**
  1. Navigate to login page at https://katalon-demo-cura.herokuapp.com/profile.php#login
    - expect: Login page is displayed
  2. Enter username: InvalidUser123
    - expect: Username field is populated with 'InvalidUser123'
  3. Enter password: ThisIsNotAPassword
    - expect: Password field is populated
  4. Click on 'Login' button
    - expect: Login fails
    - expect: User remains on login page
    - expect: Error message indicating 'Invalid username or password' is displayed

#### 1.6. TC006: Login with Invalid Password

**File:** `tests/login/invalid-password.spec.ts`

**Steps:**
  1. Navigate to login page at https://katalon-demo-cura.herokuapp.com/profile.php#login
    - expect: Login page is displayed
  2. Enter username: John Doe
    - expect: Username field is populated
  3. Enter password: WrongPassword123
    - expect: Password field is populated
  4. Click on 'Login' button
    - expect: Login fails
    - expect: User remains on login page
    - expect: Error message indicating 'Invalid username or password' is displayed

#### 1.7. TC007: Login with Special Characters in Username

**File:** `tests/login/special-chars-username.spec.ts`

**Steps:**
  1. Navigate to login page at https://katalon-demo-cura.herokuapp.com/profile.php#login
    - expect: Login page is displayed
  2. Enter username: John@#$%^&*()
    - expect: Username field is populated with special characters
  3. Enter password: ThisIsNotAPassword
    - expect: Password field is populated
  4. Click on 'Login' button
    - expect: Login fails
    - expect: User remains on login page
    - expect: Error message is displayed

#### 1.8. TC008: Login with SQL Injection Attempt in Username

**File:** `tests/login/sql-injection-username.spec.ts`

**Steps:**
  1. Navigate to login page at https://katalon-demo-cura.herokuapp.com/profile.php#login
    - expect: Login page is displayed
  2. Enter username: ' OR '1'='1
    - expect: Username field is populated with SQL injection payload
  3. Enter password: anything
    - expect: Password field is populated
  4. Click on 'Login' button
    - expect: Login fails
    - expect: SQL injection attempt is prevented
    - expect: User remains on login page
    - expect: Error message is displayed

#### 1.9. TC009: Login with SQL Injection Attempt in Password

**File:** `tests/login/sql-injection-password.spec.ts`

**Steps:**
  1. Navigate to login page at https://katalon-demo-cura.herokuapp.com/profile.php#login
    - expect: Login page is displayed
  2. Enter username: John Doe
    - expect: Username field is populated
  3. Enter password: ' OR '1'='1
    - expect: Password field is populated with SQL injection payload
  4. Click on 'Login' button
    - expect: Login fails
    - expect: SQL injection attempt is prevented
    - expect: User remains on login page
    - expect: Error message is displayed

#### 1.10. TC010: Login with Spaces in Username

**File:** `tests/login/spaces-username.spec.ts`

**Steps:**
  1. Navigate to login page at https://katalon-demo-cura.herokuapp.com/profile.php#login
    - expect: Login page is displayed
  2. Enter username with leading/trailing spaces: '  John Doe  '
    - expect: Username field is populated with spaces
  3. Enter password: ThisIsNotAPassword
    - expect: Password field is populated
  4. Click on 'Login' button
    - expect: Either login succeeds (if whitespace is trimmed) or fails with error message

### 2. Appointment Booking Tests

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC101: Book Appointment with Valid Data - All Fields

**File:** `tests/appointment/valid-appointment-all-fields.spec.ts`

**Steps:**
  1. Log in with valid credentials (John Doe / ThisIsNotAPassword)
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Select facility: Hongkong CURA Healthcare Center from dropdown
    - expect: Facility dropdown is updated to 'Hongkong CURA Healthcare Center'
  3. Check 'Apply for hospital readmission' checkbox
    - expect: Checkbox is checked
  4. Select 'Medicaid' as Healthcare Program
    - expect: Medicaid radio button is selected
  5. Enter visit date: 01/06/2026 in date field
    - expect: Date field is populated with '01/06/2026'
  6. Enter comment: 'Follow-up appointment for checkup' in comment field
    - expect: Comment field is populated with the text
  7. Click on 'Book Appointment' button
    - expect: Appointment is successfully booked
    - expect: Confirmation page is displayed showing appointment details

#### 2.2. TC102: Book Appointment with Minimum Required Fields

**File:** `tests/appointment/minimum-fields-appointment.spec.ts`

**Steps:**
  1. Log in with valid credentials (John Doe / ThisIsNotAPassword)
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Use default facility: Tokyo CURA Healthcare Center
    - expect: Facility defaults to 'Tokyo CURA Healthcare Center'
  3. Do NOT check hospital readmission checkbox
    - expect: Checkbox remains unchecked
  4. Use default Healthcare Program: Medicare (pre-selected)
    - expect: Medicare radio button remains selected
  5. Enter visit date: 05/06/2026 in date field
    - expect: Date field is populated
  6. Leave comment field empty
    - expect: Comment field remains empty
  7. Click on 'Book Appointment' button
    - expect: Appointment is successfully booked
    - expect: Confirmation page is displayed

#### 2.3. TC103: Book Appointment with Missing Visit Date

**File:** `tests/appointment/missing-visit-date.spec.ts`

**Steps:**
  1. Log in with valid credentials (John Doe / ThisIsNotAPassword)
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Select facility: Seoul CURA Healthcare Center
    - expect: Facility is updated
  3. Leave visit date field empty (required field)
    - expect: Visit date field remains empty
  4. Click on 'Book Appointment' button
    - expect: Booking fails
    - expect: Error message is displayed indicating 'Visit Date is required'
    - expect: Form remains filled with previously entered data

#### 2.4. TC104: Book Appointment with Invalid Date Format

**File:** `tests/appointment/invalid-date-format.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Enter visit date in invalid format: 2026-06-01
    - expect: Date field shows entered value or converts it
  3. Click on 'Book Appointment' button
    - expect: Either booking fails with format error or date is accepted if auto-converted

#### 2.5. TC105: Book Appointment with Past Date

**File:** `tests/appointment/past-date-appointment.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Enter visit date in the past: 01/01/2024
    - expect: Date field is populated with past date
  3. Click on 'Book Appointment' button
    - expect: Either booking fails with error message 'Cannot book appointment in the past'
    - expect: Or booking is allowed (depending on business logic)

#### 2.6. TC106: Book Appointment with Today's Date

**File:** `tests/appointment/today-date-appointment.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Enter today's date: 24/05/2026
    - expect: Date field is populated with today's date
  3. Click on 'Book Appointment' button
    - expect: Appointment is booked successfully
    - expect: Or error message indicates same-day booking not allowed

#### 2.7. TC107: Book Appointment with Very Far Future Date

**File:** `tests/appointment/future-date-appointment.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Enter visit date far in the future: 01/05/2030
    - expect: Date field is populated
  3. Click on 'Book Appointment' button
    - expect: Appointment is successfully booked
    - expect: Or error message indicates booking limit exceeded

#### 2.8. TC108: Book Appointment with Special Characters in Comments

**File:** `tests/appointment/special-chars-comments.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Enter visit date: 10/06/2026
    - expect: Date field is populated
  3. Enter comment with special characters: '<script>alert(1)</script>'
    - expect: Comment field is populated with special characters
  4. Click on 'Book Appointment' button
    - expect: Booking succeeds and data is safely stored
    - expect: XSS attack is prevented

#### 2.9. TC109: Book Appointment with Very Long Comment

**File:** `tests/appointment/long-comment-appointment.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Enter visit date: 15/06/2026
    - expect: Date field is populated
  3. Enter a very long comment (5000+ characters) in comment field
    - expect: Comment field accepts the long text or shows character limit warning
  4. Click on 'Book Appointment' button
    - expect: Either booking succeeds or error message about character limit is shown

#### 2.10. TC110: Book Appointment with All Healthcare Programs

**File:** `tests/appointment/healthcare-programs.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
    - expect: Appointment booking page is displayed
  2. Select Healthcare Program: None
    - expect: None radio button is selected
  3. Enter visit date: 12/06/2026
    - expect: Date field is populated
  4. Click on 'Book Appointment' button
    - expect: Appointment is successfully booked with None healthcare program

### 3. Navigation and Session Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC201: Navigate to History Page After Login

**File:** `tests/navigation/history-page-navigation.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
  2. Click on 'History' link in navigation menu
    - expect: User is navigated to appointment history page
    - expect: Page displays all booked appointments
    - expect: History page shows appointment details

#### 3.2. TC202: Navigate to Profile Page After Login

**File:** `tests/navigation/profile-page-navigation.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
  2. Click on 'Profile' link in navigation menu
    - expect: User is navigated to profile page
    - expect: User profile information is displayed

#### 3.3. TC203: Logout from Application

**File:** `tests/navigation/logout-functionality.spec.ts`

**Steps:**
  1. Log in with valid credentials
    - expect: User is successfully logged in
  2. Click on 'Logout' link in navigation menu
    - expect: User is logged out
    - expect: User is redirected to home page or login page
    - expect: Navigation menu changes back to: Home, Login

#### 3.4. TC204: Access Appointment Page Without Login

**File:** `tests/navigation/appointment-without-login.spec.ts`

**Steps:**
  1. Navigate directly to appointment page URL without logging in: https://katalon-demo-cura.herokuapp.com/#appointment
    - expect: User is redirected to login page
    - expect: Or access is denied with appropriate message

#### 3.5. TC205: Navigate Back to Home from Login Page

**File:** `tests/navigation/home-from-login.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Click on 'Home' link in navigation menu
    - expect: User is navigated back to home page
