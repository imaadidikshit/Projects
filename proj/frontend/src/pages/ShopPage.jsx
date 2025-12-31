import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, ChevronDown } from 'lucide-react';
import { products } from '@/lib/data';
import ProductCard from '@/components/shop/ProductCard';
import FilterSidebar from '@/components/shop/FilterSidebar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
];

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [filters, setFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    colors: [],
    sizes: [],
    priceRange: [0, 5000],
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(8);

  // Update filters when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({ ...prev, categories: [categoryParam] }));
    }
  }, [categoryParam]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // Filter by color
    if (filters.colors.length > 0) {
      result = result.filter(p => p.colors.some(c => filters.colors.includes(c)));
    }

    // Filter by size
    if (filters.sizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }

    // Filter by price
    result = result.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        // Featured - keep original order but prioritize featured items
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [filters, sortBy]);

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">Shop</h1>
          <p className="text-white/60 text-lg">
            Discover our curated collection of premium essentials
          </p>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-8 pb-6 border-b border-white/10"
        >
          <p className="text-white/60">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10">
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <h3 className="text-2xl font-serif text-white mb-4">No products found</h3>
                <p className="text-white/60 mb-6">Try adjusting your filters</p>
                <button
                  onClick={() => setFilters({
                    categories: [],
                    colors: [],
                    sizes: [],
                    priceRange: [0, 5000],
                  })}
                  className="px-6 py-3 bg-amber-400 text-black font-medium rounded-full"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-12"
                  >
                    <button
                      onClick={() => setDisplayCount(prev => prev + 8)}
                      className="px-8 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors"
                    >
                      Load More ({filteredProducts.length - displayCount} remaining)
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
