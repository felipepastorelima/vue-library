let inMemoryToken = null;

export class AuthToken {
  static async get() {
    return (
      inMemoryToken || localStorage.getItem('jwt') || null
    );
  }

  static async set(token, rememberMe) {
    if (rememberMe) {
      localStorage.setItem('jwt', token || '');
    } else {
      inMemoryToken = token;
      localStorage.setItem('jwt', '');
    }
  }
}
