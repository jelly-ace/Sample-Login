# Sample-Login

## Key points to improve:
1. Instead of using helper or service like (common.service.ts) utilize the ngrx functionality only specially for retrieving AppState data.
2. Utilize ngrx store state selectors for data selection.
3. Code refractor for ngrx store reducers, actions, effects and selectors since code uses the long formatting.(Commented codes are available for future reference incase of refractoring.)
4. May implement auth tokens for a better login app.
5. Improve unit test for components to utilize TestBeds and mocks.
6. Improve design to cater web accessibility using wai-aria for a better user experience.
7. Login page lacks animations, this is for further improvement also.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

You can test with the following login credentials:

email: sample@domain.com
password: 123456

email: email@domain.com
password: 111111