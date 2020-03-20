Page({

  /**
   * 页面的初始数据
   */
  data: {
      userName: null,
      pwd: null,
      showPwd: false,
      sub: true,
      loginWay: "choose",
      toptips: { show: false, type: '', msg: '', time:0 }
  },

//微信一键登录
  getUserInfo(e) {
    let that = this
    if(e.detail.userInfo){
      //允许授权
      let sessionId = wx.getStorageSync(sessionId)
      wx.request({
        url: 'http://localhost:8080/myblog/index/saveUserInfo',
        data: { sessionId: sessionId, userInfo:e.detail.userInfo},
        success(res) {
          if (res.data.code == "0") {
            wx.setStorageSync('userInfo', res.data.data)
            wx.switchTab({
              url: '/pages/myCenter/myCenter'
            })
          } else {
            that.setData({ toptips: { show: true, type: 'error', msg: '登陆失败', time: 2000 }})
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
  // getphonenumber() {
  //   console.log("微信一键登录getphonenumber")
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
  // },

  //选择手机号登录
  loginWay(e){
    this.setData({ loginWay: e.currentTarget.dataset.type })
  },

  //账号密码登录
  loginByPwd() {
    if (!this.data.sub) {
      return
    }
    userName = this.data.userName
    pwd = this.data.pwd
    if (userName == null || userName == "") {
      this.setData({ toptips: { show: true, type: 'error', msg: '请输入用户名', time: 1500 } })
    } else if (pwd == null || pwd == "") {
      this.setData({ toptips: { show: true, type: 'error', msg: '请输入密码', time: 1500 }})
    } else {
      this.setData({ toptips: { show: true, type: 'info', msg: '正在登陆，请稍后', time: 0 }, sub: false })
      let that = this
      wx.request({
        url: 'http://localhost:8080/myblog/index/loginByPwd',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: { 'userName': that.data.userName, 'pwd': that.data.pwd },
        success(res) {
          if (res.data.code == 0) {
            that.setData({ toptips: { show: true, type: 'success', msg: '登陆成功', time: 1500 }})
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/myCenter/myCenter'
              })
            }, 1500)
          } else {
            that.setData({ sub: true, toptips: { show: true, type: 'error', msg: res.data.msg, time: 1500 }})
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this
    // wx.getStorage({
    //   key: 'sessionId',
    //   success: function(res) {
    //     that.setData({ sessionId:res.data})
    //   },
    // })
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