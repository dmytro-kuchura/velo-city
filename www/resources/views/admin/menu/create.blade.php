@extends('layouts.pages')

@section('content')
    <div class="content">
        <div class="page-header-title">
            <h4 class="page-title">Создание пункта меню</h4>
        </div>
        <div class="page-content-wrapper ">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="panel panel-primary">
                            <div class="panel-body">
                                <menu-create-form></menu-create-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection