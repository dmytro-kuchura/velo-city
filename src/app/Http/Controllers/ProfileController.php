<?php

namespace App\Http\Controllers;

use App\Helpers\Alert;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use App\Models\Enum\SystemPagesConstants;
use App\Repositories\OrdersRepository;
use App\Repositories\SystemPagesRepository;
use App\Repositories\UsersRepository;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /** @var OrdersRepository */
    private $ordersRepository;

    /** @var UsersRepository */
    private $usersRepository;

    /** @var SystemPagesRepository */
    private $pagesRepository;

    public function __construct(
        OrdersRepository $ordersRepository,
        SystemPagesRepository $pagesRepository,
        UsersRepository $usersRepository
    )
    {
        $this->ordersRepository = $ordersRepository;
        $this->usersRepository = $usersRepository;
        $this->pagesRepository = $pagesRepository;
    }

    public function profile()
    {
        $orders = $this->ordersRepository->getOrdersByUser(Auth::user()->getAuthIdentifier());

        $page = $this->pagesRepository->findBySlug(SystemPagesConstants::PROFILE_PAGE);

        return view('auth.profile', [
            'user' => Auth::user(),
            'orders' => $orders,
            'page' => $page,
        ]);
    }

    public function change(UpdateProfileRequest $request)
    {
        $this->usersRepository->updateProfile(Auth::user()->getAuthIdentifier(), $request->all());

        Alert::success('Профиль был обновлен!', 'Мы все записали! :)');

        return redirect(route('profile'));
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $this->usersRepository->changePassword(Auth::user()->getAuthIdentifier(), $request->all());

        Alert::success('Пароль был изменен!', 'Учетная запись в безопастности! :)');

        return redirect(route('profile'));
    }
}
