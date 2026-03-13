# Bardo Tea — Admin Setup Notes

## App URLs
- Customer app: `vibe.temporalspaces.com/bardoMobile.html`
- Admin panel: `vibe.temporalspaces.com/bardoAdmin.html`

## Adding Users (invite-only)
1. Go to supabase.co → your project → Authentication → Users
2. Click "Invite user"
3. Enter their email — Supabase sends them a link to set their password
4. They go to the admin URL and sign in with that email/password

## Admin Panel — What You Can Do
- Add a new tea — click "+ add tea"
- Edit a tea — tap the tea card to expand, click "edit"
- Delete a tea — click "delete" on the card, confirm
- Eastern steep times are entered in seconds, comma-separated (e.g. `10, 20, 40, 60, 90`)
- Sign out using the link in the top right

## Database
- Supabase project: `qlbcgpbfpkkumvznvejs.supabase.co`
- Table: `bardo_teas`
- Repo: `github.com/nepaltnf/minisites`
- Deploys automatically to Cloudflare Pages on push to main
