<?php

use App\Models\Rating;

function _user(): App\Models\User|null
{
    return Auth::user();
}
