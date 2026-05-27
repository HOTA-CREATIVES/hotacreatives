import type { BlogCategory } from "@/types/blog.interfaces";

interface BlogCategoryFilterProps {
  categories: BlogCategory[];
  activeCategory: string | null;
  onSelect: (slug: string | null) => void;
}

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: BlogCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
          activeCategory === null
            ? "bg-accent text-black border-accent"
            : "bg-transparent text-text-secondary border-border hover:border-accent hover:text-accent"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() =>
            onSelect(activeCategory === cat.slug ? null : cat.slug)
          }
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
            activeCategory === cat.slug
              ? "border-accent text-black"
              : "bg-transparent text-text-secondary border-border hover:border-accent hover:text-accent"
          }`}
          style={
            activeCategory === cat.slug
              ? { backgroundColor: cat.color, borderColor: cat.color }
              : undefined
          }
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
