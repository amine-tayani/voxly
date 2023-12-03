'use client';

import { useEffect, useState } from 'react';
import { QuestionCard } from './question-card';
import { useGeolocated } from 'react-geolocated';
import { Skeleton } from './ui/skeleton';

export function QuestionFeed() {
  const [nearbyQuestions, setNearbyQuestions] = useState([]);

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    const fetchNearbyQuestions = async () => {
      const latitude = coords?.latitude;
      const longitude = coords?.longitude;

      const url = `http://localhost:4000/api/questions/nearby?longitude=${longitude}&latitude=${latitude}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setNearbyQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching nearby questions:', error);
      }
    };

    fetchNearbyQuestions();
  }, [coords?.latitude, coords?.longitude]);

  return (
    <div className='space-y-3 my-4'>
      {nearbyQuestions?.length > 0 &&
        nearbyQuestions.map((question, id) => (
          <QuestionCard question={question} key={id} />
        ))}
      {nearbyQuestions?.length === 0 && (
        <div className='flex flex-col space-y-10 px-4 py-3'>
          <div className='prose-invert prose-h3:text-xl flex flex-col space-y-2'>
            <Skeleton className='w-[500px] h-28 rounded-lg bg-gray-300' />
            <Skeleton className='w--[500px] h-28 rounded-lg bg-gray-300' />
            <Skeleton className='w-[500px] h-28 rounded-lg bg-gray-300' />
            <Skeleton className='w-[500px] h-28 rounded-lg bg-gray-300' />
          </div>
        </div>
      )}
    </div>
  );
}
