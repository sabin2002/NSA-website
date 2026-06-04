import { useEffect, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaUndo,
  FaDownload,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaBookOpen,
} from "react-icons/fa";
import API from "../api/axios";
import "./Resources.css";

function Resources() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await API.get("/resources");
      setResources(res.data);
    } catch (error) {
      alert("Failed to fetch resources");
    }
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return <FaFileAlt />;

    const lower = fileName.toLowerCase();

    if (lower.endsWith(".pdf")) return <FaFilePdf />;
    if (lower.endsWith(".doc") || lower.endsWith(".docx")) return <FaFileWord />;

    return <FaFileAlt />;
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = `${resource.title} ${resource.description} ${resource.category}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || resource.category === category;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...new Set(resources.map((r) => r.category).filter(Boolean)),
  ];

  return (
    <div className="resources-page">
      <section className="resources-hero">
        <h1>Resources</h1>
        <div className="resources-divider"></div>
        <p>
          Access useful academic documents, guides, forms, and student support
          materials shared by NSA.
        </p>
      </section>

      <main className="resources-layout">
        <aside className="resources-filter">
          <h3>Filter Resources</h3>

          <label>Search</label>
          <div className="resource-search-box">
            <input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch />
          </div>

          <h4>Category</h4>

          {categories.map((cat) => (
            <label key={cat}>
              <input
                type="radio"
                name="category"
                checked={category === cat}
                onChange={() => setCategory(cat)}
              />{" "}
              {cat}
            </label>
          ))}

          <button className="apply-btn">
            <FaFilter /> Apply Filters
          </button>

          <button
            className="clear-btn"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            <FaUndo /> Clear Filters
          </button>
        </aside>

        <section className="resources-list">
          <div className="resources-header">
            <div>
              <h2>Available Resources</h2>
              <p>
                Showing {filteredResources.length} of {resources.length}{" "}
                resources
              </p>
            </div>

            <FaBookOpen className="resources-header-icon" />
          </div>

          {filteredResources.length === 0 ? (
            <div className="empty-resource-box">
              <h3>No resources found</h3>
              <p>Try changing your search or category filter.</p>
            </div>
          ) : (
            <div className="resources-grid">
              {filteredResources.map((resource) => (
                <div className="resource-card" key={resource.resource_id}>
                  <div className="resource-icon">
                    {getFileIcon(resource.file_name)}
                  </div>

                  <div className="resource-content">
                    <span className="resource-category">
                      {resource.category || "General"}
                    </span>

                    <h3>{resource.title}</h3>

                    <p>{resource.description || "No description available."}</p>

                    <div className="resource-meta">
                      <span>{resource.file_name || "Uploaded file"}</span>
                      <span>
                        {resource.created_at
                          ? new Date(resource.created_at).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    <a
                      className="download-btn"
                      href={`http://localhost:5000${resource.file_path}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaDownload /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Resources;