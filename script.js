// GANTI DENGAN URL DARI GOOGLE APPS SCRIPT ANDA
const urlAPI = 'https://script.google.com/macros/s/AKfycbyOWggx1JcmFGuCP1SeIMKFRn2PcqRJAggg7Hhmf7q37GjHK-Vn3dZ3zyLkINrzQ_kP/exec';

let dataTamu = []; // Array akan kosong di awal
const inputNama = document.getElementById('input-nama');
const hasilPencarian = document.getElementById('hasil-pencarian');

// Fungsi mengambil data dari Google Sheets saat web dibuka
async function ambilData() {
    inputNama.placeholder = "Memuat data..."; // Indikator loading
    inputNama.disabled = true;

    try {
        const response = await fetch(urlAPI);
        dataTamu = await response.json();
        
        inputNama.placeholder = "Search by name";
        inputNama.disabled = false;
        inputNama.focus();
    } catch (error) {
        inputNama.placeholder = "Gagal memuat data. Muat ulang web.";
        console.error("Error:", error);
    }
}

// Jalankan fungsi saat web dimuat
ambilData();

// Fungsi pencarian (Logika tetap sama seperti sebelumnya)
inputNama.addEventListener('input', function() {
    const kataKunci = this.value.toLowerCase();
    hasilPencarian.innerHTML = ''; 

    if (kataKunci.length === 0) return;

    const tamuDitemukan = dataTamu.filter(tamu => 
        tamu.nama.toLowerCase().includes(kataKunci)
    );

    tamuDitemukan.forEach(tamu => {
        const div = document.createElement('div');
        div.className = 'item-tamu';
        
        div.innerHTML = `
            <span class="nama-hasil">${tamu.nama}</span> 
            <span class="pemisah">|</span> 
            <span class="meja-hasil">Meja ${tamu.meja}</span>
        `;
        
        hasilPencarian.appendChild(div);
    });
});