<?php

namespace App\Http\Controllers;

use PayPal;
use App\Services\CheckoutService;
use Gloudemans\Shoppingcart\Cart;

class PaymentController extends Controller
{
    private $_apiContext;

    /**
     * PaymentController constructor.
     * @param CheckoutService $checkout
     */
    public function __construct(CheckoutService $checkout)
    {
        $this->checkout = $checkout;
        $this->_apiContext = PayPal::ApiContext(
            config('services.paypal.client_id'),
            config('services.paypal.secret'));

        $this->_apiContext->setConfig(array(
            'mode' => 'sandbox',
            'service.EndPoint' => 'https://api.sandbox.paypal.com',
            'http.ConnectionTimeOut' => 30,
            'log.LogEnabled' => true,
            'log.FileName' => storage_path('logs/paypal.log'),
            'log.LogLevel' => 'FINE'
        ));

    }

    /**
     * Alert for demo payment with Paypal sanbox.
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getAlert()
    {
        return view('frontend/alert');
    }

    /**
     * @param Cart $cart
     * @return mixed
     */
    public function getCheckout(Cart $cart)
    {
        $content = $cart->instance(auth()->id())
            ->content();
        //dd($cart);
        $payer = PayPal::Payer();
        $payer->setPaymentMethod('paypal');
        foreach ($content as $item) {
            $data[$item->id] = PayPal::Item();
            $data[$item->id]->setName($item->name)
                ->setDescription($item->name)
                ->setCurrency("USD")
                ->setQuantity((int)$item->qty)
                ->setPrice($item->price);
        }
        $items = (array_values($data));
        $itemList = PayPal::ItemList();
        //Add single item
        //$itemList->addItem($data[50]);
        $itemList->setItems($items);
        $details = PayPal::Details();
        //taxes
        $tax = $this->checkout->checkoutShow();
        $vat_total = $this->checkout->vat();
        $grand_total = $tax['cartTotal'] + $tax['shippings']->rate + $vat_total;
        //Details
        $details->setShipping($tax['shippings']->rate)
            ->setTax($vat_total)
            ->setSubTotal((int)$tax['cartTotal']);
        //Payment Amount
        $amount = PayPal::Amount();
        $amount->setCurrency("USD")
            ->setTotal($grand_total)
            ->setDetails($details);
        //Transaction
        $transaction = PayPal::Transaction();
        $transaction->setAmount($amount)
            ->setItemList($itemList)
            ->setInvoiceNumber(uniqid())
            ->setDescription('What are you selling?');

        $redirectUrls = PayPal:: RedirectUrls();
        $redirectUrls->setReturnUrl(url('payment/done'));
        $redirectUrls->setCancelUrl(url('payment/cancel'));

        $payment = PayPal::Payment();
        $payment->setIntent('sale');
        $payment->setPayer($payer);
        $payment->setRedirectUrls($redirectUrls);
        $payment->setTransactions(array($transaction));

        $profile = $this->createWebProfile();
        $payment->setExperienceProfileId($profile);

        $response = $payment->create($this->_apiContext);
        $redirectUrl = $response->links[1]->href;

        return redirect()->to($redirectUrl);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getDone()
    {
        $id = request()->get('paymentId');
        $token = request()->get('token');
        $payer_id = request()->get('PayerID');

        $payment = PayPal::getById($id, $this->_apiContext);

        $paymentExecution = PayPal::PaymentExecution();

        $paymentExecution->setPayerId($payer_id);
        $result = $payment->execute($paymentExecution, $this->_apiContext);
        //customer info
        $payer = $result->getPayer()
            ->getPayerInfo();
        $data['email'] = $payer->email;
        $data['first_name'] = $payer->first_name;
        $data['last_name'] = $payer->last_name;
        //transaction info
        /*$transaction = $result->getTransactions();
        dd($transaction);
        //    ->getAmount();
        $data['total'] = $transaction->total;
        $data['currency'] = $transaction->currency;*/
        //dd($customer->email);

        // Clear the shopping cart, write to database, send notifications, etc.
        //$cart->instance(auth()->id())->destroy();
        //event(new ForgetSession($request));

        return redirect('checkout/create');
    }

    /**
     * @return Redirect
     */
    public function getCancel()
    {
        // Curse and humiliate the user for cancelling this most sacred payment (yours)
        $executePayment = null;
        return redirect('/cms');
    }

    /**
     * @return mixed
     */
    public function createWebProfile()
    {
        //$flowConfig = PayPal::FlowConfig();
        $presentation = PayPal::Presentation();
        //$inputFields = PayPal::InputFields();
        $webProfile = PayPal::WebProfile();
        //$flowConfig->setLandingPageType("Billing"); //Set the page type
        //NB: Paypal recommended to use https for the logo's address and the size set to 190x60.
        $presentation->setLogoImage(asset('/images/payment.jpg'))->setBrandName(config('app.name'));
        //$inputFields->setAllowNote(true)->setNoShipping(1)->setAddressOverride(1);
        $webProfile->setName(config('app.name') . uniqid())
            //->setFlowConfig($flowConfig)
            // Parameters for style and presentation.
            ->setPresentation($presentation);
        // Parameters for input field customization.
        //->setInputFields($inputFields);
        $createProfileResponse = $webProfile->create($this->_apiContext);
        return $createProfileResponse->getId(); //The new webprofile's id
    }
}