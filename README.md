# ANTI MANUSIA PROJECT

Website portfolio client ANTI MANUSIA PROJECT untuk Reydysta Pradana Krisna Mukti. Project ini memakai Next.js App Router, TypeScript strict, Tailwind CSS, Lucide Icons, dan Framer Motion.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Route yang tersedia:

- `/`
- `/resume`
- `/reydysta-pradana-krisna-mukti-resume.pdf`
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

Konfigurasi client berada di `lib/config.ts`, sedangkan portfolio utama berada di route `/` dan `/demo/videografer`. File PDF resume tersimpan di `public/` agar dapat diunduh langsung dari Vercel.

Fitur interaktif demo baru meliputi filter galeri, lightbox previous/next fotografer, filter dan detail proyek desainer, filter dan detail proyek programmer, navigasi internal, serta panel kontrol demo yang bisa disembunyikan.

## Deployment ke Vercel

1. Push project ke repository GitHub, GitLab, atau Bitbucket.
2. Import repository tersebut di Vercel.
3. Pastikan Framework Preset terdeteksi sebagai `Next.js`.
4. Gunakan Build Command `npm run build` dan biarkan Output Directory kosong.
5. Klik Deploy.

Project ini tidak membutuhkan database maupun environment variable. Setelah deploy, verifikasi route `/`, `/resume`, `/demo/videografer`, dan link PDF resume.

## Deployment ke Netlify

Import repository yang sama ke Netlify dan gunakan pengaturan berikut:

- Build command: `npm run build`
- Publish directory: `.next`
- Base directory: kosong

File `netlify.toml` sudah menyertakan plugin Next.js agar App Router, route demo, dan route `/custom` tidak berakhir di halaman 404.

## Catatan konten

Detail project video yang belum diberikan ditampilkan sebagai status “Segera hadir”. Ganti data tersebut di `components/interactive-demos.tsx` setelah judul, kategori, tahun, deskripsi, link, dan thumbnail client tersedia.
