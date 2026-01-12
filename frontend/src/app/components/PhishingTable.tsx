'use client';

import { Phishing } from '@/app/types';
import PhishingFormModal from './PhishingFormModal';
import PhishingDeleteConfirmModal from './PhishingDeleteConfirmModal';
import { Search, Plus, Trash2, Globe, Calendar, Target, ChevronLeft, ChevronRight } from 'lucide-react'; // İkonlar için

interface PhishingTableProps {
    phishingData: { data: Phishing[]; total: number };
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    loading: boolean;
    isFormModalOpen: boolean;
    isChecking: boolean;
    checkUrl: string;
    setCheckUrl: (url: string) => void;
    checkResult: { isPhishing: boolean; details: Phishing | null } | null;
    handleCheck: () => void;
    setIsFormModalOpen: (isOpen: boolean) => void;
    handleCreate: (data: { url: string; source: string; target: string }) => void;
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
    handleLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    loadPhishingData: () => void;
}

export default function PhishingTable({
    phishingData,
    searchTerm,
    setSearchTerm,
    loading,
    isFormModalOpen,
    setIsFormModalOpen,
    handleCreate,
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
}: PhishingTableProps) {
    return (
        <>
            <div className="space-y-4">
                {/* Üst Aksiyon Çubuğu */}
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
                    <button
                        onClick={() => setIsFormModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md shadow-blue-500/20 active:scale-95 whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        Yeni URL Ekle
                    </button>
                </div>

                {/* Tablo Konteynırı */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="h-10 w-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="mt-4 text-slate-500 font-medium">Veriler yükleniyor...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2"><Globe className="w-3 h-3" /> URL</div>
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kaynak</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2"><Target className="w-3 h-3" /> Hedef</div>
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Tarih</div>
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {(phishingData?.data || []).map((item) => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <a href={item.url} target="_blank" rel="noopener noreferrer"
                                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 break-all max-w-xs block lg:max-w-md">
                                                    {item.url.length > 55 ? item.url.substring(0, 55) + '...' : item.url}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                                {item.source}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                                                    {item.target}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {new Date(item.createdAt).toLocaleDateString('tr-TR', {
                                                    day: '2-digit', month: 'short', year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleOpenDeleteModal(item)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Sil"
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
                                    <p className="text-slate-500 font-medium">Hiç phishing URL'si bulunamadı.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Alt Bilgi & Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className='flex items-center gap-2'>
                            <span>Gösterim:</span>
                            <select
                                value={limit}
                                onChange={handleLimitChange}
                                className="bg-white border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            >
                                {[5, 10, 20, 50].map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div className="hidden sm:block border-l border-slate-200 h-4 mx-2"></div>
                        <p>Toplam <span className="font-semibold text-slate-700">{phishingData.total}</span> kayıt</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage <= 1 || loading}
                            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="bg-white border border-slate-200 px-4 py-1.5 rounded-lg text-sm font-medium text-slate-600 shadow-sm">
                            {currentPage} / {totalPages > 0 ? totalPages : 1}
                        </div>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages || loading}
                            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <PhishingFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleCreate}
            />

            <PhishingDeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                item={itemToDelete}
            />
        </>
    );
}