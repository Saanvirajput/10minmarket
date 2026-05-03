'use client';
import { useSimulation } from '@/lib/simulation-engine';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Cpu, Activity, ShieldAlert, X, BarChart3, Cloud, LayoutGrid } from 'lucide-react';
import { useState } from 'react';

export default function ArchitectureObserver() {
  const { logs, activeSagas, clearLogs } = useSimulation();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'logs' | 'metrics'>('logs');

  if (!isOpen) {
    return (
      <motion.button 
        layoutId="observer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#101827] text-white p-5 rounded-[24px] shadow-2xl z-[150] flex items-center gap-3 border border-white/10 hover:border-purple-500/50 hover:scale-105 transition-all group"
      >
        <div className="bg-purple-500/20 p-2 rounded-xl group-hover:bg-purple-500/40 transition-colors">
          <Cpu size={20} className="text-purple-400" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Monitor</span>
          <span className="text-[9px] font-bold text-green-400 mt-1">Live Connection: Active</span>
        </div>
      </motion.button>
    );
  }

  const lastMetricsLog = logs.find(l => l.service === 'PROMETHEUS')?.message;
  const metrics = lastMetricsLog ? {
    latency: lastMetricsLog.match(/latency: ([\d.]+)ms/)?.[1],
    throughput: lastMetricsLog.match(/throughput: ([\d.]+)rps/)?.[1],
    lag: lastMetricsLog.match(/kafkaLag: (\d+)/)?.[1]
  } : { latency: '24.5', throughput: '512', lag: '0' };

  return (
    <motion.div 
      layoutId="observer"
      className="fixed bottom-6 right-6 w-[420px] h-[600px] glass z-[150] rounded-[32px] flex flex-col overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
    >
      {/* Header */}
      <div className="bg-[#101827] text-white p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500/20 p-2 rounded-xl">
            <Cpu size={20} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em]">Architecture Observer</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Real-time Stream: Connected</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)} 
          className="bg-white/5 p-2 rounded-xl hover:bg-white/10 hover:rotate-90 transition-all duration-300"
        >
          <X size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#101827] px-4 pt-2">
        <button 
          onClick={() => setActiveTab('logs')}
          className={`flex-1 py-4 text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all rounded-t-2xl ${activeTab === 'logs' ? 'bg-[#0B0F1A] text-white border-x border-t border-white/10' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <LayoutGrid size={14} /> System Logs
        </button>
        <button 
          onClick={() => setActiveTab('metrics')}
          className={`flex-1 py-4 text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all rounded-t-2xl ${activeTab === 'metrics' ? 'bg-[#0B0F1A] text-white border-x border-t border-white/10' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <BarChart3 size={14} /> Observability
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto p-6 font-mono text-[11px] bg-[#0B0F1A]">
        <AnimatePresence mode="wait">
          {activeTab === 'logs' ? (
            <motion.div 
              key="logs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {logs.filter(l => l.service !== 'PROMETHEUS').length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-700 opacity-50 italic">
                  <Activity size={32} className="mb-4 animate-spin-slow" />
                  Waiting for backend events...
                </div>
              )}
              {logs.filter(l => l.service !== 'PROMETHEUS').map((log) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={log.id} 
                  className={`group relative border-l-2 pl-4 py-2 transition-all hover:bg-white/5 rounded-r-xl ${
                    log.type === 'error' ? 'border-red-500 text-red-400' : 
                    log.type === 'success' ? 'border-green-500 text-green-400' : 
                    log.type === 'warning' ? 'border-yellow-500 text-yellow-400' : 
                    'border-blue-500 text-blue-400'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-black text-[9px] uppercase tracking-tighter opacity-80 bg-white/5 px-1.5 py-0.5 rounded">
                      {log.service}
                    </span>
                    <span className="text-[8px] opacity-30 font-bold">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="leading-relaxed font-medium tracking-tight whitespace-pre-wrap">{log.message}</div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="metrics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 pt-2"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-gray-500 text-[8px] uppercase font-black tracking-widest mb-2">P99 Latency</div>
                  <div className="text-3xl font-black text-green-400 tracking-tighter">{metrics.latency}<span className="text-xs ml-1 text-green-800">ms</span></div>
                </div>
                <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-gray-500 text-[8px] uppercase font-black tracking-widest mb-2">Throughput</div>
                  <div className="text-3xl font-black text-blue-400 tracking-tighter">{metrics.throughput}</div>
                  <div className="text-[8px] text-gray-600 font-bold mt-1 uppercase">Requests / Sec</div>
                </div>
              </div>

              <div className="bg-white/[0.03] rounded-3xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-yellow-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Kafka Topic Health</span>
                  </div>
                  <span className="text-[9px] font-black text-yellow-400">{metrics.lag}ms LAG</span>
                </div>
                <div className="space-y-3">
                  {['order-events', 'inventory-updates', 'payment-status'].map(topic => (
                    <div key={topic} className="flex items-center gap-3">
                      <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ width: [Math.random()*40+20+'%', Math.random()*40+60+'%', Math.random()*40+40+'%'] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="h-full bg-yellow-400/50"
                        />
                      </div>
                      <span className="text-[8px] text-gray-500 min-w-[80px] text-right">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/20 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500/20 p-2 rounded-xl">
                    <Cloud size={16} className="text-blue-400" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Global Cluster Health</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                    <div className="text-[8px] text-gray-500 uppercase font-bold mb-1">AWS US-EAST-1</div>
                    <div className="text-[10px] font-black text-green-500">OPERATIONAL</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                    <div className="text-[8px] text-gray-500 uppercase font-bold mb-1">AWS AP-SOUTH-1</div>
                    <div className="text-[10px] font-black text-green-500">OPERATIONAL</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="bg-[#101827] p-4 flex justify-between border-t border-white/5">
        <button 
          onClick={clearLogs}
          className="bg-white/5 px-4 py-2 rounded-xl text-[8px] text-gray-500 hover:text-white hover:bg-white/10 uppercase font-black transition-all"
        >
          Purge Buffer
        </button>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
          <span className="text-[8px] text-gray-500 font-black uppercase">Service Mesh: Istio</span>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
