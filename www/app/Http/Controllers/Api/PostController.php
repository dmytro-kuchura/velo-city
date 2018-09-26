<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\PagesRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    protected $repository;

    public function __construct(PagesRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(){

    	$posts = Auth::user()->posts()->get();

    	return response()->json(['data' => $posts], 200, [], JSON_NUMERIC_CHECK);

    }
}
