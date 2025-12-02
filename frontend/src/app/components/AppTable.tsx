'use client';

import { useState } from 'react';
import { MaliciousApp } from '@/app/types';
import { api } from '@/app/lib/api';
import AppFormModal from './AppFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface AppTableProps {
    initialApps: MaliciousApp[];
}

export default function AppTable({ initialApps }: AppTableProps) {
    const [apps, setApps] = useState<MaliciousApp[]>(initialApps);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApp, setSelectedApp] = useState<MaliciousApp | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const filteredApps = apps.filter(
        (app) =>
            app.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.packageName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = async (data: Omit<MaliciousApp, 'id'>) => {
        try {
            const newApp = await api.createApp(data);
            setApps([...apps, newApp]);
            setIsFormModalOpen(false);
        } catch (error) {
            console.error('Create error:', error);
        }
    };

    const handleUpdate = async (id: string, data: Partial<Omit<MaliciousApp, 'id'>>) => {
        try {
            const updatedApp = await api.updateApp(id, data);
            setApps(apps.map((app) => (app.id === id ? updatedApp : app)));
            setIsFormModalOpen(false);
            setSelectedApp(null);
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.deleteApp(id);
            setApps(apps.filter((app) => app.id !== id));
            setIsDeleteModalOpen(false);
            setSelectedApp(null);
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const openEditModal = (app: MaliciousApp) => {
        setSelectedApp(app);
        setIsFormModalOpen(true);
    };

    const openDeleteModal = (app: MaliciousApp) => {
        setSelectedApp(app);
        setIsDeleteModalOpen(true);
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Uygulama veya paket adı ile ara..."
                        className="flex-1 px-4 py-2 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-black"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            setSelectedApp(null);
                            setIsFormModalOpen(true);
                        }}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors border border-white"
                    >
                        Yeni Uygulama Ekle
                    </button>
                </div>

                <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Uygulama Adı
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Paket Adı
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Versiyon
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tespit Nedeni
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredApps.map((app) => (
                                <tr key={app.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {app.appName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {app.packageName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {app.version}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {app.detectionReason}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => openEditModal(app)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Düzenle
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(app)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredApps.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Hiç uygulama bulunamadı.
                        </div>
                    )}
                </div>
            </div>

            <AppFormModal
                isOpen={isFormModalOpen}
                onClose={() => {
                    setIsFormModalOpen(false);
                    setSelectedApp(null);
                }}
                onSubmit={selectedApp ? (data) => handleUpdate(selectedApp.id, data) : handleCreate}
                initialData={selectedApp || undefined}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedApp(null);
                }}
                onConfirm={() => selectedApp && handleDelete(selectedApp.id)}
                appName={selectedApp?.appName || ''}
            />
        </>
    );
}