# Travlr Getaways
 
A full-stack MEAN application (MongoDB, Express, Angular, Node.js) built for CS465, combining a public-facing travel booking site with a secured Angular admin SPA.
 
## Architecture
 
**Frontend**
 
The project uses three distinct types of frontend development:
 
- **Express/Handlebars views** — server-rendered pages for the public site. Each request returns a complete HTML page, which is simple and reliable but requires a full page reload for any update.
- **Plain JavaScript** — used for dynamic behavior on top of the Handlebars pages, such as the travel listing page fetching trip data from the REST API instead of static JSON.
- **Angular SPA** — powers the admin section (trip management), loaded once and then updated via API calls without full page reloads. This gives a faster, app-like experience but adds client-side routing and state management complexity that the Handlebars pages don't have.
**Backend**
 
The backend uses MongoDB, a NoSQL database, because trip data is document-shaped (nested pricing, images, descriptions) rather than strictly relational. MongoDB pairs naturally with Node/Express and Mongoose for schema validation while staying flexible as the data model evolves.
 
## Functionality
 
**JSON vs. JavaScript**
 
JSON is a data format, a text-based structure of key-value pairs. JavaScript is a programming language. JSON happens to look like JS object syntax, which is why JS parses it natively. JSON is the payload format the Express REST API sends and the Angular/JS frontend consumes, making it the contract between backend and frontend.
 
**Refactoring**
 
The travel.js controller was refactored to call the Express REST API instead of reading from a static JSON file, and the Handlebars-only trip listing was rebuilt as reusable Angular components for admin CRUD operations. Reusable UI components reduce duplicated markup and logic, keep updates consistent across pages, and speed up development since new features can be composed from existing components rather than built from scratch.
 
## Testing
 
REST endpoints are tested for correct HTTP methods (GET/POST/PUT/DELETE) mapped to the right routes, correct status codes, and expected payload shape. Adding JWT authentication means testing both the unauthenticated path (expecting 401/403 responses) and the authenticated path, confirming protected routes properly reject missing or invalid tokens rather than only verifying that valid requests succeed. Tools like Postman and curl are used to hit endpoints directly, independent of the frontend.
 
## Tech Stack
 
- **Frontend:** Express/Handlebars, JavaScript, Angular
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Auth:** JWT
## Reflection
 
This course reinforced full-stack concepts and provided hands-on, resume-relevant experience: REST API design, Mongoose/MongoDB schema work, JWT authentication, and Angular SPA development — skills directly applicable to full-stack engineering roles.
