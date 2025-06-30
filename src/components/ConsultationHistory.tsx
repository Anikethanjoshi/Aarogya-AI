import React, { useState } from 'react';
import { Calendar, Clock, Video, FileText, Download, Eye } from 'lucide-react';
import { ConsultationSession } from '../types';
import Modal from './UI/Modal';

interface ConsultationHistoryProps {
  sessions: ConsultationSession[];
  onViewSession?: (session: ConsultationSession) => void;
}

const ConsultationHistory: React.FC<ConsultationHistoryProps> = ({ sessions, onViewSession }) => {
  const [selectedSession, setSelectedSession] = useState<ConsultationSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewSession = (session: ConsultationSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
    if (onViewSession) {
      onViewSession(session);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Consultation History</h3>
      
      {sessions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No consultations yet. Start your first AI session!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Video className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Session with {session.aiAgent}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{session.startTime.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{session.duration ? formatDuration(session.duration) : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                  
                  <button
                    onClick={() => handleViewSession(session)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {session.summary && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 line-clamp-2">{session.summary}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Session Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Session Details"
        size="lg"
      >
        {selectedSession && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">AI Agent</label>
                <p className="text-gray-900">{selectedSession.aiAgent}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSession.status)}`}>
                  {selectedSession.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <p className="text-gray-900">{selectedSession.startTime.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <p className="text-gray-900">
                  {selectedSession.duration ? formatDuration(selectedSession.duration) : 'N/A'}
                </p>
              </div>
            </div>

            {selectedSession.summary && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Summary</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedSession.summary}</p>
                </div>
              </div>
            )}

            {selectedSession.recommendations && selectedSession.recommendations.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations</label>
                <ul className="space-y-2">
                  {selectedSession.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedSession.transcript && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transcript</label>
                <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">{selectedSession.transcript}</pre>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  // Download session data as JSON
                  const dataStr = JSON.stringify(selectedSession, null, 2);
                  const dataBlob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `session-${selectedSession.id}.json`;
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ConsultationHistory;