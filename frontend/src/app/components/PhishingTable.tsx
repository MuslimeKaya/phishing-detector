'use client';

import { Phishing } from '@/app/types';
import PhishingFormModal from './PhishingFormModal';
import PhishingDeleteConfirmModal from './PhishingDeleteConfirmModal';

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
    loadPhishingData: () => void; // For refresh
}

export default function PhishingTable({
    phishingData,
    searchTerm,
    setSearchTerm,
    loading,
    isFormModalOpen,
    isChecking,
    checkUrl,
    setCheckUrl,
    checkResult,
    handleCheck,
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
    loadPhishingData,
}: PhishingTableProps) {
    return (
        <>
            <div className="space-y-6">
                {/* URL Check Section - can be a separate component */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 URL Kontrol Et</h3>
                    <div className="flex gap-3">
                        <input
                            type="url"
                            placeholder="Kontrol edilecek URL'yi girin..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                            value={checkUrl}
                            onChange={(e) => setCheckUrl(e.target.value)}
                        />
                        <button
                            onClick={handleCheck}
                            disabled={isChecking || !checkUrl}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {isChecking ? 'Kontrol ediliyor...' : 'Kontrol Et'}
                        </button>
                    </div>

                    {checkResult && (
                        <div className={`mt-4 p-4 rounded-lg ${checkResult.isPhishing ? 'bg-red-100 border border-red-300' : 'bg-green-100 border border-green-300'}`}>
                            <p className={`font-semibold ${checkResult.isPhishing ? 'text-red-800' : 'text-green-800'}`}>
                                {checkResult.isPhishing ? '⚠️ Bu URL phishing listesinde!' : '✅ Bu URL güvenli görünüyor.'}
                            </p>
                            {checkResult.details && (
                                <div className="mt-2 text-sm text-gray-600">
                                    <p>Kaynak: {checkResult.details.source}</p>
                                    <p>Hedef: {checkResult.details.target}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex gap-4 items-center mb-6">
                        <input
                            type="text"
                            placeholder="URL, kaynak veya hedef ile ara..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={() => setIsFormModalOpen(true)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            + Yeni URL Ekle
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Yükleniyor...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            URL
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kaynak
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hedef
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Eklenme Tarihi
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {(phishingData?.data || []).map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <a href={item.url} target="_blank" rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline">
                                                    {item.url.length > 50 ? item.url.substring(0, 50) + '...' : item.url}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {item.source}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                                    {item.target}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(item.createdAt).toLocaleDateString('tr-TR', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {(phishingData?.data?.length === 0) && !loading && (
                                <div className="text-center py-8 text-gray-500">
                                    Hiç phishing URL'si bulunamadı.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className='flex items-center gap-2'>
                        <span>Sayfa başına:</span>
                        <select value={limit} onChange={handleLimitChange} className="px-2 py-1 border border-gray-300 rounded-md">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <div>
                        Toplam {phishingData.total} kayıttan {Math.min((currentPage - 1) * limit + 1, phishingData.total)} - {Math.min(currentPage * limit, phishingData.total)} arası gösteriliyor
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage <= 1 || loading}
                            className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Önceki
                        </button>
                        <span>
                            Sayfa {currentPage} / {totalPages > 0 ? totalPages : 1}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages || loading}
                            className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sonraki
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