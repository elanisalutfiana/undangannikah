// ===============================
// script.js - Undangan Pernikahan
// ===============================

// 1. Ambil nama tamu dari link, contoh: index.html?to=Budi
var parameter = new URLSearchParams(window.location.search);
var namaTamu = parameter.get("to");

if (namaTamu) {
    document.getElementById("nama-tamu").innerText = namaTamu;
}


// 2. Tombol "Buka Undangan" -> pindah ke halaman berikutnya
function bukaUndangan() {
    // sembunyikan cover
    document.getElementById("halaman-1").style.display = "none";

    // tampilkan isi undangan
    document.getElementById("halaman-2").style.display = "block";

    // kembali ke paling atas
    window.scrollTo(0, 0);
}


// 3. Hitung mundur ke hari acara
var tanggalAcara = new Date("2026-12-12T08:00:00+07:00").getTime();

function hitungMundur() {
    var sekarang = new Date().getTime();
    var selisih = tanggalAcara - sekarang;

    // kalau acara sudah lewat, tampilkan 00 semua
    if (selisih < 0) {
        selisih = 0;
    }

    var hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    var jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    var detik = Math.floor((selisih % (1000 * 60)) / 1000);

    document.getElementById("hari").innerText = hari;
    document.getElementById("jam").innerText = tambahNol(jam);
    document.getElementById("menit").innerText = tambahNol(menit);
    document.getElementById("detik").innerText = tambahNol(detik);
}

// supaya 5 jadi 05
function tambahNol(angka) {
    if (angka < 10) {
        return "0" + angka;
    }
    return angka;
}

hitungMundur();
setInterval(hitungMundur, 1000);


// 4. Salin nomor rekening / alamat
function salinTeks(idElemen) {
    var teks = document.getElementById(idElemen).innerText;

    navigator.clipboard.writeText(teks).then(function () {
        alert("Berhasil disalin: " + teks);
    });
}


// 5. Kirim ucapan -> tampil di daftar ucapan
function kirimUcapan(event) {
    // supaya halaman tidak refresh
    event.preventDefault();

    var nama = document.getElementById("nama").value;
    var pesan = document.getElementById("pesan").value;
    var jumlah = document.getElementById("jumlah").value;
    var hadir = document.querySelector('input[name="hadir"]:checked').value;

    // buat <li> baru
    var item = document.createElement("li");

    var judul = document.createElement("b");
    judul.innerText = nama + " (" + hadir + ", " + jumlah + ")";

    var isi = document.createElement("span");
    isi.innerText = pesan;

    item.appendChild(judul);
    item.appendChild(isi);

    // taruh paling atas
    var daftar = document.getElementById("daftar-ucapan");
    daftar.insertBefore(item, daftar.firstChild);

    // kosongkan form
    document.getElementById("form-ucapan").reset();

    return false;
}