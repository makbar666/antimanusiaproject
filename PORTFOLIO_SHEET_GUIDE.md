# Pengelolaan Video Portfolio

Gunakan Google Sheets dengan kolom berikut pada baris pertama:

`Judul,Kategori,Tahun,Deskripsi,Link Google Drive,Aktif`

Kategori yang didukung:

- `FILM BRAND`
- `VIDEO MUSIK`
- `ACARA`
- `DOKUMENTER`

Untuk menghubungkan spreadsheet ke website:

1. Buat Google Sheet berdasarkan template CSV.
2. Pilih **File > Share > Publish to web**.
3. Pilih sheet yang berisi data video, format **Comma-separated values (.csv)**, lalu klik **Publish**.
4. Tambahkan URL CSV tersebut ke Vercel sebagai environment variable:

   `NEXT_PUBLIC_PORTFOLIO_SHEET_URL`

   Format URL yang disarankan:

   `https://docs.google.com/spreadsheets/d/ID_SHEET/export?format=csv&gid=0`

5. Redeploy project di Vercel.

Setiap video Google Drive harus memiliki akses **Anyone with the link / Viewer**. Baris dengan `Aktif` bernilai `Tidak`, `No`, `False`, atau `0` tidak akan ditampilkan.
