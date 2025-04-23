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