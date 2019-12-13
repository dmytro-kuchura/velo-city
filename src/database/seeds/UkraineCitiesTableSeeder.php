<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class UkraineCitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->data() as $value) {
            DB::table('ukraine_cities')->insert($value);
        }
    }

    protected function data()
    {
        return [
            [
                'region_id' => 1,
                'name_ru' => 'Киев',
                'name_ua' => 'Киев',
                'status' => rand(0, 1),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'region_id' => 1,
                'name_ru' => 'Ирпень',
                'name_ua' => 'Ирпень',
                'status' => rand(0, 1),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'region_id' => 2,
                'name_ru' => 'Херсон',
                'name_ua' => 'Херсон',
                'status' => rand(0, 1),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'region_id' => 2,
                'name_ru' => 'Новая Каховка',
                'name_ua' => 'Новая Каховка',
                'status' => rand(0, 1),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'region_id' => 2,
                'name_ru' => 'Скадовск',
                'name_ua' => 'Скадовск',
                'status' => rand(0, 1),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ],
        ];
    }
}
