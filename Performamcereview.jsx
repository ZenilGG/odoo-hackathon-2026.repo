import React, { useState } from 'react';
import { Award, TrendingUp, Star } from 'lucide-react';

const PerformanceReview = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            employeeName: 'John Doe',
            rating: 4.5,
            period: 'Q4 2025',
            feedback: 'Excellent performance with strong technical skills. Consistently delivers high-quality work and shows great teamwork.'
        },
        {
            id: 2,
            employeeName: 'Jane Smith',
            rating: 5.0,
            period: 'Q4 2025',
            feedback: 'Outstanding performance! Exceeded all expectations and demonstrated exceptional leadership qualities.'
        },
        {
            id: 3,
            employeeName: 'Mike Johnson',
            rating: 3.8,
            period: 'Q4 2025',
            feedback: 'Good performance overall. Shows improvement in communication skills. Needs to work on time management.'
        },
        {
            id: 4,
            employeeName: 'Sarah Williams',
            rating: 4.7,
            period: 'Q4 2025',
            feedback: 'Exceptional problem-solving abilities and proactive approach. Great asset to the team.'
        },
        {
            id: 5,
            employeeName: 'David Brown',
            rating: 4.2,
            period: 'Q4 2025',
            feedback: 'Strong performer with good technical knowledge. Shows dedication and willingness to learn new skills.'
        },
        {
            id: 6,
            employeeName: 'Emily Davis',
            rating: 4.8,
            period: 'Q4 2025',
            feedback: 'Excellent collaboration skills and innovative thinking. Consistently meets deadlines and quality standards.'
        },
        {
            id: 7,
            employeeName: 'Robert Wilson',
            rating: 3.5,
            period: 'Q4 2025',
            feedback: 'Satisfactory performance. Needs improvement in project ownership and initiative taking.'
        },
        {
            id: 8,
            employeeName: 'Lisa Anderson',
            rating: 4.6,
            period: 'Q4 2025',
            feedback: 'Very strong performance with excellent attention to detail. Great mentoring skills with junior team members.'
        }
    ]);

    const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
    const excellentCount = reviews.filter(r => r.rating >= 4.5).length;
    const goodCount = reviews.filter(r => r.rating >= 3.5 && r.rating < 4.5).length;
    const needsImprovementCount = reviews.filter(r => r.rating < 3.5).length;

    const getRatingColor = (rating) => {
        if (rating >= 4.5) return 'text-green-600';
        if (rating >= 3.5) return 'text-blue-600';
        return 'text-orange-600';
    };

    const getRatingBadge = (rating) => {
        if (rating >= 4.5) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
        if (rating >= 3.5) return { text: 'Good', color: 'bg-blue-100 text-blue-800' };
        return { text: 'Needs Improvement', color: 'bg-orange-100 text-orange-800' };
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Performance Reviews</h1>
                    <p className="text-gray-600 mt-1">Track and manage employee performance</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Average Rating</p>
                                <p className="text-3xl font-bold text-indigo-600 mt-2">{averageRating}</p>
                            </div>
                            <Star className="text-indigo-500" size={40} />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Excellent</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{excellentCount}</p>
                            </div>
                            <Award className="text-green-500" size={40} />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Good</p>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{goodCount}</p>
                            </div>
                            <TrendingUp className="text-blue-500" size={40} />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Needs Improvement</p>
                                <p className="text-3xl font-bold text-orange-600 mt-2">{needsImprovementCount}</p>
                            </div>
                            <TrendingUp className="text-orange-500" size={40} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => {
                        const badge = getRatingBadge(review.rating);
                        return (
                            <div key={review.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{review.employeeName}</h3>
                                    <Award className="text-indigo-600" size={24} />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Rating:</span>
                                        <span className={`font-bold text-xl ${getRatingColor(review.rating)}`}>
                                            {review.rating}/5
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Period:</span>
                                        <span className="text-gray-800 font-medium">{review.period}</span>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${badge.color}`}>
                                            {badge.text}
                                        </span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-600 leading-relaxed">{review.feedback}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PerformanceReview;