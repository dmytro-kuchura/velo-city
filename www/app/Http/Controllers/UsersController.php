<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRole;
use App\Http\Requests\CreateUser;
use App\Http\Requests\EditUser;
use App\Repositories\UserRepository;
use Ultraware\Roles\Models\Role;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    protected $user;

    public function __construct(UserRepository $user)
    {
        $this->user = $user;
    }

    /**
     * Display a listing of the users.
     *
     * @return Response
     */
    public function index()
    {
        $title = $this->user->getTableName();
        $users = $this->user->userWithPaginate();
        return view('users.index', compact('users', 'title'));
    }

    /**
     * Show the form for creating a new User.
     *
     * @return Response
     */
    public function create()
    {
        $title = $this->user->getTableName();
        $users = $this->user->userWithRole();
        return view('users.create', compact('title', 'users'));
    }

    /**
     * Show the create role form to the user.
     *
     * @return Response
     */

    public function role()
    {
        $title = $this->user->getTableName();
        return view('users.roles', compact('title'));
    }

    /**
     * Store role in database.
     *
     * @param CreateRole $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function createRole(CreateRole $request)
    {
        Role::create($request->all());
        session()->flash('flash_message', 'Role successfully added!');
        return redirect()->back();
    }

    /**
     * Store users in database.
     *
     * @param CreateUser $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateUser $request)
    {
        $data = $request->except(['password']);
        $data['password']= bcrypt($request->input('password'));
        $this->user->create($data);
        session()->flash('flash_message', 'User successfully added!');
        return redirect()->back();
    }

    /**
     * Show the form for editing the specified user.
     *
     * @param  int $id
     * @return Response
     */

    public function edit($id)
    {
        $data['title'] = $this->user->getTableName();
        $data['roles'] = Role::all();
        $data['user'] = $this->user->with('role')->findOrFail($id);
        return view('users.edit', $data);
    }

    /**
     * Update the specified user.
     *
     * @param $id
     * @param EditUser $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update($id, EditUser $request)
    {
        $user = $this->user->find($id);
        //$user = $this->user->find(auth()->id()); Get admin password
        // Only admin can change user settings
        if (!Hash::check($request->input('old_password'), $user->password)) {
            return redirect()->back()->withErrors('Your old password does not match');
        } else {
            $user->find($id);
            $data = $request->except(['password']);
            $data['password']= bcrypt($request->input('password'));
            $user->update($data);
            $user->role()->sync($request->input('role'));
            session()->flash('flash_message', 'User password and role successfully updated!');
            return redirect()->back();
        }
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $this->user->delete($id);
        //Without database OnDdelete Cascade
        //$product->size()->detach($id);
        session()->flash('flash_message', 'User acount successfully deleted!');
        return redirect()->back();
    }
}