# Sample-Login

## Key points to improve:
1. instead of using helper or service like (common.service.ts) utilize the ngrx functionality only specially for retrieving AppState data.
2. Utilize ngrx store state selectors.
3. code refractor for ngrx store reducers, actions, effects and selectors
4. implement auth tokens for a better login app
5. improve unit test for components to utilize TestBeds and mock
6. improve design to cater web accessibility using wai-aria for a better login app
7. login page lacks animations, this is for further improvement
8. remove comments for a much cleaner code (ps. comments are just for future reference incase of refractoring)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

You can test with the following login credentials:
email: sample@domain.com
password: 123456

email: email@domain.com
password: 111111