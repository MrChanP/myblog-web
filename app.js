App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    let that = this;
    wx.checkSession({
      success() {
        console.log("checkSession:success")
        wx.getStorage({
          key: 'sessionId',
          success(res) {
            console.log("getStorage:success")
            that.getUserInfo(res.data)
          },
          fail() {
            console.log("getStorage:fail")
            that.getSessionId()
          }
        })
      },
      fail() {
        console.log("checkSession:fail")
        that.getSessionId()
      }
    })
  },

  //获取令牌
  getSessionId() {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:8080/myblog/index/onLogin',
            data: { code: res.code },
            success(res) {
              if (res.data.code == "0") {
                wx.setStorage({
                  key: 'sessionId',
                  data: res.data.data,
                })
                that.getUserInfo(res.data.data)
              }
            }
          })
        }
      }
    })
  },

  //通过seesionId获取用户信息
  getUserInfo(sessionId) {
    wx.request({
      url: 'http://localhost:8080/myblog/index/getUserInfo',
      data: { sessionId: sessionId },
      success(res) {
        console.log(res.data)
        if (res.data.code == "0") {
          wx.setStorage({
            key: 'userInfo',
            data: res.data.data,
          })
        }
      }
    })
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
