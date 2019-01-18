<?php

namespace App\Http\Controllers;

use App\Services\CheckoutService;

class CheckoutController extends Controller
{
    protected $checkout;

    /**
     * ShoppingController constructor.
     * @param ShoppingService $shoppingService
     */
    public function __construct(CheckoutService $checkout)
    {
        $this->checkout = $checkout;
    }

    /**
     * Pass data to checkout view.
     * @return View
     */
    public function checkout()
    {
        $data = $this->checkout->checkoutData();
        return view('frontend.checkoutOne',$data);
    }

    /**
     * Show order information from session.     *
     * @return View
     */
    public function checkoutShow()
    {
        $country = session()->get('country');
        if (!isset($country)) {
            session()->flash('flash_message', 'YOUR MUST FILL REQUIRED FIELDS!');
            return redirect('checkout/shipping');
        }
        $data = $this->checkout->checkoutShow();
        return view('frontend.checkoutTwo', $data);
    }
}