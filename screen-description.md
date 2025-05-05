# Car Rental App - Owner Features - Screen Descriptions
This document outlines the features available to car owners who register their vehicles on the car rental application. It details the purpose of each feature and the corresponding screen where it is accessed.

| # | Feature | Screen | Description |
|---|---------|--------|-------------|
| 1 | Send OTP | Register Screen | Sends OTP for user registration verification. |
| 2 | Create Account| Register Screen | Creates a new owner account. |
| 3 | Create License| Edit License Screen| Inputs owner's driver's license information.  |
| 4 | Upload Image License| Edit License Screen| Uploads image of owner's driver's license.
| 5 | List Cars| Home Screen | Displays owner's registered cars.  |
| 6 | List Bookings| Home Screen | Shows current/upcoming bookings for owner's cars.   |
| 7 | List Schedules| Home Screen | Displays scheduled maintenance/inspection appointments.|
| 8 | List Reports| Home Screen | Provides access to various owner reports.|
| 9 | Get current use| Home Screen | Displays logged-in owner's profile information. |
| 10 | List Cars| Cars Screen | Shows detailed list of owner's registered cars. |
| 11 | Delete Car| Cars Screen | Removes a registered car from the list.|
| 12 | Get car by id| Car Detail Screen| Displays detailed information for a specific car.   |
| 13 | View Contact| Car Detail Screen| Views renter's contact info for a car's booking.    |
| 14 | Get unavalibility date    | Car Detail Screen| Displays dates car is unavailable for booking.|
| 15 | Disable Car| Car Detail Screen| Temporarily disables a car from being booked. |
| 16 | Enable Car| Car Detail Screen| Re-enables a disabled car for booking.|
| 17 | List Model| Edit Car Screen | Lists car models for adding/editing cars.|
| 18 | List Fuel| Edit Car Screen | Lists fuel types for adding/editing cars.|
| 19 | List Amenity| Edit Car Screen | Lists amenities for adding/editing cars.|
| 20 | List Transmission   | Edit Car Screen | Lists transmission types for adding/editing cars.   |
| 21 | Create Car| Edit Car Screen | Adds a new car to the registered vehicle list.|
| 22 | Update Car| Edit Car Screen | Modifies details of an existing car listing.  |
| 23 | Upload Image Ca| Edit Car Screen | Uploads photos of the car.   |
| 24 | Create Car Report   | Create Car Report Screen   | Creates a report on car condition after rental. |
| 25 | Upload Image Car Report   | Create Car Report Screen   | Uploads images for a car report.   |
| 26 | Create unavalibility date | Unavalibility Schedule Screen  | Blocks out dates car is not available for rent. |
| 27 | View Contract Car   | Contract Car Screen| Displays car registration contract.|
| 28 | Contract sign ca| Signature Screen| Digitally signs car registration contract.
| 29 | Contract sign booking | Signature Screen| Digitally signs a booking-related contract.   |
| 30 | Tracking location car | Map Screen| Displays car's current location (if GPS equipped).  |
| 31 | List Booking| Booking Screen  | Displays list of all car bookings. |
| 32 | Get Booking by id   | Booking Detail Screen| Shows detailed information for a specific booking.  |
| 33 | Approve Booking| Booking Detail Screen| Accepts a pending booking request. |
| 34 | Reject Booking| Booking Detail Screen| Declines a pending booking request.|
| 35 | Feedback Bookin| Booking Detail Screen| Provides feedback or notes about a booking.   |
| 36 | Get Booking by id   | Pre and Post Compensaction Screen | Retrieves booking details for compensation forms. |
| 37 | Upload image field pre-compensaction  | Pre-compensaction Form Screen | Uploads images of car condition before rental.|
| 38 | Upload image field post-compensaction | Post-compensaction Form Screen | Uploads images of car condition after rental. |
| 39 | View Contract Booking | Contract Boooking Screen   | Displays the contract for a specific booking. |
| 40 | Create Booking Report | Create Booking Report Screen | Creates a report related to a specific booking. |
| 41 | Get list schedule   | View Inspection Schedule Screen | Displays list of scheduled vehicle inspections. |
| 42 | Get schedule by id  | View Detail Inspection Schedule Screen | Shows detailed information for a specific inspection schedule. |
| 43 | Get current use| Profile Screen  | Displays owner's profile information.|
| 44 | Upload image avatar | Profile Screen  | Uploads a profile picture for the owner.|
| 45 | Get list booking reports  | List Booking Reports Screen| Displays list of booking reports created by owner.  |
| 46 | Get booking report by id  | Booking Reports Detail Screen    | Shows detailed information for a specific booking report.|
| 47 | Get list car reports| List car Reports Scree| Displays list of car reports created by owner.|
| 48 | Get car report by id| Car Reports Detail Screen  | Shows detailed information for a specific car report.|
| 49 | Update user profile | Edit Profile Screen| Modifies owner's profile information.|
| 50 | Update password account   | Change password Screen| Changes the owner's account password.|
| 51 | Get list bank account | List Bank Account Screen   | Displays owner's linked bank accounts for payments. |
| 52 | Get bank account by id    | Edit Bank Account Screen   | Shows detailed information for a specific bank account.|
| 53 | Update bank acount  | Edit Bank Account Screen   | Modifies details of a linked bank account.
| 54 | Create Withdraw| Withdraw Request Scree| Requests withdrawal of owner's earnings.|
| 55 | Get list transaction| Transaction List Scree| Displays list of owner's financial transactions.    |



