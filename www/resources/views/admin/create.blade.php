@extends('layouts.auth')

@section('content')
    <div class="accountbg"></div>

    <div class="wrapper-page" id="app">
        <div class="panel panel-color panel-primary panel-pages">

            <div class="panel-body">
                <h3 class="text-center m-t-0 m-b-15">
                    <a href="{{ route('home') }}" class="logo">
                        <img src="/images/logo-new.png" alt="logo-img">
                    </a>
                </h3>

                <h4 class="text-muted text-center m-t-0">
                    <b>Регистрация</b>
                </h4>

                <registration-form></registration-form>
            </div>

        </div>
    </div>
@endsection