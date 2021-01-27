let app = getApp()
let socket = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
      // imgPath: "http://47.116.65.132:80/bgImg",
      imgPath: "http://localhost:80",
      nowTabar: "index",
      alertType: "hide",
      alertMsg: "",
      showNoticToast: false,
      topBg: [{src:"http://localhost:80/bgImg/gg1.jpeg"}, {src:"http://localhost:80/bgImg/gg2.jpeg"}, {src:"http://localhost:80/bgImg/gg3.jpeg"}],
      titleList: ["时事", "时事", "时事", "时事", "时事", "时事", "时事"],
      ifSearchFocus: false,
      titleIndex: 0,
      nowFirstIndex: 0,
      titleScrollX: 0
    },

    switchTitleType(e) {
      let index = e.currentTarget.dataset.index
      let clickX = e.detail.x
      let itemWidth = wx.getSystemInfoSync().windowWidth/5;
      if (clickX < itemWidth) {
        // 点击当前第一个标题
        if (index > 0) {
          // 当前标题非第一个标题
          this.setData({ titleScrollX: itemWidth*(index-1) })
        }
      } else if (clickX > itemWidth*4) {
        // 点击当前最后一个标题
        if (index < this.data.titleList.length) {
          // 当前标题非最后一个标题
          this.setData({ titleScrollX: itemWidth*(index-3) })
        }
      }
      this.setData({ titleIndex: index })
    },

    switchSearch() {
      this.setData({ ifSearchFocus: !this.data.ifSearchFocus })
    },

    test(e){
      app.alert(this, e.currentTarget.dataset.type, "数据加载中", 0)
    },

    confirmResult(e){
      if (e.currentTarget.dataset.type) {

      } else {
        app.alert(this, "hide")
      }
    },

    // 查看聊天信息
    switchNoticToast(e){
      this.setData({ showNoticToast: e.currentTarget.dataset.type == 'show' })
    },

    // 我的简历
    toMyCV(){
      wx.navigateTo({
        url: '../myResume/myResume',
      })
    },

    // 登陆/注册
    toLogin(){
      wx.navigateTo({
        url: '../login/login',
      })
    },

    // 个人信息
    toPersonInfo(){
      wx.navigateTo({
        url: '../userInfo/userInfo',
      })
    },

    // 首页/个人中心切换
    switchTabar(e){
      this.setData({ nowTabar: e.currentTarget.dataset.tabar })
    },

    // 获取用户信息
    onLogin(){
      let _this = this
      // app.alert(_this, "tip", "登录失败，请检查账号号和密码", 0)
      app.postRequest("/index/getUserInfo", { wxTokenId: app.globalData.wxTokenId }, function(data){
        if (data.code == 0) {
          app.globalData.userInfo = data.data
          _this.setData({ userInfo: data.data })
        }
      })
    },

    // 获取socket链接
    getSocket(){
      let _this = this
      if (socket == null) {
        socket = wx.connectSocket({
          url: 'wss',
        })
      } else {

      }

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
      let _this = this
      let interId = setInterval(function(){
        if (app.globalData.wxTokenId != "") {
          clearInterval(interId)
          _this.onLogin()
        }
      }, 200);
      _this.getSocket()
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