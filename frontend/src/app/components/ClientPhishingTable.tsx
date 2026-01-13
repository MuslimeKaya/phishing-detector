"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Phishing } from '@/app/types';
import { api } from '@/app/lib/api';
import { useDebounce } from '@/app/lib/hooks/useDebounce';
import PhishingTable from './PhishingTable';
import DashboardStats from './DashboardStats';
import { toast } from 'sonner';

export default function ClientPhishingTable() {
    const [phishingData, setPhishingData] = useState<{ data: Phishing[]; total: number }>({ data: [], total: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Phishing | null>(null);


    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const totalPages = Math.ceil((phishingData?.total || 0) / limit);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const loadPhishingData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api.getPhishingUrls(currentPage, limit, debouncedSearchTerm);
            if (data && Array.isArray(data.data)) {
                setPhishingData(data);

                setSelectedIds([]);
            } else {
                setPhishingData({ data: [], total: 0 });
            }
        } catch (error) {
            console.error('Failed to load phishing data:', error);
            setPhishingData({ data: [], total: 0 });
        } finally {
            setLoading(false);
        }
    }, [currentPage, limit, debouncedSearchTerm]);

    useEffect(() => {
        loadPhishingData();
    }, [loadPhishingData]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    const handleOpenDeleteModal = (item: Phishing) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        try {
            await api.deletePhishing(itemToDelete.id);
            handleCloseDeleteModal();
            loadPhishingData();
            toast.success('Phishing record deleted successfully!');
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete record.');
        }
    };


    const handleToggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (ids: string[]) => {

        const allVisibleSelected = ids.every(id => selectedIds.includes(id));
        if (allVisibleSelected) {
            setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
        } else {

            const toAdd = ids.filter(id => !selectedIds.includes(id));
            setSelectedIds(prev => [...prev, ...toAdd]);
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} items?`)) return;

        try {

            await Promise.all(selectedIds.map(id => api.deletePhishing(id)));

            setSelectedIds([]);
            loadPhishingData();
            toast.success(`${selectedIds.length} items deleted successfully!`);
        } catch (error) {
            console.error('Bulk delete error:', error);
            toast.error('Failed to delete some items.');
            loadPhishingData();
        }
    };

    const total = phishingData?.total || 0;

    const recentCount = useMemo(() => {
        return (phishingData?.data || []).filter(p => {
            const d = new Date(p.submissionTime);
            const now = new Date();
            return (now.getTime() - d.getTime()) < 24 * 60 * 60 * 1000;
        }).length;
    }, [phishingData]);

    const topTarget = useMemo(() => {
        const targets = (phishingData?.data || []).map(p => p.target);
        if (targets.length === 0) return 'N/A';
        return targets.sort((a, b) =>
            targets.filter(v => v === a).length - targets.filter(v => v === b).length
        ).pop() || 'N/A';
    }, [phishingData]);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="space-y-6">
            <DashboardStats total={total} recentCount={recentCount} topTarget={topTarget} />

            <PhishingTable
                phishingData={phishingData}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                loading={loading}
                isDeleteModalOpen={isDeleteModalOpen}
                itemToDelete={itemToDelete}
                handleOpenDeleteModal={handleOpenDeleteModal}
                handleCloseDeleteModal={handleCloseDeleteModal}
                handleConfirmDelete={handleConfirmDelete}
                currentPage={currentPage}
                limit={limit}
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handleLimitChange={handleLimitChange}
                loadPhishingData={loadPhishingData}
                selectedIds={selectedIds}
                onToggleSelect={handleToggleSelect}
                onSelectAll={handleSelectAll}
                onBulkDelete={handleBulkDelete}
            />
        </div>
    );
}
