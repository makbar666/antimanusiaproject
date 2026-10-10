# pamerporto

Showcase website untuk layanan pembuatan website portfolio. Project ini memakai Next.js App Router, TypeScript strict, Tailwind CSS, Lucide Icons, dan Framer Motion.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Route yang tersedia:

- `/`
- `/custom`
- `/demo/fotografer`
- `/demo/desainer`
- `/demo/programmer`
- `/demo/videografer`
- `/demo/uiux-designer`
- `/demo/content-creator`
- `/demo/digital-marketer`
- `/demo/arsitek`
- `/demo/sales-marketing`
- `/demo/fresh-graduate`
- `/demo/professional`
- `/demo/creative`

## Konfigurasi bisnis

Edit `lib/config.ts` untuk mengganti nama brand, nomor WhatsApp, email, sosial media, dan copy layanan. Nomor WhatsApp disimpan dalam format lokal dan otomatis dinormalisasi ke format internasional saat CTA digunakan.

Data katalog demo baru berada di `lib/interactive-demos.ts`. Layout fotografer, desainer, dan programmer dipisah, sementara lima kategori tambahan memakai layout showcase reusable dengan tema profesi masing-masing di `components/interactive-demos.tsx`.

Fitur interaktif demo baru meliputi filter galeri, lightbox previous/next fotografer, filter dan detail proyek desainer, filter dan detail proyek programmer, navigasi internal, serta panel kontrol demo yang bisa disembunyikan.

## Deployment ke Vercel

Import repository ke Vercel. Framework akan terdeteksi sebagai Next.js. Tidak ada database atau environment variable yang dibutuhkan.

## Deployment ke Netlify

Import repository yang sama ke Netlify dan gunakan pengaturan berikut:

- Build command: `npm run build`
- Publish directory: `.next`
- Base directory: kosong

File `netlify.toml` sudah menyertakan plugin Next.js agar App Router, route demo, dan route `/custom` tidak berakhir di halaman 404.

## Catatan konten

Semua nama, pengalaman, proyek, sertifikasi, dan email pada halaman demo adalah data simulasi. Ganti sebelum halaman demo dipakai sebagai portfolio klien nyata.
