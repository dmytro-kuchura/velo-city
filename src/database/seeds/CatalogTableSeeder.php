<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CatalogTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->data() as $value) {
            DB::table('catalog')->insert($value);
        }
    }

    protected function data()
    {
        return [
            [
                'name' => 'Велосипеды',
                'alias' => 'velo',
                'image' => null,
                'parent_id' => 0,
                'views' => rand(0, 140),
                'status' => rand(0, 1),
                'title' => 'Lorem ipsum dolor sit amet',
                'keywords' => null,
                'description' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'name' => 'Запчасти',
                'alias' => 'components',
                'image' => null,
                'parent_id' => 0,
                'views' => rand(0, 140),
                'status' => rand(0, 1),
                'title' => 'Lorem ipsum dolor sit amet',
                'keywords' => null,
                'description' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'name' => 'Аксесуары',
                'alias' => 'accessories',
                'image' => null,
                'parent_id' => 0,
                'views' => rand(0, 140),
                'status' => rand(0, 1),
                'title' => 'Lorem ipsum dolor sit amet',
                'keywords' => null,
                'description' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'name' => 'Инструменты',
                'alias' => 'tools',
                'image' => null,
                'parent_id' => 0,
                'views' => rand(0, 140),
                'status' => rand(0, 1),
                'title' => 'Lorem ipsum dolor sit amet',
                'keywords' => null,
                'description' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ],
        ];
    }
}
