<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use App\Services\SocialAccountService;
use Socialite, Exception;

class SocialAuthController extends Controller
{
    /**
     * @param $provider
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function redirectToProvider($provider)
    {
        try {
            return Socialite::driver($provider)->redirect();
        } catch (Exception $e) {
            return $this->sendFailedResponse($e->getMessage());
        }
    }

    /**
     * @param SocialAccountService $service
     * @param $provider
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function handleProviderCallback(SocialAccountService $service, $provider)
    {
        try {
            $providerUser = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            return $this->sendFailedResponse($e->getMessage());
        }

        $user = $service->createOrGetUser($providerUser, $provider);

        $account = $service->getAccount($providerUser->id);

        if ($account->provider_user_id === (string)$providerUser->id) {
            app(UserRepository::class)->attachRole($user);
            auth()->login($user);
            return redirect()->to('/home');
        }
        return $this->sendFailedResponse("These credentials do not match our records.");
    }

    /**
     * @param null $msg
     * @return $this
     */
    protected function sendFailedResponse($msg = null)
    {
        return redirect()->route('login')
            ->withErrors(['msg' => $msg ?: 'Unable to login, try with another provider to login.']);
    }
}
