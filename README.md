# TotallyNotInsta

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TotallyNotInsta is an Instagram-parody clone application, created as a parody using Laravel and MongoDB. It replicates familiar features like user profiles, photo sharing, following capabilities, and post liking. This project demonstrates the integration of Laravel as a backend framework with MongoDB as a NoSQL database. A special thanks to <b>freeCodeCamp.</b> 🙇‍♂️

## Overview
This is an Instagram-parody clone application by,
**Developer** - <a>Sai Uttej R</a>
<!-- Optional: Add a screenshot or GIF here -->
<!-- ![Screenshot](link/to/your/screenshot.png) -->

## Tech Stack

*   **Backend Framework:** Laravel 12.x
*   **Database:** MongoDB (via `jenssegers/mongodb` and `mongodb/laravel-mongodb` packages)
*   **Frontend:** Blade templates with Bootstrap 5 for styling
*   **Package Manager:** Composer (PHP) and npm (JavaScript)
*   **Build Tool:** Vite
*   **Testing Framework:** PHPUnit
*   **Environment Management:** `.env` file for configuration
*   **Version Control:** Git

## Features

*   **User Registration and Authentication:**
    *   Users can register, log in, and log out.
    *   Authentication is handled using Laravel's built-in authentication system.
*   **User Profiles:**
    *   Users can create and edit their profiles, including uploading profile pictures and adding a bio.
*   **Photo Uploads and Sharing:**
    *   Users can upload photos with captions.
    *   Photos are stored in the `storage` directory and served via symbolic links.
*   **Following/Followers System:**
    *   Users can follow and unfollow other users.
    *   A feed displays posts from followed users.
*   **Likes and Comments:**
    *   Users can like posts and leave comments.
*   **Responsive Design:**
    *   The application is styled using Bootstrap 5 for a responsive and modern UI.

## Installation

### Prerequisites

*   PHP 8.2 or higher
*   Composer ([https://getcomposer.org/](https://getcomposer.org/))
*   Node.js and npm ([https://nodejs.org/](https://nodejs.org/))
*   MongoDB server ([https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community))

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/TotallyNotInsta.git
    cd TotallyNotInsta
    ```

2.  **Install Dependencies:**
    ```bash
    composer install
    npm install
    ```

3.  **Configure Environment Variables:**
    *   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    *   Update the `.env` file with your MongoDB connection string (`DB_CONNECTION=mongodb`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) and other necessary configurations (like `APP_URL`). Example MongoDB connection setup:
        ```dotenv
        DB_CONNECTION=mongodb
        DB_HOST=127.0.0.1
        DB_PORT=27017
        DB_DATABASE=totallynotinsta
        DB_USERNAME=
        DB_PASSWORD=
        ```

4.  **Generate Application Key:**
    ```bash
    php artisan key:generate
    ```

5.  **Run Migrations:**
    *(Note: While MongoDB is schema-less, Laravel migrations can still be used to create collections or ensure indexes if needed, depending on the package setup).*
    ```bash
    php artisan migrate
    ```

6.  **Create a Symbolic Link for Storage:**
    *   This links `public/storage` to `storage/app/public` so uploaded files are publicly accessible.
    ```bash
    php artisan storage:link
    ```

7.  **Start the Development Server:**
    *   This runs the Laravel backend server (usually on `http://127.0.0.1:8000`).
    ```bash
    php artisan serve
    ```

8.  **Run the Frontend Development Server:**
    *   Open a *new terminal window* in the project directory.
    *   This compiles frontend assets using Vite and provides hot module replacement.
    ```bash
    npm run dev
    ```

You should now be able to access the application in your browser at the URL provided by `php artisan serve` (usually `http://127.0.0.1:8000`).

## Project Structure

```
totallynotinsta/
├── app/                    # Application logic (Models, Controllers, Middleware)
├── bootstrap/              # Bootstrap files for Laravel
├── config/                 # Configuration files
├── database/               # Migrations, seeders, and factories
├── public/                 # Publicly accessible files (e.g., index.php, assets)
├── resources/              # Views, Blade templates, and frontend assets
├── routes/                 # Application routes (web.php, api.php)
├── storage/                # Logs, cached files, and user uploads
├── tests/                  # PHPUnit tests
├── vendor/                 # Composer dependencies
├── .env                    # Environment configuration
├── composer.json           # PHP dependencies
├── package.json            # JavaScript dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

The project follows the standard Laravel directory structure. Key points related to the tech stack include:

*   **Models:** Located in `app/Models/`, extending `Jenssegers\Mongodb\Eloquent\Model`.
*   **Configuration:** Database connection details in `config/database.php` and `.env`.
*   **Views:** Blade templates in `resources/views/`.
*   **Assets:** Frontend assets (CSS, JS) managed by Vite, located in `resources/css/` and `resources/js/`.
*   **Storage:** User uploads typically go into `storage/app/public/`.

## Key Technical Details

### Database

*   MongoDB is used as the primary database.
*   The `jenssegers/mongodb` package integrates MongoDB with Laravel's Eloquent ORM, allowing for familiar model interactions.
*   Data is stored in MongoDB collections instead of traditional SQL tables.

### File Storage

*   Uploaded images are stored in the `storage/app/public` directory.
*   A symbolic link is created using `php artisan storage:link` in the `public/storage` directory to make these files publicly accessible via web requests.

### Authentication

*   Laravel's built-in authentication system (Laravel Breeze, Jetstream, or UI) is used for user registration, login, and session management.
*   Middleware (`auth`) ensures specified routes are protected and only accessible by authenticated users.

### Frontend

*   Blade templates (`resources/views`) are used for server-side rendering of HTML.
*   Bootstrap 5 is used for styling and creating a responsive user interface.
*   Vite (`vite.config.js`) is used for bundling and serving frontend assets (CSS, JavaScript) efficiently during development and for production builds.

## Testing

*   PHPUnit is used for writing and running automated tests (Unit, Feature, etc.).
*   Test files are located in the `tests/` directory.
*   Test environment variables can be configured specifically in the `phpunit.xml` file.
*   Run tests using the Artisan command:
    ```bash
    php artisan test
    ```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bugfix (`git checkout -b feature/your-feature-name` or `bugfix/issue-description`).
3.  Make your changes and commit them with clear messages.
4.  Push your branch to your fork (`git push origin feature/your-feature-name`).
5.  Submit a pull request to the main repository with a detailed description of your changes.

## License

This project is open-source and available under the [MIT License](LICENSE).