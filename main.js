(function payment() {
  var d = document,
      body = d.getElementsByTagName('body')[0],
	    html = d.getElementsByTagName('html')[0],
      ppForm = d.getElementsByTagName('form')[0],
      ccForm = d.getElementsByTagName('form')[1],
      ecForm = d.getElementsByTagName('form')[2],
      cCard = d.querySelector('#cc-card'),
      pCard = d.querySelector('#pp-card'),
      eCard = d.querySelector('#ec-card'),
      info = d.querySelector('#choosen-paymenttype');
  var audio = d.getElementById('audioPlayer');
  var playBtn = d.getElementById('playButton');
  var ccName = ccForm.querySelector("#cardholder");
  var cName = d.querySelectorAll('.card-holder');
      
  init();
  
  function init() {
    var cardType, cardNumber, cardName, cardCCV;
    body.className = 'cc-bg';
    
    function switchPos(elm) {
      if (elm.classList.contains('selected')) { 
        if (elm.getElementsByTagName('input').length) {
          elm.getElementsByTagName('input')[0].focus();
        }
        return;
      }
      
      var selected = d.querySelector('.selected');
      if (elm.classList.contains('unselected-left')) {
        selected.classList.remove('selected');
        selected.classList.add('unselected-left');
        elm.classList.add('selected');
        elm.classList.remove('unselected-left');
        if (window.matchMedia("(max-width: 1039px)").matches) {
          setTimeout(function() {elm.scrollIntoView();}, 500);
        }
        
      } else if (elm.classList.contains('unselected-right')) {
        selected.classList.remove('selected');
        selected.classList.add('unselected-right');
        elm.classList.add('selected');
        elm.classList.remove('unselected-right');
        
                if (window.matchMedia("(max-width: 1039px)").matches) {
          setTimeout(function() {elm.scrollIntoView();}, 500);
        }
      }
    }
    
  
    addEvent(pCard,'click',function() {
      if (audio) {
        audio.pause();
      }
      switchPos(d.querySelector('.paymenttype.pp'));
      body.className = 'pp-bg';
      info.innerHTML = 'PayPal';
    });
    addEvent(cCard,'click',function() {
      if (audio) {
        audio.pause();
      }
      switchPos(d.querySelector('.paymenttype.cc'));
      body.className = 'cc-bg';
      info.innerHTML = 'Credit Card';
    });

    addEvent(eCard,'click',function() {
      if (audio) {
          audio.currentTime = 0;

          audio.play()
            .then(function () {
              console.log('Audio playing');
            })
            .catch(function (err) {
              console.warn('Audio failed:', err);
            });
        }
      switchPos(d.querySelector('.paymenttype.ec'));
       body.className = 'ec-bg';
      info.innerHTML = 'Bank account';
    });
    
    addEvent(ccName, 'focus', function() {
      cName[0].classList.add('glow');
    });
    addEvent(ccName, 'blur', function() {
      cName[0].classList.remove('glow');
    });

    addEvent(ccName, 'keyup', function() {
      cardName = this.value.replace(/[^a-zA-Z-\.\s]/g,'');
      if (cardName != this.value) {
        this.value = cardName;
      }
      if (!cardName) {
        cardName = defaultName;
      }
      syncText( cName, cardName);
    });

    if (ccForm && cCard) {
    var ccButton = ccForm.querySelector('button');

    if (ccButton) {
      addEvent(ccButton, 'click', function (e) {
        e.preventDefault();
        cCard.classList.toggle('flipped');
      });
    }
  }
    
  }
  
  function syncText( elCol, text ) {
    var collection;
    for(var j=0; j < elCol.length; j++) {
      collection = elCol[j].querySelectorAll('span');
      if (!collection.length) {
        elCol[j].innerHTML = text;
      } else {
        for(var i=0; i < collection.length; i++) {
          collection[i].innerHTML = text;
        }
      }
    }
  }
  
  
  function addEvent(elem, event, func) {
    elem.addEventListener(event,func);
  }

  
  
})();