<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class BannersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 5; $i++) {
            $faker = Faker\Factory::create();

            DB::table('banners')->insert([
                'image' => $faker->imageUrl($width = 1920, $height = 700),
                'slogan' => $faker->sentence(rand(2, 4), $variableNbWords = true),
                'title' => $faker->sentence(rand(2, 4), $variableNbWords = true),
                'description' => $faker->sentence(rand(6, 12), $variableNbWords = true),
                'link' => $faker->url,
                'status' => rand(0, 1),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
