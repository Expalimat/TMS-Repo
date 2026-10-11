# HelpDesk backend (Laravel / PHP side)

Repo root = the full Laravel project. This repo holds the PHP files below; the React pages
(see helpdesk-frontend) live in resources/js and are needed for the app to run.

## Files in this repo
    app/Models/Ticket.php
    app/Policies/TicketPolicy.php
    app/Http/Controllers/TicketController.php
    app/Http/Controllers/DashboardController.php
    app/Http/Requests/StoreTicketRequest.php
    app/Http/Requests/UpdateTicketRequest.php
    app/Http/Middleware/HandleInertiaRequests.php   (overwrites Breeze's)
    database/migrations/2026_10_12_000000_create_tickets_table.php
    routes/web.php                                   (overwrites Breeze's)

## Setup
1. Create the project and install Breeze:

       composer create-project laravel/laravel helpdesk
       cd helpdesk
       composer require laravel/breeze --dev
       php artisan breeze:install react      # plain React (not TypeScript)
       npm install

2. Copy this repo's app/, database/, routes/ into the project, overwriting when asked.

3. Add to app/Models/User.php (the one manual edit):

       use Illuminate\Database\Eloquent\Relations\HasMany;

       public function tickets(): HasMany
       {
           return $this->hasMany(Ticket::class);
       }

4. Add the frontend files (see helpdesk-frontend) into resources/js/.

5. Run locally:

       php artisan migrate
       npm run dev          # terminal 1
       php artisan serve    # terminal 2

## Two-repo note
Inertia has no standalone API, so the frontend cannot build or run without this backend.
Deploy from ONE project that contains both. Easiest: make this repo the Laravel root and
either (a) copy the frontend files into resources/js and commit them here too, or
(b) add the frontend repo as a git submodule at resources/js.

## Before pushing
- .env is in .gitignore (Laravel default). Never commit it.
- Commit .env.example with no real secrets.
- Commit in small steps; a single "final" commit scores lower.

## Test checklist
1. Guest opens /tickets -> redirected to /login
2. Register + create ticket -> "Ticket created."
3. Second user opens /tickets/{first user's id} -> 403
4. Submit empty form -> inline errors, input kept, button disabled while saving
5. 11+ tickets -> pagination, 10 per page
6. Edit -> "Ticket updated."; Delete -> confirm prompt, then "Ticket deleted."
7. Phone width -> list becomes stacked cards
