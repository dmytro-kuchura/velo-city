<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class NewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 50; $i++) {
            $faker = Faker\Factory::create();

            DB::table('news')->insert([
                'name' => $faker->sentence(rand(3, 9), $variableNbWords = true),
                'image' =>  $faker->imageUrl($width = 1300, $height = 811),
                'alias' => strtolower(str_replace([' ', '.'], ['_', ''], $faker->sentence(rand(3, 9), $variableNbWords = true))),
                'title' => $faker->sentence(rand(3, 9), $variableNbWords = true),
                'content' => $faker->realText($maxNbChars = 300, $indexSize = 2),
                'short' => $faker->realText($maxNbChars = 150, $indexSize = 2),
                'description' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'keywords' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'status' => rand(0, 1),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