# Package Diagram

| No | Package | Description |
|---|---|---|
| 1 | App | Contains the application's routing configuration and entry points. |
| 2 | Asserts | Directory for static assets like images, fonts, and other resources. |
| 3 | Components | Contains reusable UI components. Includes: <br/> - screen: Components specifically designed for use as application screens. |
| 4 | Configs |   |
| 5 | Constants |   |
| 6 | Hooks |   |
| 7 | Lib |   |
| 8 | Services |   |
| 9 | Stores |   |
| 10 | Theme |   |



package project of expo. 
- app: router
- components: 
    + screen: create component for the router
    + form: create component form to handle form value
    + card: create component to list card object
    + layout: create component for set layout base
    + plugins: create component for reusable 
    + nativewindui: create component for ui
- configs: set default with axios, calendar
- constants
    + schema: validate form 
    + models
    + enums
- hooks: create hook with query and mutation
- services: call api endpoints
- store: use zustand
- lib: 
- theme: set color default


# Functional Requirement

### 3.34.1 Send OTP

**Function Trigger:** When the owner clicks the "Send OTP" button on the Register Screen.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To initiate the OTP (One-Time Password) sending process for owner registration verification.
*   **Interface:** Register Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the owner's phone number entered on the Register Screen.
    *   **Data Computation:** Generates a random OTP, associates it with the owner's phone number, and potentially hashes it for security.
    *   **Data Binding:** Displays a confirmation message to the owner indicating that the OTP has been sent.
*   **Function Details:** On clicking "Send OTP," the system sends an OTP to the owner's provided phone number. The owner needs this OTP to complete the registration process.

### 3.34.2 Create Account

**Function Trigger:** When the owner clicks the "Create Account" button on the Register Screen.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To create a new owner account in the system.
*   **Interface:** Register Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives owner's information (phone number, password, potentially name, email, etc.) from the Register Screen. Also receives the OTP entered by the owner.
    *   **Data Computation:** Validates the input data (e.g., password strength, phone number format, matching OTP).
    *   **Data Storage:** Stores the new owner account information (including hashed password) in the database.
*   **Function Details:** On clicking "Create Account," the system validates the entered information and the OTP. If valid, a new owner account is created and stored. The owner is then typically logged in.

### 3.34.3 Create License

**Function Trigger:** When the owner clicks the "Save" or "Submit" button on the Edit License Screen.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To input and store the owner's driver's license information.
*   **Interface:** Edit License Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives owner's license information (license number, expiry date, issuing state, etc.) from the Edit License Screen.
    *   **Data Computation:** Validates the input data (e.g., date format, license number format).
    *   **Data Storage:** Stores the owner's license information in the database, associated with the owner's account.
