import React from 'react';
import { useData } from '../context/DataContext';
import { Check, Info, AlertTriangle, Bell } from 'lucide-react';

const Notifications: React.FC = () => {
  const { notifications, markNotificationRead } = useData();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="text-indigo-600" /> Notifications
         </h1>
         <span className="text-sm text-slate-500">{notifications.length} reçues</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
             <Bell size={48} className="mx-auto mb-4 opacity-20" />
             <p>Aucune notification pour le moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
             {notifications.map(notif => (
               <div 
                  key={notif.id} 
                  className={`p-6 flex items-start gap-4 transition-colors ${notif.read ? 'bg-white' : 'bg-indigo-50/50'}`}
                  onClick={() => markNotificationRead(notif.id)}
               >
                  <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                      notif.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                      'bg-indigo-100 text-indigo-600'
                  }`}>
                      {notif.type === 'success' ? <Check size={20} /> :
                       notif.type === 'warning' ? <AlertTriangle size={20} /> :
                       <Info size={20} />}
                  </div>
                  <div className="flex-1">
                     <p className={`text-slate-800 ${!notif.read ? 'font-semibold' : ''}`}>
                       {notif.message}
                     </p>
                     <p className="text-xs text-slate-400 mt-1">{notif.date}</p>
                  </div>
                  {!notif.read && (
                     <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                  )}
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;