export interface TierItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  votes: number;
  tier: 'A' | 'B' | 'C' | 'D';
}