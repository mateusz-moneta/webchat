import { JwtAuthGuard } from './jwt-auth.guard';

describe(JwtAuthGuard.name, () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
