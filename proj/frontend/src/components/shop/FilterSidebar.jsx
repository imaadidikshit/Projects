import { motion } from 'framer-motion';
import { Sliders, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { categories, colors, sizes } from '@/lib/data';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FilterSidebar({ filters, setFilters, isOpen, setIsOpen }) {
  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(c => c !== categoryId);
    setFilters({ ...filters, categories: newCategories });
  };

  const handleColorChange = (colorId, checked) => {
    const newColors = checked
      ? [...filters.colors, colorId]
      : filters.colors.filter(c => c !== colorId);
    setFilters({ ...filters, colors: newColors });
  };

  const handleSizeChange = (size, checked) => {
    const newSizes = checked
      ? [...filters.sizes, size]
      : filters.sizes.filter(s => s !== size);
    setFilters({ ...filters, sizes: newSizes });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      colors: [],
      sizes: [],
      priceRange: [0, 5000],
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.colors.length > 0 || filters.sizes.length > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 5000;

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 bg-amber-400 text-black font-medium rounded-full flex items-center gap-2 shadow-lg"
      >
        <Sliders size={18} />
        Filters
        {hasActiveFilters && (
          <span className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
            {filters.categories.length + filters.colors.length + filters.sizes.length}
          </span>
        )}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-64 bg-zinc-950 lg:bg-transparent border-r border-white/10 lg:border-0 z-50 lg:z-0 overflow-y-auto lg:translate-x-0 lg:pt-24`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sliders className="text-amber-400" size={20} />
              <h2 className="text-lg font-medium text-white">Filters</h2>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-white/60 hover:text-amber-400 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <Accordion type="multiple" defaultValue={['categories', 'price', 'colors', 'sizes']} className="space-y-4">
            {/* Categories */}
            <AccordionItem value="categories" className="border-b border-white/10">
              <AccordionTrigger className="text-white hover:text-amber-400 hover:no-underline py-4">
                Categories
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
                        className="border-white/30 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400"
                      />
                      <span className="text-white/70 group-hover:text-white transition-colors capitalize">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price Range */}
            <AccordionItem value="price" className="border-b border-white/10">
              <AccordionTrigger className="text-white hover:text-amber-400 hover:no-underline py-4">
                Price Range
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={5000}
                    step={100}
                    className="py-4"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">${filters.priceRange[0]}</span>
                    <span className="text-white/60">${filters.priceRange[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Colors */}
            <AccordionItem value="colors" className="border-b border-white/10">
              <AccordionTrigger className="text-white hover:text-amber-400 hover:no-underline py-4">
                Colors
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color.id, !filters.colors.includes(color.id))}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        filters.colors.includes(color.id)
                          ? 'border-amber-400 scale-110'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Sizes */}
            <AccordionItem value="sizes" className="border-b border-white/10">
              <AccordionTrigger className="text-white hover:text-amber-400 hover:no-underline py-4">
                Sizes
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size, !filters.sizes.includes(size))}
                      className={`px-4 py-2 text-sm border rounded-lg transition-all ${
                        filters.sizes.includes(size)
                          ? 'border-amber-400 bg-amber-400/20 text-amber-400'
                          : 'border-white/20 text-white/70 hover:border-white/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.aside>
    </>
  );
}
