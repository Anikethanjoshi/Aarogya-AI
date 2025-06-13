import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Heart, 
  Activity,
  Users,
  Star,
  Play,
  BarChart3,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      name: 'Tavus AI Sessions',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: Video
    },
    {
      name: 'This Month',
      value: '8',
      change: '+4',
      changeType: 'increase',
      icon: Calendar
    },
    {
      name: 'Avg. Session Time',
      value: '15m',
      change: '+2m',
      changeType: 'increase',
      icon: Clock
    },
    {
      name: 'Health Score',
      value: '85',
      change: '+5',
      changeType: 'increase',
      icon: TrendingUp
    }
  ];

  const recentSessions = [
    {
      id: '1',
      date: '2024-01-15',
      time: '10:30 AM',
      duration: '18 minutes',
      aiAgent: 'Dr. Aarogya (Tavus)',
      status: 'completed',
      topic: 'General Health Check',
      tavusSessionId: 'tvs_12345'
    },
    {
      id: '2',
      date: '2024-01-12',
      time: '2:15 PM',
      duration: '22 minutes',
      aiAgent: 'Dr. Aarogya (Tavus)',
      status: 'completed',
      topic: 'Symptom Analysis',
      tavusSessionId: 'tvs_12346'
    },
    {
      id: '3',
      date: '2024-01-10',
      time: '9:45 AM',
      duration: '15 minutes',
      aiAgent: 'Dr. Aarogya (Tavus)',
      status: 'completed',
      topic: 'Wellness Guidance',
      tavusSessionId: 'tvs_12347'
    }
  ];

  const healthMetrics = [
    { name: 'Blood Pressure', value: '120/80', status: 'normal', trend: 'stable' },
    { name: 'Heart Rate', value: '72 bpm', status: 'normal', trend: 'improving' },
    { name: 'BMI', value: '23.5', status: 'normal', trend: 'stable' },
    { name: 'Sleep Quality', value: '7.5/10', status: 'good', trend: 'improving' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your Tavus AI health dashboard overview
        </p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
          <Zap className="w-4 h-4 mr-2" />
          Built with Bolt.new • Powered by Tavus AI
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/consultation" className="group">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-200 group-hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Start Tavus AI Session</h3>
                <p className="text-blue-100">Connect with your AI health companion</p>
              </div>
              <Play className="h-8 w-8 text-blue-200" />
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Follow-up</h3>
              <p className="text-gray-600">Book your next AI session</p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Reports</h3>
              <p className="text-gray-600">View your AI insights</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Sessions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Tavus AI Sessions</h2>
              <Link to="/consultation" className="text-blue-600 hover:text-blue-700 font-medium">
                Start New Session
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Video className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.topic}</h3>
                      <p className="text-sm text-gray-600">
                        {session.date} at {session.time} • {session.duration}
                      </p>
                      <p className="text-xs text-purple-600">
                        Tavus Session: {session.tavusSessionId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Metrics</h2>
            
            <div className="space-y-4">
              {healthMetrics.map((metric) => (
                <div key={metric.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{metric.name}</p>
                    <p className="text-sm text-gray-600">{metric.value}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      metric.status === 'normal' ? 'bg-green-100 text-green-800' :
                      metric.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {metric.status}
                    </span>
                    <p className={`text-xs mt-1 ${
                      metric.trend === 'improving' ? 'text-green-600' :
                      metric.trend === 'stable' ? 'text-gray-600' :
                      'text-red-600'
                    }`}>
                      {metric.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6" variant="outline">
              View Detailed Report
            </Button>
          </div>

          {/* Subscription Status */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="h-5 w-5" />
              <span className="font-medium">{user?.subscription || 'Premium'} Plan</span>
            </div>
            <p className="text-green-100 text-sm mb-4">
              Unlimited Tavus AI consultations • Priority support • Advanced analytics
            </p>
            <Link to="/subscription" className="text-white hover:text-green-100 font-medium text-sm">
              Manage subscription →
            </Link>
          </div>

          {/* Tavus Integration Status */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              Tavus AI Status
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-purple-700">API Status:</span>
                <span className="text-green-600 font-medium">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Sessions Available:</span>
                <span className="text-purple-800 font-medium">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">API Key:</span>
                <span className="text-purple-600 font-mono text-xs">
                  {user?.tavusApiKey ? `${user.tavusApiKey.substring(0, 8)}...` : 'Not set'}
                </span>
              </div>
            </div>
            <a 
              href="https://tavus.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-3 inline-block"
            >
              Learn more about Tavus →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;