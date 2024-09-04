import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Fetcher function for different sections
const fetchVocabularyData = async (section) => {
  const jwtToken = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  switch (section) {
    case 'misspelled':
      const misspelledResponse = await axios.get('http://localhost:3000/misSpellings/misSpellings', { headers });
      return { misspelledWords: misspelledResponse.data.misspelledWords || [] };
    case 'repeated':
      const repeatedResponse = await axios.get('http://localhost:3000/repeatedWords/repeatedWords', { headers });
      return { repeatedWords: repeatedResponse.data.commonWords || [] };
    case 'rare':
      const rareResponse = await axios.get('http://localhost:3000/rareWords/rareWords', { headers });
      return { rareWords: rareResponse.data.rareWords || [] };
    case 'lexicalDensity':
    case 'overview':
      const [lexicalResponse, misspelledRes, advancedResponse] = await Promise.all([
        axios.get('http://localhost:3000/lexicalDensity/lexicalDensity', { headers }),
        axios.get('http://localhost:3000/misSpellings/misSpellings', { headers }),
        axios.get('http://localhost:3000/advancedVocabulary/advancedVocabulary', { headers }),
      ]);
      return {
        lexicalDensity: parseFloat(lexicalResponse.data.lexicalDensity) || 0,
        totalWords: lexicalResponse.data.totalWords || 0,
        uniqueWords: lexicalResponse.data.uniqueWords || 0,
        contentWords: lexicalResponse.data.contentWords || 0,
        misspelledWords: misspelledRes.data.misspelledWords || [],
        advancedWordsUsed: advancedResponse.data.advancedWordsUsed || {},
        advancedWordsSuggestions: advancedResponse.data.suggestions || [],
        advancedWordsMessage: advancedResponse.data.message || '',
      };
    case 'advanced':
      const advancedRes = await axios.get('http://localhost:3000/advancedVocabulary/advancedVocabulary', { headers });
      return {
        advancedWordsUsed: advancedRes.data.advancedWordsUsed || {},
        advancedWordsSuggestions: advancedRes.data.suggestions || [],
        advancedWordsMessage: advancedRes.data.message || '',
      };
    default:
      return {};
  }
};

// Hook to use vocabulary data, with caching and refetching
export function useVocabularyData(activeSection) {
  return useQuery({
    queryKey: [activeSection], // Pass the section as queryKey
    queryFn: () => fetchVocabularyData(activeSection), // Use function to fetch data
    staleTime: 300000, // Cache data for 5 minutes
    cacheTime: 600000, // Keep data in cache for 10 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
}
