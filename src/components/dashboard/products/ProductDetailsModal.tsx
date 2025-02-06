'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Product } from '@/types/product';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  // Function to format field name for display
  const formatFieldName = (field: string) => {
    return field
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to format field value for display
  const formatFieldValue = (key: string, value: string | number | undefined | null) => {
    if (value === null || value === undefined) return 'N/A';
    if (key.toLowerCase().includes('price')) return `$${value}`;
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value.toString();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 -top-10 bg-black/50 z-50"
        >
          <div
            className="flex items-center justify-center min-h-screen p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">Product Details</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Product Name</h4>
                  <p className="mt-1 text-lg text-gray-900">{product?.name || 'N/A'}</p>
                </div>

                {/* Product Data */}
                {product?.data && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.data).map(([key, value]) => {
                      // Skip description as it will be shown separately
                      if (key.toLowerCase() === 'description') return null;

                      // Special handling for color with color preview
                      if (key.toLowerCase() === 'color') {
                        return (
                          <div key={key}>
                            <h4 className="text-sm font-medium text-gray-500">
                              {formatFieldName(key)}
                            </h4>
                            <div className="mt-1 flex items-center space-x-2">
                              <div
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: value as string }}
                              />
                              <span className="text-gray-900">{value}</span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={key}>
                          <h4 className="text-sm font-medium text-gray-500">
                            {formatFieldName(key)}
                          </h4>
                          <p className="mt-1 text-gray-900">{formatFieldValue(key, value)}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Description (if exists) */}
                {product?.data?.Description && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                    <p className="mt-1 text-gray-900 whitespace-pre-wrap">
                      {product.data.Description}
                    </p>
                  </div>
                )}

                {/* Product ID */}
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-500">Product ID</h4>
                  <p className="mt-1 text-sm text-gray-900">{product?.id || 'N/A'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
