const frame = document.querySelector("section");
const lists = frame.querySelectorAll("article");
const audio = frame.querySelectorAll("audio");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const deg = 45;
let i = 0; //초기값 0
let num = 0;
let active = 0;
const len = lists.length - 1;


//article의 갯수만큼 반복을 돌면서 코드 실행
for(let el of lists){
    //article의 자식인 .pic을 찾아서 변수 저장
    let pic = el.querySelector(".pic");

    //pic에 백그라운드 이미지 대입 처리
    pic.style.backgroundImage = `url(img/member${i+1}.jpg)`;
    //article 배치
    el.style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
    //초기값 0부터 1씩 증가
    i++;

    //article에서 play, pause, load 버튼을 찾아서 변수저장
    let play = el.querySelector(".play");
    let pause = el.querySelector(".pause");
    let load = el.querySelector(".load");

    //play 버튼 클릭시
    play.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive) {
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            e.currentTarget.closest("article").querySelector("audio").play();
        }
    });

    //pause 버튼 클릭시
    pause.addEventListener("click", e=>{
        // e.currentTarget.closest("article").querySelector(".on").style.animationPlayState = "pause";

        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive) {
            e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
            e.currentTarget.closest("article").querySelector("audio").pause();
        }
        
    });

    //load
    load.addEventListener("click", e=>{

        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive) {
            e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
            e.currentTarget.closest("article").querySelector("audio").load();
            e.currentTarget.closest("article").querySelector("audio").play();
        }
        
    });

}

//next 버튼을 클릭했을 때
next.addEventListener("click", ()=>{
    initMusic();

    //num값을 1씩 감소시키면서 frame을 45도씩 감소
    num--;
    frame.style.transform = `rotate(${deg * num}deg)`;

    //활성화 된 article 순서값 연동 변수
    //article은 모두 8개(0~7)
    //8번째(7) 첫번재로 되돌아가기 0-1-2-3-4-5-6-7-0-1-2....
    // if(active == 7){
    //     active = 0;
    // }else{
    //     active++;
    // }
    (active == 7) ? active = 0 : active++; //활성화 articel 순번 축약

    //활성화 함수 호출
    activation(active, lists);

    
});



//prev 버튼을 클릭했을때
prev.addEventListener("click", ()=>{
    initMusic();
    
    num++;
    frame.style.transform = `rotate(${deg * num}deg)`;

    // if(active == 0){
    //     active = 7;
    // }else{
    //     active--;
    // }
    (active ==0) ? active = 7 : active--;

    //활성화 함수 호출
    activation(active, lists);
});

function activation(index,lists){
    //일단 모든 article 비활성화
    for(let el of lists){
        el.classList.remove("on");
    }

    //해당 순번의 article만 활성화
    lists[index].classList.add("on");
}

function initMusic(){
    for(let el of audio){
        el.pause();
        el.load();
        el.closest("article").querySelector(".pic").classList.remove("on");
    }
}