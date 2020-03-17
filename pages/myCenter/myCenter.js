
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    alert: "hide",
    alertMsg: ""
  },

  checkLogin() {
    let url = ""
    if(this.data.userInfo != null){
      url = "../login/login"
    } else {
      url = "../login/login"
    }
    wx.navigateTo({
      url: url
    })
  },

  //登录获取令牌
  getSessionId(){
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:8080/myblog/index/onLogin',
            data: { code: res.code },
            success(res) {
              if (res.code == "0") {
                wx.setStorage({
                  key: 'sessionId',
                  data: res.data,
                })
              } else {
                that.setData({
                  alert: "error", alertMsg: res.msg
                })
              }
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // wx.setStorage({
    //   key: 'userInfo',
    //   data: { "head_img": "../../style/image/head_img.jpg", "name": "玉兰", "sign": "我是一只小可爱" },
    // })
    wx.checkSession({
      success() {
        let sessionId
        wx.getStorage({
          key: 'sessionId',
          success(res) {
            console.log(res)
          },
          fail(){
            console.log("fff")
          }
        })
      },
      fail() {
        this.getSessionId()
      }
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