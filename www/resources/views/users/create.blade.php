@extends('backend.tblTemplate')
@section('title',$title)
@section('body')
    @include('messages.flash_message')
    <h3>Create User</h3>
    {!! Form::open(['url' => 'backend/users']) !!}
    @include('users.form_create')
    {!! Form::close() !!}
    @include('errors.error_layout')
@stop