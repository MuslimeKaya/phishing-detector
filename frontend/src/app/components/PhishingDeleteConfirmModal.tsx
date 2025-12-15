'use client';

import { Phishing } from '@/app/types';

interface PhishingDeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    item: Phishing | null;
}

export default function PhishingDeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    item,
}: PhishingDeleteConfirmModalProps) {
    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
                    <div className="relative bg-white rounded-2xl p-6">
                        <div className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <h3 className="text-lg font-semibold leading-6 text-gray-900">URL'yi Sil</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">Bu URL'yi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
                                    <p className="mt-2 text-sm font-medium text-gray-700 break-all">{item.url}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 flex gap-3">
                            <button type="button" onClick={onClose} className="flex-1 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">İptal</button>
                            <button type="button" onClick={onConfirm} className="flex-1 inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">Sil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}