*   **Function Details:** On clicking "Save," the system validates the entered license information. If valid, the information is stored in the database.

### 3.34.4 Upload Image License

**Function Trigger:** When the owner selects an image file and confirms the upload on the Edit License Screen.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To upload an image of the owner's driver's license for verification purposes.
*   **Interface:** Edit License Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the image file uploaded by the owner.
    *   **Data Computation:** May perform image validation (e.g., file size, file type).
    *   **Data Storage:** Stores the image file in a storage service and saves the image's URL or path in the database, associated with the owner's account.
*   **Function Details:** On confirming the upload, the system stores the image and associates it with the owner's profile.

### 3.34.5 List Cars

**Function Trigger:** When the owner navigates to the "Home Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a list of the owner's registered cars.
*   **Interface:** Home Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of cars registered by the logged-in owner from the database.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the list of cars on the Home Screen, including relevant information (e.g., image, model, availability).
*   **Function Details:** On navigating to the Home screen, the system displays a list of the owner's registered cars.

### 3.34.6 List Bookings

**Function Trigger:** When the owner navigates to the "Home Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a list of current and upcoming bookings for the owner's cars.
*   **Interface:** Home Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of bookings for all cars registered by the logged-in owner from the database.
    *   **Data Computation:** Filters the bookings to show only current and upcoming bookings.
    *   **Data Binding:** Displays the list of bookings on the Home Screen, including relevant information (e.g., car details, booking dates, renter information).
*   **Function Details:** On navigating to the Home screen, the owner sees a summary of their car bookings.

### 3.34.7 List Schedules

**Function Trigger:** When the owner navigates to the "Home Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a list of scheduled maintenance/inspection appointments for the owner's cars.
*   **Interface:** Home Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of scheduled maintenance/inspection appointments for all cars registered by the logged-in owner from the database.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the list of schedules on the Home Screen, including relevant information (e.g., car details, date/time, type of service).
*   **Function Details:** Displays any upcoming appointments.

### 3.34.8 List Reports

**Function Trigger:** When the owner navigates to the "Home Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To provide access to various owner reports (e.g., earnings reports, car performance reports). *This implies a navigation link to a screen that then lists the reports.*
*   **Interface:** Home Screen (with a link to another screen - e.g., "Reports Screen")
*   **Data Processing:**

    *   **Data Collect:** *This function itself does NOT collect report data.* It simply provides a pathway to the reports.  The *Reports Screen* will then collect and display the actual report data.
    *   **Data Computation:** *None at this stage.*
    *   **Data Binding:**  Displays a list of available report types on the Home Screen (or a linked Reports Screen), with links to view the specific reports.
*   **Function Details:** Owner clicks a link to view various data reports.

### 3.34.9 Get current user

**Function Trigger:** When the owner navigates to the "Home Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display the logged-in owner's profile information. *This usually refers to a small display, perhaps in a header or sidebar.*
*   **Interface:** Home Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves the logged-in owner's profile information from the database.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the owner's profile information (e.g., name, profile picture) on the Home Screen.
*   **Function Details:** Owner info.

### 3.34.10 List Cars

**Function Trigger:** When the owner navigates to the "Cars Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To show a detailed list of the owner's registered cars. This screen is likely to provide more functionality than the car list on the Home Screen (e.g., editing, deleting).
*   **Interface:** Cars Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of cars registered by the logged-in owner from the database.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays a detailed list of cars on the Cars Screen, including relevant information (e.g., image, model, availability status, edit/delete options).
*   **Function Details:** More function than home screen.

### 3.34.11 Delete Car

**Function Trigger:** When the owner clicks the "Delete" button next to a car on the "Cars Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To remove a registered car from the list.
*   **Interface:** Cars Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the car's unique ID.
    *   **Data Computation:** Verifies that the car can be deleted (e.g., no active bookings). May display a confirmation dialog.
    *   **Data Storage:** Deletes the car from the database.
*   **Function Details:** Deletes the car and all info of the car.

### 3.34.12 Get car by id

