"use client";

import { useState, useEffect, useCallback } from 'react';
import { Phishing } from '@/app/types';
import { api } from '@/app/lib/api';
import { useDebounce } from '@/app/lib/hooks/useDebounce';
import PhishingTable from './PhishingTable';

export default function ClientPhishingTable() {
    const [phishingData, setPhishingData] = useState<{ data: Phishing[]; total: number }>({ data: [], total: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [isChecking, setIsChecking] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [checkUrl, setCheckUrl] = useState('');
    const [checkResult, setCheckResult] = useState<{ isPhishing: boolean; details: Phishing | null } | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Phishing | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const totalPages = Math.ceil((phishingData?.total || 0) / limit);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const loadPhishingData = useCallback(async () => {
        try {
            setLoading(true);
            console.log(`Fetching data for page: ${currentPage}, limit: ${limit}, search: ${debouncedSearchTerm}`);
            const data = await api.getPhishingUrls(currentPage, limit, debouncedSearchTerm);
            if (data && Array.isArray(data.data)) {
                setPhishingData(data);
            } else {
                setPhishingData({ data: [], total: 0 });
                console.error("API returned data in an unexpected format:", data);
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

    // Reset to page 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm]);

    const handleCreate = async (data: { url: string; source: string; target: string }) => {
        try {
            await api.createPhishing(data);
            setIsFormModalOpen(false);
            loadPhishingData(); // Refresh data
        } catch (error) {
            console.error('Create error:', error);
            alert('URL zaten mevcut veya bir hata oluştu!');
        }
    };

    const handleCheck = async () => {
        if (!checkUrl) return;
        setIsChecking(true);
        setCheckResult(null);
        try {

            const result = await api.checkPhishing(checkUrl);
            setCheckResult(result);
        } catch (error) {
            console.error('Failed to check URL:', error);
            alert('URL kontrolü sırasında bir hata oluştu.');
        } finally {
            setIsChecking(false);
        }
    };

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
            await (api as any).deletePhishing(itemToDelete.id);
            handleCloseDeleteModal();
            loadPhishingData(); // Refresh data
        } catch (error) {
            console.error('Delete error:', error);
            alert('URL silinirken bir hata oluştu.');
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <PhishingTable
            phishingData={phishingData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            loading={loading}
            isFormModalOpen={isFormModalOpen}
            isChecking={isChecking}
            checkUrl={checkUrl}
            setCheckUrl={setCheckUrl}
            checkResult={checkResult}
            handleCheck={handleCheck}
            setIsFormModalOpen={setIsFormModalOpen}
            handleCreate={handleCreate}
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
        />
    );
}
