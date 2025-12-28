// ==========================================
// components/analytics/ProductCategoriesTable.tsx
// ==========================================

'use client';

import { ProductCategory } from '@/types/analytics';
import { Tag } from 'lucide-react';

interface ProductCategoriesTableProps {
  categories: ProductCategory[];
}

export function ProductCategoriesTable({
  categories,
}: ProductCategoriesTableProps) {
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Product Categories
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Products
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Percentage
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Distribution
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedCategories.map((category, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {category.color && (
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {category.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-900">{category.count}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {category.percentage.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}