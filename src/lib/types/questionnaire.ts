// src/lib/types/questionnaire.ts
export type QuestionType = 'single' | 'switch' | 'multi' | 'text' | 'end';

interface BaseQuestion {
	question: string;
	type: QuestionType;
}

export interface SingleQuestion extends BaseQuestion {
	type: 'single';
	options: string[];
	next: string; // all options go to the same next step
}

export interface SwitchQuestion extends BaseQuestion {
	type: 'switch';
	options: string[];
	next: string[]; // maps by index: options[i] → next[i]
}

export interface MultiQuestion extends BaseQuestion {
	type: 'multi';
	options: string[];
	next: string;
}

export interface TextQuestion extends BaseQuestion {
	type: 'text';
	next: string;
}

export interface EndQuestion extends BaseQuestion {
	type: 'end';
}

export type Question = SingleQuestion | SwitchQuestion | MultiQuestion | TextQuestion | EndQuestion;

export interface Questionnaire {
	start: string;
	steps: Record<string, Question>;
}
