import { ArticleData, GuidanceData } from "@/types";

const IMG = {
  network: "/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png",
  vpn: "/images/751c3bc4-1bc6-40bd-aa78-5b5dde4f7868.png",
  hotspot: "/images/b016bc02-0547-4245-9a6f-6b3b9d2b540e.png",
};

export const articles: Record<string, ArticleData> = {
  optimasi: {
    title: "7 Langkah Optimasi MikroTik agar Jaringan Lebih Stabil",
    category: "MikroTik",
    date: "29 Jul 2026",
    dateIso: "2026-07-29",
    time: "8 menit baca",
    lead: "Checklist praktis meningkatkan stabilitas, keamanan, dan performa jaringan MikroTik tanpa harus mengganti perangkat.",
    image: IMG.network,
    summary: "Jaringan MikroTik paling stabil ketika CPU router dijaga di bawah 70%, packet loss di bawah 1%, bandwidth dibagi adil memakai PCQ, DNS dibuat responsif, dan firewall input dirapikan. Terapkan satu perubahan per sesi, ukur hasilnya, lalu simpan backup sebelum melanjutkan ke perubahan berikutnya.",
    points: ["CPU < 70% & packet loss < 1%", "PCQ untuk pembagian bandwidth adil", "Satu perubahan per sesi + backup"],
    sections: [
      ["audit", "1. Audit trafik dan resource", "Buka System → Resources dan catat penggunaan CPU, RAM, serta uptime router. Gunakan Tools → Torch untuk melihat trafik terbesar pada jam sibuk, lalu ukur latency ke gateway dan packet loss sebagai baseline. Pastikan RouterOS memakai versi stable terbaru (v7) karena membawa banyak perbaikan performa dan keamanan. Tanpa baseline, setiap optimasi hanya jadi tebakan."],
      ["bandwidth", "2. Bagi bandwidth secara adil dengan PCQ", "Per Connection Queue (PCQ) membagi bandwidth otomatis dan merata ke semua user tanpa perlu ratusan rule. Buat queue type turunan pcq-download-default dan pcq-upload-default, lalu terapkan pada Simple Queue induk sesuai kapasitas ISP. Untuk jaringan di bawah ±50 user, Simple Queue sudah memadai; struktur dengan prioritas antar layanan baru membutuhkan Queue Tree."],
      ["security", "3. Rapikan DNS dan firewall", "Arahkan DNS ke resolver tercepat dari jaringan Anda (1.1.1.1, 8.8.8.8, atau DNS ISP) dan batasi allow-remote-requests hanya untuk jaringan internal. Nonaktifkan service yang tidak dipakai di IP → Services seperti www, ftp, dan telnet. Susun input chain secara berurutan: accept established/related, drop invalid, izinkan ICMP, kemudian drop trafik lain yang datang dari WAN."],
      ["monitoring", "4. Monitoring dan evaluasi berkala", "Aktifkan Tools → Netwatch atau ping berkala ke gateway agar packet loss terdeteksi sebelum user mengeluh. Simpan grafik interface dan resource untuk membaca tren mingguan. Evaluasi setiap perubahan setelah 24–48 jam: jika latency naik atau CPU melonjak, kembalikan ke backup dan ulangi dengan pendekatan yang berbeda."],
    ],
  },
  "load-balance": {
    title: "Cara Setting Load Balance 2 ISP Tanpa Bikin Koneksi Putus",
    category: "MikroTik",
    date: "29 Jul 2026",
    dateIso: "2026-07-29",
    time: "7 menit baca",
    lead: "Konsep pembagian trafik dua koneksi internet dengan PCC dan failover yang rapi, stabil, dan mudah dirawat.",
    image: IMG.vpn,
    summary: "Load balance 2 ISP yang stabil memakai PCC dengan classifier both-addresses-and-ports, connection mark yang konsisten, routing mark per ISP, serta pengecualian trafik lokal dan perbankan. Tambahkan recursive failover dengan check-gateway ping agar perpindahan ISP berlangsung dalam hitungan detik tanpa memutus sesi.",
    points: ["PCC both-addresses-and-ports", "Kecualikan trafik lokal & banking", "Recursive failover pindah dalam detik"],
    sections: [
      ["audit", "1. Siapkan topologi dan dokumentasi", "Pastikan setiap modem memakai subnet berbeda, misalnya 192.168.1.0/24 untuk ISP1 dan 192.168.2.0/24 untuk ISP2. Catat gateway, kapasitas, serta interface WAN dan LAN sebelum membuat rule. Tentukan juga rasio pembagian trafik: 1:1 untuk kapasitas setara, atau sesuaikan bobot PCC dengan perbandingan bandwidth kedua ISP."],
      ["bandwidth", "2. Terapkan PCC secara konsisten", "Di mangle, tandai koneksi baru memakai per-connection-classifier=both-addresses-and-ports dengan pola 2/0 dan 2/1. Pertahankan connection-mark agar paket balasan selalu kembali lewat ISP yang sama, lalu terjemahkan ke routing-mark. Jangan menandai ulang koneksi yang sudah bertanda — inkonsistensi di sinilah penyebab paling umum keluhan koneksi putus-nyambung."],
      ["security", "3. Routing, NAT, dan pengecualian", "Buat default route untuk tiap routing-mark dan pasang masquerade di kedua interface WAN. Lewatkan trafik lokal dari PCC memakai dst-address-list RFC1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16). Kunci trafik sensitif sesi seperti internet banking dan payment gateway ke satu ISP lewat address-list agar alamat IP sumber tidak berubah-ubah."],
      ["monitoring", "4. Uji failover secara berkala", "Gunakan recursive route: arahkan gateway ke IP publik seperti 8.8.8.8 atau 1.1.1.1 dengan check-gateway=ping dan distance berbeda per ISP. Simulasikan dengan mencabut kabel ISP1 — perpindahan idealnya di bawah 10 detik dan koneksi baru langsung jalan. Uji juga kondisi ISP hidup tetapi internet macet, karena di sinilah recursive failover benar-benar terbukti gunanya."],
    ],
  },
  olt: {
    title: "Mengenal OLT, ODC, ODP, dan ONU untuk Pemula",
    category: "OLT & Fiber",
    date: "29 Jul 2026",
    dateIso: "2026-07-29",
    time: "6 menit baca",
    lead: "Memahami fungsi perangkat utama jaringan FTTH dan cara menghitung redaman sebelum merancang distribusi fiber optik.",
    image: IMG.network,
    summary: "Dalam FTTH, sinyal mengalir dari OLT menuju ODC (splitter utama), dibagi lagi lewat ODP, lalu diterima ONU pelanggan. Kualitas akhir ditentukan power budget: fiber meredam ±0,35 dB/km, splice ±0,1 dB, konektor ±0,5 dB, splitter 1:8 ±10,5 dB, dan 1:16 ±13,8 dB. Target level terima ONU berada di antara -8 sampai -25 dBm.",
    points: ["Alur sinyal OLT menuju ODC, ODP, lalu ONU", "Splitter 1:8 meredam ±10,5 dB", "Target RX ONU -8 s/d -25 dBm"],
    sections: [
      ["audit", "1. OLT sebagai pusat jaringan", "OLT berada di sisi provider dan menjadi otak jaringan FTTH: mengelola profil layanan, VLAN, bandwidth tiap pelanggan, serta registrasi ONU/ONT. Satu port PON pada OLT umumnya melayani hingga 64 atau 128 pelanggan melalui rangkaian splitter. Dokumentasikan setiap port PON beserta profilnya agar troubleshooting tidak menebak-nebak."],
      ["bandwidth", "2. Fungsi ODC dan splitter", "ODC adalah titik distribusi utama dari arah OLT. Di sinilah splitter bekerja membagi satu core menjadi banyak jalur, dengan konsekuensi redaman: 1:2 sekitar 3,7 dB, 1:4 sekitar 7,4 dB, 1:8 sekitar 10,5 dB, 1:16 sekitar 13,8 dB, dan 1:32 sekitar 17,1 dB. Pilih rasio berdasarkan hitungan power budget, bukan sekadar mengikuti stok perangkat di lapangan."],
      ["security", "3. ODP dan drop cable ke pelanggan", "ODP ditempatkan dekat area pelanggan dan meneruskan koneksi lewat drop cable menuju ONU/ONT. Beri label setiap port ODP dan core agar pemasangan baru serta perbaikan berjalan cepat. Pastikan konektor selalu dibersihkan sebelum disambung, karena konektor kotor adalah sumber redaman tak terduga yang paling sering ditemui di lapangan."],
      ["monitoring", "4. Hitung redaman end-to-end", "Jumlahkan seluruh komponen redaman: panjang fiber (±0,35 dB/km di 1310 nm), splice (±0,1 dB per titik), konektor (±0,5 dB), dan splitter. Bandingkan dengan budget kelas optik, GPON kelas B+ menyediakan sekitar 28 dB. Verifikasi hasil akhir dengan optical power meter di sisi ONU, level terima sehat berkisar -8 sampai -25 dBm."],
    ],
  },
  hotspot: {
    title: "Checklist Membangun Hotspot Voucher yang Siap Jual",
    category: "WiFi",
    date: "29 Jul 2026",
    dateIso: "2026-07-29",
    time: "9 menit baca",
    lead: "Dari desain paket, user profile, captive portal, sampai laporan penjualan voucher harian.",
    image: IMG.hotspot,
    summary: "Hotspot voucher yang siap jual membutuhkan empat hal: jaringan pelanggan terpisah memakai VLAN, 3 sampai 5 pilihan paket sederhana dengan rate-limit jelas di user profile, captive portal yang ringan dibuka di HP, dan monitoring harian lewat Mikhmon mulai dari user aktif, voucher terjual, sampai pendapatan, dilengkapi backup konfigurasi berkala.",
    points: ["Pisahkan jaringan user dengan VLAN", "3 sampai 5 paket dengan limit jelas", "Monitoring harian via Mikhmon"],
    sections: [
      ["audit", "1. Pisahkan jaringan pelanggan", "Jalankan hotspot di interface atau VLAN khusus agar trafik user tidak bercampur dengan jaringan manajemen perangkat. Terapkan rule firewall agar user hotspot hanya bisa mengakses internet, bukan Winbox, SSH, atau API router. Segmentasi ini fondasi keamanan sekaligus memudahkan pelacakan masalah saat jaringan ramai."],
      ["bandwidth", "2. Susun paket voucher yang sederhana", "Buat 3 sampai 5 paket yang mudah dijelaskan ke pelanggan, misalnya berbasis durasi (3 jam, 1 hari, 7 hari) atau kuota. Atur rate-limit tiap paket di user profile, contoh 2M/2M untuk paket hemat dan 5M/5M untuk paket reguler. Terlalu banyak varian membuat pembeli bingung dan menyulitkan mitra warung yang membantu menjualkan."],
      ["security", "3. Amankan captive portal", "Gunakan halaman login yang ringan dibuka di HP kelas bawah sekalipun dan tampilkan harga paket dengan jelas. Ganti seluruh kredensial default, batasi akses manajemen router hanya dari jaringan admin, dan nonaktifkan login trial jika tidak dipakai. Portal yang berat atau error adalah alasan utama voucher gagal terjual."],
      ["monitoring", "4. Monitoring penjualan via Mikhmon", "Hubungkan Mikhmon ke router untuk memantau user aktif, pemakaian bandwidth, voucher yang belum terjual, dan total pendapatan dari satu dashboard. Generate voucher dalam batch sesuai kebutuhan stok, lalu lakukan backup database serta konfigurasi secara berkala agar riwayat penjualan tidak hilang saat perangkat bermasalah."],
    ],
  },
  firewall: {
    title: "5 Firewall Rule Wajib untuk Mengamankan Router",
    category: "Keamanan",
    date: "29 Jul 2026",
    dateIso: "2026-07-29",
    time: "5 menit baca",
    lead: "Proteksi dasar MikroTik dari brute force, port scanning, dan akses ilegal melalui internet.",
    image: IMG.network,
    summary: "Lima rule wajib di chain input: (1) accept koneksi established, related, dan untracked, (2) drop paket invalid, (3) izinkan ICMP dengan batasan, (4) drop seluruh trafik dari WAN yang bukan DSTNAT, dan (5) batasi Winbox, SSH, serta API hanya ke alamat IP manajemen. Lengkapi dengan mematikan service tak terpakai, password kuat, dan update RouterOS rutin.",
    points: ["Accept valid, drop invalid", "Drop trafik WAN bukan DSTNAT", "Manajemen hanya dari IP tepercaya"],
    sections: [
      ["audit", "1. Backup dan identifikasi layanan", "Sebelum menyentuh firewall, simpan export konfigurasi dan catat layanan yang benar-benar dipakai. Nonaktifkan service yang tidak dibutuhkan di IP ke Services seperti www, ftp, telnet, dan api-ssl. Mengganti port default memang membantu mengurangi noise serangan, tetapi jangan pernah menjadikannya satu-satunya pertahanan."],
      ["bandwidth", "2. Accept established, lalu drop invalid", "Letakkan rule accept untuk connection-state established, related, dan untracked di urutan paling atas agar koneksi sah diproses cepat tanpa melewati rule lain. Tepat di bawahnya, drop paket berstatus invalid. Urutan ini membuat firewall efisien sekaligus memangkas trafik aneh sejak dini."],
      ["security", "3. Kunci input chain dari WAN", "Izinkan Winbox, SSH, dan API hanya dari alamat IP atau subnet manajemen memakai src-address-list, dan batasi ICMP dengan limit agar tidak dipakai membanjiri router. Tutup dengan rule tegas: drop semua trafik input dari interface WAN yang bukan bagian dari DSTNAT. Mayoritas brute force dari internet mati di rule ini."],
      ["monitoring", "4. Logging secukupnya dan evaluasi", "Aktifkan logging hanya untuk kejadian penting seperti percobaan login gagal dan drop di input chain, bukan seluruh trafik, agar storage dan CPU tidak habis oleh catatan serangan berulang. Tinjau log secara berkala untuk melihat pola, lalu tambahkan address-list penyerang ke daftar blokir bila sumber yang sama terus muncul."],
    ],
  },
  vpn: {
    title: "VPN atau Port Forwarding: Mana yang Lebih Aman?",
    category: "VPN",
    date: "29 Jul 2026",
    dateIso: "2026-07-29",
    time: "6 menit baca",
    lead: "Perbandingan praktis untuk akses CCTV, router, server, dan perangkat kantor dari luar jaringan.",
    image: IMG.vpn,
    summary: "VPN hampir selalu lebih aman karena layanan internal tidak terekspos langsung ke internet, semua akses melewati tunnel terenkripsi dengan autentikasi. Port forwarding lebih praktis untuk satu layanan, tetapi wajib dibatasi alamat IP sumber, memakai autentikasi kuat, dan dipatch rutin. Untuk koneksi CGNAT tanpa IP publik, gunakan tunnel WireGuard ke VPS lalu akses lewat server tersebut.",
    points: ["VPN: terenkripsi, tanpa ekspos layanan", "Port forwarding: praktis tapi terekspos", "CGNAT: tunnel WireGuard ke VPS"],
    sections: [
      ["audit", "1. Petakan kebutuhan akses terlebih dahulu", "Catat apa saja yang perlu diakses dari luar: CCTV atau NVR, router, RDP, sampai server ujian. Tentukan siapa yang mengakses, dari perangkat apa, dan seberapa sering. Kebutuhan satu layanan untuk satu orang berbeda solusinya dengan kebutuhan banyak layanan untuk tim, dan pemetaan ini menentukan pilihan antara VPN atau port forwarding."],
      ["bandwidth", "2. Kenapa VPN lebih aman", "Dengan VPN, tidak ada layanan internal yang terbuka ke internet karena semua trafik masuk melalui tunnel terenkripsi setelah autentikasi berhasil. WireGuard di RouterOS v7 ringan, cepat, dan mudah dikelola, cocok untuk akses harian dari HP maupun laptop. IPsec tetap relevan untuk kebutuhan site-to-site antar kantor atau perangkat yang lebih lama."],
      ["security", "3. Kapan port forwarding boleh dipakai", "Port forwarding masih masuk akal untuk satu layanan spesifik yang memang harus publik. Bila terpaksa, batasi src-address ke IP tepercaya, ganti kredensial default, aktifkan hanya port yang dibutuhkan, dan pastikan firmware perangkat selalu diperbarui. Jangan pernah memforward port manajemen router seperti Winbox atau SSH langsung ke internet."],
      ["monitoring", "4. Solusi untuk CGNAT dan evaluasi", "Pada koneksi CGNAT tanpa IP publik, buat tunnel WireGuard dari router ke VPS, lalu akses seluruh perangkat lewat IP tunnel tersebut sehingga port forwarding di router tidak diperlukan sama sekali. Pantau log koneksi dan kesehatan tunnel secara berkala, serta cabut segera akun atau kunci perangkat yang sudah tidak aktif dipakai."],
    ],
  },
  "access-point": {
    title: "Cara Menentukan Posisi Access Point yang Ideal",
    category: "WiFi",
    date: "29 Jul 2026",
    dateIso: "2026-07-29",
    time: "5 menit baca",
    lead: "Kurangi blank spot dan interferensi dengan penempatan access point yang terukur, bukan sekadar mengikuti jumlah bar sinyal.",
    image: IMG.hotspot,
    summary: "Posisi AP ideal berada di ketinggian 2,5 sampai 3 meter di area terbuka dekat pusat pengguna, dengan jarak antar-AP sekitar 10 sampai 20 meter di dalam ruangan. Gunakan kanal 2,4 GHz hanya pada 1, 6, dan 11, utamakan 5 GHz untuk kapasitas, dan targetkan RSSI area kerja antara -45 sampai -67 dBm berdasarkan site survey.",
    points: ["Tinggi 2,5-3 m dekat pusat pengguna", "Kanal 2,4 GHz hanya 1, 6, 11", "Target RSSI -45 s/d -67 dBm"],
    sections: [
      ["audit", "1. Petakan area pengguna dulu", "Tandai ruangan paling padat, jenis dinding (beton, batako, atau gypsum), sumber interferensi seperti microwave dan bluetooth, serta titik kabel yang tersedia. Dari peta ini jumlah AP bisa diperkirakan: satu AP indoor umumnya melayani area 100 sampai 300 m2 tergantung material bangunan dan kepadatan user."],
      ["bandwidth", "2. Tempatkan AP tinggi dan terbuka", "Pasang AP di plafon atau dinding pada ketinggian 2,5 sampai 3 meter, bebas dari halangan lemari logam dan beton tebal. Hindari sudut ruangan bila pengguna tersebar karena separuh pancaran sinyal terbuang ke luar. Untuk roaming mulus antar-AP, jaga jarak antar titik sekitar 10 sampai 20 meter di dalam ruangan."],
      ["security", "3. Atur kanal dan transmit power", "Di 2,4 GHz hanya gunakan kanal 1, 6, dan 11 agar tidak saling tumpang tindih, dan arahkan perangkat penting ke 5 GHz yang kanalnya lebih banyak. Turunkan transmit power secukupnya: power maksimal justru membuat HP klien terdengar lemah oleh AP dan roaming jadi lengket di satu titik."],
      ["monitoring", "4. Validasi dengan site survey", "Ukur dengan WiFi analyzer di titik-titik penting: target RSSI area kerja antara -45 sampai -67 dBm, noise floor serendah mungkin, dan utilisasi kanal di bawah 50 persen. Lakukan walk test untuk memastikan perpindahan AP mulus tanpa putus. Keputusan final selalu berdasarkan data pengukuran, bukan perkiraan."],
    ],
  },
};

