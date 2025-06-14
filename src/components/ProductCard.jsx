import Link from 'next/link';

export default function ProductCard({ product }) {
  if (!product || !product.id) return null;

  return (
    <div className="bg-white shadow rounded p-4 flex flex-col hover:shadow-lg transition">
      {/* Image wrapped in Link to navigate to product detail page */}
      <Link href={`/product/${product.id}`}>
       
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded cursor-pointer"
          />
       
      </Link>

      {/* Product Title */}
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>

      {/* Product Price */}
      <p className="text-blue-600 font-bold text-sm">${product.price}</p>

      {/* Buttons container */}
      <div className="mt-auto pt-2">
        {/* Placeholder buttons, no functionality */}
        <button className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded mt-2" >
          Add to cart
        </button>
      </div>
    </div>
  );
}