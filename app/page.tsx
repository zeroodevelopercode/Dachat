'use client';

import { useMemo, useState } from 'react';
import { Bell, Check, CheckCheck, ChevronDown, CirclePlus, Download, MessageCircle, MoreHorizontal, Paperclip, Phone, Search, Send, Settings, ShieldCheck, Smile, Sparkles, Users, Video, X } from 'lucide-react';

type Chat = { id: number; name: string; initials: string; color: string; message: string; time: string; unread: number; online?: boolean; messages: { from: 'them' | 'me'; text: string; time: string }[] };

const initialChats: Chat[] = [
  { id: 1, name: 'Nadia Putri', initials: 'NP', color: 'rose', message: 'Oke, nanti aku kabarin ya!', time: '10:42', unread: 2, online: true, messages: [{ from: 'them', text: 'Hai! Lagi apa?', time: '10:38' }, { from: 'me', text: 'Lagi nyoba aplikasi DaChat nih.', time: '10:40' }, { from: 'them', text: 'Wah keren! Gimana hasilnya?', time: '10:41' }, { from: 'me', text: 'Masih tahap awal, tapi udah mulai jalan.', time: '10:41' }, { from: 'them', text: 'Oke, nanti aku kabarin ya!', time: '10:42' }] },
  { id: 2, name: 'Raka Pratama', initials: 'RP', color: 'blue', message: 'Besok jadi berangkat?', time: '09:18', unread: 0, messages: [{ from: 'them', text: 'Besok jadi berangkat?', time: '09:18' }] },
  { id: 3, name: 'Tim DaChat', initials: 'DC', color: 'violet', message: 'Zero: update tampilan sudah masuk', time: 'Kemarin', unread: 0, messages: [{ from: 'them', text: 'Zero: update tampilan sudah masuk', time: 'Kemarin' }] },
  { id: 4, name: 'Dina Amelia', initials: 'DA', color: 'amber', message: 'Makasih banyak 🙌', time: 'Kemarin', unread: 0, messages: [{ from: 'them', text: 'Makasih banyak 🙌', time: 'Kemarin' }] },
  { id: 5, name: 'Bima Saputra', initials: 'BS', color: 'green', message: 'Voice note', time: 'Senin', unread: 0, messages: [{ from: 'them', text: 'Voice note', time: 'Senin' }] },
];

