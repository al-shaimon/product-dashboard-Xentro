'use client';
import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEye, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { Product } from '@/types/product';
import { CardSkeleton } from '@/components/ui/Skeleton';
import AddProductModal from '@/components/dashboard/products/AddProductModal';
import ProductDetailsModal from '@/components/dashboard/products/ProductDetailsModal';
import { toast } from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'price'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.restful-api.dev/objects');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      // Check if error response contains message about reserved id
      if (data.error && data.error.includes('reserved id')) {
        toast.error(
          'Cannot delete demo products. You can only delete products that you have added.'
        );
        return;
      }

      if (!response.ok) throw new Error('Failed to delete product');

      setProducts((prev) => prev.filter((product) => product?.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddProduct = async (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    setIsAddModalOpen(false);
    toast.success('Product added successfully');
  };

  const filteredProducts = products.filter((product) =>
    product?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!a?.data && !b?.data) return 0;
    if (!a?.data) return 1; // Move items with no data to the end
    if (!b?.data) return -1; // Move items with no data to the end

    let valueA = sortField === 'name' ? a[sortField] : a.data[sortField];
    let valueB = sortField === 'name' ? b[sortField] : b.data[sortField];

    // Handle null/undefined values
    if (valueA === null || valueA === undefined) return 1;
    if (valueB === null || valueB === undefined) return -1;

    // Convert to comparable values
    if (sortField === 'price') {
      valueA = Number(valueA) || -1; // Convert to number, use -1 for invalid values
      valueB = Number(valueB) || -1;
    } else {
      valueA = String(valueA).toLowerCase();
      valueB = String(valueB).toLowerCase();
    }

    // Sort based on direction
    if (sortDirection === 'asc') {
      if (valueA === -1) return 1; // Move N/A to end in ascending order
      if (valueB === -1) return -1;
      return valueA > valueB ? 1 : -1;
    } else {
      if (valueA === -1) return 1; // Move N/A to end in descending order
      if (valueB === -1) return -1;
      return valueA < valueB ? 1 : -1;
    }
  });

  const handleSort = (field: 'name' | 'price') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: 'name' | 'price' }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <FiArrowUp className="inline ml-1" />
    ) : (
      <FiArrowDown className="inline ml-1" />
    );
  };

  // Helper function to get color value from different possible keys
  const getColor = (data: Product['data'] | null) => {
    if (!data) return null;
    return data.color || data.Color || data['Strap Colour'] || null;
  };

  // Helper function to get capacity value from different possible keys
  const getCapacity = (data: Product['data'] | null) => {
    if (!data) return null;
    return data.capacity || data.Capacity || data['capacity GB'] || null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   transition-colors duration-200"
        >
          <FiPlus className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Sort Controls */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => handleSort('name')}
          className={`px-3 py-1 rounded ${
            sortField === 'name' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
          }`}
        >
          Name <SortIcon field="name" />
        </button>
        <button
          onClick={() => handleSort('price')}
          className={`px-3 py-1 rounded ${
            sortField === 'price' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
          }`}
        >
          Price <SortIcon field="price" />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div
              key={product?.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product?.name || 'N/A'}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Price: {product?.data?.price ? `$${product.data.price}` : 'N/A'}</p>
                  <p>Color: {getColor(product?.data) || 'N/A'}</p>
                  <p>Capacity: {getCapacity(product?.data) || 'N/A'}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product?.id)}
                    disabled={deletingId === product?.id}
                    className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? 'Try adjusting your search terms'
                  : 'Get started by adding your first product'}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent 
                           shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 
                           hover:bg-blue-700 focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />
      <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
