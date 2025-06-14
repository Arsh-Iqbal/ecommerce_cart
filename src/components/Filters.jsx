export default function Filters({ filters, setFilters }) {
  return (
    <div className="bg-blue-500 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <p className="font-medium mb-2">Category</p>
        {['All', 'Electronics', 'Clothing'].map((cat) => (
          <label key={cat} className="block">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filters.category === cat}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <p className="font-medium mb-2">Price (Max: ${filters.price})</p>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={filters.price}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              price: Number(e.target.value),
            }))
          }
          className="w-full"
        />
      </div>
    </div>
  )
}
