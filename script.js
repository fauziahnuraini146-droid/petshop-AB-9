let barang = [
 {nama:"Royal Canin Adult",kategori:"Makanan Hewan",harga:85000,stok:15},
 {nama:"Whiskas Adult",kategori:"Makanan Hewan",harga:62000,stok:20},
 {nama:"Ever Clean",kategori:"Pasir Kucing",harga:45000,stok:8},
 {nama:"Vitamin Hewan",kategori:"Vitamin & Obat",harga:35000,stok:12}
];
let kategoriAktif = "Semua";
let editIndex = -1;

function rupiah(angka){return "Rp " + Number(angka).toLocaleString("id-ID")}
function updateStats(){
 document.getElementById("totalProduk").textContent=barang.length;
 document.getElementById("totalStok").textContent=barang.reduce((a,b)=>a+Number(b.stok),0);
 document.getElementById("stokMenipis").textContent=barang.filter(b=>b.stok<=8).length;
 document.getElementById("totalKategori").textContent=new Set(barang.map(b=>b.kategori)).size;
}
function renderCards(){
 const area=document.getElementById("productCards");
 const pilihan=barang.slice(0,4);
 area.innerHTML=pilihan.length?pilihan.map((b,i)=>`
 <article class="product"><div class="emoji">${iconKategori(b.kategori)}</div>
 <strong>${b.nama}</strong><p>${b.kategori}</p><strong>${rupiah(b.harga)}</strong>
 <p>Stok: ${b.stok} unit</p><button onclick="tambahStok(${i})">Tambah Stok +</button></article>`).join(""):"<p>Belum ada produk.</p>";
}
function iconKategori(k){
 if(k==="Makanan Hewan")return "🍖";if(k==="Pasir Kucing")return "🐈";
 if(k==="Vitamin & Obat")return "💊";if(k==="Kandang")return "🏠";
 if(k==="Aksesori")return "🎀";return "🐠";
}
function renderTable(){
 const kata=document.getElementById("search").value.toLowerCase();
 const data=barang.map((b,i)=>({...b,index:i})).filter(b=>
 (kategoriAktif==="Semua"||b.kategori===kategoriAktif)&&
 (b.nama.toLowerCase().includes(kata)||b.kategori.toLowerCase().includes(kata)));
 document.getElementById("tableBody").innerHTML=data.length?data.map((b,no)=>`
 <tr><td>${no+1}</td><td>${b.nama}</td><td>${b.kategori}</td><td>${rupiah(b.harga)}</td>
 <td class="${b.stok<=8?'stock-low':''}">${b.stok} unit ${b.stok<=8?'(Menipis)':''}</td>
 <td><div class="action"><button class="edit" onclick="editBarang(${b.index})">Edit</button><button class="delete" onclick="hapusBarang(${b.index})">Hapus</button></div></td></tr>`).join(""):'<tr><td colspan="6">Data barang tidak ditemukan.</td></tr>';
}
function refresh(){updateStats();renderCards();renderTable()}
function filterKategori(k){kategoriAktif=k;renderTable()}
function tambahStok(i){
 const jumlah=prompt("Masukkan jumlah stok yang ditambahkan:");
 if(jumlah!==null&&jumlah.trim()!==""&&Number(jumlah)>0){barang[i].stok+=Number(jumlah);refresh()}
 else if(jumlah!==null){alert("Masukkan jumlah stok berupa angka lebih dari 0.")}
}
document.getElementById("productForm").addEventListener("submit",function(e){
 e.preventDefault();
 const data={nama:document.getElementById("nama").value.trim(),kategori:document.getElementById("kategori").value,harga:Number(document.getElementById("harga").value),stok:Number(document.getElementById("stok").value)};
 if(editIndex===-1){barang.push(data);showNotice("Barang berhasil ditambahkan.")}
 else{barang[editIndex]=data;showNotice("Data barang berhasil diperbarui.");resetEdit()}
 this.reset();refresh();
});
function editBarang(i){
 editIndex=i;const b=barang[i];
 document.getElementById("nama").value=b.nama;document.getElementById("kategori").value=b.kategori;
 document.getElementById("harga").value=b.harga;document.getElementById("stok").value=b.stok;
 document.getElementById("formTitle").textContent="Form Edit Barang";
 document.getElementById("submitBtn").textContent="Simpan Perubahan";
 document.getElementById("form").scrollIntoView({behavior:"smooth"});
}
function resetEdit(){editIndex=-1;document.getElementById("formTitle").textContent="Form Tambah Barang";document.getElementById("submitBtn").textContent="Simpan Barang"}
function hapusBarang(i){
 if(confirm("Yakin ingin menghapus "+barang[i].nama+"?")){barang.splice(i,1);refresh();showNotice("Barang berhasil dihapus.")}
}
function showNotice(pesan){const n=document.getElementById("notice");n.textContent=pesan;n.style.display="block";setTimeout(()=>n.style.display="none",2500)}
refresh();
