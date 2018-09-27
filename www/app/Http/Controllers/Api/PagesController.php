<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PagesRequest;
use App\Models\Pages;
use App\Repositories\PagesRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class PagesController extends Controller
{
    protected $repository;

    public function __construct(PagesRepository $repository)
    {
        $this->repository = $repository;
    }

    public function list()
    {
        $result = $this->repository->list();

        return $this->success($result, 200);
    }

    public function get(Request $request)
    {
        return $this->repository->getById($request->route('id'));
    }

    public function store(PagesRequest $request)
    {
        try {
            /* @var $model Pages */
            $model = new Pages();

            $model->name = $request->get('name');
            $model->title = $request->get('title');
            $model->alias = $request->get('alias');
            $model->content = $request->get('content');
            $model->description = $request->get('description');
            $model->keywords = $request->get('keywords');
            $model->status = $request->get('status');
            $model->sort = 0;
            $model->views = 0;
            $model->parent_id = 0;
            $model->created_at = Carbon::now()->format('Y-m-d H:i:s');
            $model->updated_at = Carbon::now()->format('Y-m-d H:i:s');

            $model->save();
        } catch (Exception $exception) {
            return $this->false($exception->getMessage(), 422);
        }

        return $this->success(201);
    }

    public function update(Request $request)
    {
        try {
            /* @var $model Pages */
            $model = $this->repository->getById($request->route('id'));

            $model->name = $request->get('name');
            $model->alias = $request->get('alias');
            $model->content = $request->get('content');
            $model->h1 = $request->get('h1');
            $model->title = $request->get('title');
            $model->description = $request->get('description');
            $model->keywords = $request->get('keywords');
            $model->status = $request->get('status');
            $model->updated_at = Carbon::now()->format('Y-m-d H:i:s');

            $model->save();
        } catch (Exception $exception) {
            return $this->false($exception->getMessage(), 422);
        }

        return $this->success([], 200);
    }

    public function delete($id)
    {
        $this->repository->delete($id);
    }

    public function status($id)
    {
        $this->repository->status($id);
    }
}
