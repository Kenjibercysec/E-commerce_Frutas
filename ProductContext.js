import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsAPI } from './api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        category: 'all',
        sortBy: 'name',
        sortOrder: 'asc'
    });

    useEffect(() => {
        fetchProducts();
    }, [currentPage, productsPerPage, filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: productsPerPage,
                category: filters.category !== 'all' ? filters.category : undefined,
                sort: filters.sortBy,
                order: filters.sortOrder
            };

            const response = await productsAPI.getAll(params);
            setProducts(response.products);
            setTotalPages(response.totalPages);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    const updateProductsPerPage = (newValue) => {
        setProductsPerPage(parseInt(newValue));
        setCurrentPage(1); // Reset to first page when products per page changes
    };

    const getProductById = async (id) => {
        try {
            const product = await productsAPI.getById(id);
            return product;
        } catch (err) {
            console.error('Error fetching product:', err);
            throw err;
        }
    };

    const getCategories = () => {
        const categories = new Set(products.map(product => product.category));
        return ['all', ...Array.from(categories)];
    };

    return (
        <ProductContext.Provider value={{
            products,
            loading,
            error,
            currentPage,
            productsPerPage,
            totalPages,
            filters,
            setCurrentPage,
            updateFilters,
            updateProductsPerPage,
            getProductById,
            getCategories,
            fetchProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}; 