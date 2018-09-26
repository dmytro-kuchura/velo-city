<?php

namespace App\Http\Controllers\Admin;

use Exception;
use Carbon\Carbon;
use App\Models\Pages;
use App\Http\Requests\PagesRequest;
use App\Http\Controllers\Controller;
use App\Repositories\PagesRepository;

class PagesController extends Controller
{
    protected $repository;

    public function __construct(PagesRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        $result = $this->repository->paginate(15);

        return view('admin.pages.index', [
            'result' => $result,
        ]);
    }

    public function list()
    {
        $result = $this->repository->list();


        return $this->success($result, 200);
    }

    public function create()
    {
        return view('admin.pages.create');
    }

    public function edit($id)
    {
        $result = $this->repository->getById($id);
        $query = new CategoriesRepository();
        $categories = $query->all();
        $query = new TagsRepository();
        $tags = $query->all();
        return view('admin.blog.edit', [
            'result' => $result,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function update(PagesRequest $request)
    {
        try {
            /* @var $model Pages */
            $model = $this->repository->getById($request->get('id'));

            $model->name = $request->get('name');
            $model->title = $request->get('title');
            $model->alias = $request->get('alias');
            $model->content = $request->get('content');
            $model->description = $request->get('description');
            $model->keywords = $request->get('keywords');
            $model->status = $request->get('status');
            $model->updated_at = Carbon::now()->format('Y-m-d H:i:s');

            $model->save();
        } catch (Exception $exception) {
            var_dump($exception->getMessage());
            die;
        }
        return redirect()->route('blog.index');
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

    public function delete($id)
    {
        $this->repository->delete($id);
    }

    public function status($id)
    {
        $this->repository->status($id);
    }
}