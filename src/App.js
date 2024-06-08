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

    async run() {
        const [month, weekday] = await this.requestMonthAndWeekday();
        const [weekdayWorkers, weekendWorkers] = await this.requestWorkerLists();
        this.weekdayWorkers = weekdayWorkers;
        this.weekendWorkers = weekendWorkers;
        this.displaySchedule(month, weekday);
    }

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

    async requestWorkerLists() {
        try {
            const weekdayInput = await MissionUtils.Console.readLineAsync('평일 비상 근무 순번대로 사원 닉네임을 입력하세요> ');
            const weekendInput = await MissionUtils.Console.readLineAsync('휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ');
            return [this.parseWorkers(weekdayInput), this.parseWorkers(weekendInput)];
        } catch (e) {
            MissionUtils.Console.print(e.message);
            return this.requestWorkerLists();
        }
    }

    parseWorkers(input) {
        if (input === '') {
            throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
        }

        const workers = input.split(',').map(worker => worker.trim());
        if (!this.validateWorkers(workers)) {
            throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
        }
        return workers;
    }

    validateWorkers(workers) {
        const isUnique = new Set(workers).size === workers.length;
        const isProperLength = workers.every(worker => worker.length <= 5);
        const isValidCount = workers.length <= 35 && workers.length >= 5;

        return isUnique && isProperLength && isValidCount;
    }

    determineDayType(month, date, weekday) {
        if (['토', '일'].includes(weekday)) {
            return 'Weekend';
        }
        if (holidayDates[month].includes(date)) {
            return 'Holiday';
        }
        return 'Weekday';
    }

    getNextWorker(previousWorker, dayType) {
        const workers = dayType === 'Weekday' ? this.weekdayWorkers : this.weekendWorkers;
        let index = dayType === 'Weekend' ? this.currentIndices[1] : this.currentIndices[0];
        let worker = workers[index];

        if (worker === previousWorker) {
            index = (index + 1) % workers.length;
            worker = workers[index];
        }

        this.currentIndices[dayType === 'Weekend' ? 1 : 0] = (index + 1) % workers.length;
        return worker;
    }
}

export default App;