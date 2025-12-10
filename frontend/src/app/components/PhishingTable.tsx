'use client';

import { useState, useEffect } from 'react';
import { Phishing } from '@/app/types';
import { api } from '@/app/lib/api';
import PhishingFormModal from './PhishingFormModal';

export default function PhishingTable() {
    const [phishingUrls, setPhishingUrls] = useState<Phishing[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [checkUrl, setCheckUrl] = useState('');
    const [checkResult, setCheckResult] = useState<{ isPhishing: boolean; details: Phishing | null } | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    useEffect(() => {
        loadPhishingData();
    }, []);

    const loadPhishingData = async () => {
        try {
            setLoading(true);
            const data = await api.getPhishingUrls();
            setPhishingUrls(data);
        } catch (error) {
            console.error('Failed to load phishing data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUrls = phishingUrls.filter(
        (item) =>
            item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.target.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheck = async () => {
        if (!checkUrl) return;

        try {
            const result = await api.checkPhishing(checkUrl);
            setCheckResult(result);
        } catch (error) {
            console.error('Check failed:', error);
        }
    };

    const handleCreate = async (data: { url: string; source: string; target: string }) => {
        try {
            const newItem = await api.createPhishing(data);
            setPhishingUrls([...phishingUrls, newItem]);
            setIsFormModalOpen(false);
            loadPhishingData();
        } catch (error) {
            console.error('Create error:', error);
            alert('URL zaten mevcut veya bir hata oluştu!');
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 URL Kontrol Et</h3>
                    <div className="flex gap-3">
                        <input
                            type="url"
                            placeholder="Kontrol edilecek URL'yi girin..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={checkUrl}
                            onChange={(e) => setCheckUrl(e.target.value)}
                        />
                        <button
                            onClick={handleCheck}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Kontrol Et
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
                                    {filteredUrls.map((item) => (
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
                            {filteredUrls.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    Hiç phishing URL'si bulunamadı.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="text-center text-sm text-gray-500">
                    Toplam {phishingUrls.length} phishing URL'si listeleniyor
                </div>
            </div>

            <PhishingFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleCreate}
            />
        </>
    );
}