**Function Trigger:** When the owner clicks on a specific car from the "Cars Screen" or a booking list.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To view detailed information about a specific car.
*   **Interface:** Car Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the car's unique ID. Retrieves the car's details from the database using the ID.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays all relevant information about the car on the Car Detail Screen (e.g., images, description, features, rental price, availability).
*   **Function Details:** All info about the car.

### 3.34.13 View Contact

**Function Trigger:** When the owner clicks the "View Renter Contact" button on the "Car Detail Screen" (presumably only when a car is currently booked).

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To view the renter's contact information for a specific car's booking.
*   **Interface:** Car Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the car's ID. Identifies the current booking associated with that car. Retrieves the renter's contact information from the database, linked to that booking.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the renter's contact information (e.g., name, phone number) on the Car Detail Screen.
*   **Function Details:** See the renter contact.

### 3.34.14 Get unavailability date

**Function Trigger:** When the owner views the "Car Detail Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To view the dates when the car is not available for booking. This could be due to existing bookings or owner-defined unavailability.
*   **Interface:** Car Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the car's unique ID. Retrieves a list of booked dates (or unavailable dates) associated with the car from the database. This may include dates blocked out by the owner.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the unavailable dates on the Car Detail Screen, possibly using a calendar view.
*   **Function Details:** Display calendar to the owner.

### 3.34.15 Disable Car

**Function Trigger:** When the owner clicks the "Disable Car" button on the "Car Detail Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To temporarily prevent a car from being booked.
*   **Interface:** Car Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the car's unique ID.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Storage:** Updates the car's status in the database to "Disabled". This status should prevent new bookings from being created.
*   **Function Details:** Prevent the car from any booking.

### 3.34.16 Enable Car

**Function Trigger:** When the owner clicks the "Enable Car" button on the "Car Detail Screen" (only displayed when the car is currently disabled).

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To re-enable a disabled car, allowing it to be booked again.
*   **Interface:** Car Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the car's unique ID.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Storage:** Updates the car's status in the database to "Enabled".
*   **Function Details:** Allow the car can be book again.

### 3.34.17 List Model

**Function Trigger:** When the owner navigates to the "Edit Car Screen" (either to create a new car or edit an existing one). Specifically, when the owner interacts with the "Model" field.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To provide a list of available car models for selection when adding or editing a car.
*   **Interface:** Edit Car Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of car models from the database. This might be a simple list or a more complex data structure with brands and models.
    *   **Data Computation:** Filters the list of models (if needed, based on brand selection).
    *   **Data Binding:** Displays the list of car models in a dropdown menu, autocomplete field, or similar UI element on the Edit Car Screen.
*   **Function Details:** Displays car models.

### 3.34.18 List Fuel

**Function Trigger:** When the owner navigates to the "Edit Car Screen" (either to create a new car or edit an existing one). Specifically, when the owner interacts with the "Fuel Type" field.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To provide a list of available fuel types for selection when adding or editing a car.
*   **Interface:** Edit Car Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of fuel types from the database (e.g., Gasoline, Diesel, Electric, Hybrid).
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the list of fuel types in a dropdown menu or similar UI element on the Edit Car Screen.
*   **Function Details:** Display list of fuel.

### 3.34.19 List Amenity

**Function Trigger:** When the owner navigates to the "Edit Car Screen" (either to create a new car or edit an existing one). Specifically, when the owner interacts with the "Amenities" section.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To provide a list of available car amenities for selection when adding or editing a car.
*   **Interface:** Edit Car Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of car amenities from the database (e.g., Air Conditioning, GPS, Bluetooth, Sunroof).
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the list of car amenities using checkboxes, a multi-select dropdown, or a similar UI element on the Edit Car Screen.
*   **Function Details:** Displays all amenities.

### 3.34.20 List Transmission

**Function Trigger:** When the owner navigates to the "Edit Car Screen" (either to create a new car or edit an existing one). Specifically, when the owner interacts with the "Transmission Type" field.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To provide a list of available transmission types for selection when adding or editing a car.
*   **Interface:** Edit Car Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of transmission types from the database (e.g., Automatic, Manual).
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the list of transmission types in a dropdown menu or similar UI element on the Edit Car Screen.
*   **Function Details:** List transmission type.

