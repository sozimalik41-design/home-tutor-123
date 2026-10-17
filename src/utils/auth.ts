// Admin and User Authentication state helpers
const ADMIN_AUTH_KEY = 'home_tutor_admin_auth_v1';
const ADMIN_PASSCODES = ['admin123', 'demo1234', 'owner2026', 'admin'];

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(authenticated: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (authenticated) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
    // Dispatch custom event so Navbar, Footer, and pages update reactively
    window.dispatchEvent(new Event('home_tutor_auth_change'));
  } catch (e) {
    console.warn('Failed to update admin auth in localStorage:', e);
  }
}

export function verifyAdminPasscode(passcode: string): boolean {
  if (!passcode) return false;
  const clean = passcode.trim().toLowerCase();
  return ADMIN_PASSCODES.includes(clean);
}
