# Caddy — Golf Yardage Tracker

## App URL
- `vibe.temporalspaces.com/caddy.html`

## Login
- Same Supabase project as other apps: `qlbcgpbfpkkumvznvejs.supabase.co`
- Email: `info@ianallenphoto.com`

## What It Does

**On Course tab (default)**
- Enter rangefinder yardage → app calculates effective yardage adjusted for:
  - Temperature: baseline 70°F, adds/subtracts 1 yd per 10° deviation (cold = shorter)
  - Elevation: adds/subtracts 1 yd per 10 ft (uphill = more distance needed)
- Returns two caddy cards:
  - **Commit** — closest full swing in the bag to effective yardage
  - **Take something off** — closest 3/4 (or other partial) swing from a different club
- Temp and elevation conditions persist in localStorage — set once per round

**Yardages tab**
- Manage your club bag: add/edit/delete clubs
- Each club has free-form swing types (full, 3-4, 1-2, etc.)
- Wedges default-suggest full / 3-4 / 1-2 when adding; irons default full / 3-4
- Tap any carry number to inline-edit it

## Database
- Table: `yardages`
- Schema: `id text PK, data jsonb, user_id uuid, created_at timestamptz`
- One row per club; swing types are free-form keys inside `data.swings`
- RLS: authenticated users can only read/write their own rows

## Record Shape
```json
{
  "id": "club_7iron_1234567890",
  "data": {
    "name": "7 Iron",
    "type": "iron",
    "swings": {
      "full": { "carry": 158, "notes": "" },
      "3-4": { "carry": 142, "notes": "" }
    }
  },
  "user_id": "1e9bebe5-186b-4561-9b04-2b07f0ca46d2"
}
```

## Club Sort Order
Driver → Wood/Fairway → Hybrid → Iron → Wedge

## Repo
- `github.com/nepaltnf/minisites`
- Deploys automatically to Cloudflare Pages on push to main