### 3.34.21 Create Car

**Function Trigger:** When the owner clicks the "Save" or "Create Car" button on the "Edit Car Screen" after filling in the car details.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To add a new car to the registered vehicle list.
*   **Interface:** Edit Car Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives car details from the Edit Car Screen (e.g., model, year, fuel type, amenities, license plate, rental price).
    *   **Data Computation:** Validates the input data.
    *   **Data Storage:** Stores the new car information in the database, associating it with the owner's account.
*   **Function Details:** New car and details.

### 3.34.22 Update Car

**Function Trigger:** When the owner clicks the "Save" or "Update Car" button on the "Edit Car Screen" after modifying the car details.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To modify details of an existing car listing.
*   **Interface:** Edit Car Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the updated car details from the Edit Car Screen.
    *   **Data Computation:** Validates the input data.
    *   **Data Storage:** Updates the car information in the database.
*   **Function Details:** Update car and details.

### 3.34.23 Upload Image Car

**Function Trigger:** When the owner selects image files and confirms the upload on the "Edit Car Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To upload photos of the car.
*   **Interface:** Edit Car Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the image files uploaded by the owner.
    *   **Data Computation:** May perform image validation (e.g., file size, file type).
    *   **Data Storage:** Stores the image files in a storage service and saves the image URLs or paths in the database, associated with the car.
*   **Function Details:** Upload images of the car.

### 3.34.24 Create Car Report

**Function Trigger:** When the owner clicks the "Submit Report" button on the "Create Car Report Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To create a report on car condition after rental.
*   **Interface:** Create Car Report Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the car report details from the Create Car Report Screen (e.g., condition description, mileage, fuel level).
    *   **Data Computation:** No significant computation is needed at this stage. The data is collected for record-keeping.
    *   **Data Storage:** Stores the car report information in the database, associating it with the car and the related booking.
*   **Function Details:** Report of car after each rental.

### 3.34.25 Upload Image Car Report

**Function Trigger:** When the owner selects image files and confirms the upload on the "Create Car Report Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To upload images to support a car report.
*   **Interface:** Create Car Report Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the image files uploaded by the owner.
    *   **Data Computation:** May perform image validation (e.g., file size, file type).
    *   **Data Storage:** Stores the image files in a storage service and saves the image URLs or paths in the database, associated with the car report.
*   **Function Details:** Image of the car after each rental.

### 3.34.26 Create unavailability date

**Function Trigger:** When the owner selects a date range and clicks the "Save" or "Block Dates" button on the "Unavalibility Schedule Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To block out dates when a car is not available for rent (e.g., for maintenance, personal use).
*   **Interface:** Unavalibility Schedule Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the car ID and the date range from the Unavalibility Schedule Screen.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Storage:** Stores the unavailability dates in the database, associating them with the car.
*   **Function Details:** Dates car will be unavaliable.

### 3.34.27 View Contract Car

**Function Trigger:** When the owner clicks the "View Contract" button on the "Contract Car Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To view the car registration contract.
*   **Interface:** Contract Car Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves the contract document (or a link to it) from the database or a storage service, associating it with the car.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the car registration contract on the Contract Car Screen.
*   **Function Details:** Contract that the owner signed.

### 3.34.28 Contract sign ca

**Function Trigger:** When the owner completes signing their name/initials in the required field and clicks the "Submit" button on the "Signature Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To digitally sign the car registration contract.
*   **Interface:** Signature Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the signature data (e.g., captured signature image, signature data in a specific format).
    *   **Data Computation:** May validate the signature data (e.g., ensure a signature is present).
    *   **Data Storage:** Stores the signature data and associates it with the car registration contract in the database. May also store the completed contract document (including the signature) in a storage service.
*   **Function Details:** Owner sign contract.

### 3.34.29 Contract sign booking

**Function Trigger:** When the owner clicks the "Sign Contract" button on the "Signature Screen" during the booking process.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To digitally sign a booking-related contract (e.g., rental agreement).
*   **Interface:** Signature Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the owner's signature data.
    *   **Data Computation:** May validate the signature data.
    *   **Data Storage:** Stores the signature data and associates it with the booking contract in the database. May also store the completed contract document (including the signature) in a storage service.