export default function Home() {
  const [chats, setChats] = useState(initialChats);
  const [activeId, setActiveId] = useState(1);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<{ versionName: string; versionCode: number; downloadUrl: string; releaseNotes: string[] } | null>(null);
  const [checking, setChecking] = useState(false);
  const [mobileChat, setMobileChat] = useState(false);

  const activeChat = chats.find(c => c.id === activeId) ?? chats[0];
  const filtered = useMemo(() => chats.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) && (tab === 'all' || c.unread > 0)), [chats, query, tab]);

  async function checkUpdate() {
    setChecking(true);
    try {
      const res = await fetch('/api/version', { cache: 'no-store' });
      if (!res.ok) throw new Error('Gagal memeriksa versi');
      const info = await res.json();
      setUpdateInfo(info);
      setShowUpdate(true);
    } catch {
      setUpdateInfo(null);
      setShowUpdate(true);
    } finally { setChecking(false); }
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    setChats(old => old.map(c => c.id === activeId ? { ...c, message: text, time: now, messages: [...c.messages, { from: 'me', text, time: now }] } : c));
    setDraft('');
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileChat ? 'sidebar-hidden' : ''}`}>
        <div className="brand-row"><div className="brand-mark"><MessageCircle size={23} fill="currentColor" /></div><span>DaChat</span><button className="icon-button brand-more" aria-label="Menu"><MoreHorizontal /></button></div>
        <div className="profile-strip"><div className="avatar avatar-self">Z</div><div className="profile-copy"><strong>Zero Developer</strong><span>Siap terhubung</span></div><button className="icon-button" onClick={checkUpdate} aria-label="Periksa update"><Download size={18}/></button><button className="icon-button" aria-label="Pengaturan"><Settings size={18}/></button></div>
        <div className="sidebar-heading"><div><h1>Pesan</h1><p>Obrolan kamu, satu tempat.</p></div><button className="new-chat" aria-label="Chat baru"><CirclePlus size={20}/></button></div>
        <label className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari percakapan..." /></label>
        <div className="filter-tabs"><button className={tab === 'all' ? 'selected' : ''} onClick={() => setTab('all')}>Semua</button><button className={tab === 'unread' ? 'selected' : ''} onClick={() => setTab('unread')}>Belum dibaca</button></div>
        <div className="chat-list">{filtered.map(chat => <button key={chat.id} className={`chat-item ${activeId === chat.id ? 'active' : ''}`} onClick={() => { setActiveId(chat.id); setMobileChat(true); }}><div className={`avatar avatar-${chat.color}`}>{chat.initials}{chat.online && <i/>}</div><div className="chat-meta"><div className="chat-top"><strong>{chat.name}</strong><time>{chat.time}</time></div><div className="chat-bottom"><span>{chat.message}</span>{chat.unread > 0 && <b>{chat.unread}</b>}</div></div></button>)}</div>
        <div className="sidebar-footer"><ShieldCheck size={15}/><span>Privasi percakapan adalah prioritas</span></div>
      </aside>

      <section className={`conversation ${mobileChat ? 'conversation-visible' : ''}`}>
        <header className="conversation-header"><button className="back-button" onClick={() => setMobileChat(false)} aria-label="Kembali"><ChevronDown /></button><div className={`avatar avatar-${activeChat.color}`}>{activeChat.initials}{activeChat.online && <i/>}</div><div className="header-person"><strong>{activeChat.name}</strong><span>{activeChat.online ? 'Online sekarang' : 'Terakhir dilihat baru-baru ini'}</span></div><div className="header-actions"><button className="icon-button" aria-label="Panggilan suara"><Phone/></button><button className="icon-button" aria-label="Panggilan video"><Video/></button><button className="icon-button" aria-label="Info"><MoreHorizontal/></button></div></header>
        <div className="message-area"><div className="date-pill">Hari ini</div><div className="encryption-note"><ShieldCheck size={14}/> Pesan demo ditampilkan di perangkat ini.</div>{activeChat.messages.map((m, i) => <div key={i} className={`message-row ${m.from === 'me' ? 'mine' : ''}`}><div className="bubble"><p>{m.text}</p><span>{m.time}{m.from === 'me' && <CheckCheck size={13}/>}</span></div></div>)}</div>
        <form className="composer" onSubmit={e => { e.preventDefault(); sendMessage(); }}><button type="button" className="icon-button attach" aria-label="Lampirkan"><Paperclip/></button><button type="button" className="icon-button emoji" aria-label="Emoji"><Smile/></button><input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Tulis pesan..." /><button className="send-button" type="submit" aria-label="Kirim"><Send size={18}/></button></form>
      </section>

      <aside className="details-panel"><div className="details-top"><span>DETAIL</span><button className="icon-button" onClick={checkUpdate} aria-label="Cek versi"><MoreHorizontal/></button></div><div className="detail-card"><div className={`avatar avatar-large avatar-${activeChat.color}`}>{activeChat.initials}</div><h2>{activeChat.name}</h2><p>{activeChat.online ? 'Online sekarang' : 'Kontak DaChat'}</p><div className="detail-actions"><button><MessageCircle size={17}/><span>Pesan</span></button><button><Bell size={17}/><span>Notifikasi</span></button></div></div><div className="detail-section"><h3>Info kontak</h3><div className="info-line"><span>Nama</span><strong>{activeChat.name}</strong></div><div className="info-line"><span>Status</span><strong>{activeChat.online ? 'Online' : 'Tersedia'}</strong></div></div><div className="promo-card"><div className="promo-icon"><Sparkles size={19}/></div><strong>DaChat, lebih dekat.</strong><p>Tempat baru untuk obrolan yang berarti.</p><button onClick={checkUpdate}>Periksa pembaruan <Download size={14}/></button></div></aside>

      {showUpdate && <div className="modal-backdrop" onClick={() => setShowUpdate(false)}><section className="update-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-button" onClick={() => setShowUpdate(false)}><X/></button><div className="update-icon"><Download size={25}/></div><h2>Pembaruan DaChat</h2>{checking ? <p>Memeriksa versi terbaru...</p> : updateInfo ? <><p>Versi tersedia: <strong>{updateInfo.versionName}</strong> (build {updateInfo.versionCode})</p><ul>{updateInfo.releaseNotes.map(note => <li key={note}>{note}</li>)}</ul>{updateInfo.downloadUrl ? <a className="download-link" href={updateInfo.downloadUrl}><Download size={16}/> Unduh APK terbaru</a> : <p className="muted">Belum ada APK rilis. Tautan update akan aktif setelah build Android dipublikasikan.</p>}</> : <p>Tidak dapat memeriksa versi. Pastikan kamu terhubung ke internet.</p>}<button className="modal-done" onClick={() => setShowUpdate(false)}>Mengerti</button></section></div>}
      <div className="mobile-bottom"><button><MessageCircle/><span>Chat</span></button><button><Users/><span>Kontak</span></button><button onClick={checkUpdate}><Download/><span>Update</span></button><button><Settings/><span>Setelan</span></button></div>
    </main>
  );
}
