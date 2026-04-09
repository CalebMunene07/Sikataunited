import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Club Colors - Premium Soccer Aesthetic
const COLORS = {
  primary: '#1a5f2a', // Deep green
  secondary: '#f4d03f', // Gold/Yellow
  accent: '#c9a227', // Rich gold
  dark: '#0a0a0a',
  card: '#111111',
};

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Navigation Component
function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/fixtures', label: 'FIXTURES' },
    { path: '/players', label: 'PLAYERS' },
    { path: '/support', label: 'SUPPORT US' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-green-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src="/sikata-logo.png" alt="Sikata United FC" className="w-10 h-10 rounded-full object-cover" />
          <div className="hidden sm:block">
            <p className="text-xs text-[#f4d03f] tracking-[0.3em]">SIKATA UNITED</p>
            <p className="text-sm font-bold -mt-1">FOOTBALL CLUB</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-xs tracking-[0.2em] transition-all hover:text-[#f4d03f] ${
                location.pathname === item.path ? 'text-[#f4d03f]' : 'text-white/70'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-green-900/50 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-3 text-sm tracking-[0.2em] transition-all hover:text-[#f4d03f] ${
                location.pathname === item.path ? 'text-[#f4d03f]' : 'text-white/70'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// Home Page
function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d1f12] to-[#0a0a0a]"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(26, 95, 42, 0.3) 0%, transparent 50%)`,
        }}></div>
        
        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
          <div className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-[#f4d03f] text-sm tracking-[0.4em] mb-6 animate-fade-in">WELCOME TO</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            SIKATA
            <span className="block text-[#f4d03f]">UNITED FC</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Bungoma's pride • Building champions on and off the pitch • Join our journey to greatness
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/support"
              className="bg-[#f4d03f] text-black px-8 py-4 text-sm font-bold tracking-wider hover:bg-[#ffe066] transition-all hover:scale-105"
            >
              SUPPORT THE TEAM
            </Link>
            <Link
              to="/players"
              className="border-2 border-green-500 text-green-400 px-8 py-4 text-sm font-bold tracking-wider hover:border-[#f4d03f] hover:text-[#f4d03f] transition-all"
            >
              MEET THE SQUAD
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#f4d03f] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#1a5f2a] to-[#2d8a3e]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '15+', label: 'Years Active' },
            { number: '50+', label: 'Matches Played' },
            { number: '200+', label: 'Players Developed' },
            { number: '1K+', label: 'Fans & Supporters' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-black text-[#f4d03f]">{stat.number}</p>
              <p className="text-white/80 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#f4d03f] text-sm tracking-[0.3em] mb-4">OUR MISSION</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Building Future <span className="text-green-500">Stars</span></h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Sikata United FC is dedicated to nurturing talent from Bungoma and Western Kenya. 
                We believe in developing not just great players, but great people who represent their community with pride.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Our self-help group model ensures that every member contributes to and benefits from the club's success. 
                Together, we're building something bigger than football.
              </p>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 text-[#f4d03f] hover:text-[#ffe066] transition-colors"
              >
                <span className="text-sm font-semibold tracking-wider">JOIN OUR JOURNEY</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-900/50 to-[#1a5f2a]/30 rounded-lg flex items-center justify-center border border-green-800/30">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 border-4 border-[#f4d03f] rounded-full flex items-center justify-center">
                    <span className="text-5xl font-black text-[#f4d03f]">SU</span>
                  </div>
                  <p className="text-white/60">Est. 2011 • Bungoma, Kenya</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#f4d03f]/10 rounded-lg border border-[#f4d03f]/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Call to Action */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a5f2a]/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-[#f4d03f] text-sm tracking-[0.3em] mb-4">SUPPORT THE CLUB</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Help Us Build Champions</h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Your contribution goes directly to player development, equipment, and community programs. 
            Every donation makes a difference.
          </p>
          <Link
            to="/support"
            className="inline-block bg-[#f4d03f] text-black font-bold tracking-wider px-10 py-5 hover:bg-[#ffe066] transition-all hover:scale-105"
          >
            DONATE NOW
          </Link>
        </div>
      </section>
    </div>
  );
}

// Gallery Page
function Gallery() {
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedVideo, setSelectedVideo] = useState<{
    id: number;
    thumbnail: string;
    title: string;
    duration: string;
    date: string;
    videoUrl: string;
  } | null>(null);
  
  const images = [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800',
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
    'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
  ];

  const videos = [
    { 
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      title: 'Match Highlights vs Kakamega Stars',
      duration: '3:45',
      date: 'April 2025',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    { 
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
      title: 'Training Session Highlights',
      duration: '5:20',
      date: 'March 2025',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    { 
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
      title: 'Goal Celebration Compilation',
      duration: '2:30',
      date: 'February 2025',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    { 
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
      title: 'Season Review 2024',
      duration: '8:15',
      date: 'January 2025',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    { 
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800',
      title: 'Youth Academy Highlights',
      duration: '4:10',
      date: 'December 2024',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    { 
      id: 6,
      thumbnail: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
      title: 'Championship Moment',
      duration: '1:55',
      date: 'November 2024',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#f4d03f] text-sm tracking-[0.3em] mb-4">MEMORIES</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4">GALLERY</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Capturing moments of glory, teamwork, and passion from our journey
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#111] rounded-full p-1">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wider transition-all ${
                activeTab === 'photos' 
                  ? 'bg-[#1a5f2a] text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              PHOTOS
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wider transition-all ${
                activeTab === 'videos' 
                  ? 'bg-[#1a5f2a] text-white' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              VIDEOS
            </button>
          </div>
        </div>

        {/* Photos Section */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-video overflow-hidden rounded-lg bg-[#111]"
              >
                <img
                  src={src}
                  alt={`Match moment ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Match Day</p>
                    <p className="text-white/60 text-sm">Sikata United FC</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Section */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative aspect-video overflow-hidden rounded-lg bg-[#111] cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 bg-[#f4d03f] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/70 px-2 py-1 rounded text-xs font-medium text-white">
                  {video.duration}
                </div>
                {/* Video Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{video.title}</p>
                    <p className="text-white/60 text-sm">{video.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl mx-4" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-[#111] rounded-lg overflow-hidden">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full aspect-video"
              >
                Your browser does not support the video tag.
              </video>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                <div className="flex items-center gap-4 text-white/60">
                  <span>{selectedVideo.date}</span>
                  <span>•</span>
                  <span>{selectedVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Fixtures Page
function Fixtures() {
  const matches = [
    { date: 'APR 05', home: 'Sikata United', away: 'Kakamega Stars', time: '3:00 PM', venue: 'Bungoma Stadium', status: 'Upcoming' },
    { date: 'APR 12', home: 'Mumias FC', away: 'Sikata United', time: '4:00 PM', venue: 'Mumias Complex', status: 'Upcoming' },
    { date: 'APR 19', home: 'Sikata United', away: 'Webuye City', time: '3:00 PM', venue: 'Bungoma Stadium', status: 'Upcoming' },
    { date: 'APR 26', home: 'Malava United', away: 'Sikata United', time: '4:30 PM', venue: 'Malava Grounds', status: 'Upcoming' },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#f4d03f] text-sm tracking-[0.3em] mb-4">SEASON 2026</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4">FIXTURES</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Upcoming matches and league schedule
          </p>
        </div>

        <div className="space-y-4">
          {matches.map((match, i) => (
            <div
              key={i}
              className="bg-[#111] border border-green-900/30 rounded-lg p-6 hover:border-green-500/50 transition-all hover:scale-[1.01]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px]">
                    <p className="text-[#f4d03f] font-bold text-lg">{match.date}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xl font-bold">{match.home}</p>
                    <p className="text-white/40 text-sm">VS</p>
                    <p className="text-xl font-bold">{match.away}</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[#f4d03f] font-semibold">{match.time}</p>
                  <p className="text-white/50 text-sm">{match.venue}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                    {match.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-green-900/20 to-[#1a5f2a]/10 rounded-lg border border-green-800/30 text-center">
          <p className="text-white/70 mb-4">Want to watch our matches?</p>
          <Link
            to="/support"
            className="inline-block bg-[#f4d03f] text-black font-semibold tracking-wider px-6 py-3 hover:bg-[#ffe066] transition-colors"
          >
            BECOME A SUPPORTER
          </Link>
        </div>
      </div>
    </div>
  );
}

// Players Page
function Players() {
  const players = [
    { name: 'David Okello', number: 1, position: 'Goalkeeper', status: 'First Team' },
    { name: 'Emmanuel Wasike', number: 2, position: 'Defender', status: 'First Team' },
    { name: 'Samson Wanjala', number: 3, position: 'Defender', status: 'First Team' },
    { name: 'Joseph Otieno', number: 4, position: 'Midfielder', status: 'Captain' },
    { name: 'Peter Simiyu', number: 5, position: 'Defender', status: 'First Team' },
    { name: 'Michael Wafula', number: 6, position: 'Midfielder', status: 'First Team' },
    { name: 'John Masinde', number: 7, position: 'Forward', status: 'First Team' },
    { name: 'Francis Mukhwana', number: 8, position: 'Midfielder', status: 'First Team' },
    { name: 'Alex Wekesa', number: 9, position: 'Forward', status: 'First Team' },
    { name: 'Dennis Barasa', number: 10, position: 'Forward', status: 'First Team' },
    { name: 'George Makokha', number: 11, position: 'Midfielder', status: 'First Team' },
    { name: 'Simon Kiptoo', number: 12, position: 'Goalkeeper', status: 'Reserve' },
    { name: 'James Omondi', number: 13, position: 'Defender', status: 'Reserve' },
    { name: 'Patrick Mwangi', number: 14, position: 'Midfielder', status: 'Reserve' },
    { name: 'Kevin Otieno', number: 15, position: 'Forward', status: 'Reserve' },
    { name: 'Brian Wabwire', number: 16, position: 'Defender', status: 'Reserve' },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#f4d03f] text-sm tracking-[0.3em] mb-4">THE SQUAD</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4">PLAYERS</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            The talented individuals representing Sikata United FC
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.map((player, i) => (
            <div
              key={i}
              className="group relative bg-[#111] border border-green-900/30 rounded-lg overflow-hidden hover:border-[#f4d03f]/50 transition-all hover:-translate-y-2"
            >
              <div className="aspect-square bg-gradient-to-br from-green-900/30 to-[#1a5f2a]/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-black text-white">{player.number}</span>
                  </div>
                  <p className="text-lg font-bold">{player.name}</p>
                </div>
              </div>
              <div className="p-4 bg-[#0a0a0a]">
                <p className="text-[#f4d03f] text-sm font-semibold">{player.position}</p>
                <p className="text-white/50 text-xs mt-1">{player.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Support/Donation Page
function Support() {
  const bankDetails = {
    bank: 'Kenya Commercial Bank',
    branch: 'Bungoma Branch',
    accountTitle: 'Sikata United FC SHG',
    accountNumber: '1349877670',
    mpesa: '8065105',
    paybill: '522533',
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#f4d03f] text-sm tracking-[0.3em] mb-4">SUPPORT US</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4">DONATE</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Your support helps us develop players, compete at higher levels, and give back to our community
          </p>
        </div>

        {/* Bank Details */}
        <div className="bg-[#111] border border-green-900/30 rounded-xl p-8 mb-12">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-[#f4d03f]/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#f4d03f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </span>
            Bank Transfer Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-white/50 text-sm">Bank</p>
                <p className="text-lg font-semibold">{bankDetails.bank}</p>
              </div>
              <div>
                <p className="text-white/50 text-sm">Branch</p>
                <p className="text-lg font-semibold">{bankDetails.branch}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-white/50 text-sm">Account Title</p>
                <p className="text-lg font-semibold text-[#f4d03f]">{bankDetails.accountTitle}</p>
              </div>
              <div>
                <p className="text-white/50 text-sm">Account Number</p>
                <p className="text-2xl font-bold tracking-wider">{bankDetails.accountNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* M-Pesa Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#111] border border-green-900/30 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-[#f4d03f]">✦</span> M-Pesa Till
            </h3>
            <p className="text-3xl font-black tracking-wider">{bankDetails.mpesa}</p>
          </div>
          <div className="bg-[#111] border border-green-900/30 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-[#f4d03f]">✦</span> Pay Bill
            </h3>
            <p className="text-3xl font-black tracking-wider">{bankDetails.paybill}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#111] border border-green-900/30 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-[#0a0a0a] border border-green-900/50 px-4 py-3 text-white focus:border-[#f4d03f] focus:outline-none transition-colors rounded-lg"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-[#0a0a0a] border border-green-900/50 px-4 py-3 text-white focus:border-[#f4d03f] focus:outline-none transition-colors rounded-lg"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Message</label>
              <textarea
                className="w-full bg-[#0a0a0a] border border-green-900/50 px-4 py-3 text-white focus:border-[#f4d03f] focus:outline-none transition-colors rounded-lg h-32 resize-none"
                placeholder="How would you like to support Sikata United FC?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#f4d03f] text-black font-bold tracking-wider py-4 hover:bg-[#ffe066] transition-all rounded-lg"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-green-900/30 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-white/60">&copy; 2024 Sikata United FC. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* =========================
APP
========================= */

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/players" element={<Players />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;