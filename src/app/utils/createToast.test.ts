import createToast from './createToast';

describe('createToast', () => {
  it('should correcly return value of type ToastType when correct arguments are passed into the function', () => {
    const message = 'test';
    const type = 'success';

    const toast = createToast(message, type);

    expect(toast.message).toBe(message);
    expect(toast.type).toBe(type);
  });
});
