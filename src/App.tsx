import React, { useState } from 'react';
import { TierList } from './components/TierList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TierItem } from './types';

const initialItems: TierItem[] = [
  {
    id: '1',
    name: 'Webflow',
    description: 'Professional web design without code, with powerful CMS and hosting solutions',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    votes: 150,
    tier: 'A',
  },
  {
    id: '2',
    name: 'Bubble.io',
    description: 'Build full-stack web applications with a visual programming interface',
    imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6',
    votes: 120,
    tier: 'A',
  },
  {
    id: '3',
    name: 'Airtable',
    description: 'Flexible database and workflow management platform',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    votes: 90,
    tier: 'B',
  },
  {
    id: '4',
    name: 'Zapier',
    description: 'Automated workflow integration between apps',
    imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a',
    votes: 75,
    tier: 'C',
  },
  {
    id: '5',
    name: 'AppSheet',
    description: 'Google\'s no-code platform for mobile and web apps',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    votes: 60,
    tier: 'D',
  },
];

function App() {
  const [items, setItems] = useState<TierItem[]>(initialItems);

  const handleVote = (id: string, isUpvote: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              votes: item.votes + (isUpvote ? 1 : -1),
              tier: calculateNewTier(item.votes + (isUpvote ? 1 : -1)),
            }
          : item
      )
    );
  };

  const calculateNewTier = (votes: number): TierItem['tier'] => {
    if (votes >= 100) return 'A';
    if (votes >= 80) return 'B';
    if (votes >= 70) return 'C';
    return 'D';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <TierList items={items} onVote={handleVote} />
      </main>
      <Footer />
    </div>
  );
}

export default App;