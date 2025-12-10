

import React from 'react';

interface PhishingDeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

const PhishingDeleteConfirmModal: React.FC<PhishingDeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Delete Confirmation</h2>
                <p className="text-gray-600 dark:text-gray-300">Are you sure you want to delete "{itemName}"?</p>
                <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhishingDeleteConfirmModal;
