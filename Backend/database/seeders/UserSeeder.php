<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::updateOrCreate([
            'name' => 'Admin User',
            'email' => 'admin@system.com',
            'password' => bcrypt('password'),
            'IsAdmin' => true,
            'payment_method' => 'default_payment_method',
            'spending' => 0.00,
        ]);
        $admin->assignRole(Role::ADMIN);

        $employe = User::updateOrCreate([
            'name' => 'Employe User',
            'email' => 'employe@system.com',
            'password' => bcrypt('password'),
            'spending' => 0.00,
        ]);
        $employe->assignRole(Role::EMPLOYE);

        $randomUser = User::updateOrCreate([
            'name' => 'Majid Riaz',
            'email' => 'majid@gmail.com',
            'password' => bcrypt('password'),
            'spending' => 0.00,
        ]);
        $randomUser->assignRole(Role::USER);
    }
}