*   **Function Details:** Owner sign booking contract.

### 3.34.30 Tracking location car

**Function Trigger:** When the owner navigates to the "Map Screen" and selects a specific car to track.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a car's current location (if GPS equipped).
*   **Interface:** Map Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the car's unique ID. Retrieves the car's current location data from the GPS tracking system (or the database, if the location is periodically updated).
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the car's location on the Map Screen, typically using a map marker.
*   **Function Details:** The car must have a GPS to track.

### 3.34.31 List Booking

**Function Trigger:** When the owner navigates to the "Booking Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a list of all bookings for the owner's cars.
*   **Interface:** Booking Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of all bookings for cars registered by the logged-in owner from the database.
    *   **Data Computation:** Filters and sorts the bookings (e.g., by date, car, status).
    *   **Data Binding:** Displays the list of bookings on the Booking Screen, including relevant information (e.g., car details, booking dates, renter information, status).
*   **Function Details:** Owner sees all bookings.

### 3.34.32 Get Booking by id

**Function Trigger:** When the owner clicks on a specific booking from the "Booking Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To view detailed information for a specific booking.
*   **Interface:** Booking Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the booking's unique ID. Retrieves the booking details from the database using the ID.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays all relevant information about the booking on the Booking Detail Screen (e.g., car details, booking dates, renter information, total cost, status, contract information).
*   **Function Details:** Details of booking.

### 3.34.33 Approve Booking

**Function Trigger:** When the owner clicks the "Approve" button on the "Booking Detail Screen" for a booking with a "Pending" status.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To accept a pending booking request.
*   **Interface:** Booking Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the booking ID.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Storage:** Updates the booking's status in the database to "Approved" (or similar). May trigger notifications to the renter.
*   **Function Details:** The owner accept the booking.

### 3.34.34 Reject Booking

**Function Trigger:** When the owner clicks the "Reject" button on the "Booking Detail Screen" for a booking with a "Pending" status.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To decline a pending booking request.
*   **Interface:** Booking Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the booking ID.
    *   **Data Computation:** No significant computation is needed. May require the owner to provide a reason for rejection.
    *   **Data Storage:** Updates the booking's status in the database to "Rejected" (or similar). May trigger notifications to the renter.
*   **Function Details:** Owner declines the booking.

### 3.34.35 Feedback Booking

**Function Trigger:** When the owner clicks the "Submit Feedback" button on the "Booking Detail Screen" after a booking has been completed.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To provide feedback or notes about a booking. This might be internal notes for record-keeping.
*   **Interface:** Booking Detail Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the owner's feedback from the Booking Detail Screen.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Storage:** Stores the feedback in the database, associating it with the booking.
*   **Function Details:** Owner adds feedback or notes about booking.

You are correct. I apologize. Let's continue with the owner features.

### 3.34.36 Get Booking by id

**Function Trigger:** When the system navigates to the "Pre and Post Compensation Screen" after a pre-trip or post-trip damage report process is initiated.

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To retrieve booking details for use in pre- or post-trip compensation forms related to damage or incidents. This ensures the compensation claim is correctly associated with the booking.
*   **Interface:** Pre and Post Compensation Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the booking's unique ID. Retrieves the booking details from the database using the ID.
    *   **Data Computation:** No significant computation is needed *for this function*. The retrieved booking information will be used in the associated compensation form processing.
    *   **Data Binding:** Populates relevant fields on the Pre and Post Compensation Screen with the retrieved booking data (e.g., car details, booking dates, renter information).
*   **Function Details:** Retrieves the details of booking for damage incident.

### 3.34.37 Upload image field pre-compensaction

**Function Trigger:** When the owner selects an image file and confirms the upload on the "Pre-compensaction Form Screen."

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To upload images of the car's condition *before* the rental period begins, as part of a pre-trip damage inspection.
*   **Interface:** Pre-compensaction Form Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the image file uploaded by the owner.
    *   **Data Computation:** May perform image validation (e.g., file size, file type).
    *   **Data Storage:** Stores the image file in a storage service and saves the image's URL or path in the database, associating it with the pre-compensation report and the booking.
