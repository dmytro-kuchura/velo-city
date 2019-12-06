<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;

class Authentication
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->header('Authorization')) {
            throw new HttpResponseException(response()->json(
                ['message' => 'Unauthorised'], Response::HTTP_UNAUTHORIZED));
        }
        $header = explode('Basic', $request->header('Authorization'));
        $token = trim($header[1]);
        if (base64_encode(config('auth.username') . ':' . config('auth.password')) !== $token) {
            throw new HttpResponseException(response()->json(
                ['message' => 'Unauthorised'], Response::HTTP_UNAUTHORIZED));
        }
        return $next($request);
    }
}
