
import { useState } from 'react';
import { Calendar, User, AlertCircle, CheckCircle2, Clock, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate?: string;
  assignedTo?: string[];
  tags?: string[];
  createdAt: string;
}

interface TaskListProps {
  searchQuery: string;
  selectedFilter: string;
}

export const TaskList = ({ searchQuery, selectedFilter }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design user authentication flow',
      description: 'Create wireframes and mockups for the OAuth login process',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-01-15',
      assignedTo: ['john@example.com'],
      tags: ['design', 'auth'],
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Implement real-time task updates',
      description: 'Set up WebSocket connection for live task synchronization',
      priority: 'high',
      status: 'todo',
      dueDate: '2024-01-12',
      assignedTo: ['sarah@example.com'],
      tags: ['backend', 'realtime'],
      createdAt: '2024-01-09'
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all endpoints with examples and response formats',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-01-08',
      assignedTo: ['mike@example.com'],
      tags: ['documentation'],
      createdAt: '2024-01-05'
    },
    {
      id: '4',
      title: 'Set up deployment pipeline',
      description: 'Configure CI/CD for automated testing and deployment',
      priority: 'medium',
      status: 'todo',
      dueDate: '2024-01-20',
      assignedTo: ['alex@example.com'],
      tags: ['devops', 'deployment'],
      createdAt: '2024-01-11'
    }
  ]);

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed' }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    switch (selectedFilter) {
      case 'today':
        return task.dueDate === '2024-01-15'; // Mock today's date
      case 'overdue':
        return new Date(task.dueDate || '') < new Date('2024-01-15');
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <CheckCircle2 className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <Card 
              key={task.id} 
              className={`transition-all duration-200 hover:shadow-md border-l-4 ${
                task.priority === 'high' ? 'border-l-red-500' : 
                task.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
              } ${task.status === 'completed' ? 'opacity-75' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Checkbox
                      checked={task.status === 'completed'}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${
                          task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(task.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className="text-gray-600 mb-4">{task.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          
                          {task.dueDate && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                          
                          {task.assignedTo && task.assignedTo.length > 0 && (
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="w-4 h-4 mr-1" />
                              {task.assignedTo[0]}
                            </div>
                          )}
                        </div>
                        
                        {task.tags && (
                          <div className="flex space-x-1">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