*   **Function Details:** Pictures of the car before rental.

### 3.34.38 Upload image field post-compensaction

**Function Trigger:** When the owner selects an image file and confirms the upload on the "Post-compensaction Form Screen."

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To upload images of the car's condition *after* the rental period ends, as part of a post-trip damage inspection.
*   **Interface:** Post-compensaction Form Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the image file uploaded by the owner.
    *   **Data Computation:** May perform image validation (e.g., file size, file type).
    *   **Data Storage:** Stores the image file in a storage service and saves the image's URL or path in the database, associating it with the post-compensation report and the booking.
*   **Function Details:** Pictures of the car after rental.

### 3.34.39 View Contract Booking

**Function Trigger:** When the owner clicks the "View Contract" button on the "Contract Booking Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display the rental contract for a specific booking.
*   **Interface:** Contract Booking Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the booking ID. Retrieves the contract document (or a link to it) from the database or a storage service, associating it with the booking.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the rental contract on the Contract Booking Screen.
*   **Function Details:** Owner views the booking contract.

### 3.34.40 Create Booking Report

**Function Trigger:** When the owner clicks the "Submit Report" button on the "Create Booking Report Screen."

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To create a report related to a specific booking (e.g., renter behavior, car issues).
*   **Interface:** Create Booking Report Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the report details from the Create Booking Report Screen (e.g., type of issue, description).
    *   **Data Computation:** No significant computation is needed at this stage. The data is collected for review and action.
    *   **Data Storage:** Stores the booking report information in the database, associating it with the booking.
*   **Function Details:** Report for specific booking.

### 3.34.41 Get list schedule

**Function Trigger:** When the owner navigates to the "View Inspection Schedule Screen."

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a list of scheduled vehicle inspections for their cars.
*   **Interface:** View Inspection Schedule Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of scheduled inspections for all cars registered by the logged-in owner from the database.
    *   **Data Computation:** Filters and sorts the schedules.
    *   **Data Binding:** Displays the list of inspections.
*   **Function Details:** Shows the schedule to the owner.

### 3.34.42 Get schedule by id

**Function Trigger:** When the owner clicks on a specific inspection schedule from the "View Inspection Schedule Screen."

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To show detailed information for a specific inspection schedule.
*   **Interface:** View Detail Inspection Schedule Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the inspection schedule's unique ID. Retrieves the schedule details from the database using the ID.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays all relevant information about the inspection schedule.
*   **Function Details:** Details of the specific inspection.

### 3.34.43 Get current use

**Function Trigger:** When the owner navigates to the "Profile Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display the owner's profile information.
*   **Interface:** Profile Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves the logged-in owner's profile information from the database.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the owner's profile information.
*   **Function Details:** Shows profile info.

### 3.34.44 Upload image avatar

**Function Trigger:** When the owner selects an image file and confirms the upload on the "Profile Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To upload a profile picture for the owner.
*   **Interface:** Profile Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the image file uploaded by the owner.
    *   **Data Computation:** May perform image validation.
    *   **Data Storage:** Stores the image file in a storage service and saves the image's URL or path in the database, associated with the owner's account.
*   **Function Details:** Owner pic upload.

### 3.34.45 Get list booking reports

**Function Trigger:** When the owner navigates to the "List Booking Reports Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a list of booking reports created by the owner.
*   **Interface:** List Booking Reports Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of booking reports associated with the logged-in owner from the database.
    *   **Data Computation:** Filters and sorts the reports.
    *   **Data Binding:** Displays the list of booking reports.
*   **Function Details:** Owner sees the reports.

### 3.34.46 Get booking report by id

**Function Trigger:** When the owner clicks on a specific booking report from the "List Booking Reports Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To show detailed information for a specific booking report.
*   **Interface:** Booking Reports Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the booking report's unique ID. Retrieves the report details from the database using the ID.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays all relevant information about the booking report.
*   **Function Details:** Details of the report.

### 3.34.47 Get list car reports

