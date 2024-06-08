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

  async requestMonthAndWeekday() {
    while (true) {
      try {
        const input = await MissionUtils.Console.readLineAsync('비상 근무를 배정할 월과 시작 요일을 입력하세요> ');
        return this.parseMonthAndWeekday(input);
      } catch (e) {
        MissionUtils.Console.print(e.message);
      }
    }
  }

  parseMonthAndWeekday(input) {
    if (input === '') {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
    let [month, weekday] = input.split(',').map(item => item.trim());
    month = Number(month);
    if (!this.isValidMonth(month) || !this.isValidWeekday(weekday)) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
    return [month, weekday];
  }

  isValidMonth(month) {
    return month >= 1 && month <= 12;
  }

  isValidWeekday(weekday) {
    return weekDays.includes(weekday);
  }
}


export default App;