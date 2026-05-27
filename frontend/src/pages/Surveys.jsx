function Surveys() {
  return <h1>Surveys Page RAMUNA</h1>;
}

export default Surveys;import React from "react";
import {
  FaPoll,
  FaCheckCircle,
  FaUsers,
  FaClipboardList,
  FaChartBar,
  FaClock,
} from "react-icons/fa";

function Surveys() {
  const surveys = [
    {
      title: "Student Satisfaction Survey",
      category: "Feedback",
      icon: <FaUsers />,
      color: "bg-blue-100 text-blue-600",
      description:
        "Share your experience and help improve student services.",
      deadline: "Deadline: May 30, 2024",
    },
    {
      title: "Cultural Event Feedback",
      category: "Event",
      icon: <FaClipboardList />,
      color: "bg-purple-100 text-purple-600",
      description:
        "Tell us your thoughts about the recent cultural night event.",
      deadline: "Deadline: June 5, 2024",
    },
    {
      title: "Campus Facility Survey",
      category: "Facilities",
      icon: <FaChartBar />,
      color: "bg-green-100 text-green-600",
      description:
        "Help us improve library, cafeteria and study spaces.",
      deadline: "Deadline: June 10, 2024",
    },
    {
      title: "Scholarship Program Review",
      category: "Scholarship",
      icon: <FaCheckCircle />,
      color: "bg-yellow-100 text-yellow-600",
      description:
        "Give feedback regarding scholarship opportunities and support.",
      deadline: "Deadline: June 15, 2024",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white py-20 text-center">

        <div className="flex justify-center mb-4 text-5xl">
          <FaPoll />
        </div>

        <h1 className="text-5xl font-bold mb-4">
          Student Surveys
        </h1>

        <p className="text-lg">
          Participate in surveys and help improve the student community.
        </p>

      </div>

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl text-red-600 flex justify-center mb-3">
              <FaClipboardList />
            </div>

            <h2 className="text-2xl font-bold">12+</h2>

            <p className="text-gray-600">
              Active Surveys
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl text-green-600 flex justify-center mb-3">
              <FaUsers />
            </div>

            <h2 className="text-2xl font-bold">500+</h2>

            <p className="text-gray-600">
              Student Responses
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl text-blue-600 flex justify-center mb-3">
              <FaClock />
            </div>

            <h2 className="text-2xl font-bold">24/7</h2>

            <p className="text-gray-600">
              Online Access
            </p>
          </div>

        </div>

        {/* SURVEY LIST */}
        <div className="space-y-6">

          {surveys.map((survey, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-xl transition"
            >

              <div className="flex gap-5">

                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${survey.color}`}
                >
                  {survey.icon}
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {survey.title}
                  </h2>

                  <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">
                    {survey.category}
                  </span>

                  <p className="text-gray-600 mt-3">
                    {survey.description}
                  </p>

                  <p className="text-red-600 mt-3 font-semibold">
                    {survey.deadline}
                  </p>
                </div>

              </div>

              <div className="flex items-center">
                <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition">
                  Participate
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-red-900 text-white py-8 mt-10">

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">
            Nepalese Student Association
          </h2>

          <p className="mb-4">
            Connecting Students in Korea 🇰🇷 🇳🇵
          </p>

          <p className="text-sm">
            © 2024 NSA. All rights reserved.
          </p>
        </div>

      </footer>

    </div>
  );
}

export default Surveys;