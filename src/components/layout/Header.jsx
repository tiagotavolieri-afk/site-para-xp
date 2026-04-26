import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Home, LayoutGrid, Briefcase, ChevronDown, BookOpen, Layers } from 'lucide-react';
import { useNavigationContext } from '../../context/NavigationContext';
import { SCREENS } from '../../hooks/useNavigation';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { CRLogo } from '../ui/CRLogo';

const dropdownItemStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '9px 12px',
  background: 'transparent',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  color: '#888',
  fontSize: 13,
  fontWeight: 500,
  fontFamily: 'Inter, sans-serif',
  textAlign: 'left',
  transition: 'all 0.12s',
};

export function Header() {
  const nav = useNavigationContext();
  const { favorites } = useFavoritesContext();
  const [homeOpen, setHomeOpen] = useState(false);
  const homeRef = useRef(null);

  const canGoBack = nav.screen !== SCREENS.SECTORS && nav.screen !== SCREENS.FAVORITES && nav.screen !== SCREENS.LANDING;

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!homeOpen) return;
    const handleClick = (e) => {
      if (homeRef.current && !homeRef.current.contains(e.target)) setHomeOpen(false);
    };
    const handleKey = (e) => { if (e.key === 'Escape') setHomeOpen(false); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [homeOpen]);

  const goToLandingSection = (id) => {
    setHomeOpen(false);
    nav.goToLanding();
    // Wait for landing to mount, then scroll to section
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const navTabs = [
    { id: SCREENS.SECTORS, label: 'Setores', icon: <LayoutGrid size={14} /> },
    { id: SCREENS.FAVORITES, label: 'Minha Carteira', icon: <Briefcase size={14} />, badge: favorites.length > 0 ? favorites.length : null },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(2,2,2,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '0 24px',
        height: 58,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Inter, sans-serif',
        gap: 16,
      }}
    >
      {/* Left: logo + back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0, flex: 1 }}>
        {/* Back button */}
        {canGoBack && (
          <button
            onClick={nav.goBack}
            title="Voltar"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              cursor: 'pointer',
              color: '#8899b4',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 13,
              fontWeight: 500,
              padding: '5px 10px',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8899b4'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <ChevronLeft size={14} />
            Voltar
          </button>
        )}

        {/* Logo / Home */}
        <button
          onClick={nav.goToLanding}
          title="Ir para a página inicial"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            flexShrink: 0,
          }}
        >
          <CRLogo size={28} />
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#eef2f7', letterSpacing: '-0.03em' }}>
                Climate
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#FBC102', letterSpacing: '-0.03em' }}>
                Risk
              </span>
            </div>
            <div style={{ fontSize: 9, fontWeight: 500, color: '#3d5070', letterSpacing: '0.05em', marginTop: 1 }}>
              MONITORAMENTO CLIMÁTICO
            </div>
          </div>
        </button>
      </div>

      {/* Center: nav tabs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center', flexShrink: 0 }}>
        {/* Home dropdown */}
        <div ref={homeRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setHomeOpen(o => !o)}
            title="Página inicial"
            aria-haspopup="menu"
            aria-expanded={homeOpen}
            style={{
              background: homeOpen ? 'rgba(255,255,255,0.06)' : 'none',
              border: '1px solid ' + (homeOpen ? 'rgba(255,255,255,0.1)' : 'transparent'),
              borderRadius: 8,
              cursor: 'pointer',
              color: homeOpen ? '#cbd6e3' : '#5a7090',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '6px 9px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (!homeOpen) { e.currentTarget.style.color = '#8899b4'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; } }}
            onMouseLeave={e => { if (!homeOpen) { e.currentTarget.style.color = '#5a7090'; e.currentTarget.style.background = 'none'; } }}
          >
            <Home size={15} />
            <ChevronDown size={11} style={{ transition: 'transform 0.2s', transform: homeOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          {homeOpen && (
            <div
              role="menu"
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: '50%',
                transform: 'translateX(-50%)',
                minWidth: 200,
                background: 'rgba(18,18,21,0.98)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: 6,
                boxShadow: '0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(251,193,2,0.04)',
                backdropFilter: 'blur(20px)',
                animation: 'dropdownIn 0.18s ease-out',
                zIndex: 60,
              }}
            >
              <button
                onClick={() => { setHomeOpen(false); nav.goToLanding(); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50); }}
                style={dropdownItemStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,193,2,0.08)'; e.currentTarget.style.color = '#FBC102'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888'; }}
              >
                <Home size={14} />
                Página inicial
              </button>
              <button
                onClick={() => goToLandingSection('como-funciona')}
                style={dropdownItemStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,193,2,0.08)'; e.currentTarget.style.color = '#FBC102'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888'; }}
              >
                <BookOpen size={14} />
                Como funciona
              </button>
              <button
                onClick={() => goToLandingSection('setores')}
                style={dropdownItemStyle}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,193,2,0.08)'; e.currentTarget.style.color = '#FBC102'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888'; }}
              >
                <Layers size={14} />
                Setores
              </button>
            </div>
          )}
        </div>

        {navTabs.map(tab => {
          const active = nav.screen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => tab.id === SCREENS.SECTORS ? nav.goToSectors() : nav.goToFavorites()}
              style={{
              background: active ? 'rgba(251,193,2,0.1)' : 'none',
              border: active ? '1px solid rgba(251,193,2,0.25)' : '1px solid transparent',
              borderRadius: 8,
              cursor: 'pointer',
              color: active ? '#FBC102' : '#5a7090',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                padding: '6px 14px',
                transition: 'all 0.15s',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#8899b4'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#5a7090'; e.currentTarget.style.background = 'none'; }}}
            >
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <span style={{
                  background: '#FBC102',
                  color: '#111',
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 10,
                  padding: '1px 6px',
                  minWidth: 18,
                  textAlign: 'center',
                  lineHeight: 1.6,
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: live badge */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 20,
        background: 'rgba(0,200,187,0.06)',
        border: '1px solid rgba(0,200,187,0.18)',
        }}
      >
        <span
          className="animate-pulse-dot"
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#00C8BB',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: '#00C8BB',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          Dados ao vivo
        </span>
      </div>
      </div>
    </header>
  );
}
