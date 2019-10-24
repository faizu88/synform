import {FormDesignerModule} from "../form-designer.module";
describe('UsersModule', () => {
  let usersModule: FormDesignerModule;

  beforeEach(() => {
    usersModule = new FormDesignerModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
