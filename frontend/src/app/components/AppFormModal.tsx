'use client';

import { useEffect, useState } from 'react';
import { MaliciousApp } from '@/app/types';

interface AppFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<MaliciousApp, 'id'>) => void;
    initialData?: MaliciousApp;
}

export default function AppFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}: AppFormModalProps) {
    const [formData, setFormData] = useState({
        appName: '',
        packageName: '',
        version: '',
        detectionReason: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                appName: initialData.appName,
                packageName: initialData.packageName,
                version: initialData.version,
                detectionReason: initialData.detectionReason,
            });
        } else {
            setFormData({
                appName: '',
                packageName: '',
                version: '',
                detectionReason: '',
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25" />

                    <div className="relative bg-white rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                {initialData ? 'Uygulamayı Düzenle' : 'Yeni Uygulama Ekle'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Uygulama Adı
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black placeholder-gray-500"
                                    value={formData.appName}
                                    onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Paket Adı
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black placeholder-gray-500"
                                    value={formData.packageName}
                                    onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Versiyon
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black placeholder-gray-500"
                                    value={formData.version}
                                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tespit Nedeni
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none text-black placeholder-gray-500"
                                    value={formData.detectionReason}
                                    onChange={(e) => setFormData({ ...formData, detectionReason: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-black text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-medium"
                                >
                                    {initialData ? 'Güncelle' : 'Ekle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}