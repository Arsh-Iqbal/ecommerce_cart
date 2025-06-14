export default function Filters({ filters, setFilters }) {
  return (
    <div className="bg-blue-500 p-4 rounded shadow w-64 text-white">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      {/* Category Filter */}
      <div className="mb-6">
        <p className="font-medium mb-2">Category</p>
        {['All', 'Electronics', 'Clothing', 'Sports'].map((cat) => (
          <label key={cat} className="flex items-center mb-2 cursor-pointer">
            {/* Radio circle */}
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filters.category === cat}
              onChange={() =>
                setFilters((prev) => ({ ...prev, category: cat }))
              }
              className="appearance-none w-4 h-4 border-2 border-white rounded-full mr-2 flex-shrink-0 cursor-pointer checked:bg-white checked:border-white"
            />
            <span className="text-white">{cat}</span>
          </label>
        ))}
      </div>

      {/* Price Filter */}
      <div>
        <p className="font-medium mb-2">Price</p>
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
          className="w-full accent-white"
        />
        <div className="flex justify-between text-white text-sm mt-2 px-2">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>
    </div>
  );
}