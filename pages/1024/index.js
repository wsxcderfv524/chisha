// pages/1024/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    rn:4,
    cn:4,
    state:0,
    RUNNING:1,
    GAMEOVER:0,
    score:0, //分数
    isOver:false,
    lastX: 0,
    lastY: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.start();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  handleouchmove:function(event){
    
    if(this.data.state === this.data.RUNNING){
      let currentX = event.changedTouches[0].pageX
      let currentY = event.changedTouches[0].pageY
      let tx = currentX - this.data.lastX
      let ty = currentY - this.data.lastY
      if (Math.abs(tx) > Math.abs(ty)) {
        //左右方向滑动
        if (tx < 0){
          
          this.moveLeft();
        }
        else if (tx > 0){
     
          this.moveRight();
        }
      }
      else {
        //上下方向滑动
        if (ty < 0){
      
          this.moveUp();
        }
        else if (ty > 0){
        
          this.moveDown();
        }
          
      }
    }
   

  },
  handletouchtart: function (event) {
    // 赋值
    this.setData({
      lastX : event.changedTouches[0].pageX,
      lastY : event.changedTouches[0].pageY
    })
  },


  isGameOver:function(){//判断游戏状态为结束
    //如果没有满,则返回false
    if(!this.isFull()){
        return false;
    }else{//否则
        //从左上角第一个元素开始，遍历二维数组
        for(var row=0;row<this.data.rn;row++){
            for(var col=0;col<this.data.cn;col++){
                //如果当前元素不是最右侧元素
                if(col<this.data.cn-1){
                    // 如果当前元素==右侧元素
                    if(this.data.list[row][col]==
                        this.data.list[row][col+1]){
                        return false;
                    }
                }
                //如果当前元素不是最下方元素
                if(row<this.data.rn-1){
                    // 如果当前元素==下方元素
                    if(this.data.list[row][col]==
                        this.data.list[row+1][col]){
                        return false;
                    }
                }
            }
        }return true;
    }
},
start:function(){//游戏开始

    this.setData({
      state :this.data.RUNNING,
      isOver:false,
      list:[//初始化二维数组
          ['','','',''],
          ['','','',''],
          ['','','',''],
          ['','','',''],
      ],
      score:0,

    })
    //在两个随机位置生成2或4
    this.randomNum();
    this.randomNum();
    //将数据更新到页面
    this.updateView();
},
isFull:function(){//判断当前数组是否已满
    for(var row=0;row<this.data.rn;row++){//遍历二维数组
        for(var col=0;col<this.data.cn;col++){
            // 只要发现当前元素==0
            if(this.data.list[row][col]==0){
                return false;
            }
        }
    }
    //(如果循环正常退出)
    return true;
},
randomNum:function(){//在随机空位置生成一个数
    if(!this.isFull()){//如果*不*满，才{
        while(true){//循环true
            //0-3随机生成一个行号row
            var row=parseInt(Math.random()*this.data.rn);
            //0-3随机生成一个列号col
            var col=parseInt(Math.random()*this.data.cn);
            //如果data[row][col]==0
            if(this.data.list[row][col]==0){
                let data = this.data.list;
                data[row][col] = Math.random()<0.5?2:4
                this.setData({
                  list: data
                })
                break;//退出循环
            }
        }
    }
},
updateView:function(){
//将二维数组中每个格的数字放入前景格中
//遍历二维数组中每个元素,比如:row=2,col=3, 16
    // for(var row=0;row<this.data.rn;row++){
        // for(var col=0;col<this.data.cn;col++){
    //         /*网页中一切元素，属性，文字都是对象*/
    //         // var div=document.getElementById("c"+row+col);
    //         //"c23"
            // var curr=this.data.list[row][col]; //当前元素值
          
    //         //修改div开始标签和结束标签之间的内容
    //         // div.innerHTML=curr!=0?curr:"";
    //         //修改div的class属性
            // div.className=curr!=0?"cell n"+curr:"cell"
    //         // class
        // }
    // }
    // var span=document.getElementById("score");
    // span.innerHTML=this.score;
    //判断并修改游戏状态为GAMEOVER
    if(this.isGameOver()){
        // this.state=this.GAMEOVER;
        // var div=document.getElementById("gameOver");
        // var span=document.getElementById("finalScore");
        // span.innerHTML=this.score;
        // //修改div的style属性下的display子属性为"block"
        // div.style.display="block";
        this.setData({
          state:this.data.GAMEOVER,
          isOver : true,
        })
    }
},//updateView方法的结束
/*实现左移*/
/*找当前位置右侧，*下一个*不为0的数*/
getRightNext:function(row,col){
    //循环变量:nextc——>指下一个元素的列下标
    //从col+1开始,遍历row行中剩余元素，<cn结束
    for(var nextc=col+1;nextc<this.data.cn;nextc++){
        // 如果遍历到的元素!=0
        if(this.data.list[row][nextc]!=0){
            //  就返回nextc
            return nextc;
        }
    }return -1;//(循环正常退出，就)返回-1
},
/*判断并左移*指定行*中的每个元素*/
moveLeftInRow:function(row){
    //col从0开始，遍历row行中的每个元素，<cn-1结束
    for(var col=0;col<this.data.cn-1;col++){
        // 获得当前元素下一个不为0的元素的下标nextc
        var nextc=this.getRightNext(row,col);
        // 如果nextc==-1，(说明后边没有!=0的元素了)
        if(nextc==-1){
            break;
        }else{// 否则
            //  如果当前位置==0,
            if(this.data.list[row][col]==0){
                //   将下一个位置的值，当入当前位置
                let data = this.data.list;
                data[row][col] = this.data.list[row][nextc];
                data[row][nextc] = '';
                this.setData({
                  list : data
                })
           
                col--;//让col退一格，重复检查一次
            }else if(this.data.list[row][col]==
                this.data.list[row][nextc]){
                let data = this.data.list;
                data[row][col] = this.data.list[row][col] * 2;
                data[row][nextc] = '';

                this.setData({
                  list : data,
                  score:this.data.score + this.data.list[row][col]
                })

            }
        }
    }
},
/*移动所有行*/
moveLeft:function(){
    var oldStr=this.data.list.toString();
    //循环遍历每一行
    for(var row=0;row<this.data.rn;row++){
        // 调用moveLeftInRow方法，传入当前行号row
        this.moveLeftInRow(row);
    }//(循环结束后)
    var newStr=this.data.list.toString();
    if(oldStr!=newStr){
        //调用randomNum()，随机生成一个数
        this.randomNum();
        //调用updateView()，更行页面
        this.updateView();
    }
},
moveRight:function(){
    var oldStr=this.data.list.toString();
    for(var row=0;row<this.data.rn;row++){
        this.moveRightInRow(row);
    }
    var newStr=this.data.list.toString();
    if(oldStr!=newStr){
        this.randomNum();
        this.updateView();
    }
},
/*判断并右移*指定行*中的每个元素*/
moveRightInRow:function(row){
    //col从cn-1开始，到>0结束
    for(var col=this.data.cn-1;col>0;col--){
        var nextc=this.getLeftNext(row,col);
        if(nextc==-1){
            break;
        }else{
            if(this.data.list[row][col]==0){
                let data = this.data.list;
                data[row][col] = this.data.list[row][nextc];
                data[row][nextc] = '';
                this.setData({
                  list:data
                })
                col++;
            }else if(this.data.list[row][col]==
                this.data.list[row][nextc]){
                let data = this.data.list;
                data[row][col] = this.data.list[row][col] * 2;
                data[row][nextc] = '';

                this.setData({
                  list : data,
                  score:this.data.score + this.data.list[row][col]
                })
            }
        }
    }
},
/*找当前位置左侧，下一个不为0的数*/
getLeftNext:function(row,col){
    //nextc从col-1开始，遍历row行中剩余元素，>=0结束
    for(var nextc=col-1;nextc>=0;nextc--){
        // 遍历过程中，同getRightNext
        if(this.data.list[row][nextc]!=0){
            return nextc;
        }
    }return -1;
},
/*获得任意位置下方不为0的位置*/
getDownNext:function(row,col){
    //nextr从row+1开始，到<this.rn结束
    for(var nextr=row+1;nextr<this.data.rn;nextr++){
        if(this.data.list[nextr][col]!=0){
            return nextr;
        }
    }return -1;
},
/*判断并上移*指定列*中的每个元素*/
moveUpInCol:function(col){
    //row从0开始，到<rn-1，遍历每行元素
    for(var row=0;row<this.data.rn-1;row++){
        // 先获得当前位置下方不为0的行nextr
        var nextr=this.getDownNext(row,col);
        if(nextr==-1){ break; // 如果nextr==-1
        }else{// 否则
            //  如果当前位置等于0
            if(this.data.list[row][col]==0){
                let data = this.data.list;
                data[row][col] = this.data.list[nextr][col];
                data[nextr][col] = '';
                this.setData({
                  list : data,
                })
                row--;//退一行，再循环时保持原位
            }else if(this.data.list[row][col]==
                this.data.list[nextr][col]){
                let data = this.data.list;
                data[row][col] = this.data.list[row][col] * 2;
                data[nextr][col] = ''

                this.setData({
                  list : data,
                  score : this.data.score + this.data.list[row][col]
                })
            }
        }
    }
},
/*上移所有列*/
moveUp:function(){
    var oldStr=this.data.list.toString();
    //遍历所有列
    for(var col=0;col<this.data.cn;this.moveUpInCol(col++));
    var newStr=this.data.list.toString();
    if(oldStr!=newStr){
        this.randomNum();
        this.updateView();
    }
},
/*下移所有列*/
moveDown:function(){
    var oldStr=this.data.list.toString();
    for(var col=0;col<this.data.cn;this.moveDownInCol(col++));
    var newStr=this.data.list.toString();
    if(oldStr!=newStr){
        this.randomNum();
        this.updateView();
    }
},
moveDownInCol:function(col){
    //row从this.rn-1，到>0结束，row--
    for(var row=this.data.rn-1;row>0;row--){
        var nextr=this.getUpNext(row,col);
        if(nextr==-1){
            break;
        }else{
            if(this.data.list[row][col]==0){
                let data = this.data.list;
                data[row][col] = this.data.list[nextr][col];
                data[nextr][col] = ''
                this.setData({
                  list : data
                })
                row++;
            }else if(this.data.list[row][col]==
                this.data.list[nextr][col]){
                let data  = this.data.list;
                data[row][col]=this.data.list[row][col] * 2;
                data[nextr][col] = '';
                this.setData({
                  list : data,
                  score: this.data.score + this.data.list[row][col],
                })
            }
        }
    }
},
/*获得任意位置上方不为0的位置*/
getUpNext:function(row,col){
    for(var nextr=row-1;nextr>=0;nextr--){
        if(this.data.list[nextr][col]!=0){
            return nextr;
        }
    }return -1;
}


  
})