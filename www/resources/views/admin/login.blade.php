@extends('layouts.auth')

@section('content')
    <div class="accountbg"></div>
    <div class="wrapper-page">
        <div class="panel panel-color panel-primary panel-pages">

            <div class="panel-body">
                <h3 class="text-center m-t-0 m-b-15">
                    <a href="index.html" class="logo">
                        <img src="/images/logo.png" alt="logo-img">
                    </a>
                </h3>
                <h4 class="text-muted text-center m-t-0"><b>Sign In</b></h4>

                <form class="form-horizontal m-t-20" action="index.html">

                    <div class="form-group">
                        <div class="col-xs-12">
                            <input class="form-control" type="text" required="" placeholder="Username">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-12">
                            <input class="form-control" type="password" required="" placeholder="Password">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-12">
                            <div class="checkbox checkbox-primary">
                                <input id="checkbox-signup" type="checkbox" checked>
                                <label for="checkbox-signup">
                                    Remember me
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group text-center m-t-40">
                        <div class="col-xs-12">
                            <button class="btn btn-primary btn-block btn-lg waves-effect waves-light" type="submit">Log
                                In
                            </button>
                        </div>
                    </div>

                    <div class="form-group m-t-30 m-b-0">
                        <div class="col-sm-7">
                            <a href="pages-recoverpw.html" class="text-muted"><i class="fa fa-lock m-r-5"></i> Forgot
                                your
                                password?</a>
                        </div>
                        <div class="col-sm-5 text-right">
                            <a href="pages-register.html" class="text-muted">Create an account</a>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
@endsection