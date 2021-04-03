App({

  globalData: {
    wxTokenId: "",
    userInfo: null,

    // dev
    // contextUrl: 'http://localhost:80/myblog',

    // proc
    contextUrl: 'http://47.116.65.132:80/myblog'
  },

  // 弹窗
  alert(_this, type, msg, time) {
    _this.setData({ alertType: "hide", alertMsg: ""})
    if (type != "hide") {
      if (time != 0 && time != undefined) {
        var timeOutId = setTimeout(function(){
          clearTimeout(timeOutId)
          _this.setData({ alertType: "hide", alertMsg: ""})
        }, time)
      }
      _this.setData({ alertType: type, alertMsg: msg})
    }
  },

  // 设置顶部导航栏样式
  setNavpos(_this){
    let topMenu = wx.getMenuButtonBoundingClientRect()
    let navTopStyle = "height:" + (topMenu.height + topMenu.top + 6) + "px;line-height:" + (topMenu.height + 8) + "px;"
    _this.setData({ navTopStyle: navTopStyle })
  },

  // 获取登陆令牌
  getToken() {
    let _this = this
    wx.login({
      success(res){
        _this.postRequest("/index/getToken", 
        { code: res.code }, 
        function(data){
          if (data.code == 0) {
            _this.globalData.wxTokenId = data.data
          }
        })
      }
    })
  },

  // post请求
  postRequest: function(url, data, fn) {
    let _this = this
    wx.request({
      url: _this.globalData.contextUrl + url,
      method: "POST",
      data: data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      timeout: 10000,
      success: function (res) {
        console.log(url)
        console.log(res.data)
        fn(res.data);
      },
      fail: function () {
        // _this.alert(_this, "tip", "网络异常", 2000)
        // wx.showToast({
        //   title: "网络异常",
        //   icon: 'none',
        //   duration: 2000
        // });
      }
    })
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // this.getToken()
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
