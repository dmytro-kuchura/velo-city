<?php

namespace App\Repositories;

use App\Helpers\Text;
use App\Models\Enum\Common;
use App\Models\News;

class NewsRepository implements Repository
{
    protected $model = News::class;

    public function list(int $limit)
    {
        return $this->model::orderBy('id', 'desc')
            ->where('status', Common::STATUS_ACTIVE)
            ->limit($limit)
            ->get();
    }

    public function paginate()
    {
        return $this->model::orderBy('id', 'desc')
            ->paginate(Common::PAGINATE_LIMIT);
    }

    public function find($id)
    {
        return $this->model::where('id', $id)
            ->where('status', Common::STATUS_ACTIVE)
            ->first();
    }

    public function store($id, $data)
    {
        return $this->model::where('id', $id)->update([
            'name' => $data['name'],
            'alias' => $data['alias'] ? $data['alias'] : Text::cyrillic(strtolower($data['name'])),
            'content' => $data['content'],
            'short' => $data['short'],
            'status' => $data['status'],
            'image' => $data['image'],
            'title' => $data['title'],
            'description' => $data['description'],
            'keywords' => $data['keywords'],
        ]);
    }

    public function create($data)
    {
        $model = new $this->model;

        $model->name = $data['name'];
        $model->alias = Text::cyrillic(strtolower($data['name']));
        $model->content = $data['content'];
        $model->short = $data['short'];
        $model->status = $data['status'];
        $model->image = $data['image'];
        $model->title = $data['title'];
        $model->description = $data['description'];
        $model->keywords = $data['keywords'];

        return $model->save();
    }

    public function destroy($id)
    {
        return $this->model::where('id', $id)->delete();
    }
}
