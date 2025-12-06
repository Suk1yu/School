# School Website Project

Project ini berisi dua versi struktur website bertema edukasi: **School-main (V1)** dan **School V2**. Keduanya menunjukkan bagaimana sebuah website dapat berkembang dari struktur sederhana menuju arsitektur yang lebih modern, rapi, dan mudah untuk dikembangkan.

README ini memberikan penjelasan lengkap mengenai perbedaan, struktur folder, kelebihan dan kekurangan masing-masing versi, serta lisensi resmi untuk penggunaan pembelajaran.

---

## 1. Ringkasan Project

Project ini dibuat untuk kebutuhan pembelajaran web development. Versi pertama (V1) adalah struktur dasar HTML sederhana, sedangkan versi kedua (V2) adalah versi yang lebih modern dengan pemisahan asset yang profesional.

Tujuan project:
- Melatih pemahaman struktur dasar HTML.
- Belajar menyusun struktur folder yang baik.
- Mempersiapkan project agar mudah diskalakan.
- Memberikan contoh praktik web development modern.

---

## 2. Perbedaan Utama Antara V1 dan V2

### School-main (V1)
Versi awal dengan pendekatan dasar. Semua file berada di direktori utama tanpa banyak pemisahan.

**Ciri Struktur:**
- File HTML langsung di root.
- CSS sebagian inline atau per-file tanpa folder khusus.
- Gambar tersebar di root dan beberapa folder.
- Tidak ada `src/` atau manajemen asset modern.

**Kelebihan:**
- Sangat sederhana untuk pemula.
- Langsung dibuka tanpa konfigurasi.
- Cocok untuk latihan HTML dasar.

**Kekurangan:**
- Tidak scalable.
- Sulit di-maintain ketika file semakin banyak.
- Struktur tidak konsisten.
- Kurang cocok untuk workflow modern.

---

### School V2
Versi yang lebih tertata dan mengikuti standar modern frontend.

**Ciri Struktur:**
- Pemisahan jelas antara `public/` untuk aset statis dan `src/` untuk file development.
- Folder `src/css` dan `src/js` untuk mengelompokkan file sesuai fungsi.
- Semua aset visual berada di `public/img`.
- Mudah dikembangkan menjadi project lebih besar.

**Kelebihan:**
- Struktur rapi dan profesional.
- Sangat scalable untuk project jangka panjang.
- Mendukung workflow modern.
- Aset dan kode tertata jelas sehingga mudah dipelihara.

**Kekurangan:**
- Sedikit lebih kompleks bagi pemula.
- Butuh kedisiplinan dalam penempatan file.

---

---

## 3. Rekomendasi Penggunaan

- Gunakan **School-main (V1)** untuk:
  - Belajar HTML dari dasar.
  - Membuat halaman statis sederhana.
  - Demo cepat atau prototipe 1 halaman.

- Gunakan **School V2** untuk:
  - Project yang akan berkembang.
  - Pembelajaran frontend lebih dalam.
  - Persiapan masuk framework (Next.js, Astro, React).
  - Struktur profesional seperti standar industri.

---

## 4. Tujuan Pembelajaran Dari Kedua Versi

Project ini dapat membantu memahami banyak poin penting, seperti:
- Cara menyusun struktur file HTML yang bersih.
- Manajemen CSS dan JavaScript secara modular.
- Memisahkan aset publik dan aset development.
- Transisi dari project statis sederhana menuju arsitektur modern.
- Best practice dalam web design dan web development.

---

## 5. Lisensi

Project ini dilisensikan di bawah **MIT License**, yang memungkinkan siapapun untuk menggunakan, menyalin, memodifikasi, atau mendistribusikan project ini untuk keperluan pembelajaran, baik pribadi maupun akademik.

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 6. Kontribusi

Project ini terbuka untuk pengembangan lebih lanjut. Jika ingin memperbaiki struktur, menambah fitur, atau merapikan asset, semua kontribusi dipersilakan selama mengikuti prinsip clean code dan struktur rapi.

---

## 7. Catatan Tambahan

Project ini merupakan materi pembelajaran dan referensi untuk memahami perbandingan struktur web yang buruk, cukup baik, dan profesional. Versi V2 sangat direkomendasikan untuk digunakan sebagai standar dasar dalam pengembangan project front-end.

---