export const guidance: Record<string, GuidanceData> = {
  MikroTik: {
    metrics: [
      ["CPU saat sibuk", "Belum dicatat", "< 70%", "System → Resources"],
      ["Packet loss", "Belum dicatat", "< 1%", "Ping berkala"],
      ["Latency gateway", "Fluktuatif", "Stabil", "Ping / Netwatch"],
      ["Backup konfigurasi", "Tidak ada", "Tersimpan", "Files / Export"],
    ],
    mistakes: [
      "Mengubah banyak rule sekaligus sehingga sumber masalah sulit ditemukan.",
      "Membuka layanan manajemen router langsung ke internet tanpa pembatasan.",
      "Tidak menyimpan baseline dan backup sebelum optimasi.",
    ],
    faqs: [
      ["Apakah optimasi harus reset konfigurasi?", "Tidak. Audit dan rapikan konfigurasi secara bertahap. Reset hanya dipilih jika struktur lama benar-benar tidak terdokumentasi."],
      ["Simple Queue atau Queue Tree?", "Simple Queue cocok untuk kebutuhan sederhana. Queue Tree lebih fleksibel untuk klasifikasi trafik yang kompleks."],
      ["Kapan router perlu diganti?", "Pertimbangkan upgrade jika CPU konsisten tinggi, port tidak mencukupi, atau throughput perangkat tidak lagi sesuai kebutuhan."],
    ],
  },
  "OLT & Fiber": {
    metrics: [
      ["Power RX ONU", "Belum diukur", "Dalam batas vendor", "Optical power meter"],
      ["Redaman total", "Belum dihitung", "Sesuai power budget", "Hitung end-to-end"],
      ["Kebersihan konektor", "Belum dicek", "Bersih", "Visual inspection"],
      ["Dokumentasi core", "Tidak lengkap", "Terpetakan", "Label & spreadsheet"],
    ],
    mistakes: [
      "Menyambung konektor tanpa membersihkan ferrule terlebih dahulu.",
      "Memilih rasio splitter tanpa menghitung power budget.",
      "Tidak memberi label core, ODP, dan port pelanggan.",
    ],
    faqs: [
      ["Berapa redaman yang masih aman?", "Batas bergantung pada class optic dan vendor perangkat. Selalu ikuti spesifikasi OLT serta ONU yang digunakan."],
      ["Apakah semua ONU kompatibel?", "Tidak selalu. Pastikan chipset, mode autentikasi, dan profil layanan didukung oleh OLT."],
      ["Kapan perlu memakai splitter bertingkat?", "Gunakan setelah perhitungan redaman dan kebutuhan distribusi menunjukkan desain bertingkat lebih efisien."],
    ],
  },
  WiFi: {
    metrics: [
      ["RSSI area utama", "Belum diukur", "-45 s/d -67 dBm", "WiFi analyzer"],
      ["Noise floor", "Belum diukur", "Serendah mungkin", "Site survey"],
      ["Channel utilization", "Tidak diketahui", "< 50%", "Controller / analyzer"],
      ["Roaming test", "Belum diuji", "Mulus", "Walk test"],
    ],
    mistakes: [
      "Menempatkan access point di balik beton, lemari, atau benda logam.",
      "Mengatur transmit power maksimum pada semua access point.",
      "Menggunakan kanal yang saling tumpang tindih tanpa site survey.",
    ],
    faqs: [
      ["Berapa access point yang dibutuhkan?", "Jumlah ditentukan oleh luas, material bangunan, kepadatan pengguna, dan kebutuhan kapasitas—bukan luas saja."],
      ["Lebih baik 2.4 GHz atau 5 GHz?", "2.4 GHz menjangkau lebih jauh, sedangkan 5 GHz memberi kapasitas dan kanal lebih banyak. Gunakan keduanya secara terencana."],
      ["Kenapa sinyal penuh tetapi internet lambat?", "Kualitas WiFi juga dipengaruhi interferensi, utilisasi kanal, kapasitas uplink, dan jumlah pengguna aktif."],
    ],
  },
  Keamanan: {
    metrics: [
      ["Service terbuka", "Belum diaudit", "Minimum", "IP → Services"],
      ["Login gagal", "Tidak dipantau", "Terdeteksi", "Log / alert"],
      ["Rule tanpa comment", "Banyak", "0 rule penting", "Firewall audit"],
      ["Backup aman", "Tidak ada", "Terenkripsi", "Export berkala"],
    ],
    mistakes: [
      "Mengandalkan perubahan port sebagai satu-satunya perlindungan.",
      "Menaruh rule drop di posisi yang salah hingga memblokir trafik sah.",
      "Mengaktifkan logging berlebihan sampai storage dan CPU terbebani.",
    ],
    faqs: [
      ["Apakah mengganti port Winbox sudah aman?", "Belum. Batasi source address, gunakan VPN, password kuat, dan update RouterOS."],
      ["Berapa sering firewall diaudit?", "Lakukan minimal setiap ada perubahan topologi, layanan baru, atau temuan keamanan."],
      ["Apakah semua trafik perlu dicatat?", "Tidak. Log hanya kejadian penting agar data tetap berguna dan resource router terjaga."],
    ],
  },
  VPN: {
    metrics: [
      ["Latency tunnel", "Belum diukur", "Stabil", "Ping via tunnel"],
      ["Enkripsi", "Belum diaudit", "Modern", "Cek protocol"],
      ["Akun aktif", "Tidak terdata", "Terverifikasi", "User audit"],
      ["Akses layanan", "Terlalu luas", "Minimum", "Firewall policy"],
    ],
    mistakes: [
      "Mengekspos port internal saat VPN sebenarnya sudah tersedia.",
      "Membagikan satu akun VPN untuk banyak pengguna.",
      "Tidak mencabut kredensial perangkat atau staf yang sudah tidak aktif.",
    ],
    faqs: [
      ["VPN mana yang cocok untuk MikroTik?", "WireGuard cocok untuk performa modern. IPsec digunakan untuk kebutuhan site-to-site dan kompatibilitas tertentu."],
      ["Apakah VPN membutuhkan IP publik?", "Salah satu endpoint biasanya perlu bisa dijangkau, tetapi solusi relay atau server perantara dapat digunakan pada koneksi CGNAT."],
      ["Apakah port forwarding selalu berbahaya?", "Tidak selalu, tetapi risikonya lebih tinggi. Batasi alamat sumber, patch layanan, dan gunakan autentikasi kuat."],
    ],
  },
};

export const articleSlugs = Object.keys(articles);