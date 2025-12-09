import { useState, useEffect } from "react";

export const useRecipeSearch = (recipes: any[] = []) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();

    const filtered = recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.ingredients?.toLowerCase().includes(q)
    );

    setResults(filtered);
  }, [query, recipes]); 

  return { query, setQuery, results };
};
