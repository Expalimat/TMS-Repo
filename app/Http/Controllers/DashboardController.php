<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        $counts = $user->tickets()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('Dashboard', [
            'stats' => collect(Ticket::STATUSES)->map(fn ($s) => [
                'status' => $s,
                'total' => (int) ($counts[$s] ?? 0),
            ])->values(),
            'recent' => $user->tickets()->latest()->limit(5)->get(['id', 'title', 'priority', 'status', 'created_at']),
        ]);
    }
}
