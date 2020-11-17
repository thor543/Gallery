function openModal() {
    document.getElementById("lightbox").style.display = "block";
  }
  function closeModal() {
    document.getElementById("lightbox").style.display = "none";
  }
  var innerList = document.getElementById("inner");
     var btnList = document.getElementsByTagName("button");
     var perWidth = inner.children[0].offsetWidth;
     var prevbtn = document.getElementById("prevbtn");
     var nextbtn = document.getElementById("nextbtn");
     // var imgList = inner.getElementsByTagName("img");
     // var perWidth = imgList[0].offsetWidth;
     var timer = 0;
     var timer1 = 0;
     var index =0;
     var runFlag = true; //设置一个动画是否走完的标志位
     for(var i = 0; i < btnList.length; i++) {
        btnList[i].index = i;
        btnList[i].onclick = function() {
           index = this.index;
           tab();
        }
     }
     function tab() {
        var start = inner.offsetLeft;
        var end = - perWidth * index;
        var change = end - start;
        var t = 0;
        var maxT = 30;

        clearInterval(timer1);
        timer1 = setInterval(function() {
           t++;
           if(t >= maxT) {
              clearInterval(timer1);
              // alert("停下来了");
              runFlag = true;
           }
           inner.style.left = change/maxT * t + start + "px";
           if(index == btnList.length && t >= maxT) {
              inner.style.left = 0;
           }
        },30)

        // inner.style.left = - perWidth * index + "px";
        for(var j = 0; j < btnList.length; j++) {
           btnList[j].className = "";
        }
        if(index >= btnList.length) {
           btnList[0].className = "active";
        }else {
           btnList[index].className = "active";
        }
     }
      function xunhuan(){
         index++;
           if(index>btnList.length){
           index=1;
           }
           // inner.style.left = - perWidth * index + "px";
         tab();
     }

    //  var timer =setInterval(xunhuan,5000);

     inner.onmouseover =function(){
    //  clearInterval(timer);
     }
    //  inner.onmouseout =function(){
    //   timer = setInterval(xunhuan,5000);
    //  }

     function next() {
        index++;
        if(index > btnList.length) {
           index = 1;
        }
        tab();
     }
     function prev() {
        index--;
        
        if(index < 0 ) {
           index = btnList.length - 1;
           inner.style.left = - btnList.length * perWidth + "px";
          //  console.log(index);
        }
        tab();
     }
     //下一张
     nextbtn.onclick = function() {
        // clearInterval(timer);
        if(runFlag) {
           next();
        }
        runFlag = false;

     }
     //上一张
     prevbtn.onclick = function() {
        // clearInterval(timer);
        if(runFlag) {
           prev();
        }
        runFlag = false;

     }


     window.onload = function () {
      var carousel = document.querySelector('.wrap');
      var carouselUl = carousel.querySelector('ul');
      var carouselLis = carouselUl.querySelectorAll('li');
      // var points = carousel.querySelector('ol');
      // 熒幕的寬度
      var screenWidth = document.documentElement.offsetWidth;
      // var timer = null;
      // 設置 ul 的高度
      // carouselUl.style.height = carouselLis[0].offsetHeight + 'px';
      // 動態生成小圓點
      // for (var i = 0; i < carouselLis.length; i++) {
      //   var li = document.createElement('li');
      //   if (i == 0) {
      //     li.classList.add('active');
      //   }
      //   points.appendChild(li);
      // }
      // 初始三個固定的位置
      var left = carouselLis.length - 1;
      var center = 0;
      var right = 1;
      // 歸位（多次使用，封裝成函數）
      // setTransform();
      // 調用定時器
      // timer = setInterval(showNext, 2000);
      // 分別綁定touch事件
      var startX = 0; // 手指落點
      var startTime = null; // 開始觸摸時間
      carouselUl.addEventListener('touchstart', touchstartHandler); // 滑動開始綁定的函數 touchstartHandler
      carouselUl.addEventListener('touchmove', touchmoveHandler); // 持續滑動綁定的函數 touchmoveHandler
      carouselUl.addEventListener('touchend', touchendHandeler); // 滑動結束綁定的函數 touchendHandeler
      // 輪播圖片切換下一張
      function showNext() {
        // 輪轉下標
        left = center;
        center = right;
        right++;
        //　極值判斷
        if (right > carouselLis.length - 1) {
          right = 0;
        }
        //添加過渡（多次使用，封裝成函數）
        setTransition(1, 1, 0);
        // 歸位
        setTransform();
        // 自動設置小圓點
        setPoint();
      }
      // 輪播圖片切換上一張
      function showPrev() {
        // 輪轉下標
        right = center;
        center = left;
        left--;
        //　極值判斷
        if (left < 0) {
          left = carouselLis.length - 1;
        }
        //添加過渡
        setTransition(0, 1, 1);
        // 歸位
        setTransform();
        // 自動設置小圓點
        setPoint();
      }
      // 滑動開始
      function touchstartHandler(e) {
        // 清除定時器
      //   clearInterval(timer);
        // 記錄滑動開始的時間
        startTime = Date.now();
        // 記錄手指最開始的落點
        startX = e.changedTouches[0].clientX;
      }
      // 滑動持續中
      function touchmoveHandler(e) {
        // 獲取差值 自帶正負
        var dx = e.changedTouches[0].clientX - startX;
        // 幹掉過渡
        setTransition(0, 0, 0);
        // 歸位
        setTransform(dx);
      }
      //　滑動結束
      function touchendHandeler(e) {
        // 在手指鬆開的時候，要判斷當前是否滑動成功
        var dx = e.changedTouches[0].clientX - startX;
        // 獲取時間差
        var dTime = Date.now() - startTime;
        // 滑動成功的依據是滑動的距離（絕對值）超過熒幕的三分之一 或者滑動的時間小於300毫秒同時滑動的距離大於30
        if (Math.abs(dx) > screenWidth / 3 || (dTime < 300 && Math.abs(dx) > 30)) {
          // 滑動成功了
          // 判斷用戶是往哪個方向滑
          if (dx > 0) {
            // 往右滑 看到上一張
            prev();
          } else {
            // 往左滑 看到下一張
            next();
          }
        } else {
          // 添加上過渡
          setTransition(1, 1, 1);
          // 滑動失敗了
          setTransform();
        }
        // 重新啟動定時器
      //   clearInterval(timer);
        // 調用定時器
      //   timer = setInterval(showNext, 2000);
      }
      // 設置過渡
      function setTransition(a, b, c) {
        if (a) {
          carouselLis[left].style.transition = 'transform 1s';
        } else {
          carouselLis[left].style.transition = 'none';
        }
        if (b) {
          carouselLis[center].style.transition = 'transform 1s';
        } else {
          carouselLis[center].style.transition = 'none';
        }
        if (c) {
          carouselLis[right].style.transition = 'transform 1s';
        } else {
          carouselLis[right].style.transition = 'none';
        }
      }
      //　封裝歸位
      // function setTransform(dx) {
      //   dx = dx || 0;
      //   carouselLis[left].style.transform = 'translateX(' + (-perWidth + dx) + 'px)';
      //   carouselLis[center].style.transform = 'translateX(' + dx + 'px)';
      //   carouselLis[right].style.transform = 'translateX(' + (perWidth + dx) + 'px)';
      // }
      // 動態設置小圓點的active類
      // var pointsLis = points.querySelectorAll('li');
      // function setPoint() {
      //   for (var i = 0; i < pointsLis.length; i++) {
      //     pointsLis[i].classList.remove('active');
      //   }
      //   pointsLis[center].classList.add('active');
      // }
    }






  // var slides = 1;
  // showSlides(slides);

  // function plusBtn(n) {
  //   showSlides((slides += n));
  // }
  // function carouselSlide(n) {
  //   showSlides((slides = n));
  // }
  // function showSlides(n) {
  //   var i;
  //   var x = document.getElementsByClassName("mySlides");
  //   var y = document.getElementsByClassName("carousel");
  //   if (n > x.length) {
  //     slides = 1;
  //   }
  //   if (n < 1) {
  //     slides = x.length;
  //   }
  //   for (i = 0; i < x.length; i++) {
  //     x[i].style.display = "none";
  //   }
  //   for (i = 0; i < y.length; i++) {
  //     y[i].className = y[i].className.replace(" light", "");
  //   }
  //   x[slides - 1].style.display = "block";
  //   y[slides - 1].className += " light";
  // }

  // var counter = 0,
  //   slide = document.getElementById("slide"),
  //   items = slide.querySelectorAll("img"),
  //   nav_Btn = document.getElementById("nav"),
  //   next = document.createElement("a"),
  //   prev = document.createElement("a"),
  //   nav = document.createElement("div"),
  //   dot = new Array();

  // next.className = "next";
  // prev.className = "prev";
  // nav.className = "nav";
  // slide.appendChild(next);
  // slide.appendChild(prev);
  // slide.appendChild(nav);
  // for (var i = 0; i < items.length; i++)
  //   (dot[i] = document.createElement("a")),
  //     dot[i].classList.add("dot"),
  //     nav.appendChild(dot[i]);
  // items[0].style.animationName = "fadeOInLeft";
  // items[0].style.left = "0";
  // dot[0].classList.add("dotA");

  // slide.addEventListener("click", function (e) {
  //   var e = e || window.event,
  //     target = event.srcElement || event.target;

  //   switch (target.className) {
  //     case "next":
  //       switchImg(counter + 1);
  //       break;
  //     case "prev":
  //       switchImg(counter - 1);
  //       break;
  //     case "dot":
  //       switchImg(dot.indexOf(target));
  //       break;
  //   }
  // });

  // slide.addEventListener("mousedown", function (e) {
  //   var e = e || window.event,
  //     target = event.srcElement || event.target;
  //   interval = clearInterval(interval);
  //   e.preventDefault();
  //   slide.style.cursor = "grabbing";
  //   var xMousedown = e.pageX;
  //   var isDown = true;
  //   document.addEventListener("mousemove", move);

  //   document.onmouseup = function (e) {
  //     if (isDown) {
  //       var xMouseup = e.pageX;
  //       slide.style.cursor = "";
  //       items[counter].style.left = "";
  //       if (xMousedown > xMouseup) {
  //         switchImg(counter + 1);
  //       } else if (xMousedown < xMouseup) {
  //         switchImg(counter - 1);
  //         items[counter].style.left = "0";
  //         interval = setInterval(function () {
  //           showCurrent(counter, counter + 1);
  //         }, 4300);
  //       }
  //       isDown = false;
  //       document.removeEventListener("mousemove", move);
  //     }
  //   };
  //   function move(e) {
  //     items[counter].style.left =
  //       items[counter].scrollLeft - xMousedown + e.pageX + "px";
  //   }
  // });

  // function switchImg(e) {
  //   interval = clearInterval(interval);
  //   showCurrent(counter, e);
  //   interval = setInterval(function () {
  //     showCurrent(counter, counter + 1);
  //   }, 4300);
  // }

  // function showCurrent(e, e1) {
  //   dot[counter].classList.remove("dotA");
  //   if (e < e1) {
  //     items[e].style.animationName = "fadeOutLeft";
  //     items[e].style.left = "";
  //     e1 == items.length ? (counter = 0) : (counter = e1);
  //     items[counter].style.animationName = "fadeInReight";
  //     items[counter].style.left = "0";
  //   } else if (e > e1) {
  //     items[e].style.animationName = "fadeOutReight";
  //     items[e].style.left = "";
  //     e1 < 0 ? (counter = items.length - 1) : (counter = e1);
  //     items[counter].style.animationName = "fadeInLeft";
  //     items[counter].style.left = "0";
  //   }
  //   dot[counter].classList.add("dotA");
  // }

  // var interval = window.setInterval(function () {
  //   showCurrent(counter, counter + 1);
  // }, 4300);

  // (function () {
  //   function init() {
  //     var mouseEventTypes = {
  //       touchstart: "mousedown",
  //       /*
  //             在touch的事件監聽方法上綁定第三個參數{ passive: false }，
  //             通過傳遞 passive 為 false 來明確告訴瀏覽器：事件處理程序調用 preventDefault 來阻止默認滑動行為。
  //             target.addEventListener('touch', function () {

  //             }, { passive: false });
  //             或在 CSS 中全局使用
  //             * {
  //                 touch-action: pan-y;
  //             }
  //             */
  //       touchmove: "mousemove",
  //       touchend: "mouseup",
  //     };

  //     for (originalType in mouseEventTypes) {
  //       document.addEventListener(originalType, function (originalEvent) {
  //         if (originalEvent.type == "click") return;
  //         if (
  //           originalEvent.type != "touchstart" &&
  //           originalEvent.type != "touchend"
  //         ) {
  //           originalEvent.preventDefault();
  //         }
  //         event = document.createEvent("MouseEvents");
  //         touch = originalEvent.changedTouches[0];
  //         event.initMouseEvent(
  //           mouseEventTypes[originalEvent.type],
  //           true,
  //           true,
  //           window,
  //           0,
  //           touch.screenX,
  //           touch.screenY,
  //           touch.clientX,
  //           touch.clientY,
  //           touch.ctrlKey,
  //           touch.altKey,
  //           touch.shiftKey,
  //           touch.metaKey,
  //           0,
  //           null
  //         );
  //         originalEvent.target.dispatchEvent(event);
  //         event.preventDefault();
  //       });
  //     }
  //   }
  //   init();
  // })();
