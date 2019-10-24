import {FormCreationModule} from "./form-creation.module";
describe('UsersModule', () => {
  let usersModule: FormCreationModule;

  beforeEach(() => {
    usersModule = new FormCreationModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
