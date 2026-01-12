import ClientPhishingTable from './components/ClientPhishingTable';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Phishing URL Management
        </h2>
        <p className="text-gray-600">
          Check suspicious URLs and manage the phishing list.
        </p>
      </div>

      <ClientPhishingTable />
    </div>
  );
}
