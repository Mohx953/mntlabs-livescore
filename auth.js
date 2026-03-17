// ─────────────────────────────────────────────────────────
//  auth.js  –  Add this ONE file to every protected page.
//
//  🔧 Only configure credentials HERE — all protected pages
//     share this file so you only change it in one place.
// ─────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://delnpsartpfmzcuubxdo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbG5wc2FydHBmbXpjdXVieGRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjIyMDIsImV4cCI6MjA4OTMzODIwMn0.8UxsD2xopKMSuK_kjS3dydhG_bBoL0Ve5APtzjBtfuk';

const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * requireAuth()
 * Hides the page body while checking the session.
 * Redirects to login.html if not logged in.
 * Returns the session object if authenticated.
 */
async function requireAuth() {
    document.body.style.visibility = 'hidden';

    const { data } = await _sb.auth.getSession();

    if (!data.session) {
        window.location.replace('login.html');
        return null;
    }

    document.body.style.visibility = 'visible';

    // Auto-fill any element with id="user-email"
    const el = document.getElementById('user-email');
    if (el) el.textContent = data.session.user.email;

    return data.session;
}

/**
 * signOut()
 * Signs the user out and returns to the landing page.
 */
async function signOut() {
    await _sb.auth.signOut();
    window.location.href = 'index.html';
}

window._sb         = _sb;
window.requireAuth = requireAuth;
window.signOut     = signOut;