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
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      name: 'Total Consultations',
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
      aiAgent: 'Dr. Aarogya',
      status: 'completed',
      topic: 'General Health Check'
    },
    {
      id: '2',
      date: '2024-01-12',
      time: '2:15 PM',
      duration: '22 minutes',
      aiAgent: 'Dr. Aarogya',
      status: 'completed',
      topic: 'Symptom Analysis'
    },
    {
      id: '3',
      date: '2024-01-10',
      time: '9:45 AM',
      duration: '15 minutes',
      aiAgent: 'Dr. Aarogya',
      status: 'completed',
      topic: 'Wellness Guidance'
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
          Here's your health dashboard overview
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/consultation" className="group">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-200 group-hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Start Consultation</h3>
                <p className="text-primary-100">Connect with your AI health companion</p>
              </div>
              <Play className="h-8 w-8 text-primary-200" />
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Follow-up</h3>
              <p className="text-gray-600">Book your next session</p>
            </div>
            <Calendar className="h-8 w-8 text-health-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Reports</h3>
              <p className="text-gray-600">View your progress</p>
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
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600" />
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
              <h2 className="text-xl font-semibold text-gray-900">Recent Sessions</h2>
              <Link to="/consultation" className="text-primary-600 hover:text-primary-700 font-medium">
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <Video className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.topic}</h3>
                      <p className="text-sm text-gray-600">
                        {session.date} at {session.time} • {session.duration}
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
          <div className="bg-white rounded-xl border border-gray-200 p-6">
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
          <div className="bg-gradient-to-r from-health-500 to-health-600 rounded-xl p-6 text-white mt-6">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="h-5 w-5" />
              <span className="font-medium">Premium Plan</span>
            </div>
            <p className="text-health-100 text-sm mb-4">
              Unlimited consultations • Priority support • Advanced analytics
            </p>
            <Link to="/subscription" className="text-white hover:text-health-100 font-medium text-sm">
              Manage subscription →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;