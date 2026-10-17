import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { 
  Menu, 
  X, 
  Calendar, 
  UserCheck, 
  ShieldCheck, 
  ChevronDown,
  LogOut,
  Lock
} from 'lucide-react';
import { isAdminAuthenticated, setAdminAuthenticated } from '../../utils/auth';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminAuthenticated());

    const handleAuthChange = () => {
      setIsAdmin(isAdminAuthenticated());
    };

    window.addEventListener('home_tutor_auth_change', handleAuthChange);
    return () => {
      window.removeEventListener('home_tutor_auth_change', handleAuthChange);
    };
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setDashboardDropdownOpen(false);
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    closeMenu();
    navigate('/');
  };

  const navLinks = [
    { label: 'Find Tutors', path: '/tutors' },
    { label: 'Posters', path: '/posters' },
    { label: 'Video Hub', path: '/videos' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact & Location', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#4C1D95]/95 backdrop-blur-md border-b border-[#3B0764] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Wordmark & Concept Logo */}
          <div className="flex items-center gap-6">
            <BrandLogo size="md" variant="light" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#DDD6FE]">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-150 py-1 hover:text-white whitespace-nowrap ${
                    isActive 
                      ? 'text-white font-semibold border-b-2 border-[#A78BFA]' 
                      : 'text-[#DDD6FE]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Dashboards Preview Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
                className="flex items-center gap-1.5 py-1 text-[#DDD6FE] hover:text-white transition-colors whitespace-nowrap font-medium text-sm"
              >
                <span>Portals</span>
                {isAdmin && (
                  <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" title="Admin Active" />
                )}
                <ChevronDown className="w-3.5 h-3.5 text-[#A78BFA]" />
              </button>

              {dashboardDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setDashboardDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-60 bg-[#3B0764] rounded-2xl shadow-2xl border border-[#4C1D95] py-2 z-20">
                    <div className="px-3.5 py-1.5 text-xs font-semibold text-[#DDD6FE]/70 uppercase tracking-wider">
                      Academic Portals
                    </div>
                    
                    <Link
                      to="/dashboard/tutor"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-100 hover:bg-[#4C1D95] transition-colors"
                    >
                      <UserCheck className="w-4 h-4 text-[#A78BFA]" />
                      <div>
                        <div className="font-medium text-white">Tutor Dashboard</div>
                        <div className="text-xs text-[#DDD6FE]/80">Schedule & attendance</div>
                      </div>
                    </Link>

                    {/* ONLY VISIBLE IF ADMIN IS AUTHENTICATED */}
                    {isAdmin && (
                      <>
                        <Link
                          to="/dashboard/admin"
                          onClick={closeMenu}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-100 hover:bg-[#4C1D95] transition-colors border-t border-[#4C1D95]/80"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>Admin Dashboard</span>
                              <span className="px-1.5 py-0.2 text-[9px] bg-[#A78BFA] text-[#3B0764] rounded font-mono">Owner</span>
                            </div>
                            <div className="text-xs text-[#DDD6FE]/80">Tutors, CMS, videos & finance</div>
                          </div>
                        </Link>

                        <button
                          type="button"
                          onClick={handleAdminLogout}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition-colors text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out as Admin</span>
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Action Zone: Book Appointment CTA + Login + Register */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isAdmin && (
              <Link
                to="/dashboard/admin"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-[#F5F3FF]/15 text-[#DDD6FE] hover:text-white rounded-lg border border-[#A78BFA]/40 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Admin CMS</span>
              </Link>
            )}

            <Link
              to="/book-appointment"
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 text-[#3B0764] bg-[#A78BFA] hover:bg-white rounded-xl transition-all shadow-md shadow-[#A78BFA]/20 active:scale-95 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#3B0764]" />
              <span>Book Appointment</span>
            </Link>

            <div className="h-5 w-px bg-white/20 mx-0.5" />

            <Link
              to="/login"
              className="text-xs font-semibold px-3 py-2 text-[#DDD6FE] hover:text-white transition-colors whitespace-nowrap"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-xs font-semibold px-4 py-2 text-white bg-[#3B0764] hover:bg-[#2e0550] border border-[#DDD6FE]/30 rounded-xl transition-all shadow-xs active:scale-95 whitespace-nowrap"
            >
              Register
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/book-appointment"
              className="flex items-center gap-1 text-xs font-bold px-3 py-2 text-[#3B0764] bg-[#A78BFA] rounded-lg shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#DDD6FE] hover:text-white rounded-lg hover:bg-[#3B0764] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A78BFA]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#4C1D95] border-b border-[#3B0764] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#3B0764] text-[#A78BFA] font-bold border-l-4 border-[#A78BFA]'
                      : 'text-[#DDD6FE] hover:bg-[#3B0764]/60 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-2 pb-1 border-t border-white/10 mt-2">
              <span className="px-3 text-xs font-semibold text-[#DDD6FE]/70 uppercase tracking-wider">
                Portals
              </span>
              <div className="mt-1 space-y-1">
                <Link
                  to="/dashboard/tutor"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-100 hover:bg-[#3B0764] rounded-lg"
                >
                  <UserCheck className="w-4 h-4 text-[#A78BFA]" />
                  <span>Tutor Dashboard</span>
                </Link>
                
                {/* ADMIN ONLY SHOWN IF LOGGED IN */}
                {isAdmin && (
                  <>
                    <Link
                      to="/dashboard/admin"
                      onClick={closeMenu}
                      className="flex items-center justify-between px-3 py-2 text-sm text-slate-100 hover:bg-[#3B0764] rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
                        <span>Admin Dashboard</span>
                      </div>
                      <span className="text-[10px] bg-[#A78BFA] text-[#3B0764] px-1.5 py-0.2 rounded font-bold">Owner</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleAdminLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-rose-300 hover:bg-rose-950/40 rounded-lg"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out as Admin</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full text-center py-2.5 text-sm font-medium text-white bg-[#3B0764] hover:bg-[#2e0550] rounded-xl transition-colors border border-[#DDD6FE]/20"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="w-full text-center py-2.5 text-sm font-bold text-[#3B0764] bg-[#A78BFA] hover:bg-white rounded-xl transition-colors shadow-md shadow-[#A78BFA]/20"
              >
                Create Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
