import {useEffect, useState} from "react";
import {Calendar, FileText, UserCheck, Users} from "lucide-react";

const Dashboard = ({ user }) => {
    const [stats, setStats] = useState({
        totalEmployees: 248,
        presentToday: 232,
        onLeave: 16,
        pendingTasks: 12
    });
    const [activities, setActivities] = useState([
        { action: 'John Doe applied for leave', time: '2 hours ago' },
        { action: 'New employee onboarding completed', time: '5 hours ago' },
        { action: 'Performance review scheduled', time: '1 day ago' }
    ]);
    const [events, setEvents] = useState([
        { title: 'Team Building Activity', date: 'Jan 15, 2026' },
        { title: 'Annual Performance Review', date: 'Jan 20, 2026' },
        { title: 'Training Session: Leadership', date: 'Jan 25, 2026' }
    ]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const data = await api.get('/api/dashboard');
            if (data.stats) setStats(data.stats);
            if (data.activities) setActivities(data.activities);
            if (data.events) setEvents(data.events);
        } catch (error) {
            console.log('Using default dashboard data');
        }
    };

    const statCards = [
        { label: 'Total Employees', value: stats.totalEmployees, icon: Users, color: 'bg-blue-500' },
        { label: 'Present Today', value: stats.presentToday, icon: UserCheck, color: 'bg-green-500' },
        { label: 'On Leave', value: stats.onLeave, icon: Calendar, color: 'bg-yellow-500' },
        { label: 'Pending Tasks', value: stats.pendingTasks, icon: FileText, color: 'bg-purple-500' }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name || 'User'}!</h1>
                <p className="text-gray-600 mt-1">Here's what's happening in your organization today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-full`}>
                                <stat.icon className="text-white" size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                                <div className="flex-1">
                                    <p className="text-gray-800">{activity.action}</p>
                                    <p className="text-sm text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h3>
                    <div className="space-y-4">
                        {events.map((event, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border-l-4 border-indigo-600 bg-indigo-50 rounded">
                                <p className="text-gray-800 font-medium">{event.title}</p>
                                <p className="text-sm text-gray-600">{event.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard