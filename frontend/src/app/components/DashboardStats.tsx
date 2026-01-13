'use client';

import { Globe, Target, Calendar, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
    total: number;
    recentCount: number;
    topTarget: string;
}

export default function DashboardStats({ total, recentCount, topTarget }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-blue-50 to-transparent opacity-50 group-hover:w-32 transition-all" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 text-sm font-medium">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Globe className="w-5 h-5" />
                        </div>
                        Total Phishing URLs
                    </div>
                    <div className="text-3xl font-bold text-slate-800">{total}</div>
                    <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-600 font-medium">+12%</span> from last month
                    </div>
                </div>
            </div>


            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-amber-50 to-transparent opacity-50 group-hover:w-32 transition-all" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 text-sm font-medium">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                            <Calendar className="w-5 h-5" />
                        </div>
                        Added Recently
                    </div>
                    <div className="text-3xl font-bold text-slate-800">{recentCount}</div>
                    <div className="mt-2 text-xs text-slate-400">
                        URLs detected in the last 24 hours
                    </div>
                </div>
            </div>


            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-purple-50 to-transparent opacity-50 group-hover:w-32 transition-all" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 text-sm font-medium">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <Target className="w-5 h-5" />
                        </div>
                        Most Targeted
                    </div>
                    <div className="text-3xl font-bold text-slate-800 truncate" title={topTarget || 'None'}>
                        {topTarget || 'N/A'}
                    </div>
                    <div className="mt-2 text-xs text-slate-400">
                        Most frequent target organzation
                    </div>
                </div>
            </div>


            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-emerald-50 to-transparent opacity-50 group-hover:w-32 transition-all" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 text-slate-500 text-sm font-medium">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        Detection Accuracy
                    </div>
                    <div className="text-3xl font-bold text-slate-800">99.9%</div>
                    <div className="mt-2 text-xs text-slate-400">
                        AI Model Confidence Score
                    </div>
                </div>
            </div>
        </div>
    );
}
