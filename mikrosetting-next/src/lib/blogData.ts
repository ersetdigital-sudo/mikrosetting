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
    date: "18 Feb 2025",
    time: "8 menit baca",
    lead: "Checklist praktis untuk meningkatkan stabilitas, keamanan, dan performa jaringan tanpa harus mengganti perangkat.",
    image: IMG.network,
    summary: "Stabilitas jaringan paling efektif ditingkatkan lewat audit trafik, pembagian bandwidth yang adil, DNS responsif, firewall minimum, dan monitoring berkala.",
    points: ["Audit trafik & resource", "Atur queue secara adil", "Monitor setelah perubahan"],
    sections: [
      ["audit", "1. Audit trafik dan resource", "Periksa CPU, RAM, interface, dan pola trafik pada jam sibuk. Gunakan data awal ini sebagai baseline agar setiap perubahan dapat diukur."],
      ["bandwidth", "2. Pembagian bandwidth yang adil", "Gunakan Simple Queue atau PCQ sesuai skala jaringan. Hindari terlalu banyak rule yang tumpang tindih karena akan menyulitkan proses troubleshooting."],
      ["security", "3. Rapikan DNS dan firewall", "Batasi layanan router dari internet, izinkan koneksi established dan related, drop invalid, lalu dokumentasikan setiap rule penting."],
      ["monitoring", "4. Monitoring dan evaluasi", "Pantau latency, packet loss, penggunaan interface, dan resource router. Terapkan perubahan satu per satu dan selalu siapkan backup."],
    ],
  },
  "load-balance": {
    title: "Cara Setting Load Balance 2 ISP Tanpa Bikin Koneksi Putus",
    category: "MikroTik",
    date: "12 Feb 2025",
    time: "7 menit baca",
    lead: "Konsep pembagian trafik dua koneksi internet dengan failover yang lebih rapi dan mudah dirawat.",
    image: IMG.vpn,
    summary: "Load balance yang stabil membutuhkan penandaan koneksi konsisten, routing terpisah, pengecualian trafik lokal, dan health check yang benar.",
    points: ["Tandai koneksi PCC", "Pisahkan tabel routing", "Aktifkan health check"],
    sections: [
      ["audit", "1. Siapkan topologi dan gateway", "Pastikan setiap modem memiliki subnet berbeda. Catat gateway, DNS, kapasitas, serta interface WAN dan LAN sebelum membuat rule."],
      ["bandwidth", "2. Terapkan PCC secara konsisten", "Gunakan per-connection-classifier untuk membagi koneksi baru. Connection mark harus dipertahankan agar paket balasan kembali melalui ISP yang sama."],
      ["security", "3. Buat routing dan pengecualian", "Tambahkan route sesuai routing mark. Kecualikan trafik lokal, VPN, dan layanan perbankan bila membutuhkan alamat sumber yang konsisten."],
      ["monitoring", "4. Uji failover", "Simulasikan salah satu ISP putus. Periksa koneksi baru, DNS, serta aplikasi real-time dan sesuaikan check-gateway bila perpindahan terlalu lambat."],
    ],
  },
  olt: {
    title: "Mengenal OLT, ODC, ODP, dan ONU untuk Pemula",
    category: "OLT & Fiber",
    date: "8 Feb 2025",
    time: "6 menit baca",
    lead: "Memahami fungsi perangkat utama pada jaringan FTTH sebelum merancang distribusi fiber optik.",
    image: IMG.network,
    summary: "Jaringan FTTH mengalir dari OLT menuju ODC, dibagi lagi melalui ODP, lalu diterima ONU/ONT pelanggan. Perencanaan redaman menentukan kualitas akhirnya.",
    points: ["OLT sebagai pusat akses", "ODC/ODP membagi jalur", "Hitung power budget"],
    sections: [
      ["audit", "1. OLT sebagai pusat jaringan", "OLT berada di sisi provider dan mengelola profil layanan, VLAN, bandwidth, serta registrasi perangkat pelanggan."],
      ["bandwidth", "2. Fungsi ODC dan splitter", "ODC menjadi titik distribusi utama. Splitter membagi satu core menjadi beberapa jalur dengan konsekuensi penurunan daya optik."],
      ["security", "3. ODP dan drop cable", "ODP ditempatkan dekat area pelanggan dan meneruskan koneksi melalui drop cable menuju ONU atau ONT."],
      ["monitoring", "4. Ukur redaman end-to-end", "Hitung power budget dari jumlah sambungan, splitter, konektor, dan panjang kabel. Verifikasi hasil lapangan menggunakan optical power meter."],
    ],
  },
  hotspot: {
    title: "Checklist Membangun Hotspot Voucher yang Siap Jual",
    category: "WiFi",
    date: "3 Feb 2025",
    time: "9 menit baca",
    lead: "Dari desain paket, user profile, captive portal, sampai laporan penjualan voucher.",
    image: IMG.hotspot,
    summary: "Hotspot voucher yang siap jual membutuhkan segmentasi pelanggan, paket sederhana, limit yang jelas, portal ringan, dan prosedur monitoring harian.",
    points: ["Pisahkan jaringan user", "Buat paket mudah dipahami", "Pantau sesi & penjualan"],
    sections: [
      ["audit", "1. Pisahkan jaringan pelanggan", "Gunakan interface atau VLAN khusus agar user hotspot tidak bercampur dengan jaringan manajemen perangkat."],
      ["bandwidth", "2. Susun paket voucher", "Buat pilihan paket berdasarkan durasi, uptime, atau kuota. Jaga jumlah pilihan tetap sederhana agar mudah dijelaskan kepada pelanggan."],
      ["security", "3. Amankan captive portal", "Gunakan halaman login ringan, ubah kredensial default, dan batasi akses ke router hanya dari jaringan admin."],
      ["monitoring", "4. Monitoring melalui Mikhmon", "Pantau user aktif, pemakaian bandwidth, voucher terjual, dan pendapatan. Lakukan backup database serta konfigurasi secara berkala."],
    ],
  },
  firewall: {
    title: "5 Firewall Rule Wajib untuk Mengamankan Router",
    category: "Keamanan",
    date: "28 Jan 2025",
    time: "5 menit baca",
    lead: "Proteksi dasar MikroTik dari brute force, port scanning, dan akses ilegal melalui internet.",
    image: IMG.network,
    summary: "Firewall dasar sebaiknya menerima established/related, membuang invalid, membatasi akses manajemen, memblokir trafik WAN tak diminta, dan mencatat anomali seperlunya.",
    points: ["Accept koneksi valid", "Batasi port manajemen", "Drop akses dari WAN"],
    sections: [
      ["audit", "1. Backup dan identifikasi layanan", "Catat layanan yang benar-benar dibutuhkan. Nonaktifkan service yang tidak digunakan dan ubah port bukan sebagai satu-satunya proteksi."],
      ["bandwidth", "2. Accept established dan related", "Letakkan rule ini di awal agar koneksi sah diproses efisien, kemudian drop paket berstatus invalid."],
      ["security", "3. Lindungi input chain", "Izinkan Winbox, SSH, API, dan ICMP hanya dari alamat atau subnet tepercaya. Drop input lain yang berasal dari interface WAN."],
      ["monitoring", "4. Logging secukupnya", "Gunakan logging untuk kejadian penting saja agar storage dan CPU tidak dipenuhi catatan serangan berulang."],
    ],
  },
  vpn: {
    title: "VPN atau Port Forwarding: Mana yang Lebih Aman?",
    category: "VPN",
    date: "21 Jan 2025",
    time: "6 menit baca",
    lead: "Perbandingan praktis untuk akses CCTV, router, server, dan perangkat kantor dari luar jaringan.",
    image: IMG.vpn,
    summary: "VPN umumnya lebih aman karena layanan internal tidak diekspos langsung. Port forwarding lebih sederhana, tetapi membutuhkan pembatasan sumber, autentikasi kuat, dan patch rutin.",
    points: ["VPN untuk akses privat", "Forward hanya bila perlu", "Gunakan autentikasi kuat"],
    sections: [
      ["audit", "1. Pahami kebutuhan akses", "Tentukan siapa yang mengakses, perangkat tujuan, frekuensi, dan apakah pengguna membutuhkan satu layanan atau seluruh subnet."],
      ["bandwidth", "2. Kapan memilih VPN", "Pilih VPN untuk administrasi jaringan, akses beberapa perangkat, atau kebutuhan enkripsi end-to-end. WireGuard cocok untuk performa dan konfigurasi modern."],
      ["security", "3. Risiko port forwarding", "Port yang terbuka dapat dipindai dari internet. Jika wajib digunakan, batasi source IP, gunakan port layanan yang aman, dan aktifkan autentikasi kuat."],
      ["monitoring", "4. Audit akses", "Pantau login gagal, koneksi aktif, serta perubahan alamat sumber. Cabut akun dan kunci perangkat yang sudah tidak digunakan."],
    ],
  },
  "access-point": {
    title: "Cara Menentukan Posisi Access Point yang Ideal",
    category: "WiFi",
    date: "15 Jan 2025",
    time: "5 menit baca",
    lead: "Kurangi blank spot dan interferensi dengan penempatan access point yang tepat.",
    image: IMG.hotspot,
    summary: "Posisi AP ideal berada dekat area pengguna, cukup tinggi, minim penghalang, dan menggunakan kanal yang tidak saling tumpang tindih berdasarkan hasil site survey.",
    points: ["Dekat pusat pengguna", "Hindari penghalang padat", "Atur kanal & power"],
    sections: [
      ["audit", "1. Petakan area pengguna", "Tandai ruangan padat, jenis dinding, sumber interferensi, dan titik kabel sebelum menentukan jumlah access point."],
      ["bandwidth", "2. Tempatkan AP dengan terbuka", "Pasang di plafon atau posisi tinggi yang bebas lemari logam dan beton tebal. Hindari menaruh AP di sudut bila pengguna tersebar."],
      ["security", "3. Atur kanal dan transmit power", "Gunakan kanal 2.4 GHz yang tidak tumpang tindih dan manfaatkan 5 GHz untuk kapasitas. Power terlalu tinggi dapat memperburuk roaming."],
      ["monitoring", "4. Lakukan site survey", "Ukur RSSI, noise floor, channel utilization, dan throughput di titik penting. Koreksi posisi berdasarkan data, bukan hanya jumlah bar sinyal."],
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