import { MissionUtils } from '@woowacourse/mission-utils';

const holidayDates = {
    1: [1], 2: [], 3: [1], 4: [], 5: [5], 6: [6], 7: [],
    8: [15], 9: [], 10: [3, 9], 11: [], 12: [25]
};

const daysInMonth = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31,
    8: 31, 9: 30, 10: 31, 11: 30, 12: 31
};

const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

class App {
    currentIndices = [0, 0];
    weekdaySwapRegistry = {};
    weekendSwapRegistry = {};
}


export default App;