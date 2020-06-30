<?php

namespace App\Services;

use App\Models\Enum\LogsTypes;
use App\Repositories\LogRepository;

class Log
{
    private $repository;

    public function __construct(LogRepository $logsRepository)
    {
        $this->repository = $logsRepository;
    }

    public static function error($message)
    {

    }

    public static function warning($message)
    {

    }

    public static function notice($message)
    {

    }

    public static function info($message)
    {
        self::save([
            'name' => $message,
            'type' => LogsTypes::INFO,
        ]);
    }

    public static function debug($message)
    {

    }

    public function save(array $data)
    {
        $this->repository->create($data);
    }
}
