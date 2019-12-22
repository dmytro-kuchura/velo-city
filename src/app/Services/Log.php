<?php

namespace App\Services;

use App\Repositories\LogsRepository;

class Log
{
    const ERROR = 'error';
    const WARNING = 'warning';
    const NOTICE = 'notice';
    const INFO = 'info';
    const DEBUG = 'debug';

    private $repository;

    public function __construct(LogsRepository $logsRepository)
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

    }

    public static function debug($message)
    {

    }

    public function save(array $data)
    {
        $this->repository->store();
    }
}
