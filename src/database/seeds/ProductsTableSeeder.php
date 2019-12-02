<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 300; $i++) {
            $faker = Faker\Factory::create();

            DB::table('products')->insert([
                'name' => $faker->sentence(rand(3, 9), $variableNbWords = true),
                'alias' => strtolower(str_replace([' ', '.'], ['_', ''], $faker->sentence(rand(3, 9), $variableNbWords = true))),
                'category_id' => rand(0, 9),
                'status' => rand(0, 1),
                'new' => rand(0, 1),
                'sale' => rand(0, 1),
                'top' => rand(0, 1),
                'available' => rand(0, 1),
                'cost' => rand(150.77, 27777.95),
                'cost_old' => rand(1560.70, 53777.95),
                'views' => rand(0, 1000),
                'brand' => 0,
                'artikul' => $faker->swiftBicNumber,
                'image' => null,
                'specifications' => $faker->text(300),
                'information' => $faker->text(300),
                'title' => $faker->sentence(rand(3, 9), $variableNbWords = true),
                'description' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'keywords' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
        }
    }
}
