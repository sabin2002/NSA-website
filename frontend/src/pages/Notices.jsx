import React from "react";
import {
  FaBullhorn,
  FaGraduationCap,
  FaFileAlt,
  FaCalendarAlt,
  FaBook,
  FaInfoCircle,
  FaSearch,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

function Notices() {
  const notices = [
    {
      title: "Fingerprinting Registration",
      category: "General",
      icon: <FaBullhorn />,
      color: "bg-red-100 text-red-600",
      description:
        "Mandatory for all new students. Please complete your fingerprinting registration.",
      date: "April 10, 2024",
    },
    {
      title: "Scholarship Application Open",
      category: "Scholarship",
      icon: <FaGraduationCap />,
      color: "bg-green-100 text-green-600",
      description:
        "Apply before April 30, 2024. Don't miss this opportunity.",
      date: "April 8, 2024",
    },
    {
      title: "General Meeting Notice",
      category: "Notice",
      icon: <FaFileAlt />,
      color: "bg-blue-100 text-blue-600",
      description:
        "General meeting will be held on April 20, 2024 at 3:00 PM.",
      date: "April 5, 2024",
    },
    {
      title: "Cultural Night Program Update",
      category: "Event",
      icon: <FaCalendarAlt />,
      color: "bg-purple-100 text-purple-600",
      description:
        "The Cultural Night Program is confirmed on April 15, 2024.",
      date: "April 2, 2024",
    },
    {
      title: "Final Exam Routine Published",
      category: "Academic",
      icon: <FaBook />,
      color: "bg-yellow-100 text-yellow-600",
      description:
        "Final exam routine for Spring 2024 has been published.",
      date: "March 30, 2024",
    },
    {
      title: "Office Closed on Public Holiday",
      category: "General",
      icon: <FaInfoCircle />,
      color: "bg-gray-100 text-gray-600",
      description:
        "The NSA office will remain closed on April 14, 2024.",
      date: "March 28, 2024",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <div
        className="relative h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Announcements</h1>

          <p className="text-lg">
            Stay informed with the latest updates and notices.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="bg-white rounded-xl shadow-md p-5 h-fit">

          <h2 className="text-xl font-bold mb-5">
            Filter Announcements
          </h2>

          {/* SEARCH */}
          <div className="mb-6">
            <label className="font-semibold block mb-2">
              Search
            </label>

            <div className="flex border rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search announcements..."
                className="w-full px-3 py-2 outline-none"
              />

              <button className="px-3 bg-gray-100">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="mb-6">
            <label className="font-semibold block mb-3">
              Category
            </label>

            <div className="space-y-2">
              <div><input type="checkbox" /> General</div>
              <div><input type="checkbox" /> Academic</div>
              <div><input type="checkbox" /> Scholarship</div>
              <div><input type="checkbox" /> Event</div>
              <div><input type="checkbox" /> Notice</div>
            </div>
          </div>

          {/* DATE */}
          <div className="mb-6">
            <label className="font-semibold block mb-2">
              Date
            </label>

            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 mb-3">
            Apply Filters
          </button>

          <button className="w-full border py-3 rounded-lg hover:bg-gray-100">
            Clear Filters
          </button>
        </div>

        {/* ANNOUNCEMENTS */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-5">

          <h2 className="text-2xl font-bold mb-6">
            All Announcements
          </h2>

          <div className="space-y-5">
            {notices.map((notice, index) => (
              <div
                key={index}
                className="border rounded-xl p-5 flex flex-col md:flex-row justify-between gap-5 hover:shadow-md transition"
              >

                <div className="flex gap-4">

                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${notice.color}`}
                  >
                    {notice.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      {notice.title}
                    </h3>

                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {notice.category}
                    </span>

                    <p className="text-gray-600 mt-2">
                      {notice.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-500 mb-3">
                    {notice.date}
                  </p>

                  <button className="border border-red-500 text-red-500 px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition">
                    View Details
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center mt-8 gap-3">
            <button className="w-10 h-10 border rounded-lg">
              {"<"}
            </button>

            <button className="w-10 h-10 bg-red-600 text-white rounded-lg">
              1
            </button>

            <button className="w-10 h-10 border rounded-lg">
              {">"}
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-red-900 text-white py-8 px-8 mt-10">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-xl font-bold mb-3">
              Nepalese Student Association
            </h2>

            <p>Connecting Students in Korea 🇰🇷 🇳🇵</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              Quick Links
            </h2>

            <div className="space-y-2">
              <p>Home</p>
              <p>Jobs</p>
              <p>Events</p>
              <p>Announcements</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">
              Follow Us
            </h2>

            <div className="flex gap-4 text-2xl">
              <FaFacebook />
              <FaInstagram />
              <FaYoutube />
              <FaEnvelope />
            </div>
          </div>

        </div>

        <div className="text-center mt-8 border-t border-red-700 pt-4 text-sm">
          © 2024 Nepalese Student Association
        </div>

      </footer>

    </div>
  );
}

export default Notices;