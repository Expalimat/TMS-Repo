<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // generate https links and asset URLs in production (no mixed content)
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
