import { Link } from "react-router-dom";
import { useRecipeSearch } from "../../hooks/useSearch";

interface SearchBarProps {
  recipes: any[];
}

const SearchBar = ({ recipes }: SearchBarProps) => {
  const { query, setQuery, results } = useRecipeSearch(recipes);

  return (
    <div className="relative w-full sm:w-auto flex-1">
      {/* Search Box */}
      <div className="flex items-center rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-500 focus-within:border-amber-500">
        <span className="mr-2 text-xs uppercase tracking-[0.2em]">Search</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Spicy fish curry, festive menu..."
          className="w-full bg-transparent text-sm text-[#640000] placeholder:text-stone-400 focus:outline-none"
        />
      </div>

      {/* Suggestions Dropdown */}
      {query && (
        <ul className="absolute left-0 right-0 mt-2 rounded-xl border bg-white shadow-xl z-50 max-h-60 overflow-y-auto">
          {results.length === 0 && (
            <li className="p-3 text-sm text-gray-500">No results found</li>
          )}

          {results.map((r) => (
            <li key={r.id}>
              <Link
                to={`/recipe/${r.id}`}
                className="block px-4 py-3 text-sm text-[#640000] hover:bg-stone-100 transition"
                onClick={() => setQuery("")}
              >
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
