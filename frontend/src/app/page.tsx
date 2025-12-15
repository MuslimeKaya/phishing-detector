import ClientPhishingTable from './components/ClientPhishingTable';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Phishing URL Yönetimi
        </h2>
        <p className="text-gray-600">
          Şüpheli URL'leri kontrol edin ve phishing listesini yönetin.
        </p>
      </div>

      <ClientPhishingTable />
    </div>
  );
}
