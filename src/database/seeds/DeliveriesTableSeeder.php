<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DeliveriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->data() as $value) {
            DB::table('deliveries')->insert($value);
        }
    }

    protected function data()
    {
        return [
            [
                'name' => 'Самовывоз',
                'status' => rand(0, 1),
                'commission' => rand(0, 50),
                'max_weight' => rand(15, 50),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'name' => 'Новая Почта',
                'status' => rand(0, 1),
                'commission' => rand(0, 50),
                'max_weight' => rand(15, 50),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'name' => 'Курьером (Новая Почта)',
                'status' => rand(0, 1),
                'commission' => rand(0, 50),
                'max_weight' => rand(15, 50),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ], [
                'name' => 'Justin',
                'status' => rand(0, 1),
                'commission' => rand(0, 50),
                'max_weight' => rand(15, 50),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ],
        ];
    }
}
