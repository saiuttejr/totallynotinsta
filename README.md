# TotallyNotInsta

This is a parody Instagram-clone application built using Laravel and MongoDB.

## Overview

TotallyNotInsta is a fun project aimed at replicating the core features of Instagram, such as user profiles, photo sharing, following/followers, and likes. It's built with Laravel for the backend and MongoDB for the database.

## Tech Stack

*   **Backend:** Laravel (PHP Framework)
*   **Database:** MongoDB (NoSQL Document Database)

## Features

*   User registration and authentication
*   User profiles
*   Photo uploads and sharing
*   Following/followers system
*   Liking posts

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/saiuttejr/totallynotinsta
    ```
2.  Install dependencies:
    ```bash
    composer install
    npm install
    ```
3.  Configure environment variables:
    *   Create a `.env` file by copying `.env.example`.
    *   Set your database credentials (MongoDB connection string).
    *   Set other necessary environment variables.
4.  Generate application key:
    ```bash
    php artisan key:generate
    ```
5.  Run migrations and seeders (if any):
    ```bash
    php artisan migrate
    php artisan db:seed
    ```
6.  Start the development server:
    ```bash
    php artisan serve
    ```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).