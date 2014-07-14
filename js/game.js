var als = chara('.als');
als.walk('right',1).start();
als.move('right',1).start();

$('li').on('mousedown',function(){
    var dir = $(this).prop('class');

    als.walk(dir).start();
    als.move(dir).start();

}).on('mouseup',function(){
    var dir = $(this).prop('class');

    als.stop(dir);
});