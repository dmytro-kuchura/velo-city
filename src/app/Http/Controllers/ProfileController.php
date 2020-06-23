<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use App\Repositories\OrdersRepository;
use App\Repositories\UsersRepository;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /** @var OrdersRepository */
    private $ordersRepository;

    /** @var UsersRepository */
    private $usersRepository;

    public function __construct(
        OrdersRepository $ordersRepository,
        UsersRepository $usersRepository
    )
    {
        $this->ordersRepository = $ordersRepository;
        $this->usersRepository = $usersRepository;
    }

    public function profile()
    {
        $orders = $this->ordersRepository->getOrdersByUser(Auth::user()->getAuthIdentifier());

        return view('auth.profile', [
            'user' => Auth::user(),
            'orders' => $orders
        ]);
    }

    public function change(UpdateProfileRequest $request)
    {
        $this->usersRepository->updateProfile(Auth::user()->getAuthIdentifier(), $request->all());

        return redirect(route('profile'));
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $this->usersRepository->changePassword(Auth::user()->getAuthIdentifier(), $request->all());

        return redirect(route('profile'));
    }
}
