export default function NSADashboard() {
  const notices = [
    {
      title: 'Fingerprinting Registration',
      desc: 'Mandatory biometric registration for all new students.',
      date: 'April 10, 2024',
      type: 'NOTICE',
    },
  ];

  const cards = [
    {
      title: 'Convenience Store Staff',
      type: 'PART-TIME JOB',
      color: 'bg-yellow-500',
      location: 'Naju',
      extra: '₩10,000/hour',
    },
    {
      title: 'Cultural Night Program',
      type: 'EVENT',
      color: 'bg-green-600',
      location: 'April 15, 6:00 PM',
      extra: 'Main Hall',
    },
    {
      title: 'Sports Day Registration',
      type: 'ANNOUNCEMENT',
      color: 'bg-blue-600',
      location: 'April 22',
      extra: 'University Stadium',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white text-gray-800">
      {/* HERO SECTION */}
      <div
        className="relative overflow-hidden bg-cover bg-center h-[420px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-wide text-white drop-shadow-lg">
            NEPALESE
          </h1>

          <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2">
            Student Association
          </h2>

          <p className="text-lg md:text-xl text-gray-100 mt-4 max-w-2xl">
            Connecting Nepalese Students in Korea through events, jobs,
            community support, and opportunities.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-xl text-white font-semibold shadow-lg">
              Join NSA
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-xl text-white font-semibold shadow-lg">
              View Events
            </button>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="bg-red-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-red-700 flex items-center justify-center font-bold">
              NSA
            </div>
            <h3 className="text-xl font-bold">NSA Hub</h3>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#" className="hover:text-yellow-300 transition">
              Home
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              NSA Hub
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              Jobs
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              Events
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              Team
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-4 font-medium">
            <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-red-100 transition">
              All
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700">
              Notices
            </button>
            <button className="px-4 py-2 rounded-lg bg-red-100 text-red-700">
              Events
            </button>
            <button className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700">
              Jobs
            </button>
            <button className="px-4 py-2 rounded-lg bg-green-100 text-green-700">
              Announcements
            </button>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select className="border rounded-xl px-4 py-2 w-full md:w-48">
              <option>Location</option>
              <option>Seoul</option>
              <option>Gwangju</option>
              <option>Naju</option>
            </select>

            <input
              type="text"
              placeholder="Search"
              className="border rounded-xl px-4 py-2 w-full md:w-64"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD */}
      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {notices.map((notice, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-red-600 text-white px-6 py-3 font-bold tracking-wide">
                {notice.type}
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{notice.title}</h2>
                <p className="text-gray-600 mb-4">{notice.desc}</p>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">📅 {notice.date}</span>

                  <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* CARDS GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition"
              >
                <div className={`${card.color} text-white px-4 py-3 font-bold`}>
                  {card.type}
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>

                  <p className="text-gray-600 mb-2">📍 {card.location}</p>
                  <p className="text-gray-600">⭐ {card.extra}</p>

                  <button className="mt-5 w-full bg-gray-900 hover:bg-black text-white py-2 rounded-xl transition">
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* CALENDAR */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Events Calendar</h2>
              <div className="flex gap-2 text-gray-500">
                <button>◀</button>
                <button>▶</button>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center text-sm gap-2 mb-4 font-semibold text-gray-500">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-lg border flex items-center justify-center hover:bg-red-50 transition text-sm"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5">Quick Stats</h2>

            <div className="space-y-4">
              <div className="bg-red-50 rounded-xl p-4 flex justify-between items-center">
                <span className="font-medium">Total Members</span>
                <span className="text-2xl font-bold text-red-600">1,240</span>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
                <span className="font-medium">Upcoming Events</span>
                <span className="text-2xl font-bold text-blue-600">12</span>
              </div>

              <div className="bg-green-50 rounded-xl p-4 flex justify-between items-center">
                <span className="font-medium">Job Posts</span>
                <span className="text-2xl font-bold text-green-600">37</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
