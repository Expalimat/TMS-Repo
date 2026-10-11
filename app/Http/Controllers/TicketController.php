<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $tickets = $request->user()->tickets()
            ->when($request->string('search')->toString(), fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->input('status'), fn ($q, $v) => $q->where('status', $v))
            ->when($request->input('priority'), fn ($q, $v) => $q->where('priority', $v))
            ->when($request->input('category'), fn ($q, $v) => $q->where('category', $v))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => $request->only('search', 'status', 'priority', 'category'),
            'options' => Ticket::options(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Tickets/Create', ['options' => Ticket::options()]);
    }

    public function store(StoreTicketRequest $request)
    {
        // user_id comes from the authenticated user via the relationship, never from the form.
        $request->user()->tickets()->create($request->validated());

        return redirect()->route('tickets.index')->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket)
    {
        Gate::authorize('view', $ticket);

        return Inertia::render('Tickets/Show', ['ticket' => $ticket]);
    }

    public function edit(Ticket $ticket)
    {
        Gate::authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'options' => Ticket::options(),
        ]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());

        return redirect()->route('tickets.show', $ticket)->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket)
    {
        Gate::authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted.');
    }
}
