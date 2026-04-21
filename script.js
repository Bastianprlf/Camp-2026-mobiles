const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const morse={
A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',
I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',
P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',
W:'.--',X:'-..-',Y:'-.--',Z:'--..'
};

const mn={
A:'Arn|old',B:'Bon|a|part',C:'Co|ca Co|la',D:'Do|re|mi',
E:'Et',F:'Far|an|dole',G:'Gon|dole',H:'Hur|lu|ber|lu',
I:'I|ci',J:'Ja|blo|no|vo',K:'Ko|ri|dor',L:'Li|mo|nade',
M:'Mo|to',N:'No|el',O:'Oh|oh|oh',P:'Phi|lo|sophe',
Q:'Quo|co|ri|co',R:'Ri|go|ler',S:'Sa|me|di',T:'Thon',
U:'U|nion',V:'Vé|gé|ta|tion',W:'Wa|gon post',
X:'Xo|ca|de|ro',Y:'Yo|ga do|do',Z:'Zor|ro est|là'
};

let answers=Array(26).fill('');
let state=Array(26).fill('pending');

function showTab(id,el){
document.querySelectorAll('.panel').forEach(p=>p.classList.remove('show'));
document.getElementById(id).classList.add('show');
document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
el.classList.add('active');
}

function currentIndex(){
return state.filter(x=>x!=='pending').length;
}

function typeMorse(i,v){
answers[i]=v.replace(/[^.-]/g,'');
}

function check(i){
if(i!==currentIndex()) return;
state[i]=(answers[i]===morse[letters[i]])?'good':'bad';
render();
}

function resetAll(){
answers=Array(26).fill('');
state=Array(26).fill('pending');
render();
}

function render(){

let answersHtml='';
let inputsHtml='';

for(let i=0;i<letters.length;i++){

let L=letters[i];

let cls='answer';
let content='?';

if(state[i]==='good'){
cls+=' green';
content=L+'/'+morse[L];
}

if(state[i]==='bad'){
cls+=' red';
content=L+'/'+morse[L];
}

answersHtml += '<div class="'+cls+'">'+content+'</div>';

let disabled =
(i!==currentIndex() || state[i]!=='pending')
? 'disabled' : '';

inputsHtml +=
'<div class="row">'+
'<input class="input" '+disabled+
' value="'+answers[i]+'" '+
'oninput="typeMorse('+i+',this.value)" placeholder=".....">'+
'<div class="mnemo">'+mn[L]+'</div>'+
'<button '+disabled+
' onclick="check('+i+')">Valider</button>'+
'</div>';

}

document.getElementById('answers').innerHTML=answersHtml;
document.getElementById('inputs').innerHTML=inputsHtml;

let done=currentIndex();

document.getElementById('progressText').textContent=
'Progression '+done+'/26';

document.getElementById('fill').style.width=
(done/26*100)+'%';

}

render();
document.getElementById('tab-morse').addEventListener(
'click',
function(){
showTab('morse', this);
}
);

document.getElementById('tab-chansons').addEventListener(
'click',
function(){
showTab('chansons', this);
}
);
