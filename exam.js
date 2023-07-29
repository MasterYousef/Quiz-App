var bul = document.querySelector(".bul");
var head = document.querySelector('.head');
var answers = document.querySelector('.answers');
let button = document.querySelector('.bu');
let info = document.querySelector('.info');
let rdiv = document.querySelector('.result')
let timer = document.querySelector('.mi');
let qhead = document.querySelector('.qhead');
let timerInt;
let coIndex =0;
let rightAnswers = 0;
function quizWork(){
    var xe = new XMLHttpRequest ;
    xe.open("GET","quiz.json",true)
    xe.send()
    xe.onreadystatechange = () => {
        if(xe.readyState === 4 & xe.status === 200){
            let jso = JSON.parse(xe.responseText);
            let Countobj = jso.length;
            countdown(5,Countobj)
            createBult(Countobj);
            getq1(jso[coIndex],Countobj)
            button.onclick = function () {
                let win = jso[coIndex].win;
                coIndex++;
                chickAnswer(win,Countobj);
                qhead.innerHTML = '';
                answers.innerHTML = '';
                getq1(jso[coIndex],Countobj);
                handelbult();
                clearInterval(timerInt);
                countdown(5,Countobj)
                theRuslt(Countobj)
            }
        }
    }
}
function createBult(num){
    for(let i = 0;i < num ; i++){
        let span = document.createElement("span");
        if(i === 0){
            span.className = "active";
        }
        bul.appendChild(span);
    }
};
function getq1(obj,co){
    if(coIndex < co ){
        let quTittle = document.createElement('span');
        let quText = document.createTextNode(obj['titlle']);
        quTittle.appendChild(quText);
        qhead.prepend(quTittle);
        for(let i =0 ; i<4 ;i++){
            let maindiv = document.createElement('div');
            maindiv.className = "answer" ;
            let radioinput = document.createElement("input");
            radioinput.type = 'radio' ;
            radioinput.id = `answer_${i+1}` ;
            radioinput.name = 'an' ;
            radioinput.dataset.answer = obj[`an_${i+1}`];
            if(i === 0){
                radioinput.checked = true 
            };
            let label = document.createElement('label');
            label.htmlFor = `answer_${i+1}`;
            let lt = document.createTextNode(obj[`an_${i+1}`]);
            label.appendChild(lt);
            maindiv.appendChild(radioinput);
            maindiv.appendChild(label);
            answers.appendChild(maindiv);
    
        }
    }
}
function chickAnswer(rAnswer,cou){
    let qu = document.getElementsByName('an');
    let TheChossenAnswer;
    for (let i = 0; i< qu.length;i++){
        if(qu[i].checked){
            TheChossenAnswer = qu[i].dataset.answer;
        }
    }
    if(rAnswer === TheChossenAnswer){
        rightAnswers++;
    }
}
function handelbult(){
    let bults = document.querySelectorAll('.bul span');
    let bulArray = Array.from(bults);
    bulArray.forEach((spans,index) => {
        if(coIndex === index){
            spans.className = 'active'
        }
    })}
    function theRuslt(count){
        let results;
        if(coIndex === count){
            answers.remove();
            button.remove();
            info.remove();
            head.remove();
            if(rightAnswers > (count / 2) && rightAnswers < count){
                results = `good,your answers ${rightAnswers} from ${count}`;
                rdiv.style.color = '#f3ff04';
            }else if(rightAnswers === count){
                results = `perfct,your get all answers` ;
                rdiv.style.color = 'rgb(23, 213, 23)';
            }else{
                results = `bad,your answers ${rightAnswers} from ${count}`;
                rdiv.style.color = 'red';
            };
            rdiv.innerHTML = results ;

        }
    }
function countdown(dur,co){
    if(coIndex < co ){
        let minutes ,secands;
         timerInt = setInterval(() => {
            minutes = parseInt(dur / 60) ;
            secands = parseInt(dur % 60) ;
            minutes = minutes < 10 ? `0${minutes}`:minutes ;
            secands = secands < 10 ? `0${secands}`:secands ;
            timer.innerHTML = `${minutes}:${secands}`;
            if(--dur < 0){
                clearInterval(timerInt);
                button.click();}
            
            
        },1000)

}
}
quizWork()
