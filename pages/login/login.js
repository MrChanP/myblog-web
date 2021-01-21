let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: "http://47.116.65.132:80/bgImg",
    userName: "",
    pwd: "",
    showPwd: false,
    sub: true,
    loginWay: "choose",
    alertType: "hide",
    alertMsg: ""
  },

  //微信一键登录
  getphonenumber(e) {
    console.log("微信一键登录getphonenumber")
    
  },

  // 选择注册
  toSignUp(){
    wx.navigateTo({
      url: '../signUp/signUp',
    })
  },

  //选择登录
  loginWay(e){
    this.setData({ loginWay: e.currentTarget.dataset.type })
  },

  //账号密码登录
  loginByPwd() {
    let _this = this
    if (!_this.data.sub) {
      return
    }
    var userName = _this.data.userName
    var pwd = _this.data.pwd
    if (userName == "") {
      app.alert(_this, "tip", "请输入用户名", 2000)
      return
    }
    if (pwd == "") {
      app.alert(_this, "tip", "请输入密码", 2000)
      return
    }
    app.alert(_this, "loading_login", "正在登陆，请稍后", 0)
    app.postRequest("/index/loginByPwd", 
    { userName: _this.data.userName, pwd: _this.data.pwd },
    function(data) {
      if (data.code == 0) {
        app.globalData.userInfo = data.data
        setTimeout(function () {
          wx.navigateBack()
        }, 1000)
        app.alert(_this, "success", "登陆成功", 2000)
      } else {
        app.alert(_this, "tip", data.msg, 2000)
      }
    })
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

  back(){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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