**Function Trigger:** When the owner navigates to the "List car Reports Scree".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a list of car reports created by the owner.
*   **Interface:** List car Reports Scree
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of car reports associated with cars owned by the logged-in owner from the database.
    *   **Data Computation:** Filters and sorts the reports.
    *   **Data Binding:** Displays the list of car reports.
*   **Function Details:** List of reports for owner's cars.

### 3.34.48 Get car report by id

**Function Trigger:** When the owner clicks on a specific car report from the "Car Reports Detail Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To show detailed information for a specific car report.
*   **Interface:** Car Reports Detail Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the car report's unique ID. Retrieves the report details from the database using the ID.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays all relevant information about the car report.
*   **Function Details:** Detail of the report.

### 3.34.49 Update user profile

**Function Trigger:** When the owner clicks the "Save" or "Update" button on the "Edit Profile Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To modify the owner's profile information.
*   **Interface:** Edit Profile Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the updated profile information from the Edit Profile Screen.
    *   **Data Computation:** Validates the input data.
    *   **Data Storage:** Updates the owner's profile information in the database.
*   **Function Details:** Update info in profile.

### 3.34.50 Update password account

**Function Trigger:** When the owner clicks the "Change Password" or "Save" button on the "Change password Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To change the owner's account password.
*   **Interface:** Change password Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the old password, new password, and confirmation password from the Change password Screen.
    *   **Data Computation:** Validates that the old password is correct and that the new password and confirmation password match. Enforces password complexity requirements.
    *   **Data Storage:** Updates the owner's password in the database (after hashing it securely).
*   **Function Details:** Owner change password.

### 3.34.51 Get list bank account

**Function Trigger:** When the owner navigates to the "List Bank Account Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a list of the owner's linked bank accounts for payments.
*   **Interface:** List Bank Account Screen
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of bank accounts associated with the logged-in owner from the database.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays the list of bank accounts.
*   **Function Details:** Banks account linked.

### 3.34.52 Get bank account by id

**Function Trigger:** When the owner clicks on a specific bank account from the "List Bank Account Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To show detailed information for a specific bank account.
*   **Interface:** Edit Bank Account Screen
*   **Data Processing:**

    *   **Data Collect:** Collects the bank account's unique ID. Retrieves the bank account details from the database using the ID.
    *   **Data Computation:** No significant computation is needed.
    *   **Data Binding:** Displays all relevant information about the bank account.
*   **Function Details:** Specific bank detail

### 3.34.53 Update bank acount

**Function Trigger:** When the owner clicks the "Save" or "Update" button on the "Edit Bank Account Screen".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To modify details of a linked bank account.
*   **Interface:** Edit Bank Account Screen
*   **Data Processing:**

    *   **Receive Data Input:** Receives the updated bank account information from the Edit Bank Account Screen.
    *   **Data Computation:** Validates the input data (e.g., account number format, routing number format).
    *   **Data Storage:** Updates the bank account information in the database.
*   **Function Details:** Update info on bank detail.

### 3.34.54 Create Withdraw

**Function Trigger:** When the owner clicks the "Submit Withdrawal Request" button on the "Withdraw Request Scree".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To request a withdrawal of the owner's earnings.
*   **Interface:** Withdraw Request Scree
*   **Data Processing:**

    *   **Receive Data Input:** Receives the withdrawal amount and selected bank account from the Withdraw Request Scree.
    *   **Data Computation:** Validates that the withdrawal amount is within the available balance and meets any minimum withdrawal requirements.
    *   **Data Storage:** Creates a new withdrawal request record in the database, associating it with the owner and the selected bank account.
*   **Function Details:** Request payout.

### 3.34.55 Get list transaction

**Function Trigger:** When the owner navigates to the "Transaction List Scree".

**Function Description:**

*   **Actors:** Owner
*   **Purpose:** To display a list of the owner's financial transactions (e.g., earnings, withdrawals, fees).
*   **Interface:** Transaction List Scree
*   **Data Processing:**

    *   **Data Collect:** Retrieves a list of financial transactions associated with the logged-in owner from the database.
    *   **Data Computation:** Filters and sorts the transactions.
    *   **Data Binding:** Displays the list of transactions.
*   **Function Details:** List of transaction for owner.

