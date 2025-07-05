
import { useState } from 'react';
import { Plus, Search, Filter, Bell, User, Settings, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TaskList } from '@/components/TaskList';
import { TaskForm } from '@/components/TaskForm';
import { AuthModal } from '@/components/AuthModal';
import { StatsCards } from '@/components/StatsCards';

const Index = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const filters = [
    { id: 'all', label: 'All Tasks', count: 12 },
    { id: 'today', label: 'Due Today', count: 3 },
    { id: 'overdue', label: 'Overdue', count: 1 },
    { id: 'completed', label: 'Completed', count: 8 },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Task<span className="text-blue-600">Flow</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Collaborate, organize, and achieve more with your team
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Organization</h3>
                <p className="text-gray-600">Filter by priority, due date, and status to stay focused</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
                <p className="text-gray-600">Share tasks and collaborate in real-time with your team</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                <p className="text-gray-600">See changes instantly across all devices and team members</p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-gray-300 px-8 py-3"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          onAuthenticated={() => setIsAuthenticated(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards />

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <div className="flex space-x-2">
                  {filters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedFilter === filter.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.id)}
                      className="text-xs"
                    >
                      {filter.label}
                      <Badge variant="secondary" className="ml-2">
                        {filter.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={() => setIsTaskFormOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <TaskList searchQuery={searchQuery} selectedFilter={selectedFilter} />
      </div>

      {/* Task Form Modal */}
      <TaskForm 
        isOpen={isTaskFormOpen} 
        onClose={() => setIsTaskFormOpen(false)} 
      />
    </div>
  );
};

export default Index;
