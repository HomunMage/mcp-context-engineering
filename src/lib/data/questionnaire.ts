// lib/data/questionnaire.ts
import type { Questionnaire } from '$lib/types/questionnaire';

export const questionnaire: Questionnaire = {
	start: 'askName',
	steps: {
		askName: {
			question: '請輸入你的名字：',
			type: 'text',
			next: 'learningGoal'
		},
		learningGoal: {
			question: '你的學習目標是什麼？',
			type: 'single',
			options: ['增加知識', '提升技能', '結交朋友', '探索興趣'],
			next: 'lifestyle'
		},
		lifestyle: {
			question: '你比較喜歡哪種生活方式？',
			type: 'switch',
			options: ['熱鬧的社交場合', '安靜的個人時光'],
			next: ['resultE', 'resultI']
		},
		resultE: {
			question: '你的MBTI傾向是：ENFP（外向型）',
			type: 'end'
		},
		resultI: {
			question: '你的MBTI傾向是：INFP（內向型）',
			type: 'end'
		}
	}
};
