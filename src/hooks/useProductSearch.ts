import { useState, useEffect } from "react";

export const useProductSearch = (products: any[] = []) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();

    const filtered = products.filter((r) => {
      const name = (r.name || "").toLowerCase();
      const description = (r.description || "").toLowerCase();
      const ingredients = Array.isArray(r.ingredients)
        ? r.ingredients.join(" ").toLowerCase()
        : (r.ingredients || "").toLowerCase();
      const category = (r.category_name || "").toLowerCase();

      return (
        name.includes(q) ||
        description.includes(q) ||
        ingredients.includes(q) ||
        category.includes(q)
      );
    });


    setResults(filtered);
  }, [query, products]); 

  return { query, setQuery, results };
};
