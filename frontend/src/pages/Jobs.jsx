export default function Jobs() {
  const jobs = [
    {
      title: "Convenience Store Staff",
      company: "Naju Mart",
      location: "Naju, Korea",
      type: "Part-time",
      description:
        "Assist with store operations, customer service, and stocking shelves.",
    },
    {
      title: "Restaurant Kitchen Helper",
      company: "Himalayan Kitchen",
      location: "Seoul, Korea",
      type: "Part-time",
      description:
        "Support kitchen staff in food preparation and cleaning.",
    },
    {
      title: "Tutor (Nepali/English)",
      company: "Self-employed",
      location: "Online",
      type: "Freelance",
      description:
        "Teach Nepali or English language to students online.",
    },
    {
      title: "Delivery Driver",
      company: "Quick Delivery",
      location: "Busan, Korea",
      type: "Part-time",
      description:
        "Deliver packages and goods safely and on time.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div
        className="h-[260px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-6xl font-bold">Jobs</h1>

          <p className="mt-4 text-lg max-w-2xl">
            Find job opportunities and build your career in Korea.
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 py-8">
        {/* FILTER SIDEBAR */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Search & Filter</h2>

          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full border rounded-xl px-4 py-3 mb-5"
          />

          <div className="space-y-3">
            <label className="block font-medium">Job Type</label>

            <div className="space-y-2 text-gray-600">
              <div>
                <input type="checkbox" /> Full-time
              </div>

              <div>
                <input type="checkbox" /> Part-time
              </div>

              <div>
                <input type="checkbox" /> Freelance
              </div>

              <div>
                <input type="checkbox" /> Internship
              </div>
            </div>
          </div>

          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
            Search Jobs
          </button>
        </div>

        {/* JOB LIST */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
            <h2 className="text-2xl font-bold">All Jobs</h2>

            <span className="text-gray-500">
              Showing {jobs.length} jobs
            </span>
          </div>

          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between gap-6"
            >
              <div>
                <h3 className="text-2xl font-bold">{job.title}</h3>

                <p className="text-blue-600 font-medium mt-1">
                  {job.company}
                </p>

                <p className="text-gray-500 mt-2">
                  📍 {job.location}
                </p>

                <p className="text-gray-600 mt-4">
                  {job.description}
                </p>
              </div>

              <div className="flex flex-col justify-between items-end">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
                  {job.type}
                </span>

                <button className="mt-6 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition px-5 py-2 rounded-xl">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* POST JOB */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Post a Job</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Company / Organization"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full border rounded-xl px-4 py-3"
            />

            <select className="w-full border rounded-xl px-4 py-3">
              <option>Select job type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Freelance</option>
            </select>

            <textarea
              rows="5"
              placeholder="Job description"
              className="w-full border rounded-xl px-4 py-3"
            ></textarea>

            <input
              type="text"
              placeholder="Contact Email / Phone"
              className="w-full border rounded-xl px-4 py-3"
            />

            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold">
              Post Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}