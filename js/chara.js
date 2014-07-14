var chara = function(content) {
    var $content = $(content),
        timer = {},
        size = 32,
        num = 9999,
        speed = 300,
        dir = 'down';

    return {
        stop: function(dir) {
            this.walk(dir).stop();
            this.move(dir).stop();
        },
        walk: function(dir,actionNum,actionSpeed) {
            var count = 0,
                dirNum = dir === 'up' ? 3 :
                    dir === 'right' ? 2 :
                    dir === 'down' ? 0 :
                    dir === 'left' ? 1 : 0,
                actionNum = actionNum ? actionNum : num,
                actionSpeed = actionSpeed ? actionSpeed : speed;

            function action() {
                $content.css({
                    backgroundPosition: -(count * size) + 'px ' + -(size * dirNum)  + 'px'
                },actionSpeed);
            }

            return {
                start: function(){
                    var that = this;

                    count += 2;
                    count = count > 2 ? 0 : count;

                    action();

                    actionNum--;

                    console.log(actionNum)
                    if(actionNum) {
                        timer.walk = setTimeout(function(){
                            that.start();
                        }, actionSpeed);
                    }
                },
                stop: function(){
                    count = 1;
                    action();
                    clearTimeout(timer.walk);
                }
            };
        },

        move: function(dir,actionNum,actionSpeed){
            var left = [],
                top = [],
                actionNum = actionNum ? actionNum : num,
                actionSpeed = actionSpeed ? actionSpeed : speed;

            dir = dir;

            $content.each(function(index, el){
                var $this = $(this);
                left[index] = [
                    $this.position().left
                ]
                top[index] = [
                    $this.position().top
                ]
            });

            function animate(dir) {
                $content.each(function(index, el){
                    left[index] = Number(left[index]),
                    top[index] = Number(top[index]);
                    left[index] = dir === 'right' ? left[index] + size :
                        dir === 'left' ? left[index] - size : left[index];
                    top[index] = dir === 'down' ? top[index] + size :
                        dir === 'up' ? top[index] - size : top[index];

                    var $this = $(this);
                    $this.animate({
                        left: left[index],
                        top: top[index]
                    },actionSpeed);
                });
            }

            return {
                start: function(){
                    var that = this;
                    animate(dir);

                    actionNum--;

                    if(actionNum) {
                        timer.move = setTimeout(function(){
                            that.start();
                        }, actionSpeed);
                    }
                },
                stop: function(){
                    clearTimeout(timer.move);
                }
            }
        }
    }
}