<?php

namespace App\Http\Controllers;

use App\Services\MainService;

class MainController extends Controller
{
    protected $main;

    /**
     * mainController constructor.
     * @param mainService $mainService
     */
    public function __construct(MainService $mainService)
    {
        $this->main = $mainService;
    }

    /**
     * Show the home page to the user.*
     * @return Response
     */
    public function index()
    {
        $data = $this->main->getHome();
        return view('frontend.body', $data);
    }

    /**
     * Show required page to user
     * @return View
     */
    public function aboutus()
    {
        return view('frontend.aboutus');
    }


    /**
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function autocomplete()
    {
        $results = $this->main->autocomplete();
        if (request()->ajax()) {
            return response()->json($results);
        } else {
            return redirect()->back();
        }
    }

    /**
     * Show required page to user
     * @return View
     */
    public function contacts()
    {
        return view('frontend.contacts');
    }

    /**
     * @param $slug
     * @param $parent
     * @return View
     */
    public function filter($crud, $parent)
    {
        $data = $this->main->getFilter($parent);
        if (request()->ajax()) {
            return response()->json(view('frontend.ajax-products', $data)->render());
        } else {
            return view('frontend.filter_view', $data);
        }

    }

    /**
     * @param $slug
     * @param $id
     * @return View
     */
    public function product($slug, $id)
    {
        $data = $this->main->getProductInfo($slug, $id);
        return view('frontend.product_page', $data);
    }

    /**
     * @param $id
     * @return View
     */
    public function frame($id)
    {
        $item = $this->main->getFrameContent($id);
        return view('frontend.frame', compact('item'));
    }

    /**
     * @param $parent
     * @return \Illuminate\Http\JsonResponse|View
     */
    public function search($parent)
    {
        $data = $this->main->prepareSearch($parent);
        if (request()->ajax()) {
            return response()->json(view('frontend.ajax-products', $data)->render());
        } else {
            return view('frontend.filter_view', $data);
        }
    }


    /**
     * @param string $value
     * @return \Illuminate\Http\RedirectResponse
     */
    public function set_Session($value = "")
    {
        $field = request()->segment(1);
        session()->put($field, $value);
        return redirect()->back();
    }

    /**
     * Show login page to user
     * @return View
     */
    public function userLogin()
    {
        return view('frontend.login');
    }

    public function welcome()
    {
        //redirect trait AuthenticatesUsers getLogout()
        $user = auth()->user()->name;
        session()->flash('flash_message', 'You have been successfully Logged In!');
        return view('messages.welcome')->with('user', $user);
    }
}