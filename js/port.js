 // 자동 슬라이드 동작 함수 
 function timer() {
    setIntervalId = setInterval(function () {
        var n = current + 1; // 현재 인덱스에 1을 더하여 다음 인덱스를 계산합니다.
        if (n == visual.size()) {
            // 다음 인덱스가 'visual' 컬렉션의 크기와 같은지 확인합니다.
            // 만약 다음 인덱스가 컬렉션의 크기와 같다면, 이것은 끝에 도달했음을 의미합니다.
            // 이 상황을 처리하기 위한 코드를 여기에 추가할 수 있습니다.
            n = 0; // 다음 슬라이드가 없으면, 0으로 돌아감 
        }
        // 다음 슬라이드 버튼을 클릭하여 슬라이드 변경 
        button.eq(n).click();
    }, 3000); // 3초 
}

// 슬라이드 이동 함수 
function move(i) {
    if (current == i) return;
    // 현재 활성된 슬라이드의 목표 슬라이드가 같으면 동작하지 않음
    var currentEl = visual.eq(current); // 현재 슬라이드 
    var nextEl = visual.eq(i); // 목표 슬라이드

    currentEl.css({ // currentEl의 CSS 속성을 설정합니다. 현재 엘리먼트의 left 속성을 '0%'으로 설정하여 현재 위치를 나타냅니다.
        left: '0%'
    }).stop().animate({ // .stop() 메서드를 사용하여 이전에 실행 중인 모든 애니메이션을 중지합니다.
        left: '-100%'
    }); // 슬라이드 왼쪽으로 이동
    // animate() 메서드를 사용하여 엘리먼트를 왼쪽으로 애니메이션화합니다. 
    // left 속성을 '-100%'로 설정하여 엘리먼트를 왼쪽으로 이동시킵니다. 이로써 현재 엘리먼트는 화면에서 사라지게 됩니다.


    nextEl.css({ // 다음 엘리먼트(nextEl)를 오른쪽에서 화면으로 이동시키는 애니메이션을 실행합니다. 
        // nextEl의 CSS 속성을 설정합니다. 다음 엘리먼트의 left 속성을 '100%'로 설정하여 오른쪽에서 시작하도록 합니다.
        left: '100%'
    }).stop().animate({ // .stop() 메서드를 사용하여 이전에 실행 중인 모든 애니메이션을 중지합니다.
        left: '0%' // animate() 메서드를 사용하여 엘리먼트를 애니메이션화합니다.
        // left 속성을 '0%'로 설정하여 엘리먼트가 화면 내에서 가운데로 이동합니다. 이로써 다음 엘리먼트가 화면에 나타나게 됩니다.
    });
    current = i; // 현재 슬라이드 인덱스를 갱신 (=업데이트)
}

// 따라다니는 퀵메뉴 - 스크롤바가 이동될때마다 이벤트 발생
$(window).scroll(function () {
    // 현재 스크롤 위치를 가져오고 15px 더함
    var scrollTopNum = $(document).scrollTop() + 15; // scrollTopNum 변수를 생성하고, 현재 문서의 스크롤 위치($(document).scrollTop())에 15를 더한 값을 할당합니다.
    if (scrollTopNum <= 200) { // 만약 scrollTopNum이 200보다 작거나 같으면, 즉, 사용자가 문서를 위로 스크롤하는 경우,
        scrollTopNum = 200; //  scrollTopNum을 200으로 설정합니다. 
    }
    // scrollTopNum이 200보다 작거나 같으면 200으로 고정
    // #quick을 0.7초동안 scrollTopNum 위치에 부드럽게 이동시킴 
    $("#quick").stop().animate({ // #quick 요소를 선택하고, .animate() 메서드를 사용하여 요소의 위치를 부드럽게 변경합니다.
        top: scrollTopNum // top 속성을 scrollTopNum 값으로 설정하면서, 스크롤 위치(scrollTopNum)에 따라 요소의 위치가 변화합니다.
    }, 700); // 0.7초 
});


$("#quick .arrow").on("click", function () {
    $("html,body").stop().animate({
        scrollTop: 0 // 수직 스크롤 위치 
    }, 400);
});

var visual = $('#main_slides > li'); // 'main_slides' 요소의 자식인 'li' 요소들을 선택하여 'visual' 변수에 저장합니다.
var button = $('.btn_wrap > ul > li'); // 'btn_wrap' 클래스 내부에 있는 'ul' 요소의 자식 'li' 요소들을 선택하여 'button' 변수에 저장합니다.
var autoSlideIntervalId; // 자동 슬라이드 간격을 제어하는 타이머 식별자를 저장하는 'autoSlideIntervalId' 변수를 선언합니다.



button.on('click', function () {
    var idx = $(this).index(); // 클릭한 버튼의 인덱스를 가져옵니다.
    move(idx); // 클릭한 버튼에 해당하는 슬라이드로 이동합니다.
});

var autoSlideIntervalId; // 슬라이드 자동 전환을 위한 인터벌 ID를 저장하는 변수를 선언합니다.

function startAutoSlide() {
    autoSlideIntervalId = setInterval(function () {
        var nextSlideIndex = current + 1;
         // 만약 다음 슬라이드 인덱스가 슬라이드 개수와 동일하다면,
        if (nextSlideIndex === visual.size()) {
            nextSlideIndex = 0; // 다음 슬라이드가 없으면 첫 번째 슬라이드로 돌아갑니다.
        }
        
        button.eq(nextSlideIndex).click(); // 다음 슬라이드로 이동하기 위해 버튼을 클릭합니다.
    }, 3000); // 3초마다 슬라이드를 자동으로 전환합니다.
}

startAutoSlide(); // 페이지 로딩 후 초기 슬라이드 자동 시작

