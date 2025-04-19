import englishTips from './EBMHealthTipEnglish';
import arabicTips from './EBMHealthTipArabic';

export const getEBMHealthTips = (language = 'en') => {
  return language === 'ar' ? arabicTips : englishTips;
};