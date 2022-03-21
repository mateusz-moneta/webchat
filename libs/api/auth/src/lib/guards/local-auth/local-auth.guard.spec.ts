import { LocalAuthGuard } from './local-auth.guard';

describe(LocalAuthGuard.name, () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});
