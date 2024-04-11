function CalendarControl() {
    const calendar = new Date();
    const calendarControl = {
      localDate: new Date(),
      prevMonthLastDate: null,
      calWeekDays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
      calMonthName: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
      ],
      daysInMonth: function (month, year) {
        return new Date(year, month, 0).getDate();
      },
      firstDay: function () {
        return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
      },
      lastDay: function () {
        return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
      },
      firstDayNumber: function () {
        return calendarControl.firstDay().getDay() + 1;
      },
      lastDayNumber: function () {
        return calendarControl.lastDay().getDay() + 1;
      },
      getPreviousMonthLastDate: function () {
        let lastDate = new Date(
          calendar.getFullYear(),
          calendar.getMonth(),
          0
        ).getDate();
        return lastDate;
      },
      navigateToPreviousMonth: function () {
        calendar.setMonth(calendar.getMonth() - 1);
        calendarControl.attachEventsOnNextPrev();
      },
      navigateToNextMonth: function () {
        calendar.setMonth(calendar.getMonth() + 1);
        calendarControl.attachEventsOnNextPrev();
      },
      navigateToCurrentMonth: function () {
        let currentMonth = calendarControl.localDate.getMonth();
        let currentYear = calendarControl.localDate.getFullYear();
        calendar.setMonth(currentMonth);
        calendar.setYear(currentYear);
        calendarControl.attachEventsOnNextPrev();
      },
      displayYear: function () {
        let yearLabel = document.querySelector(".calendar .calendar-month-label");
        yearLabel.innerHTML = calendar.getFullYear() + '년';
      },
      displayMonth: function () {
        let monthLabel = document.querySelector(
          ".calendar .calendar-year-label"
        );
        monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
      },
      selectDate: function (e) {
        console.log(
          `${e.target.textContent} ${
            calendarControl.calMonthName[calendar.getMonth()]
          } ${calendar.getFullYear()}`
        );
      },
      plotSelectors: function () {
        document.querySelector(
          ".calendar"
        ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
          <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
          <div class="calendar-year-month">
          <div class="calendar-month-label"></div>
          <div>-</div>
          <div class="calendar-year-label"></div>
          </div>
          <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
          </div>
          <div class="calendar-today-date">오늘 날짜:
            ${calendarControl.localDate.getFullYear()}년
            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]}
            ${calendarControl.localDate.getDate()}일
            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}
          </div>
          <div class="calendar-body"></div></div>`;
      },
      plotDayNames: function () {
        for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="${calendarControl.calWeekDays[i] === '일요일' ? 'red-day' : ''}">${calendarControl.calWeekDays[i]}</div>`;
        }
      },
      plotDates: function () {
        document.querySelector(".calendar .calendar-body").innerHTML = "";
        calendarControl.plotDayNames();
        calendarControl.displayMonth();
        calendarControl.displayYear();
        let count = 1;
        let prevDateCount = calendarControl.firstDay().getDay(); // 달력의 첫 주에 대한 이전 달의 날짜 수를 결정합니다.
    
        let firstDayOfMonth = new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        let daysInMonth = calendarControl.daysInMonth(calendar.getMonth() + 1, calendar.getFullYear());
        
        // 이전 달의 마지막 날짜를 포함한 배열을 생성합니다.
        for (let i = 0; i < prevDateCount; i++) {
            document.querySelector(".calendar .calendar-body").innerHTML += `<div class="prev-dates"></div>`;
        }
    
        // 금요일에만 특정 데이터를 표시하기 위한 인덱스 초기화
        let fridayDataIndex = 0;
        let fridayData = ["주헌진", "염장미", "김준석"]; // 금요일에 표시할 데이터
    
        // 현재 달의 모든 날짜를 순회합니다.
        for (let day = 1; day <= daysInMonth; day++) {
            let currentDate = new Date(calendar.getFullYear(), calendar.getMonth(), day);
            let dayOfWeek = currentDate.getDay(); // 요일을 가져옵니다 (0: 일요일, 1: 월요일, ..., 6: 토요일)
            let dayContent = day; // 기본적으로 표시될 날짜 내용
            let extraClass = ""; // 추가할 클래스 초기화
            let spanClass;
            let currentFridayData = fridayData[fridayDataIndex % fridayData.length];
            switch (currentFridayData) {
                case "주헌진":
                    spanClass = "ju";
                    break;
                case "염장미":
                    spanClass = "yeom";
                    break;
                case "김준석":
                    spanClass = "kim";
                    break;
                default:
                    spanClass = ""; // 기본 클래스 (해당하는 경우가 없을 때)
            }
             // 특정 날짜에 대한 조건 확인 (예: 4월 21일)
            if (currentDate.getMonth() === 3 && currentDate.getDate() === 21) { // JavaScript에서 월은 0부터 시작하므로 4월은 3입니다.
                dayContent += `<span class="special-day"><i class="ico">·</i>JTBC 고양 10km</span>`;
                extraClass = "marathon-day"; // 이 날짜에 추가할 특정 클래스
            }
    
            // 금요일에만 특정 데이터 추가
            if (dayOfWeek === 5) { // 5는 금요일을 의미
                dayContent += `<span class="${spanClass}"><i class="ico">·</i>${currentFridayData}</span>`;
                fridayDataIndex++; // 다음 금요일에 표시할 데이터로 인덱스 이동
            }
            document.querySelector(".calendar .calendar-body").innerHTML += `<div class="number-item ${extraClass}" data-num=${day}><a class="dateNumber" href="javascript:void(0);">${dayContent}</a></div>`;
        }
    
        // 현재 달력 뷰에 필요한 다음 달의 날짜 수를 채웁니다.
        let remainingSlots = 42 - (daysInMonth + prevDateCount); // 42는 일반적으로 달력의 총 슬롯 수 (6주 * 7일)
        for (let i = 1; i <= remainingSlots; i++) {
            document.querySelector(".calendar .calendar-body").innerHTML += `<div class="next-dates">${i}</div>`;
        }
    
        calendarControl.highlightToday(); // 오늘 날짜 강조
    },
      attachEvents: function () {
        let prevBtn = document.querySelector(".calendar .calendar-prev a");
        let nextBtn = document.querySelector(".calendar .calendar-next a");
        let todayDate = document.querySelector(".calendar .calendar-today-date");
        let dateNumber = document.querySelectorAll(".calendar .dateNumber");
        prevBtn.addEventListener(
          "click",
          calendarControl.navigateToPreviousMonth
        );
        nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
        todayDate.addEventListener(
          "click",
          calendarControl.navigateToCurrentMonth
        );
        for (var i = 0; i < dateNumber.length; i++) {
            dateNumber[i].addEventListener(
              "click",
              calendarControl.selectDate,
              false
            );
        }
      },
      highlightToday: function () {
        let currentMonth = calendarControl.localDate.getMonth() + 1;
        let changedMonth = calendar.getMonth() + 1;
        let currentYear = calendarControl.localDate.getFullYear();
        let changedYear = calendar.getFullYear();
        if (
          currentYear === changedYear &&
          currentMonth === changedMonth &&
          document.querySelectorAll(".number-item")
        ) {
          document.querySelectorAll(".number-item")[calendar.getDate() - 1].classList.add("calendar-today");
          console.log(calendar.getDate() - 1, calendar)
        }
      },
      plotPrevMonthDates: function(dates){
        dates.reverse();
        for(let i=0;i<dates.length;i++) {
            if(document.querySelectorAll(".prev-dates")) {
                document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
            }
        }
      },
      plotNextMonthDates: function(){
       let childElemCount = document.querySelector('.calendar-body').childElementCount;
       //7 lines
       if(childElemCount > 42 ) {
           let diff = 49 - childElemCount;
           calendarControl.loopThroughNextDays(diff);
       }

       //6 lines
       if(childElemCount > 35 && childElemCount <= 42 ) {
        let diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
       }

      },
      loopThroughNextDays: function(count) {
        if(count > 0) {
            for(let i=1;i<=count;i++) {
                document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
            }
        }
      },
      attachEventsOnNextPrev: function () {
        calendarControl.plotDates();
        calendarControl.attachEvents();
      },
      init: function () {
        calendarControl.plotSelectors();
        calendarControl.plotDates();
        calendarControl.attachEvents();
      }
    };
    calendarControl.init();
  }
  
const calendarControl = new CalendarControl();