import { supabase } from '../lib/supabase';
import type { SearchSuggestion } from '../types';

export async function searchStocks(query: string): Promise<SearchSuggestion[]> {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('symbol, name, type')
      .or(`symbol.ilike.%${query}%,name.ilike.%${query}%`)
      .limit(10);

    if (error) throw error;

    return data.map(stock => ({
      id: stock.symbol,
      symbol: stock.symbol,
      name: stock.name,
      type: stock.type,
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
}