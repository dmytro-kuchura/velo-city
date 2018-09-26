<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use Illuminate\Http\Request;
use Laravel\Passport\Client;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{
    use IssueTokenTrait;

    private $client;

    public function __construct()
    {
        $this->client = Client::find(4);
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => bcrypt(request('password'))
        ]);

        return $this->issueToken($request, 'password');
    }
}