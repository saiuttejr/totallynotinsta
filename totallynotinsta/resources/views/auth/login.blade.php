@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <img src="{{ asset('images/TotallyNotInsta-logo.jpeg') }}" alt="TotallyNotInsta-logo" class="img-fluid d-none d-md-block">
        </div>
        <div class="col-md-6 mt-3 mt-md-0">
            <div class="card">
                <div class="card-body p-4">
                    <h2 class="text-center mb-4" style="font-family: 'Instrument Sans', sans-serif; color: #262626;">TotallyNotInsta</h2>
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="mb-3">
                            <label for="email" class="form-label">{{ __('Email Address') }}</label>
                            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">{{ __('Password') }}</label>
                            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="remember" name="remember" {{ old('remember') ? 'checked' : '' }}>
                            <label class="form-check-label" for="remember">{{ __('Remember Me') }}</label>
                        </div>

                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary rounded-pill" style="background-color: #3897f0; border-color: #3897f0;">
                                {{ __('Login') }}
                            </button>
                        </div>

                        @if (Route::has('password.request'))
                            <div class="text-center mt-3">
                                <a class="text-decoration-none" href="{{ route('password.request') }}" style="color: #00376b; font-size: 0.9em;">
                                    {{ __('Forgot Your Password?') }}
                                </a>
                            </div>
                        @endif

                        <hr class="my-4">
                    </form>
                </div>
            </div>
            <div class="text-center mt-3">
                <p>Don't have an account? <a href="{{ route('register') }}" class="text-decoration-none" style="color: #3897f0;">Sign up</a></p>
            </div>
        </div>
    </div>
</div>
@endsection
