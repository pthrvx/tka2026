(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],L='ABCDE',M=window.M,CAT=window.CAT,B=M?'../':'',app=$('#app');
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const SM=Object.fromEntries(CAT.subj.map(s=>[s.id,s])),MJ=id=>CAT.majors.find(m=>m.id==id)||{name:''};
let ST={theme:'dark',fs:1,mo:1,focus:0,...ls('tka2_set',{})},U=ls('tka2_user',''),P=null,Q=null;
const FS=['16px','18px','20px'],key=()=>'tka2:'+U,load=()=>{P=U?ls(key(),null):null},save=()=>sv(key(),P);
function ap(){const r=document.documentElement;r.dataset.theme=ST.theme;r.dataset.motion=ST.mo?'on':'off';r.dataset.focus=ST.focus?'1':'0';r.style.setProperty('--fs',FS[ST.fs]);sv('tka2_set',ST)}
const day=d=>{d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const RR=id=>(P.r||{})[id]||{h:[],read:{}},RRW=id=>{P.r=P.r||{};return P.r[id]=P.r[id]||{h:[],read:{}}};
const full=r=>r.h.filter(x=>!x.sub),last=r=>{const f=full(r);return f.length?f[f.length-1].s:0},act=()=>CAT.kelas.includes(P.pf.k)?[...CAT.wajib,...(P.pf.p||[])]:[];
const ok=(q,a)=>!!a&&a.length==q.a.length&&q.a.every(x=>a.includes(x));
const wrongOf=r=>r.last?r.last.idx.filter((qi,j)=>!ok(M.qs[qi],r.last.a[j])):[];
function streak(){const ds=P.ds||{};let n=0,d=new Date();if(!ds[day(d)])d.setDate(d.getDate()-1);while(ds[day(d)]){n++;d.setDate(d.getDate()-1)}return n}
function weekMin(){const ds=P.ds||{};let s=0,d=new Date();for(let i=0;i<7;i++){s+=ds[day(d)]||0;d.setDate(d.getDate()-1)}return Math.round(s/60)}
function chart(v,w=320,h=130){if(!v.length)return '<p class="mu sm">Belum ada kuis yang dikerjakan.</p>';const x=i=>v.length>1?12+i*(w-24)/(v.length-1):w/2,y=s=>h-12-s*(h-24)/100;
 return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Grafik skor kuis: ${v.join(', ')} persen"><line class="tg" x1="12" x2="${w-12}" y1="${y(75)}" y2="${y(75)}"/><polyline class="ln" points="${v.map((s,i)=>x(i)+','+y(s)).join(' ')}"/>${v.map((s,i)=>`<circle class="dt" cx="${x(i)}" cy="${y(s)}" r="3.5"/>`).join('')}</svg><p class="sm mu">Garis putus-putus menandai target 75%.</p>`}
const spark=s=>s.length<2?'-':`<svg viewBox="0 0 80 24" style="width:80px" aria-hidden="true"><polyline class="ln" points="${s.map((v,i)=>(2+i*76/(s.length-1))+','+(22-v*20/100)).join(' ')}"/></svg>`;
const mc=()=>{const h=$('#hd'),b=$('#bg');h.classList.remove('mo');if(b){b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Buka menu')}};
function hdr(){const a=[['#/','Dashboard'],['#/rekam','Rekam belajar'],['#/setelan','Pengaturan'],['#/tentang','Tentang']].map(([h,t])=>`<a href="${B}index.html${h}">${t}</a>`).join('');
 $('#hd').innerHTML=`<a class="brand" href="${B}index.html#/">Persiapan TKA</a><nav class="dn" aria-label="Menu utama">${a}</nav><button class="bgr" id="bg" aria-label="Buka menu" aria-expanded="false" aria-controls="mnp"><i></i><i></i><i></i></button><nav class="mnp" id="mnp" aria-label="Menu">${a}</nav>`;
 $('#bg').onclick=e=>{e.stopPropagation();const h=$('#hd'),o=!h.classList.contains('mo');h.classList.toggle('mo',o);$('#bg').setAttribute('aria-expanded',o);$('#bg').setAttribute('aria-label',o?'Tutup menu':'Buka menu')}}
function form(el,v,done){
 const op=m=>`<option value="${m.id}" ${v.j==m.id?'selected':''}>${m.name}</option>`;
 el.innerHTML=`<label>Nama panggilan<input id="fn" maxlength="20" value="${v.n||''}" autocomplete="nickname"></label>
 <label>Kelas<select id="fk">${['X','XI','XII'].map(k=>`<option value="${k}" ${(v.k||'XII')==k?'selected':''}>${k}</option>`).join('')}</select></label>
 <label>Jurusan atau program keahlian<select id="fj"><option value="">Pilih jurusan</option><optgroup label="SMA/MA">${CAT.majors.filter(m=>!m.smk).map(op).join('')}</optgroup><optgroup label="SMK">${CAT.majors.filter(m=>m.smk).map(op).join('')}</optgroup></select></label>
 <div id="kn" class="kn" hidden></div><div id="mp"><fieldset><legend>Mapel wajib, selalu aktif</legend>${CAT.wajib.map(i=>`<label class="ck lock"><input type="checkbox" checked disabled><span>${SM[i].name}</span></label>`).join('')}</fieldset>
 <fieldset><legend>Mapel pilihan, maksimal 2</legend><div id="fe"></div><p class="sm mu" id="fc"></p></fieldset></div><p class="err" id="fx" role="alert"></p><button class="btn" id="fb">${v.n?'Simpan perubahan':'Mulai belajar'}</button>`;
 const chk=()=>{const c=$$('#fe input'),n=c.filter(x=>x.checked).length;c.forEach(x=>{x.disabled=!x.checked&&n>=2;x.parentElement.classList.toggle('lock',x.disabled)});$('#fc').textContent=c.length?n+' dari 2 dipilih'+(n>=2?'. Hilangkan satu centang untuk mengganti pilihan.':''):''};
 const els=()=>{const m=CAT.majors.find(x=>x.id==$('#fj').value);if(!m){$('#fe').innerHTML='<p class="sm mu">Pilih jurusan dulu.</p>';chk();return}
  const it=i=>`<label class="ck"><input type="checkbox" value="${i}" ${(v.p||[]).includes(i)?'checked':''}><span>${SM[i].name}</span></label>`,g=(t,l)=>{const a=m.el.filter(i=>SM[i].type==t);return a.length?`<p class="sh" style="margin:10px 0 2px">${l}</p>${a.map(it).join('')}`:''};
  $('#fe').innerHTML=g('pilihan-keahlian','Mapel program keahlian')+g('pilihan-umum','Mapel pilihan umum');$$('#fe input').forEach(x=>x.onchange=chk);chk()};
 $('#fj').onchange=()=>{v.p=[];els(true)};els(false);
 const kls=()=>{const k=$('#fk').value,on=CAT.kelas.includes(k);$('#mp').hidden=!on;$('#kn').hidden=on;
  $('#kn').innerHTML=on?'':`<strong>Materi kelas ${k} belum tersedia.</strong><p>TKA diikuti siswa kelas XII, jadi seluruh modul dan soal saat ini disusun untuk kelas XII. Karena itu pilihan mapel dikosongkan. Materi kelas ${k} akan ditambahkan jika ada perubahan aturan dari Kemendik. Kamu tetap bisa menyimpan profil, atau ganti kelas ke XII untuk mulai belajar.</p>`;
  $('#fb').textContent=on?(v.n?'Simpan perubahan':'Mulai belajar'):'Simpan profil';if(!on){v.p=[];$$('#fe input').forEach(x=>{x.checked=false});chk()}};
 $('#fk').onchange=kls;kls();
 $('#fb').onclick=()=>{const n=$('#fn').value.replace(/[<>"&]/g,'').trim(),j=$('#fj').value,e=t=>{$('#fx').textContent=t};if(!n)return e('Isi nama panggilan dulu.');if(!j)return e('Pilih jurusan dulu.');done({n,k:$('#fk').value,j,p:CAT.kelas.includes($('#fk').value)?$$('#fe input:checked').map(x=>x.value):[]})}}
const fig=q=>q.im?`<figure class="fg" role="img" aria-label="${q.alt||'Gambar soal'}">${q.im}</figure>`:'';
const rvo=(q,u)=>q.o.map((o,k)=>{const c=q.a.includes(k)?'ok':u.includes(k)?'no':'',t=o+(q.a.includes(k)?' (jawaban benar)':u.includes(k)?' (jawabanmu)':'');return q.t=='m'?`<div class="op cx ${c}"><input type="checkbox" disabled ${u.includes(k)?'checked':''}><span>${t}</span></div>`:`<div class="op ${c}"><b>${L[k]}</b><span>${t}</span></div>`}).join('');
let showRev=false;
const countUp=(el,to)=>{if(!ST.mo||!to){el.textContent=to+'%';return}const t0=performance.now(),f=t=>{const p=Math.min(1,(t-t0)/900),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e)+'%';if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
function modDone(m,nxt){const r=RR(M.id),n=Object.keys(r.read).length,pc=Math.round(n/M.mods.length*100),C=2*Math.PI*44,o=document.createElement('div');
 o.className='md2';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-labelledby','mdt');
 o.innerHTML=`<div class="box"><div class="rw2"><svg class="ring" viewBox="0 0 100 100" aria-hidden="true"><circle class="rbg" cx="50" cy="50" r="44"/><circle class="rfg" id="rf" cx="50" cy="50" r="44" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg><div class="rn2"><div><span id="rv">0</span>%</div></div></div><h2 id="mdt">Semua modul ${M.name} selesai</h2><p class="mu sm">Kamu sudah menyelesaikan ${n} dari ${M.mods.length} modul (${pc}%). Saatnya menguji pemahamanmu, atau ulangi bagian yang masih ragu.</p>
 <div class="acts" id="acts"><a class="btn" href="#/kuis" id="a1">Lanjut latihan soal</a><button class="btn g" id="a2">Pelajari lagi</button></div></div>`;
 document.body.appendChild(o);const cl=()=>{o.remove();document.removeEventListener('keydown',kd)},kd=e=>{if(e.key=='Escape'&&$('#acts').classList.contains('on'))cl()};document.addEventListener('keydown',kd);
 $$('.md2 a').forEach(a=>a.addEventListener('click',cl));$('#a2').onclick=()=>{cl();location.hash='#/'};
 const show=()=>{$('#rf').style.strokeDashoffset=0;$('#rv').textContent='100';$('#acts').classList.add('on');$('#a1').focus()};
 if(!ST.mo){show();return}const t0=performance.now(),st=t=>{const p=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-p,3);$('#rf').style.strokeDashoffset=C*(1-e);$('#rv').textContent=Math.round(e*100);if(p<1)requestAnimationFrame(st);else show()};requestAnimationFrame(st)}
const V={};
V.land=()=>{const c=t=>CAT.subj.filter(s=>s.type==t).length;
 app.innerHTML=`<div class="lg"><section><p class="ey">Persiapan TKA 2026</p><h1>${CAT.subj.length} mapel, satu jalur belajar yang kamu pilih sendiri</h1><p class="lead">Isi nama, kelas, dan jurusan. Mapel wajib langsung aktif, lalu pilih maksimal 2 mapel pilihan. Tiap mapel punya modul bacaan, kuis latihan, dan pembahasan.</p>
 <ul class="ft3"><li>3 mapel wajib: ${CAT.wajib.map(i=>SM[i].name).join(', ')}</li><li>${c('pilihan-umum')} mapel pilihan umum untuk SMA/MA</li><li>${c('pilihan-keahlian')} mapel program keahlian untuk SMK</li></ul></section>
 <section class="fc"><h2>Mulai di sini</h2><div id="ob"></div></section></div>`;
 form($('#ob'),{},d=>{U=d.n;sv('tka2_user',U);load();P=P||{};P.pf={k:d.k,j:d.j,p:d.p};save();route()})};
function nx(){const a=act().map(i=>({s:SM[i],r:RR(i)}));let x=a.find(x=>!Object.keys(x.r.read).length);
 if(x)return{t:'Mulai modul',d:`${x.s.name}: ${x.s.nm} modul dan ${x.s.nq} soal latihan menunggumu.`,h:`${B}mapel/${x.s.id}.html`};
 x=a.find(x=>!full(x.r).length);if(x)return{t:'Kerjakan kuis',d:`${x.s.name}: ${x.s.nq} soal latihan untuk menguji pemahamanmu.`,h:`${B}mapel/${x.s.id}.html#/kuis`};
 x=a.filter(x=>last(x.r)<75).sort((p,q)=>last(p.r)-last(q.r))[0];
 if(x)return{t:'Latihan soal salah',d:`${x.s.name}: skor terakhir ${last(x.r)}%. Ulangi soal yang belum tepat.`,h:`${B}mapel/${x.s.id}.html#/salah`};
 x=a[0];return{t:'Review materi',d:`Semua mapel sudah di atas 75%. Ulangi ${x.s.name} agar tetap ingat.`,h:`${B}mapel/${x.s.id}.html`}}
function recent(){const o=[];act().forEach(i=>full(RR(i)).forEach(x=>o.push({...x,i})));return o.sort((a,b)=>a.t-b.t)}
V.dash=()=>{if(!CAT.kelas.includes(P.pf.k)){app.innerHTML=`<p class="ey">Kelas ${P.pf.k}, ${MJ(P.pf.j).name}</p><h1>Halo, ${U}.</h1><div class="kn" style="max-width:60ch"><strong>Materi kelas ${P.pf.k} belum tersedia.</strong><p>TKA diikuti siswa kelas XII, jadi seluruh modul dan soal saat ini disusun untuk kelas XII. Pilihan mapelmu dikosongkan sampai materi kelas ${P.pf.k} ada. Materi akan ditambahkan jika ada perubahan aturan dari Kemendik.</p></div><div class="row"><a class="btn" href="#/setelan">Ganti kelas di Pengaturan</a></div>`;return}
 const a=act(),n=nx(),tm=a.reduce((s,i)=>s+SM[i].nm,0),rd=a.reduce((s,i)=>s+Object.keys(RR(i).read).length,0),sc=a.filter(i=>full(RR(i)).length).map(i=>last(RR(i))),av=sc.length?Math.round(sc.reduce((x,y)=>x+y,0)/sc.length)+'%':'-';
 const row=i=>{const s=SM[i],r=RR(i),f=full(r),d=Object.keys(r.read).length;return `<div class="rw"><div><h3>${s.name}</h3><p class="sm mu" style="margin:0">${d} dari ${s.nm} modul dibaca (${Math.round(d/s.nm*100)}%). ${f.length?'Skor terakhir '+last(r)+'% setelah '+f.length+' percobaan.':'Kuis belum dikerjakan.'}</p><div class="pb an"><i style="width:${d/s.nm*100}%"></i></div></div><div class="ac"><a class="btn g" href="${B}mapel/${i}.html">Modul</a><a class="btn g" href="${B}mapel/${i}.html#/kuis">Kuis</a></div></div>`};
 app.innerHTML=`<div class="dg"><div><p class="ey">Kelas ${P.pf.k}, ${MJ(P.pf.j).name}</p><h1>Halo, ${U}.</h1>
 <section class="na"><p class="sm">Langkah berikutnya</p><h2>${n.t}</h2><p>${n.d}</p><a class="btn" href="${n.h}">Buka sekarang</a></section>
 <h2 class="sh">Mapel wajib</h2>${CAT.wajib.map(row).join('')}<h2 class="sh">Mapel pilihan</h2>${(P.pf.p||[]).length?P.pf.p.map(row).join(''):'<p class="mu">Belum ada mapel pilihan. Atur di Pengaturan.</p>'}</div>
 <aside><h2 class="sh">Ringkasan belajar</h2><dl class="st"><div><dt>Modul dibaca</dt><dd>${rd}/${tm}</dd></div><div><dt>Rata-rata skor terakhir</dt><dd>${av}</dd></div><div><dt>Hari beruntun</dt><dd>${streak()}</dd></div><div><dt>Belajar 7 hari terakhir</dt><dd>${weekMin()} mnt</dd></div></dl>
 <h2 class="sh">Perkembangan skor</h2>${chart(recent().slice(-12).map(x=>x.s))}<a class="lk" href="#/rekam">Lihat rekam lengkap</a></aside></div>`};
V.rekam=()=>{const a=act(),rc=recent();
 const rows=a.map(i=>{const s=full(RR(i)).map(x=>x.s),d=s.length>1?s[s.length-1]-s[0]:null;return `<tr><td>${SM[i].name}</td><td>${s.length}</td><td>${spark(s)}</td><td>${s.length?s[0]+'% ke '+s[s.length-1]+'%':'Belum ada'}</td><td>${d==null?'-':(d>0?'+':'')+d+' poin'}</td></tr>`}).join('');
 app.innerHTML=`<h1>Rekam belajar</h1><p class="lead">Skor tiap percobaan kuis penuh. Latihan soal salah tidak dihitung agar grafik tetap adil.</p><div class="dg"><div><h2 class="sh">Perkembangan per mapel</h2><div class="tw"><table><tr><th>Mapel</th><th>Percobaan</th><th>Tren</th><th>Pertama ke terakhir</th><th>Perubahan</th></tr>${rows}</table></div>
 <h2 class="sh">Riwayat terbaru</h2>${rc.slice(-10).reverse().map(x=>`<div class="rw"><div><h3>${SM[x.i].name}</h3><p class="sm mu" style="margin:0">${new Date(x.t).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}, ${x.c} dari ${x.n} benar</p></div><strong>${x.s}%</strong></div>`).join('')||'<p class="mu">Belum ada riwayat.</p>'}</div>
 <aside><h2 class="sh">Seluruh percobaan</h2>${chart(rc.slice(-20).map(x=>x.s))}</aside></div>`};
V.set=()=>{const sg=(k,o)=>`<div class="sg" role="group">${o.map(([v,x])=>`<button data-k="${k}" data-v="${v}" aria-pressed="${ST[k]==v}" class="${ST[k]==v?'on':''}">${x}</button>`).join('')}</div>`;
 app.innerHTML=`<h1>Pengaturan</h1><section class="sc"><h2>Profil dan mapel</h2><div style="max-width:460px" id="pf"></div></section><section class="sc"><h2>Tampilan dan membaca</h2>
 <div class="set"><span>Tema</span>${sg('theme',[['dark','Gelap'],['light','Terang']])}</div><div class="set"><span>Ukuran teks bacaan</span>${sg('fs',[[0,'Kecil'],[1,'Sedang'],[2,'Besar']])}</div>
 <div class="set"><span>Mode fokus saat membaca modul</span>${sg('focus',[[1,'Aktif'],[0,'Nonaktif']])}</div><div class="set"><span>Animasi</span>${sg('mo',[[1,'Hidup'],[0,'Mati']])}</div></section>
 <section class="sc"><h2>Data di perangkat ini</h2><p class="sm mu">Progres hanya tersimpan di browser ini. Cadangkan ke file agar bisa dipulihkan di perangkat lain.</p><div class="row"><button class="btn g" id="bk">Cadangkan</button><button class="btn g" id="rb">Pulihkan</button><input type="file" id="rs" accept=".json,application/json" hidden><button class="btn g" id="lo">Keluar</button><button class="btn g dg" id="rx">Hapus semua data</button></div></section>`;
 form($('#pf'),{n:U,k:P.pf.k,j:P.pf.j,p:P.pf.p},d=>{if(d.n!=U){U=d.n;sv('tka2_user',U);load();P=P||{}}P.pf={k:d.k,j:d.j,p:d.p};save();alert('Perubahan tersimpan.');V.set()});
 $$('.sg button').forEach(b=>b.onclick=()=>{ST[b.dataset.k]=b.dataset.k=='theme'?b.dataset.v:+b.dataset.v;ap();V.set()});
 $('#bk').onclick=()=>{const u=URL.createObjectURL(new Blob([JSON.stringify({u:U,p:P},null,1)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download='progres-tka-'+U+'.json';a.click();URL.revokeObjectURL(u)};
 $('#rb').onclick=()=>$('#rs').click();
 $('#rs').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d||typeof d.p!='object'||!d.p||!d.p.pf)throw 0;if(!confirm('Timpa progres profil '+U+' dengan isi file ini?'))return;P=d.p;save();route()}catch(x){alert('File cadangan tidak valid.')}};r.readAsText(f)};
 $('#lo').onclick=()=>{if(!confirm('Keluar dari profil '+U+'? Progres tetap tersimpan di perangkat ini.'))return;U='';sv('tka2_user','');P=null;route()};
 $('#rx').onclick=()=>{if(!confirm('Hapus SEMUA data situs ini di perangkat ini, termasuk semua profil dan pengaturan?'))return;try{Object.keys(localStorage).filter(k=>k.startsWith('tka2')).forEach(k=>localStorage.removeItem(k))}catch(e){}U='';P=null;ST={theme:'dark',fs:1,mo:1,focus:0};ap();route()}};
V.about=()=>{app.innerHTML=`<h1>Tentang situs ini</h1><div class="lead"><p>Platform belajar mandiri untuk persiapan TKA: modul bacaan, kuis latihan, pembahasan, dan rekam belajar.</p><p>Modul bersumber dari kisi-kisi resmi Pusmendik (bila tersedia) dan materi latihan buatan. Soal kuis adalah soal latihan buatan, bukan soal resmi TKA.</p><p>Privasi: nama, kelas, jurusan, dan progresmu hanya tersimpan di browser perangkat ini. Tidak ada yang dikirim ke server.</p></div>`};
const gate=()=>{if(!U||!P){location.replace(B+'index.html');return 1}if(!act().includes(M.id)){app.innerHTML=`<h1>${M.name}</h1><p class="lead">${CAT.kelas.includes(P.pf.k)?'Mapel ini tidak ada di pilihanmu. Kamu bisa mengubah mapel pilihan di Pengaturan.':'Materi kelas '+P.pf.k+' belum tersedia. TKA diikuti siswa kelas XII. Ubah kelas di Pengaturan untuk mulai belajar.'}</p><a class="btn" href="${B}index.html#/setelan">Buka Pengaturan</a>`;return 1}};
V.sub=()=>{const r=RR(M.id),f=full(r),w=wrongOf(r),dn=Object.keys(r.read).length,pc=Math.round(dn/M.mods.length*100);
 app.innerHTML=`<p class="ey"><a href="${B}index.html#/">Dashboard</a></p><h1>${M.name}</h1><p class="lead">${M.tl}</p><div class="pst" role="group" aria-label="Progres belajar"><div class="pb an"><i style="width:${pc}%"></i></div><p class="sm"><strong>${pc}%</strong> modul selesai (${dn} dari ${M.mods.length}). ${f.length?'Skor kuis terakhir '+last(r)+'%.':'Kuis belum dikerjakan.'}</p></div><div class="dg"><section><h2 class="sh">Modul bacaan</h2><ol class="ml">${M.mods.map(m=>`<li><a href="#/modul/${m.s}"><strong>${m.t}</strong><small>${r.read[m.s]?'Sudah dibaca, ':''}${m.m} menit, ${m.sr=='resmi'?'kisi-kisi resmi':'materi latihan'}</small></a></li>`).join('')}</ol></section>
 <aside class="na2"><h2>Kuis latihan</h2><p>${M.qs.length} soal, ${f.length?'skor terakhir '+last(r)+'% setelah '+f.length+' percobaan':'belum pernah dikerjakan'}.</p><div class="row"><a class="btn" href="#/kuis">${f.length?'Ulangi kuis':'Kerjakan kuis'}</a>${w.length?`<a class="btn g" href="#/salah">Latihan soal salah (${w.length})</a>`:''}${r.last?'<a class="btn g" href="#/hasil">Hasil terakhir</a>':''}</div></aside></div>`};
V.mod=s=>{const i=M.mods.findIndex(m=>m.s==s);if(i<0){location.hash='#/';return}const m=M.mods[i],pv=M.mods[i-1],nxt=M.mods[i+1];
 app.innerHTML=`<div class="rd"><div class="rt"><a class="tl" href="#/">‹ Daftar modul</a><button class="tl" id="tb" aria-expanded="false" aria-controls="tocp">Daftar isi</button></div><div class="rpb"><i id="rp"></i></div>
 <div class="mst"><div class="mr"><span id="rpos">Modul ${i+1} dari ${M.mods.length}</span><span id="mpt"></span></div><div class="pb"><i id="mp"></i></div></div>
 <div class="shov" id="shov"></div><div class="sheet" id="tocp" role="dialog" aria-modal="true" aria-label="Daftar isi"><div class="shh"><strong>Daftar isi</strong><button class="tl" id="tc">Tutup</button></div><ol>${M.mods.map((x,j)=>`<li><a href="#/modul/${x.s}" ${j==i?'aria-current="true"':''}><span class="tn">${j+1}</span><span>${x.t}</span>${RR(M.id).read[x.s]?'<small>Dibaca</small>':''}</a></li>`).join('')}</ol></div>
 <article><h1>${m.t}</h1><p class="meta">${M.name}, estimasi ${m.m} menit</p>${m.h}</article><nav class="rn">${pv?`<a class="btn g" href="#/modul/${pv.s}">Sebelumnya</a>`:'<span></span>'}<button class="btn" id="dn">${nxt?'Selesai, lanjut':'Selesai'}</button></nav></div>`;
 const mps=()=>{const n=Object.keys(RR(M.id).read).length,p=Math.round(n/M.mods.length*100);$('#mp').style.width=p+'%';$('#mpt').textContent='Mapel '+p+'% selesai'};
 const mark=()=>{const r=RRW(M.id);if(!r.read[m.s]){r.read[m.s]=1;save();mps()}};mps();
 const up=()=>{const h=document.documentElement,p=Math.min(100,Math.round(scrollY/Math.max(1,h.scrollHeight-innerHeight)*100));$('#rp').style.width=p+'%';$('#rpos').textContent=`Modul ${i+1} dari ${M.mods.length}, ${p}% dibaca`;if(p>=90)mark()};
 onscroll=up;up();
 const tb=$('#tb'),tp=$('#tocp'),ov=$('#shov'),tt=o=>{tp.classList.toggle('on',o);ov.classList.toggle('on',o);tb.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
 tb.onclick=()=>tt(true);$('#tc').onclick=()=>tt(false);ov.onclick=()=>tt(false);document.onkeydown=e=>{if(e.key=='Escape')tt(false)};
 $('#dn').onclick=()=>{mark();const r=RRW(M.id);if(Object.keys(r.read).length>=M.mods.length&&!r.done){r.done=1;save();modDone(m,nxt)}else location.hash=nxt?'#/modul/'+nxt.s:'#/'}};
function startQ(idx,sub){Q={i:0,a:[],idx,sub,t0:Date.now(),an:true};V.qz()}
V.qz=()=>{const q=M.qs[Q.idx[Q.i]],n=Q.idx.length,a=Q.a[Q.i]||[],dn=Q.a.filter(x=>x&&x.length).length;
 app.innerHTML=`<div style="max-width:720px"><div class="qt"><a href="#/">Keluar dari kuis</a><span>Soal ${Q.i+1} dari ${n}</span></div><div class="pb"><i style="width:${dn/n*100}%"></i></div>
 <div class="ng">${Q.idx.map((_,j)=>`<button class="${(Q.a[j]||[]).length?'d':''} ${j==Q.i?'cur':''}" data-j="${j}" aria-label="Soal ${j+1}">${j+1}</button>`).join('')}</div>
 ${q.k?`<span class="chip">${q.k}</span>`:''}${q.ks?`<div class="ks"><span>Kasus</span><p>${q.ks}</p></div>`:''}<div class="qq ${Q.an?'in':''}">${q.q}</div>${fig(q)}<p class="sm mu">${q.t=='m'?'Pilih semua jawaban yang benar (kotak centang).':'Pilih satu jawaban (A sampai E).'}</p>
 ${q.o.map((o,k)=>q.t=='m'?`<label class="op cx ${a.includes(k)?'sel':''}"><input type="checkbox" data-k="${k}" ${a.includes(k)?'checked':''}><span>${o}</span></label>`:`<button class="op ${a.includes(k)?'sel':''}" data-k="${k}" aria-pressed="${a.includes(k)}"><b>${L[k]}</b><span>${o}</span></button>`).join('')}
 <div class="row sp"><button class="btn g" id="pv" ${Q.i?'':'disabled'}>Sebelumnya</button>${Q.i<n-1?'<button class="btn" id="nx">Berikutnya</button>':'<button class="btn" id="fn">Selesai dan lihat hasil</button>'}</div></div>`;
 $$('button.op').forEach(b=>b.onclick=()=>{Q.f=+b.dataset.k;Q.a[Q.i]=[Q.f];V.qz()});
 $$('.cx input').forEach(x=>x.onchange=()=>{const k=+x.dataset.k;Q.f=k;Q.a[Q.i]=x.checked?[...a,k]:a.filter(y=>y!=k);V.qz()});
 Q.an=false;if(Q.f!=null){const e=$('[data-k="'+Q.f+'"]');if(e)e.focus();Q.f=null}
 $$('.ng button').forEach(b=>b.onclick=()=>{Q.i=+b.dataset.j;Q.an=true;V.qz()});
 $('#pv').onclick=()=>{Q.i--;Q.an=true;V.qz()};if($('#nx'))$('#nx').onclick=()=>{Q.i++;Q.an=true;V.qz()};
 if($('#fn'))$('#fn').onclick=()=>{const un=Q.idx.filter((_,j)=>!(Q.a[j]||[]).length).length;if(un&&!confirm(un+' soal belum dijawab. Tetap selesai?'))return;
  const as=Q.idx.map((_,j)=>Q.a[j]||[]),c=Q.idx.filter((qi,j)=>ok(M.qs[qi],as[j])).length,r=RRW(M.id);
  r.h.push({t:Date.now(),s:Math.round(c/n*100),c,n,d:Math.round((Date.now()-Q.t0)/1000),sub:Q.sub});r.last={idx:Q.idx,a:as,sub:Q.sub};save();Q=null;location.hash='#/hasil'}};
V.salah=()=>{const w=wrongOf(RR(M.id));if(!w.length){location.hash='#/hasil';return}startQ(w,true)};
V.res=()=>{const r=RR(M.id),l=r.last;if(!l){location.hash='#/';return}
 const h=r.h[r.h.length-1],pv=r.h.slice(0,-1).filter(x=>x.sub==h.sub).pop(),w=wrongOf(r),dl=pv?h.s-pv.s:null;
 const rev=l.idx.map((qi,j)=>{const q=M.qs[qi],u=l.a[j],g=ok(q,u);return `<article class="rv"><p class="stt ${!u.length?'na':g?'ok':'no'}">${!u.length?'Tidak dijawab':g?'Benar':'Salah'}</p>${q.k?`<span class="chip">${q.k}</span>`:''}${q.ks?`<div class="ks"><span>Kasus</span><p>${q.ks}</p></div>`:''}<div class="qq">${q.q}</div>${fig(q)}${rvo(q,u)}<div class="ex"><b>Pembahasan</b><p>${g?'Jawabanmu tepat. ':'Jawaban yang tepat: '+q.a.map(k=>L[k]).join(', ')+'. '}${q.e}</p></div></article>`}).join('');
 app.innerHTML=`<p class="ey"><a href="#/">${M.name}</a></p><div class="dg"><div><p class="sm mu">${l.sub?'Latihan soal salah':'Hasil kuis'}</p><div class="big" id="bs">${showRev?h.s:0}%</div><p class="lead">${h.c} dari ${h.n} soal benar, waktu ${Math.floor(h.d/60)} menit ${h.d%60} detik.${dl==null?'':' '+(dl>=0?'Naik ':'Turun ')+Math.abs(dl)+' poin dari percobaan sebelumnya.'}</p></div>
 <aside class="na2"><h2>Selanjutnya, mau apa?</h2><p class="sm mu">Lihat jawaban yang benar beserta pembahasannya, atau kembali belajar dulu.</p><div class="ch"><button class="btn" id="gp">Lihat jawaban benar</button><a class="btn g" href="#/">Belajar lagi</a></div>
 <p class="sh" style="margin-top:24px">Atau latihan lagi</p><div class="row" style="margin-top:6px"><a class="btn g" href="#/kuis">Coba lagi</a>${w.length?`<a class="btn g" href="#/salah">Latihan soal salah (${w.length})</a>`:''}</div></aside></div>${showRev?`<h2 class="sh" id="pbh">Pembahasan</h2>${rev}`:''}`;
 if(!showRev)countUp($('#bs'),h.s);
 $('#gp').onclick=()=>{showRev=true;V.res();$('#pbh').scrollIntoView({behavior:ST.mo?'smooth':'auto'})}};
function route(){onscroll=null;document.onclick=null;document.onkeydown=null;document.body.style.overflow='';showRev=false;const [r,a]=location.hash.slice(2).split('/');document.body.dataset.mode=M&&r=='modul'?'read':'act';hdr();
 if(!M){if(r=='tentang')V.about();else if(!P)V.land();else V[{rekam:'rekam',setelan:'set'}[r]||'dash']()}
 else{if(gate())return;({modul:()=>V.mod(a),kuis:()=>startQ(M.qs.map((_,i)=>i),false),salah:V.salah,hasil:V.res}[r]||V.sub)()}
 scrollTo(0,0)}
const ld=document.createElement('div');ld.id='ld';ld.className='ld';ld.setAttribute('aria-live','polite');ld.innerHTML='<div class="loader"></div><p id="ldt">Memuat…</p>';document.body.appendChild(ld);
const LM={modul:'Membuka modul…',kuis:'Menyiapkan soal…',salah:'Menyiapkan soal…',hasil:'Menghitung hasil…',rekam:'Menyusun rekam belajar…',setelan:'Membuka pengaturan…'};let nt;
const goLoad=(t,fn)=>{if(!ST.mo){fn();return}$('#ldt').textContent=t;ld.classList.add('on');clearTimeout(nt);nt=setTimeout(fn,420)};
addEventListener('pageshow',()=>ld.classList.remove('on'));
addEventListener('hashchange',()=>goLoad(LM[location.hash.slice(2).split('/')[0]]||'Memuat…',()=>{route();ld.classList.remove('on')}));
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');if(!a||!ST.mo||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target=='_blank')return;const u=new URL(a.href,location.href);if(u.origin!=location.origin||u.pathname==location.pathname)return;e.preventDefault();goLoad('Memuat halaman…',()=>{location.href=a.href})});
document.addEventListener('click',e=>{if(!e.target.closest('#hd'))mc()});addEventListener('keydown',e=>{if(e.key=='Escape')mc()});
ap();load();route();
setInterval(()=>{if(P&&!document.hidden){P.ds=P.ds||{};P.ds[day()]=(P.ds[day()]||0)+15;save()}},15000);
})();
