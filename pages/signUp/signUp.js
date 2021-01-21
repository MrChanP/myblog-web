let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: "http://47.116.65.132:80/bgImg",
    alertType: "hide",
    alertMsg: "",
    ifAgree: false,
    selectWay: '请选择',
    showSelWay: false,
    userName: "",
    userPwd: "",
    userPwdAgain: "",
    code: "",
    sendCodeAllow: true,
    sendCodeTime: 120
  },
  
  // 提交注册
  subSignUp(){
    let _this = this
    let userName = _this.data.userName
    if (userName == "") {
      app.alert(_this, "tip", "请输入注册账号", 2000)
      return
    }

    let userPwd = _this.data.userPwd
    if (userPwd == "") {
      app.alert(_this, "tip", "请输入密码", 2000)
      return
    }

    let userPwdAgain = _this.data.userPwdAgain
    if (userPwdAgain != userPwd) {
      app.alert(_this, "tip", "两次密码输入不一致", 2000)
      return
    }

    let code = _this.data.code
    if (code == "") {
      app.alert(_this, "tip", "请输入验证码", 2000)
      return
    }

    let ifAgree = _this.data.ifAgree
    if (!ifAgree) {
      app.alert(_this, "tip", "请阅读并同意《协议》", 2000)
      return
    }
    app.alert(_this, "loading", "数据加载中", 0)
    app.postRequest("/index/signUp", {
      wxTokenId: app.globalData.wxTokenId,
      selectWay: _this.data.selectWay,
      userName: userName,
      userPwd: userPwd,
      code: code
    }, function(data){
      if (data.code == 0) {
        app.globalData.userInfo = data.data
        app.alert(_this, "success", "注册成功", 1500)
        setTimeout(function(){
          wx.redirectTo({
            url: '../index/index',
          })
        }, 1500)
      } else {
        app.alert(_this, "tip", data.msg, 2000)
      }
    })
  },

  switchShowSelWay(){
    this.setData({ showSelWay: !this.data.showSelWay})
  },

  // 勾选协议
  switchAgree(){
    this.setData({ ifAgree: !this.data.ifAgree })
  },

  // 发送验证码
  sendCode(){
    let _this = this
    let sendCodeAllow = _this.data.sendCodeAllow
    if (!sendCodeAllow) {
      return
    }

    let selectWay = _this.data.selectWay
    if (selectWay == "请选择") {
      app.alert(this, "tip", "请选择注册方式", 2000)
      return
    }

    let userName = _this.data.userName
    if (userName == "") {
      app.alert(this, "tip", "请输入账号", 2000)
      return
    }

    app.postRequest("/index/sendCode", {
      wxTokenId: app.globalData.wxTokenId,
      selectWay: selectWay,
      userName: userName,
      sendType: "01"
    }, function(data) {
      if (data.code == 0) {
        app.alert(_this, "tip", "发送成功", 2000)
        _this.setData({ sendCodeAllow: false })
        let interValId = setInterval(function(){
          let sendCodeTime = parseInt(_this.data.sendCodeTime)
          sendCodeTime--
          if (sendCodeTime <= 0) {
            sendCodeTime = 120
            clearInterval(interValId)
            _this.setData({ sendCodeAllow: true })
          }
          _this.setData({ sendCodeTime: sendCodeTime })
        }, 1000)
      } else {
        app.alert(_this, "tip", data.msg, 2000)
      }
    })
  },

  // 点击选择注册方式
  selectWay(e){
    this.setData({ selectWay: e.currentTarget.dataset.type, showSelWay: false })
  },
  
  bindInputData(e){
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type == "userName") {
      if (this.data.selectWay == "请选择") {
        app.alert(this, "tip", "请选择注册方式", 2000)
        value = ""
      }
    }
    this.setData({ [type]: value })
  },

  back(){
    wx.navigateBack({
      delta: 0,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavpos(this)
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