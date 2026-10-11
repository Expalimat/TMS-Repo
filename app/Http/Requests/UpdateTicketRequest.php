<?php

namespace App\Http\Requests;

use App\Models\Ticket;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Runs before validation, so a non-owner always gets 403 (not 422).
        return $this->user()->can('update', $this->route('ticket'));
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:5', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'priority' => ['required', Rule::in(Ticket::PRIORITIES)],
            'status' => ['required', Rule::in(Ticket::STATUSES)],
            'category' => ['required', Rule::in(Ticket::CATEGORIES)],
        ];
    }
}
