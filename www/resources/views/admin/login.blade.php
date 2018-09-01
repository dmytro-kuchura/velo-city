@extends('layouts.auth')

@section('content')
    <div class="accountbg"></div>

    <div class="wrapper-page" id="app">
        <div class="panel panel-color panel-primary panel-pages">

            <div class="panel-body">
                <h3 class="text-center m-t-0 m-b-15">
                    <a href="index.html" class="logo">
                        <img src="/images/logo.png" alt="logo-img">
                    </a>
                </h3>
                <h4 class="text-muted text-center m-t-0"><b>Sign In</b></h4>

                <auth-form></auth-form>
            </div>

        </div>
    </div>
@endsection