import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Reward, Achievement } from '../../types';

interface RewardsWidgetProps {
  rewards: Reward[];
  achievements: Achievement[];
  userPoints: number;
  onViewAllRewards?: () => void;
}

const RewardsWidget: React.FC<RewardsWidgetProps> = ({
  rewards,
  achievements,
  userPoints,
  onViewAllRewards,
}) => {
  // Display only the first 2 rewards and 2 achievements
  const topRewards = rewards.slice(0, 2);
  const recentAchievements = achievements.slice(0, 2);
  
  return (
    <Card
      title="Rewards & Achievements"
      icon={<Award className="text-amber-500" size={20} />}
      className="h-full"
      footer={
        <Button 
          variant="ghost" 
          size="sm" 
          icon={<ChevronRight size={16} />} 
          iconPosition="right"
          onClick={onViewAllRewards}
          className="w-full justify-between"
        >
          View all rewards and achievements
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-lg p-4 text-white">
          <p className="text-sm font-semibold">Your reward points</p>
          <div className="flex items-baseline mt-1">
            <span className="text-3xl font-bold">{userPoints}</span>
            <span className="text-xs opacity-75 ml-1">points</span>
          </div>
          <p className="text-xs mt-2 opacity-90">
            Earn points by maintaining high safety scores and completing achievements
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-2">Available Rewards</h4>
          <div className="space-y-3">
            {topRewards.map((reward) => (
              <div key={reward.id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <Award className="text-amber-500" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{reward.title}</p>
                    <p className="text-xs text-slate-500">{reward.points} points</p>
                  </div>
                </div>
                <Button
                  variant={userPoints >= reward.points ? 'primary' : 'outline'}
                  size="sm"
                  disabled={userPoints < reward.points}
                >
                  {userPoints >= reward.points ? 'Redeem' : 'Locked'}
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-2">Recent Achievements</h4>
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    achievement.isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{achievement.title}</p>
                    <p className="text-xs text-slate-500">{achievement.description}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                    <div
                      className={`${
                        achievement.isCompleted ? 'bg-green-500' : 'bg-amber-500'
                      } h-1.5 rounded-full`}
                      style={{ width: `${(achievement.progress / achievement.totalNeeded) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {achievement.isCompleted
                      ? 'Completed!'
                      : `Progress: ${achievement.progress}/${achievement.totalNeeded}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RewardsWidget;