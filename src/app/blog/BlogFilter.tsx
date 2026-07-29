"use client";

import { useState, useEffect, useCallback } from "react";

const categories = [
  { value: "all", label: "Semua Artikel" },
  { value: "mikrotik", label: "MikroTik" },
  { value: "olt", label: "OLT & Fiber" },
  { value: "wifi", label: "WiFi" },
  { value: "keamanan", label: "Keamanan" },
];

export default function BlogFilter() {
  const [active, setActive] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const updateArticles = useCallback(() => {
    const articles = document.querySelectorAll<HTMLElement>("#articleGrid .search-item");
    const empty = document.getElementById("emptyState");
    const count = document.getElementById("resultCount");
    const searchInput = document.getElementById("blogSearch") as HTMLInputElement | null;
    const query = (searchInput?.value || "").toLowerCase().trim();

    let shown = 0;
    articles.forEach((article) => {
      const matchesCategory = active === "all" || article.dataset.category?.includes(active);
      const matchesSearch = article.textContent?.toLowerCase().includes(query);
      const visible = matchesCategory && matchesSearch;
      article.classList.toggle("hidden", !visible);
      if (visible) shown++;
    });

    if (count) count.textContent = `Menampilkan ${shown} artikel`;
    if (empty) empty.classList.toggle("hidden", shown !== 0);
  }, [active]);

  useEffect(() => {
    updateArticles();
  }, [updateArticles]);

  useEffect(() => {
    const searchInput = document.getElementById("blogSearch");
    if (!searchInput) return;
    const handler = () => updateArticles();
    searchInput.addEventListener("input", handler);
    return () => searchInput.removeEventListener("input", handler);
  }, [updateArticles]);

  const handleFilter = (value: string) => {
    setActive(value);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-14">
      <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Filter kategori">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`filter-btn shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === cat.value
                ? "bg-[var(--blue)] text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"
            }`}
            data-filter={cat.value}
            onClick={() => handleFilter(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
}