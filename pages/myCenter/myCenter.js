
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
      url = "../index/index"
    } else {
      url = "../login/login"
    }
    wx.navigateTo({
      url: url
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
    this.setData({ alert: "topLoading", alertMsg: "正在加载数据"})
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({ userInfo:res.data})
      },
      fail(){
        console.log("缓存获取用户信息失败")
      },
      complete(){
        that.setData({ alert: "hide"})
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