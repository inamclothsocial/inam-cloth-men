import { termsIntro, termsSectionsPart1 } from './termsDataPart1';
import { termsSectionsPart2 } from './termsDataPart2';

export const termsData = {
  ...termsIntro,
  sections: [...termsSectionsPart1, ...termsSectionsPart2]
};
