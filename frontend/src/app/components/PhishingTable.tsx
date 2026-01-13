'use client';

import React, { useState, ChangeEvent } from 'react';

import { Phishing } from '@/app/types';
import PhishingDeleteConfirmModal from './PhishingDeleteConfirmModal';
import { Search, Plus, Trash2, Globe, Calendar, Target, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhishingTableProps {
    phishingData: { data: Phishing[]; total: number };
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    loading: boolean;

    isDeleteModalOpen: boolean;
    itemToDelete: Phishing | null;
    handleOpenDeleteModal: (item: Phishing) => void;
    handleCloseDeleteModal: () => void;
    handleConfirmDelete: () => void;
    currentPage: number;
    limit: number;
    totalPages: number;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    handleLimitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    loadPhishingData: () => void;
    selectedIds: string[];
    onToggleSelect: (id: string) => void;
    onSelectAll: (ids: string[]) => void;
    onBulkDelete: () => void;
}

export default function PhishingTable({
    phishingData,
    searchTerm,
    setSearchTerm,
    loading,

    isDeleteModalOpen,
    itemToDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
    currentPage,
    limit,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    handleLimitChange,
    selectedIds,
    onToggleSelect,
    onSelectAll,
    onBulkDelete,
}: PhishingTableProps) {
    const allIds = phishingData?.data?.map(d => d.id) || [];
    const isAllSelected = allIds.length > 0 && allIds.every(id => selectedIds.includes(id));
    return (
        <>
            <div className="space-y-4">

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by URL, source, or target
"
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                   transition-all text-sm 
                   text-slate-900 font-medium placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {selectedIds.length > 0 && (
                        <button
                            onClick={onBulkDelete}
                            className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md shadow-red-500/20 active:scale-95 whitespace-nowrap animate-in fade-in slide-in-from-right-4"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Selected ({selectedIds.length})
                        </button>
                    )}
                </div>


                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="h-10 w-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="mt-4 text-slate-500 font-medium">Loading data...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-6 py-4 w-10">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                checked={isAllSelected}
                                                onChange={() => onSelectAll(allIds)}
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2"><Globe className="w-3 h-3" /> URL</div>
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2"><Target className="w-3 h-3" /> Target</div>
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Date</div>
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {(phishingData?.data || []).map((item) => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    checked={selectedIds.includes(item.id)}
                                                    onChange={() => onToggleSelect(item.id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href={item.url} target="_blank" rel="noopener noreferrer"
                                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 break-all max-w-xs block lg:max-w-md">
                                                    {item.url.length > 55 ? item.url.substring(0, 55) + '...' : item.url}
                                                </a>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                                                    {item.target}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {new Date(item.submissionTime).toLocaleDateString('en-US', {
                                                    day: '2-digit', month: 'short', year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleOpenDeleteModal(item)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {phishingData?.data?.length === 0 && (
                                <div className="text-center py-20 bg-slate-50/20">
                                    <div className="mb-3 flex justify-center text-slate-300">
                                        <Globe className="w-12 h-12" />
                                    </div>
                                    <p className="text-slate-500 font-medium">No phishing URLs found.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>


                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className='flex items-center gap-2'>
                            <span className="font-medium text-slate-600">Show:</span>
                            <select
                                value={limit}
                                onChange={handleLimitChange}
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-medium shadow-sm transition-all hover:border-blue-300 cursor-pointer"
                            >
                                {[5, 10, 20, 50].map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div className="hidden sm:block border-l border-slate-200 h-4 mx-2"></div>
                        <p>Total <span className="font-semibold text-slate-700">{phishingData.total}</span> records</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage <= 1 || loading}
                            className="p-2.5 border border-slate-300 rounded-lg text-slate-600 hover:bg-white hover:text-blue-600 hover:border-blue-300 hover:shadow-md disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-300 disabled:hover:shadow-none transition-all duration-200 bg-white shadow-sm"
                            aria-label="Previous Page"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="bg-white border border-slate-300 px-6 py-2.5 rounded-lg text-sm font-bold text-slate-700 shadow-sm min-w-[120px] text-center select-none flex items-center justify-center gap-1">
                            <span className="text-blue-600 text-base">{currentPage}</span>
                            <span className="text-slate-400 font-normal mx-1">/</span>
                            <span>{totalPages > 0 ? totalPages : 1}</span>
                        </div>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages || loading}
                            className="p-2.5 border border-slate-300 rounded-lg text-slate-600 hover:bg-white hover:text-blue-600 hover:border-blue-300 hover:shadow-md disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-300 disabled:hover:shadow-none transition-all duration-200 bg-white shadow-sm"
                            aria-label="Next Page"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>





            <PhishingDeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                item={itemToDelete}
            />
        </>
    );
}