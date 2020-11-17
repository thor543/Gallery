window.onload = function () {
    var carousel = document.querySelector('.carousel');
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
    setTransform();
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
          showPrev();
        } else {
          // 往左滑 看到下一張
          showNext();
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
    function setTransform(dx) {
      dx = dx || 0;
      carouselLis[left].style.transform = 'translateX(' + (-screenWidth + dx) + 'px)';
      carouselLis[center].style.transform = 'translateX(' + dx + 'px)';
      carouselLis[right].style.transform = 'translateX(' + (screenWidth + dx) + 'px)';
    }
    // 動態設置小圓點的active類
    // var pointsLis = points.querySelectorAll('li');
    // function setPoint() {
    //   for (var i = 0; i < pointsLis.length; i++) {
    //     pointsLis[i].classList.remove('active');
    //   }
    //   pointsLis[center].classList.add('active');
    // }
  }