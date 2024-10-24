import React, { useEffect, useState } from 'react';
import { TierItem } from '../types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import Cookies from 'js-cookie';
import { clsx } from 'clsx';

const TIERS = ['A', 'B', 'C', 'D'] as const;
const TIER_COLORS = {
  A: 'from-emerald-500 to-emerald-400',
  B: 'from-blue-500 to-blue-400',
  C: 'from-yellow-500 to-yellow-400',
  D: 'from-red-500 to-red-400',
};

interface TierListProps {
  items: TierItem[];
  onVote: (id: string, isUpvote: boolean) => void;
}

export const TierList: React.FC<TierListProps> = ({ items, onVote }) => {
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadVotedItems = () => {
      const voted = new Set<string>();
      items.forEach((item) => {
        if (Cookies.get(`vote_${item.id}`)) {
          voted.add(item.id);
        }
      });
      setVotedItems(voted);
    };
    loadVotedItems();
  }, [items]);

  const hasVoted = (id: string) => {
    return votedItems.has(id);
  };

  const handleVote = (id: string, isUpvote: boolean) => {
    if (!hasVoted(id)) {
      Cookies.set(`vote_${id}`, 'true', {
        expires: 365,
        sameSite: 'strict',
        secure: true
      });
      setVotedItems(prev => new Set([...prev, id]));
      onVote(id, isUpvote);
    }
  };

  return (
    <div className="space-y-8">
      {TIERS.map((tier) => (
        <div key={tier} className="rounded-xl overflow-hidden shadow-lg">
          <div className={clsx(
            'bg-gradient-to-r p-4 text-white',
            TIER_COLORS[tier]
          )}>
            <h2 className="text-2xl font-bold">Tier {tier}</h2>
          </div>
          <div className="bg-white p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items
                .filter((item) => item.tier === tier)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {item.votes} votes
                        </span>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleVote(item.id, true)}
                            disabled={hasVoted(item.id)}
                            className={clsx(
                              'p-2 rounded-full transition-all duration-300',
                              hasVoted(item.id)
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-green-100 text-green-600 hover:bg-green-200 hover:scale-110'
                            )}
                            title={hasVoted(item.id) ? "You've already voted" : "Vote up"}
                          >
                            <ThumbsUp size={20} />
                          </button>
                          <button
                            onClick={() => handleVote(item.id, false)}
                            disabled={hasVoted(item.id)}
                            className={clsx(
                              'p-2 rounded-full transition-all duration-300',
                              hasVoted(item.id)
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-red-100 text-red-600 hover:bg-red-200 hover:scale-110'
                            )}
                            title={hasVoted(item.id) ? "You've already voted" : "Vote down"}
                          >
                            <ThumbsDown size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};