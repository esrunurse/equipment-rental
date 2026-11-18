# RentHub — Equipment Rental System

Frontend for the Equipment Rental System.
Next.js 16 (App Router), TypeScript, Tailwind CSS v4, NextAuth, Redux Toolkit, Redux Persist.

Backend: [PJ02-EquipmentRent](https://github.com/SWDevPrac2-69-1/PJ02-EquipmentRent), customized for the additional requirements (rental `status`, equipment image upload). It lives in its own repository.

## Run locally

Requires Node.js **20.19+**

1. Create `.env.local` in this folder (copy `.env.example`):

   ```
   BACKEND_URL=
   NEXTAUTH_URL=
   NEXTAUTH_SECRET=
   ```

2. Start:

   ```bash
   npm install
   npm run dev
   ```

4. Open http://localhost:3000

### Admin accounts

The register page only creates members.

## Features

| Requirement | Route |
|---|---|
| Register (name, email, tel, password; always `member`) / login / logout | `/register`, `/signin`, TopMenu |
| Everyone views equipment | `/`, `/equipment/[eid]` |
| Admin adds / edits / deletes equipment | `/admin/equipment` |
| Member creates a rental request | `/equipment/[eid]`, `/cart` |
| Member views / edits / deletes own requests | `/rentals` |
| Admin views / edits / deletes any request | `/admin/rentals` |
| AR1 Cart (Redux Toolkit + Redux Persist) | `/cart` |
| AR2 Search / filter / sort / pagination in the URL | `/?q=&category=&sort=&page=` |
| AR3 Detail page + `loading.tsx` + `not-found.tsx` | `/equipment/[eid]` |
| AR4 Rental status workflow + admin dashboard | `/admin/rentals`, `/admin` |
| AR5 Equipment image upload | `/admin/equipment` |

## Deployment (Vercel)

....