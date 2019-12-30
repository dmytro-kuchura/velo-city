<?php

namespace App\Http\Controllers\Warehouses;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class JustinController extends Controller
{
    public function import()
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "http://openapi.justin.ua/branches/",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
        ]);

        $response = curl_exec($curl);

        curl_close($curl);

        $branches = json_decode($response);

        foreach ($branches->result as $branch) {
            DB::table('justin_warehouses')->insert(
                [
                    'number' => $branch->number,
                    'adress' => $branch->adress,
                    'locality' => $branch->locality,
                    'type' => $branch->type,
                    'delivery_branch_id' => $branch->delivery_branch_id,
                    'max_weight' => $branch->max_weight,
                    'description' => $branch->description,
                    'shedule_description' => $branch->shedule_description,
                    'cardpay' => $branch->services->cardpay,
                    'navigation' => $branch->public->navigation_ua,
                ]
            );
        }

        return $this->returnResponse([
            'success' => true,
        ]);
    }
}