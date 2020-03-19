Page({

  /**
   * 页面的初始数据
   */
  data: {
      userName: null,
      pwd: null,
      showPwd: false,
      alert: "hide",
      alertMsg: "",
      sub: true,
      loginWay: "choose",
      sessionId: 0
  },

//微信一键登录
  getUserInfo(e) {
    let sessionId = this.data.sessionId
    let that = this
    if(e.detail.userInfo){
      //允许授权
      wx.request({
        url: 'http://localhost:8080/myblog/index/saveUserInfo',
        data: { sessionId:sessionId, userInfo:e.detail.userInfo},
        success(res) {
          console.log(res.data)
          if (res.data.code == "0") {
            wx.setStorageSync('userInfo', res.data.data)
            wx.switchTab({
              url: '/pages/myCenter/myCenter'
            })
          } else {
            that.alertTip("error", "登陆失败")
          }
        }
      })
    } else {
      //拒绝授权
    }
    
    // wx.getSetting({
    //   success(res) {
    //     console.log(res.authSetting['scope.userInfo'])
        // if (res.authSetting['scope.userInfo']) {
        //   wx.getUserInfo({
        //     success: function (res) {
        //       //从数据库获取用户信息
        //       that.queryUsreInfo();
        //       //用户已经授权过
        //       wx.switchTab({
        //         url: '/pages/index/index'
        //       })
        //     }
        //   })
        // }
    //   }
    // })
  },

  //微信一键登录
  getphonenumber() {
    console.log("微信一键登录getphonenumber")
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       wx.request({
    //         url: 'http://localhost:8080/myblog/index/loginBywx',
    //         data: { code: res.code },
    //         success(res) {
    //           if (res.code == "0") {
    //             var json = JSON.parse(res.data.Data)
    //             wx.setStorage({
    //               key: "third_Session",
    //               data: json.third_Session
    //             })
    //           }
    //         }
    //       })
    //     } else {

    //     }
    //   }
    // })
  },

  //选择手机号登录
  loginWay(e){
    this.setData({ loginWay: e.currentTarget.dataset.type })
  },

  //登录校验
  login() {
    if (!this.data.sub) {
      return
    }
    if (this.data.userName == null || this.data.userName == "") {
      this.alertTip("error", "请输入您的登录账号")
    } else if (this.data.pwd == null || this.data.pwd == "") {
      this.alertTip("error", "请输入您的登录密码")
    } else {
      this.setData({ alert: 'topLoading', alertMsg: '正在登陆，请稍后', sub: false })
      let that = this
      wx.request({
        url: 'http://localhost:8080/myblog/index/login',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: { 'userName': that.data.userName, 'pwd': that.data.pwd },
        dataType: "json",
        success(res) {
          if (res.data.code == 0) {
            that.setData({ alert: 'success', alertMsg: '登录成功' })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/myCenter/myCenter'
              })
            }, 1500)
          } else {
            that.setData({ sub: true })
            that.alertTip("error", res.data.msg)
          }
        }
      })
    }
  },

  //显示密码
  showPwd() {
    this.setData({
      showPwd: !this.data.showPwd
    })
  },

  //input标签与data数据绑定
  bindData(e) {
    this.setData({
        [e.currentTarget.dataset.type]: e.detail.value
    })
  },

  //提示弹窗，2秒后消失
  alertTip(alert, alertMsg) {
    this.setData({ alert: alert, alertMsg: alertMsg })
    let that = this
    setTimeout(function () {
      that.setData({ alert: "hide", alertMsg: "" })
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'sessionId',
      success: function(res) {
        that.setData({ sessionId:res.data})
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})