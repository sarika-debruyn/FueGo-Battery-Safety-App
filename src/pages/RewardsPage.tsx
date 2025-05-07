import React, { useState } from 'react';
import { Award, Gift, Star, TrendingUp, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { availableRewards, userAchievements, userPoints } from '../data/mockData';

const RewardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rewards' | 'achievements'>('rewards');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  
  const handleRedeem = (rewardId: string) => {
    setSelectedReward(rewardId);
    setShowRedeemModal(true);
  };
  
  const confirmRedeem = () => {
    alert(`Reward redeemed successfully! Check your email for details.`);
    setShowRedeemModal(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Rewards & Achievements</h1>
        <Badge variant="primary" size="lg" className="flex items-center">
          <Award className="mr-2" size={16} />
          <span>{userPoints} Points</span>
        </Badge>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
              activeTab === 'rewards' 
                ? 'text-teal-600 border-b-2 border-teal-600' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab('rewards')}
          >
            Available Rewards
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
              activeTab === 'achievements' 
                ? 'text-teal-600 border-b-2 border-teal-600' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'rewards' && (
            <div>
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg text-white p-6 mb-6">
                <div className="flex items-start">
                  <div className="p-3 bg-white bg-opacity-20 rounded-lg mr-4">
                    <Gift className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Earn More Points</h2>
                    <p className="mt-1 opacity-90">Complete achievements and maintain a high safety score to earn reward points.</p>
                    <div className="mt-4 flex space-x-4">
                      <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                        <p className="text-sm opacity-80">Log daily charges</p>
                        <p className="font-semibold mt-1">+5 points/day</p>
                      </div>
                      <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                        <p className="text-sm opacity-80">Keep safe score {'>'} 85</p>
                        <p className="font-semibold mt-1">+20 points/week</p>
                      </div>
                      <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                        <p className="text-sm opacity-80">Complete maintenance</p>
                        <p className="font-semibold mt-1">+50 points</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {availableRewards.map((reward) => {
                  const isRedeemable = userPoints >= reward.points;
                  
                  return (
                    <Card key={reward.id} className="p-0">
                      <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            isRedeemable ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                            <Award size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-800">{reward.title}</h3>
                            <p className="text-sm text-slate-500">{reward.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge 
                            variant={isRedeemable ? 'primary' : 'default'} 
                            size="sm" 
                            className="mb-2"
                          >
                            {reward.points} points
                          </Badge>
                          <Button
                            variant={isRedeemable ? 'primary' : 'outline'}
                            size="sm"
                            disabled={!isRedeemable}
                            onClick={() => isRedeemable && handleRedeem(reward.id)}
                          >
                            {isRedeemable ? 'Redeem Now' : 'Not Enough Points'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-slate-800 mb-3">Reward History</h3>
                <Card className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Reward</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Points Used</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Date</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="py-3 px-4 text-sm text-slate-600">Free Battery Check</td>
                        <td className="py-3 px-4 text-sm text-slate-600">150</td>
                        <td className="py-3 px-4 text-sm text-slate-600">May 2, 2025</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge variant="success" size="sm">Redeemed</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-slate-600">10% Discount on Accessories</td>
                        <td className="py-3 px-4 text-sm text-slate-600">100</td>
                        <td className="py-3 px-4 text-sm text-slate-600">April 15, 2025</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge variant="success" size="sm">Redeemed</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div>
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white p-6 mb-6">
                <div className="flex items-start">
                  <div className="p-3 bg-white bg-opacity-20 rounded-lg mr-4">
                    <Star className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Achievement Progress</h2>
                    <p className="mt-1 opacity-90">Complete achievements to earn points and unlock special rewards.</p>
                    <div className="mt-4">
                      <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2" 
                          style={{ width: `${(userAchievements.filter(a => a.isCompleted).length / userAchievements.length) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">
                        {userAchievements.filter(a => a.isCompleted).length} of {userAchievements.length} achievements completed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {userAchievements.map((achievement) => (
                  <Card key={achievement.id} className="p-0">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          achievement.isCompleted ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          <Star size={20} />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-slate-800">{achievement.title}</h3>
                            {achievement.isCompleted && (
                              <Badge variant="success" size="sm" className="ml-2">Completed</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">{achievement.description}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium text-slate-800">
                            {achievement.progress}/{achievement.totalNeeded}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`${achievement.isCompleted ? 'bg-green-500' : 'bg-amber-500'} rounded-full h-2`}
                            style={{ width: `${(achievement.progress / achievement.totalNeeded) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {achievement.isCompleted && (
                        <div className="mt-3 bg-green-50 p-2 rounded-md text-sm text-green-700 flex items-center">
                          <TrendingUp size={16} className="mr-2" />
                          You earned 50 points for completing this achievement
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Redeem Confirmation Modal */}
      {showRedeemModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Confirm Redemption</h3>
            <p className="text-sm text-slate-600 mb-4">
              Are you sure you want to redeem{' '}
              <span className="font-medium text-teal-600">
                {availableRewards.find(r => r.id === selectedReward)?.title}
              </span>{' '}
              for{' '}
              <span className="font-medium text-teal-600">
                {availableRewards.find(r => r.id === selectedReward)?.points} points
              </span>?
            </p>
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowRedeemModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={confirmRedeem}
              >
                Confirm Redemption
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsPage;