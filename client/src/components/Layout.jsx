import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarDays, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import NotificationCenter from './NotificationCenter.jsx';

const adminLinks = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/students', label: 'Students', icon: Users },
  { to: '/admin/classes', label: 'Classes', icon: CalendarDays },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const links = user.role === 'ADMIN' ? adminLinks : [{ to: '/student', label: 'My classes', icon: CalendarDays, end: true }];
  const leave = () => { logout(); navigate('/login'); };
  return <div className="app-shell">
    <div className={`sidebar-overlay ${open ? 'visible' : ''}`} onClick={() => setOpen(false)} />
    <aside className={open ? 'sidebar show' : 'sidebar'}>
      <div className="brand">spell<span>zee</span></div>
      <p className="side-label">WORKSPACE</p>
      <nav>{links.map(({ to, label, icon: Icon, end }) => <NavLink end={end} onClick={() => setOpen(false)} key={to} to={to}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="side-bottom"><div className="person"><span>{user.name.slice(0, 1)}</span><div><strong>{user.name}</strong><small>{user.role === 'ADMIN' ? 'Administrator' : 'Student'}</small></div></div><button className="logout" onClick={leave}><LogOut size={17}/><span>Log out</span></button></div>
    </aside>
    <main><header className="topbar"><div className="header-title"><button className="mobile-menu icon-button" aria-label="Open navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button><div><p className="breadcrumb">Workspace / {user.role === 'ADMIN' ? 'Overview' : 'My learning'}</p><h1>{user.role === 'ADMIN' ? 'Class management' : `Welcome back, ${user.name.split(' ')[0]}`}</h1></div></div><div className="header-actions"><NotificationCenter/><button className="profile-trigger"><span className="avatar">{user.name.slice(0, 1)}</span><span className="profile-copy"><strong>{user.name}</strong><small>{user.role === 'ADMIN' ? 'Administrator' : 'Student'}</small></span><ChevronDown size={15}/></button></div></header>{children}</main>
  </div>;
}
